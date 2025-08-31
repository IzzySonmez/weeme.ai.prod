import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../lib/database';
import { config } from '../lib/config';
import type { SEOReport, TrackingCode } from '../types';
import {
  BarChart3,
  Globe,
  Search,
  Loader,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Copy,
  Check,
  Trash2,
  Plus,
  ExternalLink,
  Calendar,
  Clock,
  Target,
  Zap,
  Shield,
  Award,
  Eye,
  RefreshCw,
  Settings,
  Code,
  Activity,
  Sparkles,
  ArrowRight,
  Star,
  Users,
  Crown,
  Lock,
  Rocket,
  LineChart,
  PieChart,
  BarChart,
  TrendingDown as TrendDown
} from 'lucide-react';

interface DashboardProps {
  onOpenBilling: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onOpenBilling }) => {
  const { t, i18n } = useTranslation();
  const { user, updateCredits } = useAuth();

  const [url, setUrl] = useState('');
  const [scanning, setScanning] = useState(false);
  const [reports, setReports] = useState<SEOReport[]>([]);
  const [trackingCodes, setTrackingCodes] = useState<TrackingCode[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showAddTracking, setShowAddTracking] = useState(false);
  const [newTrackingUrl, setNewTrackingUrl] = useState('');

  useEffect(() => {
    if (user?.id) {
      loadReports();
      loadTrackingCodes();
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

  const loadTrackingCodes = async () => {
    if (!user?.id) return;
    try {
      const data = await db.getTrackingCodes(user.id);
      setTrackingCodes(data);
    } catch (error) {
      console.error('Failed to load tracking codes:', error);
      const saved = localStorage.getItem(`trackingCodes_${user.id}`);
      if (saved) setTrackingCodes(JSON.parse(saved));
    }
  };

  const scanSite = async () => {
    if (!url.trim() || !user) {
      alert('Lütfen geçerli bir URL girin.');
      return;
    }

    if (user.membershipType === 'Free' && user.credits <= 0) {
      alert('Kredi bakiyeniz yetersiz. Kredi satın alın veya Pro plana geçin.');
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
        throw new Error(errorData.message || 'Tarama başarısız');
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

      if (user.membershipType === 'Free') {
        updateCredits(user.credits - 1);
      }

      setUrl('');
    } catch (error) {
      console.error('Scan failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'Bilinmeyen hata';
      alert(`Tarama başarısız: ${errorMessage}`);
    } finally {
      setScanning(false);
    }
  };

  const addTrackingCode = async () => {
    if (!newTrackingUrl.trim() || !user) return;

    const code = `<!-- weeme.ai SEO Tracking -->
<script>
(function() {
  var script = document.createElement('script');
  script.src = 'https://cdn.weeme.ai/tracker.js';
  script.setAttribute('data-site-id', '${uuidv4()}');
  script.setAttribute('data-user-id', '${user.id}');
  document.head.appendChild(script);
})();
</script>`;

    const trackingCode: TrackingCode = {
      id: uuidv4(),
      userId: user.id,
      websiteUrl: newTrackingUrl.trim(),
      code,
      isActive: true,
      scanFrequency: 'weekly',
      lastScan: new Date().toISOString(),
      nextScan: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date().toISOString(),
    };

    await db.saveTrackingCode(trackingCode);
    setTrackingCodes([trackingCode, ...trackingCodes]);
    setNewTrackingUrl('');
    setShowAddTracking(false);
  };

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1500);
    } catch (err) {
      console.error('Kopyalama başarısız:', err);
    }
  };

  const removeTrackingCode = async (id: string) => {
    await db.deleteTrackingCode(id);
    setTrackingCodes(trackingCodes.filter(tc => tc.id !== id));
  };

  const latestReport = reports[0];
  const totalScans = reports.length;
  const avgScore = reports.length > 0 ? Math.round(reports.reduce((sum, r) => sum + r.score, 0) / reports.length) : 0;
  const trend = reports.length >= 2 ? reports[0].score - reports[1].score : 0;

  const stats = [
    {
      title: t('dashboard.stats.totalScans'),
      value: totalScans.toString(),
      icon: Search,
      color: 'blue',
      description: t('dashboard.stats.descriptions.totalScans')
    },
    {
      title: t('dashboard.stats.averageScore'),
      value: avgScore > 0 ? avgScore.toString() : '—',
      icon: Target,
      color: 'green',
      description: t('dashboard.stats.descriptions.averageScore')
    },
    {
      title: t('dashboard.stats.lastTrend'),
      value: trend > 0 ? `+${trend}` : trend < 0 ? trend.toString() : '—',
      icon: trend >= 0 ? TrendingUp : TrendingDown,
      color: trend >= 0 ? 'emerald' : 'red',
      description: t('dashboard.stats.descriptions.lastTrend')
    },
    {
      title: t('dashboard.stats.activeTracking'),
      value: trackingCodes.filter(tc => tc.isActive).length.toString(),
      icon: Activity,
      color: 'purple',
      description: t('dashboard.stats.descriptions.activeTracking')
    }
  ];

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white rounded-3xl shadow-2xl p-12 text-center max-w-md">
          <Lock className="h-16 w-16 text-gray-400 mx-auto mb-6" />
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Giriş Gerekli</h3>
          <p className="text-gray-600 text-lg">Dashboard'a erişmek için önce giriş yapın.</p>
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
                {t('dashboard.welcome')}, <span className="text-blue-600">{user.username}</span>! 👋
              </h1>
              <p className="text-gray-600 text-lg">{t('dashboard.seoPerformance')}</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">{t('dashboard.todayIs')}</div>
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
              <h2 className="text-2xl font-bold text-gray-900">{t('dashboard.quickScan.title')}</h2>
              <p className="text-gray-600">{t('dashboard.quickScan.description')}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder={t('dashboard.quickScan.placeholder')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  disabled={scanning}
                />
              </div>
              <button
                onClick={scanSite}
                disabled={scanning || !url.trim() || (user.membershipType === 'Free' && user.credits <= 0)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                {scanning ? (
                  <Loader className="h-5 w-5 animate-spin" />
                ) : (
                  <Search className="h-5 w-5" />
                )}
                <span>{scanning ? t('dashboard.quickScan.scanning') : t('dashboard.quickScan.scanButton')}</span>
              </button>
            </div>

            {user.membershipType === 'Free' && (
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Zap className="h-5 w-5 text-blue-600" />
                    <div>
                      <div className="font-semibold text-blue-900">{t('dashboard.quickScan.creditsRemaining')}: {user.credits}</div>
                      <div className="text-sm text-blue-700">{t('dashboard.quickScan.creditsPerScan')}</div>
                    </div>
                  </div>
                  <button
                    onClick={onOpenBilling}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-semibold text-sm shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    {t('dashboard.quickScan.buyCredits')}
                  </button>
                </div>
              </div>
            )}
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
                  <h2 className="text-2xl font-bold text-gray-900">{t('dashboard.latestReport.title')}</h2>
                  <p className="text-gray-600">{latestReport.websiteUrl}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500 mb-1">{t('seo.score')}</div>
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
                  {latestReport.score >= 80 ? t('seo.excellent') : 
                   latestReport.score >= 60 ? t('seo.good') : 
                   latestReport.score >= 40 ? t('seo.average') : t('seo.needsImprovement')}
                </div>
              </div>

              {/* Positives */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
                <div className="flex items-center gap-3 text-green-700 font-semibold mb-4">
                  <CheckCircle2 className="h-5 w-5" />
                  {t('seo.strengths')} ({latestReport.positives.length})
                </div>
                <ul className="space-y-2">
                  {latestReport.positives.slice(0, 4).map((positive, i) => (
                    <li key={i} className="text-green-800 text-sm flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>{positive}</span>
                    </li>
                  ))}
                  {latestReport.positives.length > 4 && (
                    <li className="text-green-600 text-xs">+{latestReport.positives.length - 4} daha...</li>
                  )}
                </ul>
              </div>

              {/* Negatives */}
              <div className="bg-gradient-to-br from-red-50 to-orange-50 border border-red-200 rounded-xl p-6">
                <div className="flex items-center gap-3 text-red-700 font-semibold mb-4">
                  <AlertTriangle className="h-5 w-5" />
                  {t('seo.improvements')} ({latestReport.negatives.length})
                </div>
                <ul className="space-y-2">
                  {latestReport.negatives.slice(0, 4).map((negative, i) => (
                    <li key={i} className="text-red-800 text-sm flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>{negative}</span>
                    </li>
                  ))}
                  {latestReport.negatives.length > 4 && (
                    <li className="text-red-600 text-xs">+{latestReport.negatives.length - 4} daha...</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Tracking Codes */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-lg">
                <Code className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{t('dashboard.trackingCodes.title')}</h2>
                <p className="text-gray-600">{t('dashboard.trackingCodes.description')}</p>
              </div>
            </div>
            <button
              onClick={() => setShowAddTracking(true)}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 font-semibold flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Plus className="h-4 w-4" />
              {t('dashboard.trackingCodes.newCode')}
            </button>
          </div>

          {showAddTracking && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 mb-6">
              <h3 className="font-semibold text-blue-900 mb-4">{t('dashboard.trackingCodes.createNew')}</h3>
              <div className="flex gap-3">
                <input
                  type="url"
                  value={newTrackingUrl}
                  onChange={(e) => setNewTrackingUrl(e.target.value)}
                  placeholder={t('dashboard.quickScan.placeholder')}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                />
                <button
                  onClick={addTrackingCode}
                  disabled={!newTrackingUrl.trim()}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-semibold disabled:opacity-50"
                >
                  {t('dashboard.trackingCodes.create')}
                </button>
                <button
                  onClick={() => setShowAddTracking(false)}
                  className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors font-semibold"
                >
                  {t('common.cancel')}
                </button>
              </div>
            </div>
          )}

          {trackingCodes.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <Code className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{t('dashboard.trackingCodes.noCodesYet')}</h3>
              <p className="text-gray-600 mb-6">{t('dashboard.trackingCodes.noCodesDescription')}</p>
              <button
                onClick={() => setShowAddTracking(true)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2 mx-auto"
              >
                <Plus className="h-5 w-5" />
                {t('dashboard.trackingCodes.createFirst')}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {trackingCodes.map((code) => (
                <div key={code.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${code.isActive ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'}`}>
                        <Globe className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{code.websiteUrl}</div>
                        <div className="text-sm text-gray-600">
                          {code.isActive ? t('dashboard.trackingCodes.active') : t('dashboard.trackingCodes.inactive')} • {code.scanFrequency} {i18n.language === 'en' ? 'scan' : 'tarama'}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right text-xs text-gray-500">
                        <div>{t('dashboard.trackingCodes.lastScan')}: {new Date(code.lastScan).toLocaleDateString(i18n.language === 'en' ? 'en-US' : 'tr-TR')}</div>
                        <div>{t('dashboard.trackingCodes.nextScan')}: {new Date(code.nextScan).toLocaleDateString(i18n.language === 'en' ? 'en-US' : 'tr-TR')}</div>
                      </div>
                      <button
                        onClick={() => copyToClipboard(code.code, code.id)}
                        className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                      >
                        {copiedId === code.id ? (
                          <Check className="h-4 w-4 text-green-600" />
                        ) : (
                          <Copy className="h-4 w-4 text-gray-600" />
                        )}
                        <span className="font-medium">
                          {copiedId === code.id ? t('common.copied') : t('common.copy')}
                        </span>
                      </button>
                      <button
                        onClick={() => removeTrackingCode(code.id)}
                        className="text-gray-500 hover:text-red-600 p-2 rounded-lg transition-colors"
                        title="Sil"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                    <pre className="text-gray-100 text-xs font-mono whitespace-pre-wrap">
                      {code.code}
                    </pre>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Reports History */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl shadow-lg">
              <Activity className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{t('dashboard.reportsHistory.title')}</h2>
              <p className="text-gray-600">{t('dashboard.reportsHistory.description')}</p>
            </div>
          </div>

          {reports.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{t('dashboard.reportsHistory.noReports')}</h3>
              <p className="text-gray-600 mb-6">{t('dashboard.reportsHistory.noReportsDescription')}</p>
              
              <div className="bg-gray-50 rounded-xl p-6 max-w-md mx-auto">
                <h4 className="font-semibold text-gray-900 mb-4">{t('dashboard.reportsHistory.learnFromScan')}</h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  {t('dashboard.reportsHistory.scanFeatures', { returnObjects: true }).map((feature: string, index: number) => (
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
                        title="Siteyi aç"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 text-green-700 font-semibold mb-2 text-sm">
                        <CheckCircle2 className="h-4 w-4" />
                        {t('seo.strengths')} ({report.positives.length})
                      </div>
                      <ul className="space-y-1">
                        {report.positives.slice(0, 3).map((positive, i) => (
                          <li key={i} className="text-green-800 text-xs flex items-start gap-2">
                            <div className="w-1 h-1 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></div>
                            <span>{positive}</span>
                          </li>
                        ))}
                        {report.positives.length > 3 && (
                          <li className="text-green-600 text-xs">+{report.positives.length - 3} daha...</li>
                        )}
                      </ul>
                    </div>

                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 text-red-700 font-semibold mb-2 text-sm">
                        <AlertTriangle className="h-4 w-4" />
                        {t('seo.improvements')} ({report.negatives.length})
                      </div>
                      <ul className="space-y-1">
                        {report.negatives.slice(0, 3).map((negative, i) => (
                          <li key={i} className="text-red-800 text-xs flex items-start gap-2">
                            <div className="w-1 h-1 bg-red-500 rounded-full mt-1.5 flex-shrink-0"></div>
                            <span>{negative}</span>
                          </li>
                        ))}
                        {report.negatives.length > 3 && (
                          <li className="text-red-600 text-xs">+{report.negatives.length - 3} daha...</li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Upgrade Prompt for Free Users */}
        {user.membershipType === 'Free' && (
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
            
            <div className="relative z-10 text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Rocket className="h-8 w-8 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold mb-4">
                {t('dashboard.upgrade.title')}
              </h3>
              
              <p className="text-white/90 mb-8 max-w-2xl mx-auto">
                {t('dashboard.upgrade.description')}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <div className="flex items-center gap-3 mb-4">
                    <Settings className="h-6 w-6" />
                    <span className="font-bold text-lg">{t('home.pricing.pro.title')}</span>
                  </div>
                  <ul className="text-left space-y-2 text-sm">
                    {t('home.pricing.pro.features', { returnObjects: true }).slice(0, 3).map((feature: string, index: number) => (
                      <li key={index} className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <div className="flex items-center gap-3 mb-4">
                    <Sparkles className="h-6 w-6" />
                    <span className="font-bold text-lg">{t('home.pricing.advanced.title')}</span>
                  </div>
                  <ul className="text-left space-y-2 text-sm">
                    {t('home.pricing.advanced.features', { returnObjects: true }).slice(0, 3).map((feature: string, index: number) => (
                      <li key={index} className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <button
                onClick={onOpenBilling}
                className="bg-white text-blue-600 px-8 py-3 rounded-xl hover:bg-gray-100 transition-all duration-200 font-bold shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-3 mx-auto"
              >
                <Rocket className="h-5 w-5" />
                {t('dashboard.upgrade.upgradePlan')}
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;