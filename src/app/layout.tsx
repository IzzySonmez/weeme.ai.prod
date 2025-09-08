import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Weeme.ai - SEO Intelligence Reports',
  description: 'Get comprehensive SEO analysis in seconds. Generate detailed insights, competitor analysis, and actionable recommendations for any domain or keyword.',
  keywords: 'SEO analysis, SEO report, keyword research, competitor analysis, technical SEO, on-page SEO',
  authors: [{ name: 'Weeme.ai' }],
  creator: 'Weeme.ai',
  publisher: 'Weeme.ai',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://weeme.ai',
    title: 'Weeme.ai - SEO Intelligence Reports',
    description: 'Get comprehensive SEO analysis in seconds. Generate detailed insights, competitor analysis, and actionable recommendations.',
    siteName: 'Weeme.ai',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Weeme.ai - SEO Intelligence Reports',
    description: 'Get comprehensive SEO analysis in seconds. Generate detailed insights, competitor analysis, and actionable recommendations.',
    creator: '@weemeai',
  },
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#3b82f6',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}