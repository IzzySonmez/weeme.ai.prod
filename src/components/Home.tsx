import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import LanguageSwitcher from './LanguageSwitcher';
import { 
  Sparkles, 
  Search, 
  ArrowRight,
  CheckCircle2,
  Zap,
  Shield,
  Award,
  BarChart3,
  Target,
  TrendingUp,
  Loader
} from 'lucide-react';

const Home: React.FC = () => {
  const { i18n } = useTranslation();
  const [url, setUrl] = useState('');
  const [scanning, setScanning] = useState(false);

  const handleQuickScan = () => {
    if (!url.trim()) {
      alert(i18n.language === 'en' ? 'Please enter a website URL' : 'Lütfen bir web sitesi URL\'si girin');
      return;
    }
    
    // Redirect to app with URL
    window.location.href = `/app?url=${encodeURIComponent(url.trim())}`;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-7 w-7 text-blue-600" />
            <span className="font-bold text-xl text-gray-900">weeme.ai</span>
          </div>
          
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <Link 
              to="/app" 
              className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors font-medium"
            >
              {i18n.language === 'en' ? 'Start Free' : 'Ücretsiz Başla'}
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            {i18n.language === 'en' ? 'Free SEO Analysis' : 'Ücretsiz SEO Analizi'}
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            {i18n.language === 'en' 
              ? 'Get instant AI-powered SEO analysis for your website. Find issues and get actionable recommendations.'
              : 'Web siteniz için anında AI destekli SEO analizi alın. Sorunları tespit edin ve uygulanabilir öneriler alın.'
            }
          </p>

          {/* Quick Scan */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onKeyPress={(e) => e.key === 'Enter' && handleQuickScan()}
              />
              <button
                onClick={handleQuickScan}
                disabled={scanning}
                className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition-colors font-semibold flex items-center gap-2 disabled:opacity-50"
              >
                {scanning ? <Loader className="h-5 w-5 animate-spin" /> : <Search className="h-5 w-5" />}
                {i18n.language === 'en' ? 'Analyze Free' : 'Ücretsiz Analiz Et'}
              </button>
            </div>
            
            <div className="mt-4 text-sm text-gray-600 flex items-center justify-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              {i18n.language === 'en' ? 'No signup required • Instant results' : 'Kayıt gerektirmez • Anında sonuç'}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">150+</div>
              <div className="text-gray-600">{i18n.language === 'en' ? 'Sites Analyzed' : 'Analiz Edilen Site'}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">%75</div>
              <div className="text-gray-600">{i18n.language === 'en' ? 'Avg. Improvement' : 'Ort. İyileştirme'}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">2.5K+</div>
              <div className="text-gray-600">{i18n.language === 'en' ? 'Total Scans' : 'Toplam Tarama'}</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {i18n.language === 'en' ? 'How It Works' : 'Nasıl Çalışır'}
            </h2>
            <p className="text-gray-600">
              {i18n.language === 'en' ? '3 simple steps to improve your SEO' : '3 basit adımda SEO\'nuzu iyileştirin'}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {i18n.language === 'en' ? 'Enter URL' : 'URL Girin'}
              </h3>
              <p className="text-gray-600">
                {i18n.language === 'en' ? 'Simply paste your website URL' : 'Web site URL\'nizi yapıştırın'}
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {i18n.language === 'en' ? 'AI Analysis' : 'AI Analizi'}
              </h3>
              <p className="text-gray-600">
                {i18n.language === 'en' ? 'GPT-4 analyzes your SEO' : 'GPT-4 SEO\'nuzu analiz eder'}
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {i18n.language === 'en' ? 'Get Results' : 'Sonuçları Alın'}
              </h3>
              <p className="text-gray-600">
                {i18n.language === 'en' ? 'Actionable recommendations' : 'Uygulanabilir öneriler'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {i18n.language === 'en' ? 'What You Get' : 'Neler Alırsınız'}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <BarChart3 className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  {i18n.language === 'en' ? 'SEO Score' : 'SEO Skoru'}
                </h3>
                <p className="text-gray-600">
                  {i18n.language === 'en' ? 'Overall SEO performance score' : 'Genel SEO performans skoru'}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Target className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  {i18n.language === 'en' ? 'Issues Found' : 'Bulunan Sorunlar'}
                </h3>
                <p className="text-gray-600">
                  {i18n.language === 'en' ? 'Critical SEO problems to fix' : 'Düzeltilmesi gereken kritik SEO sorunları'}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  {i18n.language === 'en' ? 'Recommendations' : 'Öneriler'}
                </h3>
                <p className="text-gray-600">
                  {i18n.language === 'en' ? 'Step-by-step improvement guide' : 'Adım adım iyileştirme rehberi'}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Sparkles className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  {i18n.language === 'en' ? 'AI-Powered' : 'AI Destekli'}
                </h3>
                <p className="text-gray-600">
                  {i18n.language === 'en' ? 'Latest GPT-4 technology' : 'En son GPT-4 teknolojisi'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            {i18n.language === 'en' ? 'Ready to Improve Your SEO?' : 'SEO\'nuzu İyileştirmeye Hazır mısınız?'}
          </h2>
          <p className="text-blue-100 mb-8 text-lg">
            {i18n.language === 'en' 
              ? 'Get your free SEO analysis in seconds'
              : 'Saniyeler içinde ücretsiz SEO analizinizi alın'
            }
          </p>
          
          <Link 
            to="/app" 
            className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors"
          >
            <Search className="h-5 w-5" />
            {i18n.language === 'en' ? 'Start Free Analysis' : 'Ücretsiz Analizi Başlat'}
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="h-6 w-6 text-blue-400" />
            <span className="font-bold text-xl">weeme.ai</span>
          </div>
          <p className="text-gray-400 mb-6">
            {i18n.language === 'en' 
              ? 'Free SEO analysis tool powered by AI'
              : 'AI destekli ücretsiz SEO analiz aracı'
            }
          </p>
          <div className="text-sm text-gray-500">
            © 2025 weeme.ai. {i18n.language === 'en' ? 'All rights reserved.' : 'Tüm hakları saklıdır.'}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;