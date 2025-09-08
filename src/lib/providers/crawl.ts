import { apiCache } from '../cache'
import { OnPageSEO } from '@/types/seo'

interface CrawlData {
  html: string
  url: string
  statusCode: number
  headers: Record<string, string>
}

export async function crawlAndAnalyze(url: string): Promise<OnPageSEO> {
  const cacheKey = `crawl:${url}`
  const cached = apiCache.get(cacheKey)
  if (cached) return cached

  try {
    const crawlData = await crawlPage(url)
    const result = analyzeHTML(crawlData)
    
    apiCache.set(cacheKey, result)
    return result
  } catch (error) {
    console.error('Crawl error:', error)
    return getFallbackOnPageSEO()
  }
}

async function crawlPage(url: string): Promise<CrawlData> {
  const normalizedUrl = url.startsWith('http') ? url : `https://${url}`
  
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 10000)

  try {
    const response = await fetch(normalizedUrl, {
      signal: controller.signal,
      headers: {
        'User-Agent': process.env.USER_AGENT || 'WeemeAI-SEOCrawler/1.0',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate',
        'Connection': 'keep-alive'
      }
    })

    clearTimeout(timeoutId)

    const html = await response.text()
    const headers: Record<string, string> = {}
    response.headers.forEach((value, key) => {
      headers[key] = value
    })

    return {
      html,
      url: normalizedUrl,
      statusCode: response.status,
      headers
    }
  } catch (error) {
    clearTimeout(timeoutId)
    throw error
  }
}

