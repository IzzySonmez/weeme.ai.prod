import { apiCache } from '../cache'
import { SERPData, SERPResult, FeaturedSnippet, Competitor } from '@/types/seo'

interface SerpApiResponse {
  organic_results?: Array<{
    position: number
    title: string
    link: string
    snippet: string
    displayed_link: string
  }>
  answer_box?: {
    type: string
    snippet: string
    link: string
  }
  related_questions?: Array<{
    question: string
  }>
  related_searches?: Array<{
    query: string
  }>
  search_information?: {
    query_displayed: string
  }
}

export async function getSERPData(query: string, mode: 'domain' | 'keyword'): Promise<SERPData> {
  const cacheKey = `serp:${mode}:${query}`
  const cached = apiCache.get(cacheKey)
  if (cached) return cached

  const apiKey = process.env.SERPAPI_KEY
  if (!apiKey) {
    return getFallbackSERPData(query, mode)
  }

  try {
    // For domain mode, search for "site:domain.com"
    const searchQuery = mode === 'domain' ? `site:${query.replace(/^https?:\/\//, '').replace(/^www\./, '')}` : query
    
    const apiUrl = `https://serpapi.com/search.json?engine=google&q=${encodeURIComponent(searchQuery)}&api_key=${apiKey}&num=10&hl=en&gl=us`
    
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000)

    const response = await fetch(apiUrl, {
      signal: controller.signal,
      headers: {
        'User-Agent': process.env.USER_AGENT || 'WeemeAI-SEOCrawler/1.0'
      }
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      throw new Error(`SERP API error: ${response.status}`)
    }

    const data: SerpApiResponse = await response.json()
    const result = transformSERPData(data, query, mode)
    
    apiCache.set(cacheKey, result)
    return result
  } catch (error) {
    console.error('SERP API error:', error)
    return getFallbackSERPData(query, mode)
  }
}

function transformSERPData(data: SerpApiResponse, query: string, mode: 'domain' | 'keyword'): SERPData {
  // Transform organic results
  const results: SERPResult[] = (data.organic_results || []).map(result => ({
    position: result.position,
    title: result.title,
    url: result.link,
    domain: extractDomain(result.link),
    snippet: result.snippet
  }))

  // Transform featured snippet
  let featuredSnippet: FeaturedSnippet | undefined
  if (data.answer_box) {
    featuredSnippet = {
      type: data.answer_box.type === 'list' ? 'list' : 'paragraph',
      content: data.answer_box.snippet,
      source: extractDomain(data.answer_box.link)
    }
  }

  // Extract People Also Ask
  const peopleAlsoAsk = (data.related_questions || []).map(q => q.question).slice(0, 5)

  // Extract Related Searches
  const relatedSearches = (data.related_searches || []).map(s => s.query).slice(0, 8)

  // Analyze competitors (top domains excluding the queried domain)
  const competitors = analyzeCompetitors(results, query, mode)

  return {
    keyword: mode === 'keyword' ? query : undefined,
    results,
    featuredSnippet,
    peopleAlsoAsk,
    relatedSearches,
    competitors
  }
}

function analyzeCompetitors(results: SERPResult[], query: string, mode: 'domain' | 'keyword'): Competitor[] {
  const queryDomain = mode === 'domain' ? extractDomain(query) : null
  
  // Count domain appearances
  const domainCounts = new Map<string, { count: number; positions: number[]; results: SERPResult[] }>()
  
  results.forEach(result => {
    const domain = result.domain
    if (domain === queryDomain) return // Skip the queried domain
    
    if (!domainCounts.has(domain)) {
      domainCounts.set(domain, { count: 0, positions: [], results: [] })
    }
    
    const domainData = domainCounts.get(domain)!
    domainData.count++
    domainData.positions.push(result.position)
    domainData.results.push(result)
  })

  // Get top 3 competitors by presence and ranking
  const competitors = Array.from(domainCounts.entries())
    .sort(([, a], [, b]) => {
      // Sort by count first, then by best position
      if (a.count !== b.count) return b.count - a.count
      return Math.min(...a.positions) - Math.min(...b.positions)
    })
    .slice(0, 3)
    .map(([domain, data]) => ({
      domain,
      strengths: generateCompetitorStrengths(data),
      weaknesses: generateCompetitorWeaknesses(data),
      opportunities: generateCompetitorOpportunities(data)
    }))

  return competitors
}

