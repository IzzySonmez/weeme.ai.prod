'use client'

import { Report } from '@/types/seo'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Separator } from '@/components/ui/separator'
import { 
  Globe, 
  Zap, 
  FileText, 
  Search, 
  Target, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  Clock,
  ExternalLink,
  BarChart3,
  Users,
  Award,
  Lightbulb,
  Calendar,
  ArrowRight,
  Info
} from 'lucide-react'
import { formatNumber } from '@/lib/utils'

interface SEOReportProps {
  report: Report
}

export default function SEOReport({ report }: SEOReportProps) {
  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getCWVRating = (rating: string) => {
    switch (rating) {
      case 'GOOD':
        return { color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200', label: 'Good' }
      case 'NEEDS_IMPROVEMENT':
        return { color: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-200', label: 'Needs Improvement' }
      case 'POOR':
        return { color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200', label: 'Poor' }
      default:
        return { color: 'text-gray-600', bg: 'bg-gray-50', border: 'border-gray-200', label: 'Unknown' }
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600'
    if (score >= 70) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Report Header */}
      <div className="mb-8 print:mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              SEO Intelligence Report
            </h1>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span className="flex items-center space-x-1">
                <Globe className="h-4 w-4" />
                <span>{report.inputMode === 'domain' ? 'Domain Analysis' : 'Keyword Research'}</span>
              </span>
              <span className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{formatDate(report.fetchedAtISO)}</span>
              </span>
            </div>
          </div>
          <div className="mt-4 lg:mt-0">
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">{report.query}</div>
              <div className="text-sm text-gray-600 capitalize">{report.inputMode} Report</div>
            </div>
          </div>
        </div>

        {/* Warnings */}
        {report.warnings && report.warnings.length > 0 && (
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg print:break-inside-avoid">
            <div className="flex items-start space-x-2">
              <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-yellow-800 mb-2">Configuration Notes</h3>
                <ul className="space-y-1">
                  {report.warnings.map((warning, index) => (
                    <li key={index} className="text-sm text-yellow-700">• {warning}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Report Sections */}
      <Accordion type="multiple" defaultValue={["domain", "technical", "onpage", "serp", "opportunities", "growth"]} className="space-y-4">
        
        {/* Domain Overview */}
        {report.domainOverview && (
          <AccordionItem value="domain" className="border border-gray-200 rounded-lg print:break-inside-avoid">
            <AccordionTrigger className="px-6 py-4 hover:no-underline">
              <div className="flex items-center space-x-3">
                <Globe className="h-6 w-6 text-blue-600" />
                <div className="text-left">
                  <h2 className="text-xl font-semibold">Domain Overview</h2>
                  <p className="text-sm text-gray-600">Authority metrics and international presence</p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Domain Rank</p>
                        <p className="text-2xl font-bold text-gray-900">{report.domainOverview.domainRank}</p>
                      </div>
                      <Award className="h-8 w-8 text-blue-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Indexed Pages</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {formatNumber(report.domainOverview.indexedPages || 0)}
                        </p>
                      </div>
                      <FileText className="h-8 w-8 text-green-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Organic Keywords</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {formatNumber(report.domainOverview.organicKeywords || 0)}
                        </p>
                      </div>
                      <Search className="h-8 w-8 text-purple-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Markets</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {report.domainOverview.internationalization.regions.length}
                        </p>
                      </div>
                      <Globe className="h-8 w-8 text-orange-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* International Details */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-4">International Presence</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Languages</h4>
                    <div className="flex flex-wrap gap-2">
                      {report.domainOverview.internationalization.languages.map((lang, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                          {lang.toUpperCase()}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Regions</h4>
                    <div className="flex flex-wrap gap-2">
                      {report.domainOverview.internationalization.regions.map((region, index) => (
                        <span key={index} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                          {region}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Currencies</h4>
                    <div className="flex flex-wrap gap-2">
                      {report.domainOverview.internationalization.currencies.map((currency, index) => (
                        <span key={index} className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">
                          {currency}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        )}

        {/* Technical SEO */}
        <AccordionItem value="technical" className="border border-gray-200 rounded-lg print:break-inside-avoid">
          <AccordionTrigger className="px-6 py-4 hover:no-underline">
            <div className="flex items-center space-x-3">
              <Zap className="h-6 w-6 text-yellow-600" />
              <div className="text-left">
                <h2 className="text-xl font-semibold">Technical SEO</h2>
                <p className="text-sm text-gray-600">Core Web Vitals and performance metrics</p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6">
            {/* Core Web Vitals */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Core Web Vitals</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <h4 className="font-medium text-gray-900 mb-2">Largest Contentful Paint</h4>
                      <div className="text-3xl font-bold mb-2">{report.technicalSEO.coreWebVitals.lcp.value}ms</div>
                      <div className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${getCWVRating(report.technicalSEO.coreWebVitals.lcp.rating).bg} ${getCWVRating(report.technicalSEO.coreWebVitals.lcp.rating).color} ${getCWVRating(report.technicalSEO.coreWebVitals.lcp.rating).border} border`}>
                        {getCWVRating(report.technicalSEO.coreWebVitals.lcp.rating).label}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <h4 className="font-medium text-gray-900 mb-2">First Input Delay</h4>
                      <div className="text-3xl font-bold mb-2">{report.technicalSEO.coreWebVitals.fid.value}ms</div>
                      <div className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${getCWVRating(report.technicalSEO.coreWebVitals.fid.rating).bg} ${getCWVRating(report.technicalSEO.coreWebVitals.fid.rating).color} ${getCWVRating(report.technicalSEO.coreWebVitals.fid.rating).border} border`}>
                        {getCWVRating(report.technicalSEO.coreWebVitals.fid.rating).label}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <h4 className="font-medium text-gray-900 mb-2">Cumulative Layout Shift</h4>
                      <div className="text-3xl font-bold mb-2">{report.technicalSEO.coreWebVitals.cls.value}</div>
                      <div className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${getCWVRating(report.technicalSEO.coreWebVitals.cls.rating).bg} ${getCWVRating(report.technicalSEO.coreWebVitals.cls.rating).color} ${getCWVRating(report.technicalSEO.coreWebVitals.cls.rating).border} border`}>
                        {getCWVRating(report.technicalSEO.coreWebVitals.cls.rating).label}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Lighthouse Scores */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Lighthouse Scores</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Performance', score: report.technicalSEO.lighthouse.performance, icon: Zap },
                  { label: 'Accessibility', score: report.technicalSEO.lighthouse.accessibility, icon: Users },
                  { label: 'Best Practices', score: report.technicalSEO.lighthouse.bestPractices, icon: CheckCircle2 },
                  { label: 'SEO', score: report.technicalSEO.lighthouse.seo, icon: Search }
                ].map((item, index) => (
                  <Card key={index}>
                    <CardContent className="p-4 text-center">
                      <item.icon className="h-6 w-6 mx-auto mb-2 text-gray-600" />
                      <div className={`text-2xl font-bold mb-1 ${getScoreColor(item.score)}`}>
                        {item.score}
                      </div>
                      <div className="text-sm text-gray-600">{item.label}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Action Items */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Priority Action Items</h3>
              <div className="space-y-3">
                {report.technicalSEO.actionItems.map((item, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <ArrowRight className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-blue-800">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* On-Page SEO */}
        {report.onPage && (
          <AccordionItem value="onpage" className="border border-gray-200 rounded-lg print:break-inside-avoid">
            <AccordionTrigger className="px-6 py-4 hover:no-underline">
              <div className="flex items-center space-x-3">
                <FileText className="h-6 w-6 text-green-600" />
                <div className="text-left">
                  <h2 className="text-xl font-semibold">On-Page SEO</h2>
                  <p className="text-sm text-gray-600">Content optimization and technical elements</p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Quick Wins */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                    <Lightbulb className="h-5 w-5 text-yellow-600" />
                    <span>Quick Wins</span>
                  </h3>
                  <div className="space-y-2">
                    {report.onPage.quickWins.map((win, index) => (
                      <div key={index} className="flex items-start space-x-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                        <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-green-800 text-sm">{win}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Issues */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                    <span>Issues Found</span>
                  </h3>
                  <div className="space-y-3">
                    {[
                      { label: 'Title', issues: report.onPage.title.issues },
                      { label: 'Meta Description', issues: report.onPage.metaDescription.issues },
                      { label: 'Headings', issues: report.onPage.headings.issues },
                      { label: 'Schema', issues: report.onPage.schema.issues }
                    ].map((section, index) => (
                      section.issues.length > 0 && (
                        <div key={index} className="p-3 bg-red-50 border border-red-200 rounded-lg">
                          <h4 className="font-medium text-red-900 mb-2">{section.label}</h4>
                          <ul className="space-y-1">
                            {section.issues.map((issue, issueIndex) => (
                              <li key={issueIndex} className="text-sm text-red-700 flex items-start space-x-2">
                                <span className="text-red-500 mt-1">•</span>
                                <span>{issue}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )
                    ))}
                  </div>
                </div>
              </div>

              {/* Detailed Analysis */}
              <Separator className="my-6" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Content Elements</h4>
                  <div className="space-y-3">
                    <div className="p-3 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Title Tag</span>
                        {report.onPage.title.present ? (
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                        ) : (
                          <AlertTriangle className="h-4 w-4 text-red-600" />
                        )}
                      </div>
                      {report.onPage.title.content && (
                        <p className="text-sm text-gray-600 mb-1">"{report.onPage.title.content}"</p>
                      )}
                      {report.onPage.title.length && (
                        <p className="text-xs text-gray-500">{report.onPage.title.length} characters</p>
                      )}
                    </div>

                    <div className="p-3 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Meta Description</span>
                        {report.onPage.metaDescription.present ? (
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                        ) : (
                          <AlertTriangle className="h-4 w-4 text-red-600" />
                        )}
                      </div>
                      {report.onPage.metaDescription.content && (
                        <p className="text-sm text-gray-600 mb-1">"{report.onPage.metaDescription.content}"</p>
                      )}
                      {report.onPage.metaDescription.length && (
                        <p className="text-xs text-gray-500">{report.onPage.metaDescription.length} characters</p>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Technical Elements</h4>
                  <div className="space-y-3">
                    <div className="p-3 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Structured Data</span>
                        <span className="text-sm text-gray-600">{report.onPage.schema.count} found</span>
                      </div>
                      {report.onPage.schema.types.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {report.onPage.schema.types.map((type, index) => (
                            <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                              {type}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="p-3 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Hreflang</span>
                        {report.onPage.hreflang.present ? (
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                        ) : (
                          <AlertTriangle className="h-4 w-4 text-gray-400" />
                        )}
                      </div>
                      {report.onPage.hreflang.languages.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {report.onPage.hreflang.languages.map((lang, index) => (
                            <span key={index} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                              {lang}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        )}

        {/* SERP & Competitors */}
        <AccordionItem value="serp" className="border border-gray-200 rounded-lg print:break-inside-avoid">
          <AccordionTrigger className="px-6 py-4 hover:no-underline">
            <div className="flex items-center space-x-3">
              <Search className="h-6 w-6 text-purple-600" />
              <div className="text-left">
                <h2 className="text-xl font-semibold">SERP Analysis</h2>
                <p className="text-sm text-gray-600">Search results and competitive landscape</p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6">
            {/* Featured Snippet */}
            {report.serp.featuredSnippet && (
              <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h3 className="font-semibold text-yellow-900 mb-2 flex items-center space-x-2">
                  <Award className="h-5 w-5" />
                  <span>Featured Snippet Opportunity</span>
                </h3>
                <p className="text-yellow-800 text-sm mb-2">{report.serp.featuredSnippet.content}</p>
                <p className="text-yellow-700 text-xs">Source: {report.serp.featuredSnippet.source}</p>
              </div>
            )}

            {/* Top Results */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4">Top 10 Results</h3>
              <div className="space-y-3">
                {report.serp.results.slice(0, 10).map((result, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-sm font-semibold">
                        {result.position}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-medium text-blue-600 hover:text-blue-800 truncate">
                            {result.title}
                          </h4>
                          <ExternalLink className="h-3 w-3 text-gray-400 flex-shrink-0" />
                        </div>
                        <p className="text-sm text-green-600 mb-1">{result.domain}</p>
                        <p className="text-sm text-gray-600 line-clamp-2">{result.snippet}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* People Also Ask & Related Searches */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {report.serp.peopleAlsoAsk.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">People Also Ask</h3>
                  <div className="space-y-2">
                    {report.serp.peopleAlsoAsk.map((question, index) => (
                      <div key={index} className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-blue-800 text-sm">{question}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {report.serp.relatedSearches.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Related Searches</h3>
                  <div className="space-y-2">
                    {report.serp.relatedSearches.map((search, index) => (
                      <div key={index} className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                        <p className="text-gray-800 text-sm">{search}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Competitors */}
            {report.serp.competitors.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-4">Top Competitors</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {report.serp.competitors.map((competitor, index) => (
                    <Card key={index}>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg">{competitor.domain}</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="space-y-3">
                          <div>
                            <h5 className="font-medium text-green-700 text-sm mb-1">Strengths</h5>
                            <ul className="space-y-1">
                              {competitor.strengths.map((strength, sIndex) => (
                                <li key={sIndex} className="text-xs text-green-600 flex items-start space-x-1">
                                  <span className="text-green-500 mt-0.5">•</span>
                                  <span>{strength}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h5 className="font-medium text-red-700 text-sm mb-1">Opportunities</h5>
                            <ul className="space-y-1">
                              {competitor.opportunities.map((opp, oIndex) => (
                                <li key={oIndex} className="text-xs text-red-600 flex items-start space-x-1">
                                  <span className="text-red-500 mt-0.5">•</span>
                                  <span>{opp}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </AccordionContent>
        </AccordionItem>

        {/* Keyword Opportunities */}
        <AccordionItem value="opportunities" className="border border-gray-200 rounded-lg print:break-inside-avoid">
          <AccordionTrigger className="px-6 py-4 hover:no-underline">
            <div className="flex items-center space-x-3">
              <Target className="h-6 w-6 text-orange-600" />
              <div className="text-left">
                <h2 className="text-xl font-semibold">Keyword Opportunities</h2>
                <p className="text-sm text-gray-600">High-impact keywords and content ideas</p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6">
            {/* Primary Keywords */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Primary Keywords</h3>
              <div className="overflow-x-auto">
                <table className="w-full border border-gray-200 rounded-lg">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Keyword</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Volume</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Difficulty</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Intent</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Current Rank</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {report.opportunities.primary.map((keyword, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">{keyword.keyword}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{formatNumber(keyword.volume)}</td>
                        <td className="px-4 py-3 text-sm">
                          <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                            keyword.difficulty < 30 ? 'bg-green-100 text-green-800' :
                            keyword.difficulty < 60 ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {keyword.difficulty}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600 capitalize">{keyword.intent}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {keyword.currentRank ? `#${keyword.currentRank}` : '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Blog Topics */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Content Opportunities</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {report.opportunities.blogTopics.map((topic, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-lg">{topic.title}</CardTitle>
                      <CardDescription>
                        Est. {formatNumber(topic.estimatedTraffic)} monthly visits
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div>
                          <h5 className="font-medium text-sm mb-2">Content Outline</h5>
                          <ul className="space-y-1">
                            {topic.outline.map((point, pIndex) => (
                              <li key={pIndex} className="text-sm text-gray-600 flex items-start space-x-2">
                                <span className="text-gray-400 mt-1">•</span>
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-medium text-sm mb-2">Target Keywords</h5>
                          <div className="flex flex-wrap gap-1">
                            {topic.targetKeywords.map((kw, kIndex) => (
                              <span key={kIndex} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                                {kw}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* SERP Features */}
            <div>
              <h3 className="text-lg font-semibold mb-4">SERP Features to Target</h3>
              <div className="flex flex-wrap gap-3">
                {report.opportunities.serpFeatures.map((feature, index) => (
                  <div key={index} className="px-4 py-2 bg-purple-100 text-purple-800 rounded-lg text-sm font-medium">
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Growth Plan */}
        <AccordionItem value="growth" className="border border-gray-200 rounded-lg print:break-inside-avoid">
          <AccordionTrigger className="px-6 py-4 hover:no-underline">
            <div className="flex items-center space-x-3">
              <TrendingUp className="h-6 w-6 text-green-600" />
              <div className="text-left">
                <h2 className="text-xl font-semibold">Growth Plan</h2>
                <p className="text-sm text-gray-600">30-60-90 day roadmap and KPIs</p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6">
            {/* Roadmap */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-6">Implementation Roadmap</h3>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {[
                  { period: '30 Days', tasks: report.growthPlan.thirtyDays, color: 'green' },
                  { period: '60 Days', tasks: report.growthPlan.sixtyDays, color: 'blue' },
                  { period: '90 Days', tasks: report.growthPlan.ninetyDays, color: 'purple' }
                ].map((phase, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Calendar className={`h-5 w-5 text-${phase.color}-600`} />
                        <span>{phase.period}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {phase.tasks.map((task, taskIndex) => (
                          <div key={taskIndex} className={`p-3 border rounded-lg ${
                            task.priority === 'high' ? 'border-red-200 bg-red-50' :
                            task.priority === 'medium' ? 'border-yellow-200 bg-yellow-50' :
                            'border-gray-200 bg-gray-50'
                          }`}>
                            <div className="flex items-start justify-between mb-2">
                              <span className={`text-xs font-medium px-2 py-1 rounded ${
                                task.category === 'technical' ? 'bg-blue-100 text-blue-800' :
                                task.category === 'content' ? 'bg-green-100 text-green-800' :
                                'bg-purple-100 text-purple-800'
                              }`}>
                                {task.category}
                              </span>
                              <span className={`text-xs font-medium px-2 py-1 rounded ${
                                task.priority === 'high' ? 'bg-red-100 text-red-800' :
                                task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {task.priority}
                              </span>
                            </div>
                            <p className="text-sm text-gray-800">{task.task}</p>
                            <div className="flex items-center space-x-4 mt-2 text-xs text-gray-600">
                              <span>Effort: {task.effort}</span>
                              <span>Impact: {task.impact}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* KPIs */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Key Performance Indicators</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {report.growthPlan.kpis.map((kpi, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{kpi.metric}</h4>
                        <BarChart3 className="h-4 w-4 text-gray-400" />
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-center">
                          <div className="text-sm text-gray-600">Current</div>
                          <div className="text-lg font-semibold text-gray-900">{kpi.current}</div>
                        </div>
                        <ArrowRight className="h-4 w-4 text-gray-400" />
                        <div className="text-center">
                          <div className="text-sm text-gray-600">Target</div>
                          <div className="text-lg font-semibold text-green-600">{kpi.target}</div>
                        </div>
                      </div>
                      <div className="mt-2 text-xs text-gray-500">{kpi.timeframe}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Report Footer */}
      <div className="mt-12 pt-8 border-t border-gray-200 text-center text-sm text-gray-600 print:mt-8">
        <div className="flex items-center justify-center space-x-4 mb-4">
          <Search className="h-4 w-4" />
          <span className="font-semibold">Weeme.ai SEO Intelligence</span>
        </div>
        <p>Generated on {formatDate(report.fetchedAtISO)}</p>
        <p className="mt-2">
          This report provides actionable insights to improve your SEO performance. 
          For questions or support, visit our documentation.
        </p>
      </div>
    </div>
  )
}