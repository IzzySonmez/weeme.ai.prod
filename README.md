# Weeme.ai - SEO Intelligence Reports

A full-stack SaaS web application that generates comprehensive SEO reports in seconds. Built with Next.js 14, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Instant SEO Analysis**: Generate detailed reports for any domain or keyword
- **Comprehensive Data**: Technical SEO, on-page analysis, SERP research, and competitor insights
- **Real-time APIs**: Integration with Google PageSpeed Insights, SERP API, and OpenPageRank
- **Beautiful Reports**: Print-friendly PDF export with professional design
- **Smart Caching**: LRU cache with 15-minute TTL for optimal performance
- **Rate Limiting**: 10 requests per minute per IP address
- **Responsive Design**: Works perfectly on all devices

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui with Radix UI primitives
- **APIs**: Google PageSpeed Insights, SERP API, OpenPageRank
- **Caching**: LRU cache with TTL
- **Rate Limiting**: Token bucket algorithm
- **Deployment**: Vercel-ready

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- API keys (optional - app works with fallback data):
  - SERPAPI_KEY (for SERP data)
  - GOOGLE_API_KEY (for PageSpeed Insights)
  - OPENPAGERANK_API_KEY (for domain authority)

## 🚀 Quick Start

1. **Clone and install**
```bash
git clone <repository-url>
cd weeme-seo-intelligence
npm install
```

2. **Set up environment variables**
```bash
cp .env.local.example .env.local
# Edit .env.local with your API keys (optional)
```

3. **Run development server**
```bash
npm run dev
```

4. **Open your browser**
```
http://localhost:3000
```

5. **Try the demo**
Click "Try Patagonia Demo" or enter your own domain/keyword

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file with the following variables:

```env
# API Keys (optional - app works without them)
SERPAPI_KEY=your_serpapi_key_here
GOOGLE_API_KEY=your_google_api_key_here
OPENPAGERANK_API_KEY=your_openpagerank_api_key_here
GOOGLE_CX=your_google_custom_search_cx_here

# User Agent
USER_AGENT=WeemeAI-SEOCrawler/1.0

# Next.js
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### API Keys Setup

1. **SERP API** (for search results and competitor data)
   - Sign up at [serpapi.com](https://serpapi.com)
   - Get your API key from the dashboard
   - Add to `SERPAPI_KEY` in `.env.local`

2. **Google PageSpeed Insights** (for Core Web Vitals)
   - Get API key from [Google Cloud Console](https://console.cloud.google.com)
   - Enable PageSpeed Insights API
   - Add to `GOOGLE_API_KEY` in `.env.local`

3. **OpenPageRank** (for domain authority)
   - Sign up at [openpagerank.com](https://openpagerank.com)
   - Get your API key
   - Add to `OPENPAGERANK_API_KEY` in `.env.local`

## 📊 Report Sections

The generated reports include:

1. **Domain Overview**
   - Domain rank and authority metrics
   - Indexed pages and organic keywords estimate
   - International presence analysis

2. **Technical SEO**
   - Core Web Vitals (LCP, FID, CLS)
   - Lighthouse scores (Performance, Accessibility, Best Practices, SEO)
   - Priority action items

3. **On-Page SEO**
   - Title tags and meta descriptions analysis
   - Heading structure and content optimization
   - Schema markup and technical elements
   - Quick wins and improvement opportunities

4. **SERP Analysis**
   - Top 10 search results
   - Featured snippets and People Also Ask
   - Related searches and competitor analysis

5. **Keyword Opportunities**
   - High-impact keyword suggestions
   - Content ideas and blog topics
   - SERP features to target

6. **Growth Plan**
   - 30-60-90 day implementation roadmap
   - Key Performance Indicators (KPIs)
   - Prioritized action items

## 🏗️ Architecture

```
src/
├── app/                    # Next.js App Router
│   ├── api/seo/report/    # API endpoint for report generation
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── ReportGenerator.tsx
│   └── SEOReport.tsx
├── lib/                  # Utilities and providers
│   ├── providers/        # API integrations
│   │   ├── pagespeed.ts  # Google PageSpeed Insights
│   │   ├── serp.ts       # SERP API integration
│   │   ├── openpagerank.ts # Domain authority
│   │   └── crawl.ts      # Basic HTML parsing
│   ├── seo/             # SEO logic
│   │   ├── transform.ts  # Data transformation
│   │   └── recommend.ts  # Insights generation
│   ├── cache.ts         # LRU caching
│   ├── rateLimit.ts     # Rate limiting
│   └── utils.ts         # Utility functions
└── types/               # TypeScript definitions
    └── seo.ts           # Report interfaces
```

## 🔄 API Endpoints

### POST /api/seo/report

Generate a comprehensive SEO report.

**Request Body:**
```json
{
  "query": "example.com",
  "mode": "domain"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "inputMode": "domain",
    "query": "example.com",
    "fetchedAtISO": "2024-01-15T10:30:00.000Z",
    "domainOverview": { ... },
    "technicalSEO": { ... },
    "onPage": { ... },
    "serp": { ... },
    "opportunities": { ... },
    "growthPlan": { ... }
  },
  "cached": false
}
```

## 🚀 Deployment

### Vercel (Recommended)

1. **Deploy to Vercel**
```bash
npm i -g vercel
vercel --prod
```

2. **Set environment variables**
   - Go to Vercel dashboard
   - Add your API keys in Environment Variables
   - Redeploy

### Other Platforms

The app is a standard Next.js application and can be deployed to:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify
- Any Node.js hosting provider

## 🔍 Features in Detail

### Smart Fallbacks
- Works without API keys using estimated data
- Graceful degradation when APIs are unavailable
- Clear warnings when using fallback data

### Performance Optimizations
- LRU cache with 15-minute TTL
- Rate limiting (10 requests/minute/IP)
- Parallel API calls for faster report generation
- Optimized bundle size with code splitting

### Print-Friendly Reports
- Professional PDF export via browser print
- Optimized print styles
- Page break handling
- Clean typography and layout

### Responsive Design
- Mobile-first approach
- Tablet and desktop optimizations
- Touch-friendly interface
- Accessible design patterns

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

- 📧 Email: support@weeme.ai
- 📖 Documentation: [docs.weeme.ai](https://docs.weeme.ai)
- 🐛 Issues: [GitHub Issues](https://github.com/weeme-ai/seo-intelligence/issues)

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com) for beautiful UI components
- [Lucide](https://lucide.dev) for icons
- [Tailwind CSS](https://tailwindcss.com) for styling
- [Next.js](https://nextjs.org) for the framework

---

**Ready for production!** 🎉

Built with ❤️ by the Weeme.ai team