function generateCompetitorStrengths(data: { count: number; positions: number[]; results: SERPResult[] }): string[] {
  const strengths: string[] = []
  
  if (data.count > 1) {
    strengths.push(`Multiple SERP appearances (${data.count} results)`)
  }
  
  const bestPosition = Math.min(...data.positions)
  if (bestPosition <= 3) {
    strengths.push(`Top 3 ranking (position ${bestPosition})`)
  }
  
  // Analyze snippet quality
  const avgSnippetLength = data.results.reduce((sum, r) => sum + r.snippet.length, 0) / data.results.length
  if (avgSnippetLength > 120) {
    strengths.push('Rich, detailed snippets')
  }
  
  return strengths.slice(0, 3)
}

function generateCompetitorWeaknesses(data: { count: number; positions: number[]; results: SERPResult[] }): string[] {
  const weaknesses: string[] = []
  
  const worstPosition = Math.max(...data.positions)
  if (worstPosition > 5) {
    weaknesses.push(`Some results ranking lower (position ${worstPosition})`)
  }
  
  // Check for generic titles
  const hasGenericTitles = data.results.some(r => 
    r.title.toLowerCase().includes('home') || 
    r.title.toLowerCase().includes('welcome') ||
    r.title.length < 30
  )
  
  if (hasGenericTitles) {
    weaknesses.push('Generic or short page titles')
  }
  
  return weaknesses.slice(0, 2)
}

function generateCompetitorOpportunities(data: { count: number; positions: number[]; results: SERPResult[] }): string[] {
  const opportunities: string[] = []
  
  // Check for content gaps
  const topics = new Set<string>()
  data.results.forEach(result => {
    const words = result.title.toLowerCase().split(' ')
    words.forEach(word => {
      if (word.length > 4) topics.add(word)
    })
  })
  
  if (topics.size > 5) {
    opportunities.push('Target their diverse topic coverage')
  }
  
  opportunities.push('Create more comprehensive content')
  opportunities.push('Improve page speed and user experience')
  
  return opportunities.slice(0, 3)
}

function extractDomain(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return url.replace(/^(https?:\/\/)?(www\.)?/, '').split('/')[0]
  }
}

function getFallbackSERPData(query: string, mode: 'domain' | 'keyword'): SERPData {
  const domain = mode === 'domain' ? extractDomain(query) : 'example.com'
  
  return {
    keyword: mode === 'keyword' ? query : undefined,
    results: [
      {
        position: 1,
        title: `${domain} - Official Website`,
        url: `https://${domain}`,
        domain: domain,
        snippet: `Official website of ${domain}. Find information about our products and services.`
      },
      {
        position: 2,
        title: `About ${domain} - Company Information`,
        url: `https://${domain}/about`,
        domain: domain,
        snippet: `Learn more about ${domain}, our mission, and our team.`
      }
    ],
    peopleAlsoAsk: [
      `What is ${mode === 'domain' ? domain : query}?`,
      `How does ${mode === 'domain' ? domain : query} work?`,
      `Is ${mode === 'domain' ? domain : query} reliable?`
    ],
    relatedSearches: [
      `${query} reviews`,
      `${query} alternatives`,
      `${query} pricing`,
      `best ${query}`
    ],
    competitors: [
      {
        domain: 'competitor1.com',
        strengths: ['Strong brand presence', 'Multiple SERP features'],
        weaknesses: ['Slow page speed', 'Limited content depth'],
        opportunities: ['Target their weak keywords', 'Create better user experience']
      }
    ]
  }
}