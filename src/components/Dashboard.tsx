import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { config } from '../lib/config';
import {
  Search,
  Loader,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  ExternalLink,
  Sparkles,
  CreditCard,
  Zap
} from 'lucide-react';

interface SEOResult {
  id: string;
  url: string;
  score: number;
  strengths: string[];
  issues: string[];
  recommendations: string[];
  createdAt: string;
}

const Dashboard: React.FC = () => {
  const { i18n } = useTranslation();
  const location = useLocation();
  
  const [url, setUrl] = useState('');
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<SEOResult | null>(null);
  const [scanCount, setScanCount] = useState(0);
  const [showCreditModal, setShowCreditModal] = useState(false);

  // URL'den gelen parametreyi kontrol et
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const urlParam = params.get('url');
    if (urlParam) {
      setUrl(urlParam);
      // Otomatik tarama başlat
      setTimeout(() => scanSite(urlParam), 500);
    }
    
    // Scan count'u localStorage'dan yükle
    const saved = localStorage.getItem('scanCount');
    if (saved) setScanCount(parseInt(saved));
  }, [location]);

  const scanSite = async (targetUrl?: string) => {
    const scanUrl = targetUrl || url.trim();
    
    if (!scanUrl) {
      alert(i18n.language === 'en' ? 'Please enter a valid URL.' : 'Lütfen geçerli bir URL girin.');
      return;
    }

    // Ücretsiz limit kontrolü (3 tarama)
    if (scanCount >= 3) {
      setShowCreditModal(true);
      return;
    }

    setScanning(true);
    setResult(null);

    try {
      const base = config.apiBase;
      console.log('[SCAN] Starting GPT-powered scan for:', scanUrl);
      
      const response = await fetch(`${base}/api/seo-scan`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: scanUrl }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('[SCAN] API error:', errorData);
        throw new Error(errorData.message || 'Scan failed');
      }

      const data = await response.json();
      
      const newResult: SEOResult = {
        id: uuidv4(),
        url: scanUrl,
        score: data.report.score,
        strengths: data.report.positives || [],
        issues: data.report.negatives || [],
        recommendations: data.report.suggestions || [],
        createdAt: new Date().toISOString(),
      };

      setResult(newResult);
      
      // Scan count'u artır ve kaydet
      const newCount = scanCount + 1;
      setScanCount(newCount);
      localStorage.setItem('scanCount', newCount.toString());
      
      // Sonuçları localStorage'a kaydet
      const savedResults = JSON.parse(localStorage.getItem('seoResults') || '[]');
      savedResults.unshift(newResult);
      localStorage.setItem('seoResults', JSON.stringify(savedResults.slice(0, 10))); // Son 10 sonucu sakla

      console.log('[SCAN] GPT analysis completed successfully');
      setUrl('');
    } catch (error) {
      console.error('Scan failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      alert(`${i18n.language === 'en' ? 'Analysis failed:' : 'Analiz başarısız:'} ${errorMessage}`);
    } finally {
      setScanning(false);
    }
  };

  const remainingScans = Math.max(0, 3 - scanCount);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {i18n.language === 'en' ? 'Free SEO Analysis' : 'Ücretsiz SEO Analizi'}
          </h1>
          <p className="text-gray-600">
            {i18n.language === 'en' ? 'AI-powered SEO analysis with GPT-4' : 'GPT-4 ile AI destekli SEO analizi'}
          </p>
        </div>

        {/* Scan Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={scanning}
              onKeyPress={(e) => e.key === 'Enter' && scanSite()}
            />
            <button
              onClick={() => scanSite()}
              disabled={scanning || !url.trim() || remainingScans === 0}
              className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {scanning ? (
                <Loader className="h-5 w-5 animate-spin" />
              ) : (
                <Search className="h-5 w-5" />
              )}
              <span>
                {scanning 
                  ? (i18n.language === 'en' ? 'Analyzing...' : 'Analiz ediliyor...') 
                  : (i18n.language === 'en' ? 'Analyze with AI' : 'AI ile Analiz Et')
                }
              </span>
            </button>
          </div>

          {/* Remaining scans info */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <Sparkles className="h-4 w-4" />
              <span>
                {i18n.language === 'en' ? 'Powered by GPT-4' : 'GPT-4 ile destekleniyor'}
              </span>
            </div>
            <div className={`flex items-center gap-2 ${remainingScans > 0 ? 'text-green-600' : 'text-red-600'}`}>
              <Zap className="h-4 w-4" />
              <span>
                {remainingScans > 0 
                  ? `${remainingScans} ${i18n.language === 'en' ? 'free scans left' : 'ücretsiz tarama kaldı'}`
                  : (i18n.language === 'en' ? 'No free scans left' : 'Ücretsiz tarama kalmadı')
                }
              </span>
            </div>
          </div>
        </div>

        {/* Results */}
        {result && (
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {i18n.language === 'en' ? 'Analysis Results' : 'Analiz Sonuçları'}
                </h2>
                <div className="flex items-center gap-2 text-gray-600">
                  <span>{result.url}</span>
                  <a
                    href={result.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-1">
                  {result.score}
                </div>
                <div className="text-sm text-gray-600">SEO Score</div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Strengths */}
              <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                <div className="flex items-center gap-2 text-green-700 font-semibold mb-4">
                  <CheckCircle2 className="h-5 w-5" />
                  {i18n.language === 'en' ? 'Strengths' : 'Güçlü Yönler'} ({result.strengths.length})
                </div>
                <ul className="space-y-2">
                  {result.strengths.slice(0, 5).map((strength, i) => (
                    <li key={i} className="text-green-800 text-sm flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Issues */}
              <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                <div className="flex items-center gap-2 text-red-700 font-semibold mb-4">
                  <AlertTriangle className="h-5 w-5" />
                  {i18n.language === 'en' ? 'Issues' : 'Sorunlar'} ({result.issues.length})
                </div>
                <ul className="space-y-2">
                  {result.issues.slice(0, 5).map((issue, i) => (
                    <li key={i} className="text-red-800 text-sm flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>{issue}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recommendations */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <div className="flex items-center gap-2 text-blue-700 font-semibold mb-4">
                  <TrendingUp className="h-5 w-5" />
                  {i18n.language === 'en' ? 'Recommendations' : 'Öneriler'} ({result.recommendations.length})
                </div>
                <ul className="space-y-2">
                  {result.recommendations.slice(0, 5).map((rec, i) => (
                    <li key={i} className="text-blue-800 text-sm flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Credit Modal */}
        {showCreditModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CreditCard className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {i18n.language === 'en' ? 'Free Scans Used' : 'Ücretsiz Taramalar Bitti'}
                </h3>
                <p className="text-gray-600 mb-6">
                  {i18n.language === 'en' 
                    ? 'You\'ve used all 3 free scans. Purchase credits to continue analyzing websites.'
                    : '3 ücretsiz taramanızı kullandınız. Web sitelerini analiz etmeye devam etmek için kredi satın alın.'
                  }
                </p>
                
                <div className="bg-gray-50 rounded-xl p-4 mb-6">
                  <div className="text-lg font-bold text-gray-900 mb-2">
                    {i18n.language === 'en' ? '10 Credits - $9.99' : '10 Kredi - ₺29.99'}
                  </div>
                  <div className="text-sm text-gray-600">
                    {i18n.language === 'en' ? '10 additional AI-powered SEO analyses' : '10 ek AI destekli SEO analizi'}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowCreditModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    {i18n.language === 'en' ? 'Maybe Later' : 'Belki Sonra'}
                  </button>
                  <button
                    onClick={() => alert(i18n.language === 'en' ? 'Payment system coming soon!' : 'Ödeme sistemi yakında!')}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    {i18n.language === 'en' ? 'Buy Credits' : 'Kredi Al'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;