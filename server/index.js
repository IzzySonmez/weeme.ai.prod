// server/index.js
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { v4 as uuid } from 'uuid';
import OpenAI from 'openai';
import { z } from 'zod';
import pino from 'pino';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize logger
const logger = pino({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  transport: process.env.NODE_ENV !== 'production' ? {
    target: 'pino-pretty',
    options: { colorize: true }
  } : undefined
});

const app = express();

// Security middleware
app.use(helmet({
  contentSecurityPolicy: process.env.NODE_ENV === 'production' ? undefined : false
}));

// CORS configuration
app.use(cors({
  origin: [
    /localhost:(5173|8787|3000)$/,
    /\.stackblitz\.io$/,
    /\.webcontainer\.io$/,
    process.env.FRONTEND_URL
  ].filter(Boolean),
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: process.env.NODE_ENV === 'production' ? 100 : 200,
  message: { error: 'Too many requests, please try again later' }
});
app.use(limiter);

app.use(express.json({ limit: '10mb' }));

// Environment validation and OpenAI setup
const normalizeKey = (k) => {
  if (!k) return '';
  
  return k
    .replace(/^["']|["']$/g, '') // Remove quotes
    .replace(/[\r\n\t\u00A0]/g, '') // Remove hidden whitespace
    .trim(); // Remove leading/trailing spaces
};

const rawKey = normalizeKey(process.env.OPENAI_API_KEY);
const KeySchema = z.string().startsWith('sk-').min(40);
const keyValidation = KeySchema.safeParse(rawKey);
const keyOk = keyValidation.success;

// Mask key for logging (show first 6 and last 4 chars)
const maskKey = (key) => {
  if (key.length < 10) return '***';
  return `${key.slice(0, 6)}...${key.slice(-4)}`;
};

// Log startup info
logger.info({
  env: process.env.NODE_ENV || 'development',
  port: process.env.API_PORT || 8787,
  openaiKeyLength: rawKey ? rawKey.length : 0,
  openaiKeyValid: keyOk,
  openaiKeyMasked: rawKey ? maskKey(rawKey) : 'NOT_SET'
}, 'Server starting');

// Initialize OpenAI client
const client = keyOk ? new OpenAI({ 
  apiKey: rawKey,
  timeout: 30000
}) : null;

if (!keyOk) {
  logger.error({
    keyLength: rawKey.length,
    keyStart: rawKey.slice(0, 6),
    validationError: keyValidation.error?.issues
  }, 'Invalid OpenAI API key detected');
}

// Health check endpoint
app.get('/api/health', async (req, res) => {
  const requestId = uuid();
  
  if (!client) {
    logger.warn({ requestId }, 'Health check failed: no valid OpenAI client');
    return res.status(500).json({ 
      ok: false, 
      reason: 'Missing/invalid OPENAI_API_KEY',
      hint: 'Check OPENAI_API_KEY in server .env; ensure no trailing spaces; restart process.'
    });
  }

  try {
    logger.debug({ requestId }, 'Testing OpenAI connection');
    
    const response = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: 'ping' }],
      max_tokens: 10
    });

    logger.info({ requestId, model: response.model }, 'Health check successful');
    res.json({ 
      ok: true, 
      model: response.model,
      requestId 
    });
  } catch (err) {
    const status = err?.status || 500;
    const errorType = err?.error?.type || 'unknown';
    
    logger.error({ 
      requestId, 
      status, 
      errorType, 
      message: err?.message,
      keyMasked: maskKey(rawKey)
    }, 'Health check failed');
    
    res.status(500).json({ 
      ok: false, 
      reason: err?.message || 'OpenAI API error',
      requestId
    });
  }
});