function analyzeHTML(crawlData: CrawlData): OnPageSEO {
  const { html } = crawlData
  
  // Parse HTML (basic regex-based parsing for demo)
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i)
  const metaDescMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i)
  const h1Matches = html.match(/<h1[^>]*>([^<]+)<\/h1>/gi)
  const robotsMatch = html.match(/<meta[^>]*name=["']robots["'][^>]*content=["']([^"']+)["']/i)
  const canonicalMatch = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/i)
  const hreflangMatches = html.match(/<link[^>]*rel=["']alternate["'][^>]*hreflang=["']([^"']+)["']/gi)
  const schemaMatches = html.match(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([^<]+)<\/script>/gi)

  // Analyze title
  const title = {
    present: !!titleMatch,
    length: titleMatch ? titleMatch[1].length : 0,
    content: titleMatch ? titleMatch[1] : undefined,
    issues: [] as string[]
  }

  if (!title.present) title.issues.push('Missing title tag')
  else if (title.length! < 30) title.issues.push('Title too short (< 30 characters)')
  else if (title.length! > 60) title.issues.push('Title too long (> 60 characters)')

  // Analyze meta description
  const metaDescription = {
    present: !!metaDescMatch,
    length: metaDescMatch ? metaDescMatch[1].length : 0,
    content: metaDescMatch ? metaDescMatch[1] : undefined,
    issues: [] as string[]
  }

  if (!metaDescription.present) metaDescription.issues.push('Missing meta description')
  else if (metaDescription.length! < 120) metaDescription.issues.push('Meta description too short (< 120 characters)')
  else if (metaDescription.length! > 160) metaDescription.issues.push('Meta description too long (> 160 characters)')

  // Analyze headings
  const h1Content = h1Matches ? h1Matches.map(h => h.replace(/<[^>]*>/g, '').trim()) : []
  const headings = {
    h1Count: h1Content.length,
    h1Content,
    structure: analyzeHeadingStructure(html),
    issues: [] as string[]
  }

  if (headings.h1Count === 0) headings.issues.push('Missing H1 tag')
  else if (headings.h1Count > 1) headings.issues.push('Multiple H1 tags found')

  // Analyze robots
  const robots = {
    present: !!robotsMatch,
    content: robotsMatch ? robotsMatch[1] : undefined,
    issues: [] as string[]
  }

  if (robots.content?.includes('noindex')) robots.issues.push('Page set to noindex')
  if (robots.content?.includes('nofollow')) robots.issues.push('Page set to nofollow')

  // Analyze canonical
  const canonical = {
    present: !!canonicalMatch,
    url: canonicalMatch ? canonicalMatch[1] : undefined,
    issues: [] as string[]
  }

  if (!canonical.present) canonical.issues.push('Missing canonical tag')

  // Analyze schema
  const schemaTypes = extractSchemaTypes(schemaMatches || [])
  const schema = {
    types: schemaTypes,
    count: schemaMatches ? schemaMatches.length : 0,
    issues: [] as string[]
  }

  if (schema.count === 0) schema.issues.push('No structured data found')

  // Analyze hreflang
  const hreflangLanguages = hreflangMatches ? 
    hreflangMatches.map(match => {
      const langMatch = match.match(/hreflang=["']([^"']+)["']/)
      return langMatch ? langMatch[1] : ''
    }).filter(Boolean) : []

  const hreflang = {
    present: hreflangLanguages.length > 0,
    languages: hreflangLanguages,
    issues: [] as string[]
  }

  if (hreflang.present && !hreflangLanguages.includes('x-default')) {
    hreflang.issues.push('Missing x-default hreflang')
  }

  // Generate quick wins
  const quickWins = generateQuickWins({
    title, metaDescription, headings, robots, canonical, schema, hreflang
  })

  return {
    title,
    metaDescription,
    headings,
    robots,
    canonical,
    schema,
    hreflang,
    quickWins
  }
}

function analyzeHeadingStructure(html: string): string[] {
  const headingMatches = html.match(/<h[1-6][^>]*>([^<]+)<\/h[1-6]>/gi) || []
  return headingMatches.map(match => {
    const levelMatch = match.match(/<h([1-6])/)
    const contentMatch = match.match(/>([^<]+)</)
    const level = levelMatch ? levelMatch[1] : '1'
    const content = contentMatch ? contentMatch[1].trim() : ''
    return `H${level}: ${content.substring(0, 50)}${content.length > 50 ? '...' : ''}`
  }).slice(0, 10)
}

function extractSchemaTypes(schemaMatches: string[]): string[] {
  const types = new Set<string>()
  
  schemaMatches.forEach(match => {
    try {
      const jsonMatch = match.match(/>([^<]+)</s)
      if (jsonMatch) {
        const json = JSON.parse(jsonMatch[1])
        if (json['@type']) {
          types.add(json['@type'])
        }
      }
    } catch (error) {
      // Ignore invalid JSON
    }
  })
  
  return Array.from(types)
}

function generateQuickWins(analysis: any): string[] {
  const wins: string[] = []
  
  if (!analysis.title.present) wins.push('Add a title tag to the page')
  else if (analysis.title.issues.length > 0) wins.push('Optimize title tag length and content')
  
  if (!analysis.metaDescription.present) wins.push('Add a meta description')
  else if (analysis.metaDescription.issues.length > 0) wins.push('Optimize meta description length')
  
  if (analysis.headings.h1Count === 0) wins.push('Add an H1 heading to the page')
  else if (analysis.headings.h1Count > 1) wins.push('Use only one H1 heading per page')
  
  if (!analysis.canonical.present) wins.push('Add a canonical URL')
  
  if (analysis.schema.count === 0) wins.push('Add structured data markup')
  
  return wins.slice(0, 5)
}

function getFallbackOnPageSEO(): OnPageSEO {
  return {
    title: {
      present: true,
      length: 45,
      content: 'Example Page Title',
      issues: ['Enable crawling for real analysis']
    },
    metaDescription: {
      present: true,
      length: 140,
      content: 'Example meta description for the page',
      issues: ['Enable crawling for real analysis']
    },
    headings: {
      h1Count: 1,
      h1Content: ['Main Heading'],
      structure: ['H1: Main Heading', 'H2: Section 1', 'H2: Section 2'],
      issues: ['Enable crawling for real analysis']
    },
    robots: {
      present: true,
      content: 'index, follow',
      issues: []
    },
    canonical: {
      present: true,
      url: 'https://example.com/',
      issues: []
    },
    schema: {
      types: ['WebSite', 'Organization'],
      count: 2,
      issues: []
    },
    hreflang: {
      present: false,
      languages: [],
      issues: ['No hreflang tags found']
    },
    quickWins: [
      'Enable API access for detailed crawling',
      'Verify robots.txt accessibility',
      'Check internal linking structure',
      'Optimize image alt attributes'
    ]
  }
}