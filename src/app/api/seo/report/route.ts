import { NextRequest, NextResponse } from 'next/server'
import { rateLimiter, getRateLimitHeaders } from '@/lib/rateLimit'
import { reportCache } from '@/lib/cache'
import { getPageSpeedData } from '@/lib/providers/pagespeed'
import { getSERPData } from '@/lib/providers/serp'
import { getDomainOverview } from '@/lib/providers/openpagerank'
import { crawlAndAnalyze } from '@/lib/providers/crawl'
import { generateKeywordOpportunities, generateGrowthPlan } from '@/lib/seo/transform'
import { generateInsights, prioritizeRecommendations } from '@/lib/seo/recommend'
import { Report } from '@/types/seo'
import { formatDomain } from '@/lib/utils'

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const clientIP = request.ip || request.headers.get('x-forwarded-for') || 'anonymous'
    
    // Check rate limit
    if (!rateLimiter.isAllowed(clientIP)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        { 
          status: 429,
          headers: getRateLimitHeaders(clientIP)
        }
      )
    }

    const body = await request.json()
    const { query, mode } = body

    if (!query || !mode || !['domain', 'keyword'].includes(mode)) {
      return NextResponse.json(
        { error: 'Invalid request. Please provide query and mode (domain or keyword).' },
        { status: 400 }
      )
    }

    // Check cache first
    const cacheKey = `report:${mode}:${query}`
    const cachedReport = reportCache.get(cacheKey)
    if (cachedReport) {
      return NextResponse.json({
        success: true,
        data: cachedReport,
        cached: true,
        ...getRateLimitHeaders(clientIP)
      })
    }

    // Normalize domain for domain mode
    const normalizedQuery = mode === 'domain' ? formatDomain(query) : query
    const targetUrl = mode === 'domain' ? (query.startsWith('http') ? query : `https://${query}`) : `https://${normalizedQuery}`

    // Collect warnings for missing API keys
    const warnings: string[] = []
    if (!process.env.GOOGLE_API_KEY) warnings.push('Google PageSpeed API not configured - using estimated metrics')
    if (!process.env.SERPAPI_KEY) warnings.push('SERP API not configured - using sample data')
    if (!process.env.OPENPAGERANK_API_KEY) warnings.push('OpenPageRank API not configured - using estimated domain metrics')

    // Fetch data from all providers in parallel
    const [technicalSEO, serpData, domainOverview, onPageSEO] = await Promise.allSettled([
      getPageSpeedData(targetUrl),
      getSERPData(normalizedQuery, mode),
      mode === 'domain' ? getDomainOverview(normalizedQuery) : Promise.resolve(undefined),
      mode === 'domain' ? crawlAndAnalyze(targetUrl) : Promise.resolve(undefined)
    ])

    // Extract results, using fallbacks for failed requests
    const technicalData = technicalSEO.status === 'fulfilled' ? technicalSEO.value : {
      coreWebVitals: {
        lcp: { value: 3000, rating: 'NEEDS_IMPROVEMENT' as const },
        fid: { value: 150, rating: 'NEEDS_IMPROVEMENT' as const },
        cls: { value: 0.2, rating: 'NEEDS_IMPROVEMENT' as const }
      },
      lighthouse: { performance: 70, accessibility: 85, bestPractices: 80, seo: 90 },
      speedCategory: 'AVERAGE' as const,
      actionItems: ['Enable APIs for detailed analysis']
    }

    const serpResult = serpData.status === 'fulfilled' ? serpData.value : {
      results: [],
      peopleAlsoAsk: [],
      relatedSearches: [],
      competitors: []
    }

    const domainData = domainOverview.status === 'fulfilled' ? domainOverview.value : undefined
    const onPageData = onPageSEO.status === 'fulfilled' ? onPageSEO.value : undefined

    // Generate opportunities and growth plan
    const opportunities = generateKeywordOpportunities(normalizedQuery, mode, serpResult, onPageData)
    
    // Build the complete report
    const report: Report = {
      inputMode: mode,
      query: normalizedQuery,
      fetchedAtISO: new Date().toISOString(),
      domainOverview: domainData,
      technicalSEO: technicalData,
      onPage: onPageData || {
        title: { present: true, issues: ['Crawling disabled'] },
        metaDescription: { present: true, issues: ['Crawling disabled'] },
        headings: { h1Count: 1, h1Content: [], structure: [], issues: ['Crawling disabled'] },
        robots: { present: true, issues: [] },
        canonical: { present: true, issues: [] },
        schema: { types: [], count: 0, issues: ['Crawling disabled'] },
        hreflang: { present: false, languages: [], issues: [] },
        quickWins: ['Enable crawling for detailed on-page analysis']
      },
      serp: serpResult,
      opportunities,
      growthPlan: generateGrowthPlan({ domainOverview: domainData, technicalSEO: technicalData }, normalizedQuery),
      warnings: warnings.length > 0 ? warnings : undefined
    }

    // Cache the report
    reportCache.set(cacheKey, report)

    return NextResponse.json({
      success: true,
      data: report,
      cached: false
    }, {
      headers: getRateLimitHeaders(clientIP)
    })

  } catch (error) {
    console.error('Report generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate report. Please try again.' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'SEO Report API',
    endpoints: {
      'POST /api/seo/report': 'Generate SEO report',
    },
    rateLimit: '10 requests per minute per IP'
  })
}