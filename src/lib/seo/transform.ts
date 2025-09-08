import { Report, KeywordOpportunities, GrowthPlan } from '@/types/seo'

export function generateKeywordOpportunities(
  query: string, 
  mode: 'domain' | 'keyword',
  serpData: any,
  onPageData: any
): KeywordOpportunities {
  const baseKeyword = mode === 'keyword' ? query : extractBrandFromDomain(query)
  
  // Generate primary keyword suggestions
  const primary = [
    {
      keyword: `${baseKeyword} reviews`,
      volume: Math.floor(Math.random() * 5000) + 1000,
      difficulty: Math.floor(Math.random() * 30) + 20,
      intent: 'commercial' as const,
      currentRank: Math.floor(Math.random() * 50) + 10
    },
    {
      keyword: `best ${baseKeyword}`,
      volume: Math.floor(Math.random() * 3000) + 500,
      difficulty: Math.floor(Math.random() * 40) + 30,
      intent: 'commercial' as const
    },
    {
      keyword: `${baseKeyword} alternatives`,
      volume: Math.floor(Math.random() * 2000) + 300,
      difficulty: Math.floor(Math.random() * 35) + 25,
      intent: 'commercial' as const
    },
    {
      keyword: `how to use ${baseKeyword}`,
      volume: Math.floor(Math.random() * 1500) + 200,
      difficulty: Math.floor(Math.random() * 25) + 15,
      intent: 'informational' as const
    },
    {
      keyword: `${baseKeyword} pricing`,
      volume: Math.floor(Math.random() * 1000) + 100,
      difficulty: Math.floor(Math.random() * 30) + 20,
      intent: 'commercial' as const
    }
  ]

  // Generate long-tail keywords
  const longTail = [
    {
      keyword: `${baseKeyword} vs competitors comparison`,
      volume: Math.floor(Math.random() * 500) + 50,
      difficulty: Math.floor(Math.random() * 20) + 10,
      intent: 'commercial' as const
    },
    {
      keyword: `${baseKeyword} tutorial for beginners`,
      volume: Math.floor(Math.random() * 800) + 100,
      difficulty: Math.floor(Math.random() * 25) + 15,
      intent: 'informational' as const
    },
    {
      keyword: `${baseKeyword} features and benefits`,
      volume: Math.floor(Math.random() * 400) + 30,
      difficulty: Math.floor(Math.random() * 20) + 10,
      intent: 'informational' as const
    }
  ]

  // Generate blog topics
  const blogTopics = [
    {
      title: `The Complete Guide to ${baseKeyword} in 2024`,
      outline: [
        'Introduction and overview',
        'Key features and benefits',
        'How to get started',
        'Best practices and tips',
        'Common mistakes to avoid',
        'Future trends and predictions'
      ],
      targetKeywords: [`${baseKeyword} guide`, `${baseKeyword} 2024`, `${baseKeyword} tips`],
      estimatedTraffic: Math.floor(Math.random() * 2000) + 500
    },
    {
      title: `${baseKeyword} vs Top Alternatives: Which is Best?`,
      outline: [
        'Overview of options',
        'Feature comparison',
        'Pricing analysis',
        'Pros and cons',
        'Recommendations by use case'
      ],
      targetKeywords: [`${baseKeyword} alternatives`, `${baseKeyword} comparison`, `best ${baseKeyword}`],
      estimatedTraffic: Math.floor(Math.random() * 1500) + 300
    },
    {
      title: `10 ${baseKeyword} Tips Every User Should Know`,
      outline: [
        'Essential basics',
        'Advanced techniques',
        'Time-saving shortcuts',
        'Troubleshooting guide',
        'Expert recommendations'
      ],
      targetKeywords: [`${baseKeyword} tips`, `${baseKeyword} tricks`, `${baseKeyword} hacks`],
      estimatedTraffic: Math.floor(Math.random() * 1000) + 200
    }
  ]

  // SERP features to target
  const serpFeatures = [
    'Featured Snippets',
    'People Also Ask',
    'Related Searches',
    'Image Pack',
    'Video Results'
  ]

  // International keywords (if applicable)
  const international = [
    {
      keyword: `${baseKeyword} UK`,
      language: 'en',
      region: 'GB',
      volume: Math.floor(Math.random() * 1000) + 100
    },
    {
      keyword: `${baseKeyword} Canada`,
      language: 'en',
      region: 'CA',
      volume: Math.floor(Math.random() * 800) + 80
    }
  ]

  return {
    primary,
    longTail,
    blogTopics,
    serpFeatures,
    international
  }
}

