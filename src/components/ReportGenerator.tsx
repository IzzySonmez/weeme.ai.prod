'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Search, Globe, Loader2, AlertTriangle, CheckCircle2, TrendingUp, FileText, Download } from 'lucide-react'
import { Report } from '@/types/seo'
import { isValidUrl } from '@/lib/utils'
import SEOReport from './SEOReport'

const PROGRESS_STEPS = [
  { label: 'Collecting Data', description: 'Gathering technical metrics and SERP data' },
  { label: 'Analyzing', description: 'Processing SEO factors and competitor analysis' },
  { label: 'Structuring', description: 'Generating insights and recommendations' },
  { label: 'Done', description: 'Report ready for review' }
]

export default function ReportGenerator() {
  const [inputMode, setInputMode] = useState<'domain' | 'keyword'>('domain')
  const [query, setQuery] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const [report, setReport] = useState<Report | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleDemo = () => {
    setInputMode('domain')
    setQuery('https://www.patagonia.com')
  }

  const validateInput = (): boolean => {
    if (!query.trim()) {
      setError('Please enter a domain or keyword')
      return false
    }

    if (inputMode === 'domain' && !isValidUrl(query)) {
      setError('Please enter a valid domain (e.g., example.com or https://example.com)')
      return false
    }

    return true
  }

  const generateReport = async () => {
    if (!validateInput()) return

    setIsGenerating(true)
    setError(null)
    setProgress(0)
    setCurrentStep(0)
    setReport(null)

    try {
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + Math.random() * 15
          if (newProgress >= 25 && currentStep === 0) setCurrentStep(1)
          if (newProgress >= 50 && currentStep === 1) setCurrentStep(2)
          if (newProgress >= 75 && currentStep === 2) setCurrentStep(3)
          return Math.min(newProgress, 90)
        })
      }, 500)

      const response = await fetch('/api/seo/report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: query.trim(),
          mode: inputMode
        })
      })

      clearInterval(progressInterval)

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to generate report')
      }

      const data = await response.json()
      
      if (!data.success) {
        throw new Error(data.error || 'Report generation failed')
      }

      setProgress(100)
      setCurrentStep(3)
      setReport(data.data)

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred')
      setProgress(0)
      setCurrentStep(0)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleNewReport = () => {
    setReport(null)
    setQuery('')
    setError(null)
    setProgress(0)
    setCurrentStep(0)
  }

  const handlePrint = () => {
    window.print()
  }

  if (report) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Sticky Header */}
        <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 print:hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Search className="h-6 w-6 text-blue-600" />
                  <span className="font-bold text-xl text-gray-900">Weeme.ai</span>
                </div>
                <div className="hidden sm:block text-sm text-gray-600">
                  SEO Intelligence Report
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Button
                  onClick={handlePrint}
                  variant="outline"
                  size="sm"
                  className="flex items-center space-x-2"
                >
                  <Download className="h-4 w-4" />
                  <span>Export PDF</span>
                </Button>
                <Button
                  onClick={handleNewReport}
                  size="sm"
                  className="flex items-center space-x-2"
                >
                  <FileText className="h-4 w-4" />
                  <span>New Report</span>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Report Content */}
        <SEOReport report={report} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="relative">
              <Search className="h-12 w-12 text-blue-600" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900">Weeme.ai</h1>
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            SEO Intelligence Reports
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get comprehensive SEO analysis in seconds. Enter a domain or keyword to generate 
            detailed insights, competitor analysis, and actionable recommendations.
          </p>
        </div>

        {/* Input Section */}
        <Card className="mb-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Globe className="h-5 w-5 text-blue-600" />
              <span>Generate SEO Report</span>
            </CardTitle>
            <CardDescription>
              Choose your analysis type and enter your target domain or keyword
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Mode Toggle */}
            <Tabs value={inputMode} onValueChange={(value) => setInputMode(value as 'domain' | 'keyword')}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="domain" className="flex items-center space-x-2">
                  <Globe className="h-4 w-4" />
                  <span>Domain Analysis</span>
                </TabsTrigger>
                <TabsTrigger value="keyword" className="flex items-center space-x-2">
                  <Search className="h-4 w-4" />
                  <span>Keyword Research</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="domain" className="mt-4">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Domain URL
                    </label>
                    <input
                      type="text"
                      value={query}
                      onChange={(e) => {
                        setQuery(e.target.value)
                        setError(null)
                      }}
                      placeholder="example.com or https://example.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      disabled={isGenerating}
                    />
                  </div>
                  <p className="text-sm text-gray-600">
                    Analyze technical SEO, on-page factors, and competitive landscape for any domain
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="keyword" className="mt-4">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Target Keyword
                    </label>
                    <input
                      type="text"
                      value={query}
                      onChange={(e) => {
                        setQuery(e.target.value)
                        setError(null)
                      }}
                      placeholder="sustainable clothing"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      disabled={isGenerating}
                    />
                  </div>
                  <p className="text-sm text-gray-600">
                    Research SERP landscape, competition analysis, and content opportunities for any keyword
                  </p>
                </div>
              </TabsContent>
            </Tabs>

            {/* Error Display */}
            {error && (
              <div className="flex items-center space-x-2 p-4 bg-red-50 border border-red-200 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0" />
                <span className="text-red-700">{error}</span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={generateReport}
                disabled={isGenerating}
                className="flex-1 h-12 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Generating Report...
                  </>
                ) : (
                  <>
                    <TrendingUp className="h-5 w-5 mr-2" />
                    Generate Report
                  </>
                )}
              </Button>
              
              <Button
                onClick={handleDemo}
                variant="outline"
                disabled={isGenerating}
                className="sm:w-auto h-12 font-semibold border-2 hover:bg-gray-50"
              >
                Try Patagonia Demo
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Progress Section */}
        {isGenerating && (
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {PROGRESS_STEPS[currentStep].label}
                  </h3>
                  <p className="text-gray-600">
                    {PROGRESS_STEPS[currentStep].description}
                  </p>
                </div>
                
                <Progress value={progress} className="h-3" />
                
                <div className="grid grid-cols-4 gap-4">
                  {PROGRESS_STEPS.map((step, index) => (
                    <div
                      key={index}
                      className={`text-center p-3 rounded-lg transition-colors ${
                        index <= currentStep
                          ? 'bg-blue-50 border border-blue-200'
                          : 'bg-gray-50 border border-gray-200'
                      }`}
                    >
                      <div className={`flex items-center justify-center w-8 h-8 rounded-full mx-auto mb-2 ${
                        index < currentStep
                          ? 'bg-green-500 text-white'
                          : index === currentStep
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-300 text-gray-600'
                      }`}>
                        {index < currentStep ? (
                          <CheckCircle2 className="h-4 w-4" />
                        ) : (
                          <span className="text-sm font-semibold">{index + 1}</span>
                        )}
                      </div>
                      <div className={`text-sm font-medium ${
                        index <= currentStep ? 'text-gray-900' : 'text-gray-500'
                      }`}>
                        {step.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}