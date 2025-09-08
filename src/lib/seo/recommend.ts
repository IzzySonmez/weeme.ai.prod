import { Report } from '@/types/seo'

export function generateInsights(report: Report): string[] {
  const insights: string[] = []

  // Technical SEO insights
  if (report.technicalSEO.lighthouse.performance < 70) {
    insights.push('🚨 Critical: Page speed is significantly impacting user experience and SEO rankings')
  } else if (report.technicalSEO.lighthouse.performance < 90) {
    insights.push('⚠️ Opportunity: Improving page speed could boost rankings and conversions')
  }

  // Core Web Vitals insights
  const cwv = report.technicalSEO.coreWebVitals
  if (cwv.lcp.rating === 'POOR' || cwv.fid.rating === 'POOR' || cwv.cls.rating === 'POOR') {
    insights.push('🔧 Core Web Vitals need immediate attention - Google uses these as ranking factors')
  }

  // On-page insights
  if (!report.onPage.title.present) {
    insights.push('📝 Missing title tags are a critical SEO issue - add them immediately')
  }

  if (!report.onPage.metaDescription.present) {
    insights.push('📄 Missing meta descriptions reduce click-through rates from search results')
  }

  if (report.onPage.headings.h1Count === 0) {
    insights.push('🏷️ Missing H1 tags make it harder for search engines to understand page content')
  } else if (report.onPage.headings.h1Count > 1) {
    insights.push('🏷️ Multiple H1 tags can confuse search engines - use only one per page')
  }

  // Schema insights
  if (report.onPage.schema.count === 0) {
    insights.push('🔍 Adding structured data could help you appear in rich search results')
  }

  // SERP insights
  if (report.serp.featuredSnippet) {
    insights.push('⭐ Featured snippet opportunity detected - optimize content to capture this')
  }

  if (report.serp.peopleAlsoAsk.length > 0) {
    insights.push('❓ People Also Ask questions present - create content addressing these queries')
  }

  // Competitor insights
  if (report.serp.competitors.length > 0) {
    const topCompetitor = report.serp.competitors[0]
    insights.push(`🏆 Main competitor "${topCompetitor.domain}" has strong SERP presence - analyze their strategy`)
  }

  // International insights
  if (report.domainOverview?.internationalization.hasHreflang) {
    insights.push('🌍 International SEO setup detected - ensure hreflang implementation is correct')
  } else if (report.domainOverview?.internationalization.languages.length === 1) {
    insights.push('🌍 Consider international expansion - multiple markets could increase traffic')
  }

  // Keyword opportunity insights
  const highVolumeKeywords = report.opportunities.primary.filter(k => k.volume > 1000)
  if (highVolumeKeywords.length > 0) {
    insights.push(`🎯 ${highVolumeKeywords.length} high-volume keyword opportunities identified - prioritize these`)
  }

  // Content insights
  if (report.opportunities.blogTopics.length > 0) {
    const totalEstimatedTraffic = report.opportunities.blogTopics.reduce((sum, topic) => sum + topic.estimatedTraffic, 0)
    insights.push(`📚 Content opportunities could drive ${totalEstimatedTraffic.toLocaleString()} additional monthly visits`)
  }

  return insights.slice(0, 8) // Return top 8 insights
}

export function prioritizeRecommendations(report: Report): Array<{
  category: string
  recommendation: string
  impact: 'high' | 'medium' | 'low'
  effort: 'low' | 'medium' | 'high'
  priority: number
}> {
  const recommendations = []

  // Technical recommendations
  if (report.technicalSEO.lighthouse.performance < 70) {
    recommendations.push({
      category: 'Technical',
      recommendation: 'Optimize page speed - compress images, minify CSS/JS, enable caching',
      impact: 'high' as const,
      effort: 'medium' as const,
      priority: 1
    })
  }

  if (report.technicalSEO.coreWebVitals.lcp.rating === 'POOR') {
    recommendations.push({
      category: 'Technical',
      recommendation: 'Fix Largest Contentful Paint - optimize hero images and critical resources',
      impact: 'high' as const,
      effort: 'medium' as const,
      priority: 2
    })
  }

  // On-page recommendations
  if (!report.onPage.title.present) {
    recommendations.push({
      category: 'On-Page',
      recommendation: 'Add title tags to all pages with target keywords',
      impact: 'high' as const,
      effort: 'low' as const,
      priority: 1
    })
  }

  if (!report.onPage.metaDescription.present) {
    recommendations.push({
      category: 'On-Page',
      recommendation: 'Write compelling meta descriptions to improve click-through rates',
      impact: 'medium' as const,
      effort: 'low' as const,
      priority: 3
    })
  }

  if (report.onPage.schema.count === 0) {
    recommendations.push({
      category: 'Technical',
      recommendation: 'Implement structured data markup for better search visibility',
      impact: 'medium' as const,
      effort: 'medium' as const,
      priority: 4
    })
  }

  // Content recommendations
  const highImpactKeywords = report.opportunities.primary.filter(k => k.volume > 1000 && k.difficulty < 40)
  if (highImpactKeywords.length > 0) {
    recommendations.push({
      category: 'Content',
      recommendation: `Target high-volume, low-competition keywords: ${highImpactKeywords.slice(0, 3).map(k => k.keyword).join(', ')}`,
      impact: 'high' as const,
      effort: 'high' as const,
      priority: 2
    })
  }

  if (report.serp.featuredSnippet) {
    recommendations.push({
      category: 'Content',
      recommendation: 'Optimize content to capture the featured snippet position',
      impact: 'high' as const,
      effort: 'medium' as const,
      priority: 3
    })
  }

  // Sort by priority
  return recommendations.sort((a, b) => a.priority - b.priority)
}