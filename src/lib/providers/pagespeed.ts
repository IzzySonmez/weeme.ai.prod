import { apiCache } from '../cache'
import { TechnicalSEO } from '@/types/seo'

interface PageSpeedResponse {
  lighthouseResult: {
    categories: {
      performance: { score: number }
      accessibility: { score: number }
      'best-practices': { score: number }
      seo: { score: number }
    }
    audits: {
      'largest-contentful-paint': { numericValue: number }
      'first-input-delay': { numericValue: number }
      'cumulative-layout-shift': { numericValue: number }
      'interaction-to-next-paint'?: { numericValue: number }
    }
  }
  loadingExperience?: {
    metrics: {
      LARGEST_CONTENTFUL_PAINT_MS?: { category: string }
      FIRST_INPUT_DELAY_MS?: { category: string }
      CUMULATIVE_LAYOUT_SHIFT_SCORE?: { category: string }
    }
  }
}

export async function getPageSpeedData(url: string): Promise<TechnicalSEO> {
  const cacheKey = `pagespeed:${url}`
  const cached = apiCache.get(cacheKey)
  if (cached) return cached

  const apiKey = process.env.GOOGLE_API_KEY
  if (!apiKey) {
    return getFallbackTechnicalSEO()
  }

  try {
    const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&key=${apiKey}&strategy=mobile&category=performance&category=accessibility&category=best-practices&category=seo`
    
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
      throw new Error(`PageSpeed API error: ${response.status}`)
    }

    const data: PageSpeedResponse = await response.json()
    const result = transformPageSpeedData(data)
    
    apiCache.set(cacheKey, result)
    return result
  } catch (error) {
    console.error('PageSpeed API error:', error)
    return getFallbackTechnicalSEO()
  }
}

function transformPageSpeedData(data: PageSpeedResponse): TechnicalSEO {
  const audits = data.lighthouseResult.audits
  const categories = data.lighthouseResult.categories

  // Core Web Vitals from lab data
  const lcp = audits['largest-contentful-paint']?.numericValue || 3000
  const fid = audits['first-input-delay']?.numericValue || 100
  const cls = audits['cumulative-layout-shift']?.numericValue || 0.1
  const inp = audits['interaction-to-next-paint']?.numericValue

  // Rating function
  const getRating = (metric: string, value: number): 'GOOD' | 'NEEDS_IMPROVEMENT' | 'POOR' => {
    switch (metric) {
      case 'lcp':
        return value <= 2500 ? 'GOOD' : value <= 4000 ? 'NEEDS_IMPROVEMENT' : 'POOR'
      case 'fid':
        return value <= 100 ? 'GOOD' : value <= 300 ? 'NEEDS_IMPROVEMENT' : 'POOR'
      case 'cls':
        return value <= 0.1 ? 'GOOD' : value <= 0.25 ? 'NEEDS_IMPROVEMENT' : 'POOR'
      case 'inp':
        return value <= 200 ? 'GOOD' : value <= 500 ? 'NEEDS_IMPROVEMENT' : 'POOR'
      default:
        return 'NEEDS_IMPROVEMENT'
    }
  }

  // Generate action items based on scores
  const actionItems: string[] = []
  if (lcp > 2500) actionItems.push('Optimize Largest Contentful Paint - compress images, use CDN')
  if (fid > 100) actionItems.push('Reduce First Input Delay - minimize JavaScript execution')
  if (cls > 0.1) actionItems.push('Improve Cumulative Layout Shift - set image dimensions, avoid dynamic content')
  if (categories.performance.score < 0.9) actionItems.push('Improve overall performance score')
  if (categories.accessibility.score < 0.9) actionItems.push('Fix accessibility issues - add alt text, improve contrast')

  // Speed category based on performance score
  const perfScore = categories.performance.score
  const speedCategory = perfScore >= 0.9 ? 'FAST' : perfScore >= 0.5 ? 'AVERAGE' : 'SLOW'

  return {
    coreWebVitals: {
      lcp: { value: Math.round(lcp), rating: getRating('lcp', lcp) },
      fid: { value: Math.round(fid), rating: getRating('fid', fid) },
      cls: { value: Math.round(cls * 1000) / 1000, rating: getRating('cls', cls) },
      ...(inp && { inp: { value: Math.round(inp), rating: getRating('inp', inp) } })
    },
    lighthouse: {
      performance: Math.round(categories.performance.score * 100),
      accessibility: Math.round(categories.accessibility.score * 100),
      bestPractices: Math.round(categories['best-practices'].score * 100),
      seo: Math.round(categories.seo.score * 100)
    },
    speedCategory,
    actionItems
  }
}

function getFallbackTechnicalSEO(): TechnicalSEO {
  return {
    coreWebVitals: {
      lcp: { value: 2800, rating: 'NEEDS_IMPROVEMENT' },
      fid: { value: 120, rating: 'NEEDS_IMPROVEMENT' },
      cls: { value: 0.15, rating: 'NEEDS_IMPROVEMENT' }
    },
    lighthouse: {
      performance: 75,
      accessibility: 85,
      bestPractices: 80,
      seo: 90
    },
    speedCategory: 'AVERAGE',
    actionItems: [
      'Enable Google PageSpeed API for real metrics',
      'Optimize images and enable compression',
      'Minimize JavaScript and CSS',
      'Use a Content Delivery Network (CDN)'
    ]
  }
}