export interface Report {
  inputMode: "domain" | "keyword"
  query: string
  fetchedAtISO: string
  domainOverview?: DomainOverview
  technicalSEO: TechnicalSEO
  onPage: OnPageSEO
  serp: SERPData
  opportunities: KeywordOpportunities
  growthPlan: GrowthPlan
  warnings?: string[]
}

export interface DomainOverview {
  domain: string
  domainRank?: number
  indexedPages?: number
  organicKeywords?: number
  internationalization: {
    hasHreflang: boolean
    languages: string[]
    regions: string[]
    ccTLD: boolean
    gTLD: string
    currencies: string[]
  }
}

export interface TechnicalSEO {
  coreWebVitals: {
    lcp: { value: number; rating: 'GOOD' | 'NEEDS_IMPROVEMENT' | 'POOR' }
    fid: { value: number; rating: 'GOOD' | 'NEEDS_IMPROVEMENT' | 'POOR' }
    cls: { value: number; rating: 'GOOD' | 'NEEDS_IMPROVEMENT' | 'POOR' }
    inp?: { value: number; rating: 'GOOD' | 'NEEDS_IMPROVEMENT' | 'POOR' }
  }
  lighthouse: {
    performance: number
    accessibility: number
    bestPractices: number
    seo: number
  }
  speedCategory: 'FAST' | 'AVERAGE' | 'SLOW'
  actionItems: string[]
}

export interface OnPageSEO {
  title: {
    present: boolean
    length?: number
    content?: string
    issues: string[]
  }
  metaDescription: {
    present: boolean
    length?: number
    content?: string
    issues: string[]
  }
  headings: {
    h1Count: number
    h1Content: string[]
    structure: string[]
    issues: string[]
  }
  robots: {
    present: boolean
    content?: string
    issues: string[]
  }
  canonical: {
    present: boolean
    url?: string
    issues: string[]
  }
  schema: {
    types: string[]
    count: number
    issues: string[]
  }
  hreflang: {
    present: boolean
    languages: string[]
    issues: string[]
  }
  quickWins: string[]
}

export interface SERPData {
  keyword?: string
  results: SERPResult[]
  featuredSnippet?: FeaturedSnippet
  peopleAlsoAsk: string[]
  relatedSearches: string[]
  competitors: Competitor[]
}

export interface SERPResult {
  position: number
  title: string
  url: string
  domain: string
  snippet: string
}

export interface FeaturedSnippet {
  type: 'paragraph' | 'list' | 'table'
  content: string
  source: string
}

export interface Competitor {
  domain: string
  strengths: string[]
  weaknesses: string[]
  opportunities: string[]
}

export interface KeywordOpportunities {
  primary: KeywordSuggestion[]
  longTail: KeywordSuggestion[]
  blogTopics: BlogTopic[]
  serpFeatures: string[]
  international: InternationalKeyword[]
}

export interface KeywordSuggestion {
  keyword: string
  volume: number
  difficulty: number
  intent: 'informational' | 'navigational' | 'commercial' | 'transactional'
  currentRank?: number
}

export interface BlogTopic {
  title: string
  outline: string[]
  targetKeywords: string[]
  estimatedTraffic: number
}

export interface InternationalKeyword {
  keyword: string
  language: string
  region: string
  volume: number
}

export interface GrowthPlan {
  thirtyDays: GrowthTask[]
  sixtyDays: GrowthTask[]
  ninetyDays: GrowthTask[]
  kpis: KPI[]
}

export interface GrowthTask {
  category: 'technical' | 'content' | 'authority'
  task: string
  priority: 'high' | 'medium' | 'low'
  effort: 'low' | 'medium' | 'high'
  impact: 'low' | 'medium' | 'high'
}

export interface KPI {
  metric: string
  current: number | string
  target: number | string
  timeframe: string
}

export interface APIResponse<T> {
  success: boolean
  data?: T
  error?: string
  cached?: boolean
  rateLimit?: {
    remaining: number
    reset: number
  }
}