export function generateGrowthPlan(
  report: Partial<Report>,
  domain: string
): GrowthPlan {
  const thirtyDays = [
    {
      category: 'technical' as const,
      task: 'Fix Core Web Vitals issues identified in technical audit',
      priority: 'high' as const,
      effort: 'medium' as const,
      impact: 'high' as const
    },
    {
      category: 'content' as const,
      task: 'Optimize existing page titles and meta descriptions',
      priority: 'high' as const,
      effort: 'low' as const,
      impact: 'medium' as const
    },
    {
      category: 'technical' as const,
      task: 'Implement structured data markup on key pages',
      priority: 'medium' as const,
      effort: 'medium' as const,
      impact: 'medium' as const
    },
    {
      category: 'content' as const,
      task: 'Create content targeting top 3 keyword opportunities',
      priority: 'high' as const,
      effort: 'high' as const,
      impact: 'high' as const
    }
  ]

  const sixtyDays = [
    {
      category: 'content' as const,
      task: 'Develop comprehensive content hub around main topics',
      priority: 'high' as const,
      effort: 'high' as const,
      impact: 'high' as const
    },
    {
      category: 'authority' as const,
      task: 'Launch link building campaign targeting industry publications',
      priority: 'medium' as const,
      effort: 'high' as const,
      impact: 'high' as const
    },
    {
      category: 'technical' as const,
      task: 'Implement international SEO structure (hreflang, etc.)',
      priority: 'medium' as const,
      effort: 'medium' as const,
      impact: 'medium' as const
    },
    {
      category: 'content' as const,
      task: 'Optimize for featured snippets and People Also Ask',
      priority: 'medium' as const,
      effort: 'medium' as const,
      impact: 'medium' as const
    }
  ]

  const ninetyDays = [
    {
      category: 'authority' as const,
      task: 'Establish thought leadership through guest posting',
      priority: 'medium' as const,
      effort: 'high' as const,
      impact: 'high' as const
    },
    {
      category: 'content' as const,
      task: 'Launch content marketing campaign with regular publishing',
      priority: 'high' as const,
      effort: 'high' as const,
      impact: 'high' as const
    },
    {
      category: 'technical' as const,
      task: 'Implement advanced technical optimizations',
      priority: 'low' as const,
      effort: 'medium' as const,
      impact: 'medium' as const
    }
  ]

  const kpis = [
    {
      metric: 'Core Web Vitals Pass Rate',
      current: '60%',
      target: '90%',
      timeframe: '30 days'
    },
    {
      metric: 'Indexed Pages',
      current: report.domainOverview?.indexedPages?.toString() || '100',
      target: ((report.domainOverview?.indexedPages || 100) * 1.5).toString(),
      timeframe: '60 days'
    },
    {
      metric: 'Keywords in Top 10',
      current: '15',
      target: '45',
      timeframe: '90 days'
    },
    {
      metric: 'Domain Authority',
      current: report.domainOverview?.domainRank?.toString() || '25',
      target: ((report.domainOverview?.domainRank || 25) + 10).toString(),
      timeframe: '90 days'
    }
  ]

  return {
    thirtyDays,
    sixtyDays,
    ninetyDays,
    kpis
  }
}

function extractBrandFromDomain(domain: string): string {
  const cleanDomain = domain.replace(/^(https?:\/\/)?(www\.)?/, '').split('.')[0]
  return cleanDomain.charAt(0).toUpperCase() + cleanDomain.slice(1)
}