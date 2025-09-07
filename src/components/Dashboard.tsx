import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../lib/database';
import { config } from '../lib/config';
import type { SEOReport } from '../types';
import {
  BarChart3,
  Search,
  Loader,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  ExternalLink,
  Target,
  Activity,
  Sparkles,
  Star,
  Users,
  Lock,
  Rocket,
  ArrowRight,
  Globe,
  Zap,
  Award
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { user } = useAuth();

  const [url, setUrl] = useState('');
  const [scanning, setScanning] = useState(false);
  const [reports, setReports] = useState<SEOReport[]>([]);

  useEffect(() => {
    if (user?.id) {
      loadReports();
    }
  }, [user?.id]);

  const loadReports = async () => {
    if (!user?.id) return;
    try {
      const data = await db.getReports(user.id);
      setReports(data);
    } catch (error) {
      console.error('Failed to load reports:', error);
      const saved = localStorage.getItem(`reports_${user.id}`);
      if (saved) setReports(JSON.parse(saved));
    }
  };

  const scanSite = async () => {
    if (!url.trim() || !user) {
      alert(i18n.language === 'en' ? 'Please enter a valid URL.' : 'Lütfen geçerli bir URL girin.');
      return;
    }

    setScanning(true);

    try {
      const base = config.apiBase;
      console.log('[SCAN] Starting scan for:', url.trim());
      const response = await fetch(`${base}/api/seo-scan`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: url.trim() }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('[SCAN] API error:', errorData);
        throw new Error(errorData.message || 'Scan failed');
      }

      const data = await response.json();
      const report: SEOReport = {
        id: uuidv4(),
        userId: user.id,
        websiteUrl: url.trim(),
        score: data.report.score,
        positives: data.report.positives,
        negatives: data.report.negatives,
        suggestions: data.report.suggestions,
        reportData: data.report.reportData,
        createdAt: new Date().toISOString(),
      };

      await db.saveReport(report);
      setReports([report, ...reports]);

      console.log('[SCAN] Report saved successfully');
      setUrl('');
    } catch (error) {
      console.error('Scan failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      alert(`${i18n.language === 'en' ? 'Scan failed:' : 'Tarama başarısız:'} ${errorMessage}`);
    } finally {
      setScanning(false);
    }
  };

  const latestReport = reports[0];
  const totalScans = reports.length;
  const avgScore = reports.length > 0 ? Math.round(reports.reduce((sum, r) => sum + r.score, 0) / reports.length) : 0;
  const trend = reports.length >= 2 ? reports[0].score - reports[1].score : 0;

  const stats = [
    {
      title: i18n.language === 'en' ? 'Total Scans' : 'Toplam Tarama',
      value: totalScans.toString(),
      icon: Search,
      color: 'blue',
      description: i18n.language === 'en' ? 'Number of SEO analyses performed' : 'Yapılan SEO analizi sayısı'
    },
    {
      title: i18n.language === 'en' ? 'Average Score' : 'Ortalama Skor',
      value: avgScore > 0 ? avgScore.toString() : '—',
      icon: Target,
      color: 'green',
      description: i18n.language === 'en' ? 'Average SEO score of all sites' : 'Tüm sitelerin ortalama SEO skoru'
    },
    {
      title: i18n.language === 'en' ? 'Last Trend' : 'Son Trend',
      value: trend > 0 ? `+${trend}` : trend < 0 ? trend.toString() : '—',
      icon: trend >= 0 ? TrendingUp : TrendingDown,
      color: trend >= 0 ? 'emerald' : 'red',
      description: i18n.language === 'en' ? 'Change between last two scans' : 'Son iki tarama arasındaki değişim'
    },
    {
      title: i18n.language === 'en' ? 'SEO Potential' : 'SEO Potansiyeli',
      value: latestReport ? `+${Math.max(0, 100 - latestReport.score)}` : '—',
      icon: Activity,
      color: 'purple',
      description: i18n.language === 'en' ? 'Improvement potential' : 'İyileştirme potansiyeli'
    }
  ];

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white rounded-3xl shadow-2xl p-12 text-center max-w-md">
          <Lock className="h-16 w-16 text-gray-400 mx-auto mb-6" />
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            {i18n.language === 'en' ? 'Sign In Required' : 'Giriş Gerekli'}
          </h3>
          <p className="text-gray-600 text-lg">
            {i18n.language === 'en' ? 'Please sign in to access the dashboard.' : 'Dashboard\'a erişmek için önce giriş yapın.'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                {i18n.language === 'en' ? 'Welcome' : 'Hoş geldin'}, <span className="text-blue-600">{user.username}</span>! 👋
              </h1>
              <p className="text-gray-600 text-lg">
                {i18n.language === 'en' ? 'Analyze your website SEO performance' : 'Web sitenizin SEO performansını analiz edin'}
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">
                {i18n.language === 'en' ? 'Today' : 'Bugün'}
              </div>
              <div className="text-lg font-semibold text-gray-900">
                {new Date().toLocaleDateString(i18n.language === 'en' ? 'en-US' : 'tr-TR', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const colorClasses = {
              blue: 'from-blue-500 to-blue-600',
              green: 'from-green-500 to-green-600',
              emerald: 'from-emerald-500 to-emerald-600',
              red: 'from-red-500 to-red-600',
              purple: 'from-purple-500 to-purple-600'
            };
            
            return (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 bg-gradient-to-r ${colorClasses[stat.color as keyof typeof colorClasses]} rounded-xl shadow-lg`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  </div>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{stat.title}</h3>
                <p className="text-sm text-gray-600">{stat.description}</p>
              </div>
            );
          })}
        </div>

        {/* Quick Scan Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg">
              <Search className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {i18n.language === 'en' ? 'Free SEO Analysis' : 'Ücretsiz SEO Analizi'}
              </h2>
              <p className="text-gray-600">
                {i18n.language === 'en' ? 'Get instant SEO analysis for any website' : 'Herhangi bir web sitesi için anında SEO analizi alın'}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  disabled={scanning}
                />
              </div>
              <button
                onClick={scanSite}
                disabled={scanning || !url.trim()}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                {scanning ? (
                  <Loader className="h-5 w-5 animate-spin" />
                ) : (
                  <Search className="h-5 w-5" />
                )}
                <span>{scanning ? (i18n.language === 'en' ? 'Analyzing...' : 'Analiz ediliyor...') : (i18n.language === 'en' ? 'Analyze' : 'Analiz Et')}</span>
              </button>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <Zap className="h-5 w-5 text-green-600" />
                <div>
                  <div className="font-semibold text-green-900">
                    {i18n.language === 'en' ? '100% Free Forever' : '100% Sonsuza Kadar Ücretsiz'}
                  </div>
                  <div className="text-sm text-green-700">
                    {i18n.language === 'en' ? 'No limits, no credit card required' : 'Sınır yok, kredi kartı gerektirmez'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Latest Report */}
        {latestReport && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl shadow-lg">
                  <BarChart3 className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {i18n.language === 'en' ? 'Latest Analysis Result' : 'Son Analiz Sonucu'}
                  </h2>
                  <p className="text-gray-600">{latestReport.websiteUrl}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500 mb-1">SEO Score</div>
                <div className="text-4xl font-bold text-blue-600">
                  {latestReport.score}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Score Visualization */}
              <div className="text-center">
                <div className="relative inline-flex items-center justify-center w-32 h-32 mx-auto mb-4">
                  <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="50" fill="none" stroke="#e5e7eb" strokeWidth="6"/>
                    <circle 
                      cx="60" 
                      cy="60" 
                      r="50" 
                      fill="none" 
                      stroke="url(#scoreGradient)" 
                      strokeWidth="6"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 50 * (latestReport.score / 100)} ${2 * Math.PI * 50}`}
                      className="transition-all duration-1000"
                    />
                    <defs>
                      <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#8b5cf6" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-gray-900">
                        {latestReport.score}
                      </div>
                      <div className="text-sm text-gray-500">/ 100</div>
                    </div>
                  </div>
                </div>
                <div className="text-lg font-semibold text-gray-700">
                  {latestReport.score >= 80 ? (i18n.language === 'en' ? '🎉 Excellent' : '🎉 Mükemmel') : 
                   latestReport.score >= 60 ? (i18n.language === 'en' ? '👍 Good' : '👍 İyi') : 
                   latestReport.score >= 40 ? (i18n.language === 'en' ? '⚠️ Average' : '⚠️ Orta') : (i18n.language === 'en' ? '🔧 Needs Work' : '🔧 Geliştirilmeli')}
                </div>
              </div>

              {/* Positives */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
                <div className="flex items-center gap-3 text-green-700 font-semibold mb-4">
                  <CheckCircle2 className="h-5 w-5" />
                  {i18n.language === 'en' ? 'Strengths' : 'Güçlü Yönler'} ({latestReport.positives.length})
                </div>
                <ul className="space-y-2">
                  {latestReport.positives.slice(0, 4).map((positive, i) => (
                    <li key={i} className="text-green-800 text-sm flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>{positive}</span>
                    </li>
                  ))}
                  {latestReport.positives.length > 4 && (
                    <li className="text-green-600 text-xs">+{latestReport.positives.length - 4} {i18n.language === 'en' ? 'more...' : 'daha...'}</li>
                  )}
                </ul>
              </div>

              {/* Negatives */}
              <div className="bg-gradient-to-br from-red-50 to-orange-50 border border-red-200 rounded-xl p-6">
                <div className="flex items-center gap-3 text-red-700 font-semibold mb-4">
                  <AlertTriangle className="h-5 w-5" />
                  {i18n.language === 'en' ? 'Issues' : 'İyileştirme Alanları'} ({latestReport.negatives.length})
                </div>
                <ul className="space-y-2">
                  {latestReport.negatives.slice(0, 4).map((negative, i) => (
                    <li key={i} className="text-red-800 text-sm flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>{negative}</span>
                    </li>
                  ))}
                  {latestReport.negatives.length > 4 && (
                    <li className="text-red-600 text-xs">+{latestReport.negatives.length - 4} {i18n.language === 'en' ? 'more...' : 'daha...'}</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Reports History */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl shadow-lg">
              <Activity className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {i18n.language === 'en' ? 'Analysis History' : 'Analiz Geçmişi'}
              </h2>
              <p className="text-gray-600">
                {i18n.language === 'en' ? 'All your SEO analyses and results' : 'Tüm SEO analizleriniz ve sonuçları'}
              </p>
            </div>
          </div>

          {reports.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {i18n.language === 'en' ? 'No Analyses Yet' : 'Henüz Analiz Yapılmadı'}
              </h3>
              <p className="text-gray-600 mb-6">
                {i18n.language === 'en' ? 'Enter a website URL above to perform your first SEO analysis.' : 'İlk SEO analizinizi yapmak için yukarıdan bir site URL\'i girin.'}
              </p>
              
              <div className="bg-gray-50 rounded-xl p-6 max-w-md mx-auto">
                <h4 className="font-semibold text-gray-900 mb-4">
                  {i18n.language === 'en' ? 'What will you learn from analysis?' : 'Analizden neler öğrenirsiniz?'}
                </h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  {[
                    i18n.language === 'en' ? 'Meta tag analysis' : 'Meta etiket analizi',
                    i18n.language === 'en' ? 'Page speed test' : 'Sayfa hızı testi',
                    i18n.language === 'en' ? 'Mobile compatibility' : 'Mobil uyumluluk',
                    i18n.language === 'en' ? 'SEO recommendations' : 'SEO önerileri'
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {reports.slice(0, 10).map((report) => (
                <div key={report.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg ${
                        report.score >= 80 ? 'bg-gradient-to-r from-green-500 to-emerald-600' :
                        report.score >= 60 ? 'bg-gradient-to-r from-blue-500 to-purple-600' :
                        report.score >= 40 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
                        'bg-gradient-to-r from-red-500 to-pink-600'
                      }`}>
                        <span className="text-white font-bold">{report.score}</span>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{report.websiteUrl}</div>
                        <div className="text-sm text-gray-600">
                          {new Date(report.createdAt).toLocaleDateString(i18n.language === 'en' ? 'en-US' : 'tr-TR', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <a
                        href={report.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-gray-900 p-2 rounded-lg transition-colors"
                        title={i18n.language === 'en' ? 'Open site' : 'Siteyi aç'}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 text-green-700 font-semibold mb-2 text-sm">
                        <CheckCircle2 className="h-4 w-4" />
                        {i18n.language === 'en' ? 'Strengths' : 'Güçlü Yönler'} ({report.positives.length})
                      </div>
                      <ul className="space-y-1">
                        {report.positives.slice(0, 3).map((positive, i) => (
                          <li key={i} className="text-green-800 text-xs flex items-start gap-2">
                            <div className="w-1 h-1 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></div>
                            <span>{positive}</span>
                          </li>
                        ))}
                        {report.positives.length > 3 && (
                          <li className="text-green-600 text-xs">+{report.positives.length - 3} {i18n.language === 'en' ? 'more...' : 'daha...'}</li>
                        )}
                      </ul>
                    </div>

                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 text-red-700 font-semibold mb-2 text-sm">
                        <AlertTriangle className="h-4 w-4" />
                        {i18n.language === 'en' ? 'Issues' : 'İyileştirmeler'} ({report.negatives.length})
                      </div>
                      <ul className="space-y-1">
                        {report.negatives.slice(0, 3).map((negative, i) => (
                          <li key={i} className="text-red-800 text-xs flex items-start gap-2">
                            <div className="w-1 h-1 bg-red-500 rounded-full mt-1.5 flex-shrink-0"></div>
                            <span>{negative}</span>
                          </li>
                        ))}
                        {report.negatives.length > 3 && (
                          <li className="text-red-600 text-xs">+{report.negatives.length - 3} {i18n.language === 'en' ? 'more...' : 'daha...'}</li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;