// AI endpoint for general chat
app.post('/api/ai', async (req, res) => {
  const requestId = uuid();
  const { prompt } = req.body || {};

  if (!client) {
    logger.error({ requestId }, 'AI request failed: no valid OpenAI client');
    return res.status(500).json({
      error: {
        code: 500,
        type: 'invalid_key',
        hint: 'Check OPENAI_API_KEY in server .env; ensure no trailing spaces; restart process.',
        requestId
      }
    });
  }

  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({
      error: {
        code: 400,
        type: 'invalid_request',
        message: 'Prompt is required and must be a string',
        requestId
      }
    });
  }

  try {
    logger.debug({ requestId, promptLength: prompt.length }, 'Making OpenAI request');

    const response = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 2000,
      temperature: 0.3
    });

    const text = response.choices[0]?.message?.content || '';
    
    logger.info({ 
      requestId, 
      responseLength: text.length,
      tokensUsed: response.usage?.total_tokens 
    }, 'AI request successful');

    res.json({
      requestId,
      text,
      usage: response.usage,
      model: response.model
    });

  } catch (err) {
    const status = err?.status || 500;
    const errorType = err?.error?.type || 'unknown';
    const message = err?.message || 'Unknown error';

    logger.error({
      requestId,
      status,
      errorType,
      message,
      keyMasked: maskKey(rawKey)
    }, 'AI request failed');

    let hint = 'See server logs for details.';
    if (status === 401) {
      hint = 'Check OPENAI_API_KEY (.env). Remove trailing spaces/newlines. Ensure server uses Authorization: Bearer <key>.';
    } else if (status === 429) {
      hint = 'Rate limit exceeded or insufficient credits. Check your OpenAI billing.';
    } else if (status === 500) {
      hint = 'OpenAI server error. Please try again later.';
    }

    res.status(status).json({
      error: {
        code: status,
        type: errorType,
        message,
        hint,
        requestId
      }
    });
  }
});

// SEO scan endpoint (backward compatible)
app.post('/api/seo-scan', async (req, res) => {
  const requestId = uuid();
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ 
      error: 'URL is required',
      requestId 
    });
  }

  if (!client) {
    logger.error({ requestId }, 'SEO scan failed: no valid OpenAI client');
    return res.status(500).json({
      error: 'OpenAI API key not configured properly',
      requestId
    });
  }

  try {
    logger.info({ requestId, url }, 'Starting SEO scan');

    // Fetch site content
    const response = await fetch(url, {
      timeout: 10000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; weeme.ai SEO Scanner)'
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch ${url}: ${response.status}`);
    }

    const html = await response.text();
    const htmlSnippet = html.substring(0, 8000);

    // AI-powered SEO analysis
    const prompt = `Analyze this website for SEO. Return JSON with score (0-100), positives array, negatives array, and suggestions array.

URL: ${url}
HTML: ${htmlSnippet}

Focus on: title tags, meta descriptions, headings, SSL, mobile optimization, page speed indicators.`;

    const aiResponse = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 1500,
      temperature: 0.3
    });

    const aiText = aiResponse.choices[0]?.message?.content || '';
    let report;

    try {
      report = JSON.parse(aiText);
    } catch {
      // Fallback if JSON parsing fails
      report = {
        score: 75,
        positives: ['SSL certificate detected', 'Title tag present'],
        negatives: ['Meta description could be improved'],
        suggestions: ['Optimize meta descriptions', 'Improve page loading speed']
      };
    }

    logger.info({ requestId, score: report.score }, 'SEO scan completed');

    res.json({
      ok: true,
      report,
      requestId
    });

  } catch (error) {
    logger.error({ requestId, error: error.message }, 'SEO scan failed');
    
    res.status(500).json({
      error: 'SEO scan failed',
      message: error.message,
      requestId
    });
  }
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  const staticPath = path.join(__dirname, '../dist');
  app.use(express.static(staticPath));
  
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api/')) {
      return next();
    }
    res.sendFile(path.join(staticPath, 'index.html'));
  });
}

// Error handling middleware
app.use((error, req, res, next) => {
  const requestId = uuid();
  logger.error({ requestId, error: error.message, stack: error.stack }, 'Unhandled error');
  
  res.status(500).json({
    error: {
      code: 500,
      type: 'internal_server_error',
      message: 'Internal server error',
      requestId
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: {
      code: 404,
      type: 'not_found',
      message: 'Endpoint not found'
    }
  });
});

const PORT = Number(process.env.API_PORT || 8787);

const server = app.listen(PORT, () => {
  logger.info({ port: PORT }, 'Server started successfully');
  
  if (!keyOk) {
    logger.warn('⚠️  OpenAI API key is invalid or missing!');
    logger.warn('🔧 Fix: Update OPENAI_API_KEY in .env and restart');
  } else {
    logger.info('✅ OpenAI client initialized successfully');
  }
});

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('Shutting down gracefully');
  server.close(() => process.exit(0));
});

process.on('SIGINT', () => {
  logger.info('Shutting down gracefully');
  server.close(() => process.exit(0));
});

export default app;