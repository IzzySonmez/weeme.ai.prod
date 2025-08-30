// Production configuration and environment validation
export const config = {
  // Environment
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
  
  // API
  apiBase: import.meta.env.VITE_API_BASE || 'http://localhost:8787',
  
  // Supabase
  supabase: {
    url: import.meta.env.VITE_SUPABASE_URL || '',
    anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || '',
    enabled: !!(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY && 
               import.meta.env.VITE_SUPABASE_URL.startsWith('https://') && 
               import.meta.env.VITE_SUPABASE_ANON_KEY.length > 100)
  },
  
  // Features
  features: {
    aiSuggestions: true,
    aiContent: true,
    analytics: import.meta.env.PROD
  },
  
  // Limits
  limits: {
    maxReports: 50,
    maxAIContent: 100,
    maxTrackingCodes: 10
  }
};

// Validate critical environment variables
export const validateEnvironment = () => {
  const errors: string[] = [];
  const warnings: string[] = [];
  
  // Supabase validation
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  
  if (supabaseUrl && !supabaseUrl.startsWith('https://')) {
    warnings.push('VITE_SUPABASE_URL should start with https://');
  }
  
  if (supabaseKey && supabaseKey.length < 100) {
    warnings.push('VITE_SUPABASE_ANON_KEY appears to be invalid (too short)');
  }
  
  if (config.isProduction) {
    if (!supabaseUrl) {
      warnings.push('VITE_SUPABASE_URL not set - using localStorage only');
    }
    if (!supabaseKey) {
      warnings.push('VITE_SUPABASE_ANON_KEY not set - using localStorage only');
    }
    if (config.apiBase.includes('localhost')) {
      warnings.push('VITE_API_BASE uses localhost in production - this may cause issues');
    }
  } else {
    // Development warnings
    if (!config.supabase.enabled) {
      console.log('[CONFIG] Supabase not configured - using localStorage only');
    }
  }
  
  // Log warnings
  if (warnings.length > 0) {
    console.log('[CONFIG] Environment warnings:');
    warnings.forEach(warning => console.warn(`  - ${warning}`));
  }
  
  if (errors.length > 0) {
    console.error('[CONFIG] Environment validation failed:');
    errors.forEach(error => console.error(`  - ${error}`));
  }
  
  return errors.length === 0;
};

// Runtime configuration check
export const getConfigStatus = () => {
  return {
    environment: config.isProduction ? 'production' : 'development',
    supabaseEnabled: config.supabase.enabled,
    apiBase: config.apiBase,
    featuresEnabled: config.features,
    timestamp: new Date().toISOString()
  };
};

// Initialize validation
if (typeof window !== 'undefined') {
  validateEnvironment();
}