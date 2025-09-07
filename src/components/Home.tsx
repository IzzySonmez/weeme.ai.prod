import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import LanguageSwitcher from './LanguageSwitcher';
import { 
  Sparkles, 
  Rocket, 
  BarChart3, 
  CheckCircle2, 
  Shield,
  ArrowRight,
  Play,
  Star,
  TrendingUp,
  Globe,
  Zap,
  Target,
  Users,
  Award,
  ChevronRight,
  Quote,
  Search
} from 'lucide-react';

const Home: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [stats, setStats] = useState({
    sites: 0,
    improvement: 0,
    scans: 0,
    satisfaction: 0
  });

  // Animated counter effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setStats({
        sites: 150,
        improvement: 75,
        scans: 2500,
        satisfaction: 95
      });
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const testimonials = [
    {
      name: i18n.language === 'en' ? "John Smith" : "Ahmet Yılmaz",
      role: i18n.language === 'en' ? "E-commerce Manager" : "E-ticaret Müdürü",
      company: "TechStore",
      content: i18n.language === 'en' 
        ? "Free SEO analysis helped me identify critical issues. Very useful tool!"
        : "Ücretsiz SEO analizi kritik sorunları tespit etmeme yardımcı oldu. Çok faydalı araç!",
      rating: 5,
      avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
    },
    {
      name: i18n.language === 'en' ? "Sarah Johnson" : "Elif Kaya",
      role: i18n.language === 'en' ? "Digital Marketing Specialist" : "Dijital Pazarlama Uzmanı",
      company: "StartupCo",
      content: i18n.language === 'en'
        ? "Simple and effective. Got actionable SEO recommendations in minutes."
        : "Basit ve etkili. Dakikalar içinde uygulanabilir SEO önerileri aldım.",
      rating: 5,
      avatar: "https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
    },
    {
      name: i18n.language === 'en' ? "Michael Brown" : "Mehmet Özkan",
      role: i18n.language === 'en' ? "Founder" : "Kurucu",
      company: "DigitalAgency",
      content: i18n.language === 'en'
        ? "Perfect for quick SEO audits. Clean interface and reliable results."
        : "Hızlı SEO denetimleri için mükemmel. Temiz arayüz ve güvenilir sonuçlar.",
      rating: 5,
      avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Sparkles className="h-7 w-7 text-blue-600 animate-pulse" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-ping"></div>
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              weeme.ai
            </span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <button onClick={() => scrollTo('features')} className="text-gray-600 hover:text-blue-600 transition-colors">
              {i18n.language === 'en' ? 'Features' : 'Özellikler'}
            </button>
            <button onClick={() => scrollTo('how-it-works')} className="text-gray-600 hover:text-blue-600 transition-colors">
              {i18n.language === 'en' ? 'How It Works' : 'Nasıl Çalışır'}
            </button>
            <button onClick={() => scrollTo('testimonials')} className="text-gray-600 hover:text-blue-600 transition-colors">
              {i18n.language === 'en' ? 'Reviews' : 'Yorumlar'}
            </button>
            <LanguageSwitcher />
            <Link 
              to="/login" 
              className="px-4 py-2 rounded-lg border border-gray-300 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
            >
              {i18n.language === 'en' ? 'Sign In' : 'Giriş Yap'}
            </Link>
            <Link 
              to="/register" 
              className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              {i18n.language === 'en' ? 'Start Free' : 'Ücretsiz Başla'}
            </Link>
          </nav>
          
          <div className="md:hidden">
            <LanguageSwitcher />
            <Link 
              to="/register" 
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium ml-2"
            >
              {i18n.language === 'en' ? 'Start Free' : 'Ücretsiz Başla'}
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-blue-200 text-sm font-medium text-blue-700">
                <Zap className="h-4 w-4" />
                <span>{i18n.language === 'en' ? 'Free SEO Analysis' : 'Ücretsiz SEO Analizi'}</span>
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
                {i18n.language === 'en' ? 'Free SEO' : 'Ücretsiz SEO'}{' '}
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent animate-gradient">
                  {i18n.language === 'en' ? 'Analysis' : 'Analizi'}
                </span>{' '}
                {i18n.language === 'en' ? 'Tool' : 'Aracı'}
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
                {i18n.language === 'en' 
                  ? 'Get instant SEO analysis for your website. Identify issues, get recommendations, and improve your search rankings - completely free!'
                  : 'Web siteniz için anında SEO analizi alın. Sorunları tespit edin, öneriler alın ve arama sıralamanızı iyileştirin - tamamen ücretsiz!'
                }
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/register" 
                  className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-xl hover:shadow-2xl"
                >
                  <Search className="h-5 w-5 group-hover:animate-bounce" />
                  {i18n.language === 'en' ? 'Analyze My Site' : 'Sitemi Analiz Et'}
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                
                <button 
                  onClick={() => scrollTo('demo')}
                  className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-white/80 backdrop-blur-sm border border-gray-200 text-gray-700 font-semibold text-lg hover:bg-white hover:border-blue-300 transition-all duration-200"
                >
                  <Play className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  {i18n.language === 'en' ? 'See Demo' : 'Demo İzle'}
                </button>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {stats.sites.toLocaleString('tr-TR')}+
                  </div>
                  <div className="text-sm text-gray-600">{i18n.language === 'en' ? 'Sites Analyzed' : 'Analiz Edilen Site'}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    %{stats.improvement}
                  </div>
                  <div className="text-sm text-gray-600">{i18n.language === 'en' ? 'Avg. Improvement' : 'Ort. İyileştirme'}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {stats.scans.toLocaleString('tr-TR')}+
                  </div>
                  <div className="text-sm text-gray-600">{i18n.language === 'en' ? 'Total Scans' : 'Toplam Tarama'}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    %{stats.satisfaction}
                  </div>
                  <div className="text-sm text-gray-600">{i18n.language === 'en' ? 'User Satisfaction' : 'Kullanıcı Memnuniyeti'}</div>
                </div>
              </div>
            </div>

            {/* Right - SEO Dashboard Preview */}
            <div className="relative">
              <div className="relative bg-white/60 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-8 transform hover:scale-105 transition-all duration-500">
                {/* Dashboard Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                  <div className="text-sm text-gray-500">weeme.ai SEO Analysis</div>
                </div>

                {/* SEO Score Circle */}
                <div className="text-center mb-8">
                  <div className="relative inline-flex items-center justify-center w-32 h-32 mx-auto">
                    <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                      <circle cx="60" cy="60" r="50" fill="none" stroke="#e5e7eb" strokeWidth="8"/>
                      <circle 
                        cx="60" 
                        cy="60" 
                        r="50" 
                        fill="none" 
                        stroke="url(#gradient)" 
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray={`${2 * Math.PI * 50 * 0.78} ${2 * Math.PI * 50}`}
                        className="animate-pulse"
                      />
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#3b82f6" />
                          <stop offset="100%" stopColor="#8b5cf6" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                          78
                        </div>
                        <div className="text-xs text-gray-500">SEO Score</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200/50">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      <span className="text-xs font-medium text-green-700">{i18n.language === 'en' ? 'Good' : 'İyi'}</span>
                    </div>
                    <div className="text-2xl font-bold text-green-800">8</div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl p-4 border border-yellow-200/50">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="h-4 w-4 text-yellow-600" />
                      <span className="text-xs font-medium text-yellow-700">{i18n.language === 'en' ? 'Issues' : 'Sorun'}</span>
                    </div>
                    <div className="text-2xl font-bold text-yellow-800">3</div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-blue-50 to-sky-50 rounded-xl p-4 border border-blue-200/50">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-4 w-4 text-blue-600" />
                      <span className="text-xs font-medium text-blue-700">{i18n.language === 'en' ? 'Potential' : 'Potansiyel'}</span>
                    </div>
                    <div className="text-2xl font-bold text-blue-800">+22</div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-white/50 rounded-lg border border-gray-200/50">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-700">{i18n.language === 'en' ? 'Meta tags optimized' : 'Meta etiketler optimize edildi'}</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white/50 rounded-lg border border-gray-200/50">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-700">{i18n.language === 'en' ? 'Page speed analyzed' : 'Sayfa hızı analiz edildi'}</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white/50 rounded-lg border border-gray-200/50">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-700">{i18n.language === 'en' ? 'Recommendations ready' : 'Öneriler hazır'}</span>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white animate-bounce">
                <Sparkles className="h-6 w-6" />
              </div>
              <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              {i18n.language === 'en' ? 'Powerful SEO Analysis' : 'Güçlü SEO Analizi'}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {i18n.language === 'en' 
                ? 'Get comprehensive SEO insights for your website - completely free'
                : 'Web siteniz için kapsamlı SEO öngörüleri alın - tamamen ücretsiz'
              }
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: BarChart3,
                title: i18n.language === 'en' ? 'SEO Score Analysis' : 'SEO Skor Analizi',
                description: i18n.language === 'en' 
                  ? 'Get an overall SEO score and detailed breakdown of your website performance'
                  : 'Genel SEO skoru ve web site performansınızın detaylı dökümünü alın',
                gradient: "from-blue-500 to-purple-600"
              },
              {
                icon: CheckCircle2,
                title: i18n.language === 'en' ? 'Issue Detection' : 'Sorun Tespiti',
                description: i18n.language === 'en'
                  ? 'Identify critical SEO issues that are holding back your rankings'
                  : 'Sıralamanızı engelleyen kritik SEO sorunlarını tespit edin',
                gradient: "from-green-500 to-blue-500"
              },
              {
                icon: Target,
                title: i18n.language === 'en' ? 'Actionable Recommendations' : 'Uygulanabilir Öneriler',
                description: i18n.language === 'en'
                  ? 'Get specific, actionable recommendations to improve your SEO'
                  : 'SEO\'nuzu iyileştirmek için spesifik, uygulanabilir öneriler alın',
                gradient: "from-purple-500 to-pink-500"
              },
              {
                icon: Shield,
                title: i18n.language === 'en' ? 'Technical Analysis' : 'Teknik Analiz',
                description: i18n.language === 'en'
                  ? 'Check meta tags, headers, page speed, and mobile compatibility'
                  : 'Meta etiketler, başlıklar, sayfa hızı ve mobil uyumluluğu kontrol edin',
                gradient: "from-orange-500 to-red-500"
              },
              {
                icon: Globe,
                title: i18n.language === 'en' ? 'Multiple Sites' : 'Çoklu Site',
                description: i18n.language === 'en'
                  ? 'Analyze multiple websites and compare their SEO performance'
                  : 'Birden fazla web sitesini analiz edin ve SEO performanslarını karşılaştırın',
                gradient: "from-teal-500 to-green-500"
              },
              {
                icon: TrendingUp,
                title: i18n.language === 'en' ? 'Performance Insights' : 'Performans Öngörüleri',
                description: i18n.language === 'en'
                  ? 'Understand your SEO potential and improvement opportunities'
                  : 'SEO potansiyelinizi ve iyileştirme fırsatlarınızı anlayın',
                gradient: "from-indigo-500 to-purple-500"
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="group relative bg-white rounded-2xl p-8 border border-gray-200 hover:border-transparent hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                {/* Gradient Border on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10`}></div>
                <div className="absolute inset-[1px] bg-white rounded-2xl -z-10"></div>

                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r ${feature.gradient} text-white mb-6`}>
                  <feature.icon className="h-6 w-6" />
                </div>
                
                <h3 className="text-xl font-bold mb-4 group-hover:text-gray-900 transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              {i18n.language === 'en' ? 'How It Works' : 'Nasıl Çalışır'}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {i18n.language === 'en' 
                ? 'Get your SEO analysis in 3 simple steps'
                : '3 basit adımda SEO analizinizi alın'
              }
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                step: 1,
                title: i18n.language === 'en' ? 'Enter Your URL' : 'URL\'nizi Girin',
                description: i18n.language === 'en' 
                  ? 'Simply enter your website URL and click analyze'
                  : 'Web site URL\'nizi girin ve analiz et\'e tıklayın',
                icon: "🔗"
              },
              {
                step: 2,
                title: i18n.language === 'en' ? 'AI Analysis' : 'AI Analizi',
                description: i18n.language === 'en'
                  ? 'Our AI analyzes your website for SEO issues and opportunities'
                  : 'AI\'mız web sitenizi SEO sorunları ve fırsatları için analiz eder',
                icon: "🤖"
              },
              {
                step: 3,
                title: i18n.language === 'en' ? 'Get Results' : 'Sonuçları Alın',
                description: i18n.language === 'en'
                  ? 'Receive detailed report with actionable recommendations'
                  : 'Uygulanabilir önerilerle detaylı rapor alın',
                icon: "📊"
              }
            ].map((step, index) => (
              <div 
                key={index}
                className="relative group cursor-pointer transition-all duration-500 hover:scale-105"
              >
                <div className="relative bg-white rounded-2xl p-8 border-2 border-gray-200 shadow-lg hover:border-blue-300 hover:shadow-xl transition-all duration-300">
                  {/* Step Number */}
                  <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {step.step}
                  </div>

                  {/* Icon */}
                  <div className="text-6xl mb-6 text-center">{step.icon}</div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold mb-4 text-center">{step.title}</h3>
                  <p className="text-gray-600 text-center leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              {i18n.language === 'en' ? 'What Users Say' : 'Kullanıcılar Ne Diyor'}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {i18n.language === 'en' 
                ? 'Join hundreds of satisfied users who improved their SEO'
                : 'SEO\'larını iyileştiren yüzlerce memnun kullanıcıya katılın'
              }
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="relative bg-white rounded-2xl p-8 border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                {/* Quote Icon */}
                <div className="absolute -top-4 left-8 w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                  <Quote className="h-4 w-4 text-white" />
                </div>

                {/* Stars */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-gray-700 leading-relaxed mb-6 italic">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                    <div className="text-sm text-blue-600">{testimonial.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            {i18n.language === 'en' ? 'Ready to Improve Your SEO?' : 'SEO\'nuzu İyileştirmeye Hazır mısınız?'}
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            {i18n.language === 'en'
              ? 'Get your free SEO analysis now and start improving your search rankings today'
              : 'Ücretsiz SEO analizinizi şimdi alın ve arama sıralamanızı bugün iyileştirmeye başlayın'
            }
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/register" 
             className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-white text-blue-600 font-semibold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-xl"
            >
              <Search className="h-5 w-5" />
              {i18n.language === 'en' ? 'Analyze My Site Free' : 'Sitemi Ücretsiz Analiz Et'}
            </Link>
          </div>

          <div className="mt-12 flex items-center justify-center gap-8 text-white/80">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5" />
              <span className="font-medium">{i18n.language === 'en' ? 'No credit card required' : 'Kredi kartı gerektirmez'}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5" />
              <span className="font-medium">{i18n.language === 'en' ? 'Instant results' : 'Anında sonuç'}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5" />
              <span className="font-medium">{i18n.language === 'en' ? 'Always free' : 'Her zaman ücretsiz'}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="h-6 w-6 text-blue-400" />
                <span className="font-bold text-xl">weeme.ai</span>
              </div>
              <p className="text-gray-400 leading-relaxed max-w-md">
                {i18n.language === 'en'
                  ? "Free SEO analysis tool to help you improve your website's search rankings and performance."
                  : "Web sitenizin arama sıralaması ve performansını iyileştirmenize yardımcı olan ücretsiz SEO analiz aracı."
                }
              </p>
              <div className="flex items-center gap-4 mt-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <span className="text-sm text-gray-400">
                  {i18n.language === 'en' ? '150+ happy users' : '150+ mutlu kullanıcı'}
                </span>
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-semibold mb-4">{i18n.language === 'en' ? 'Product' : 'Ürün'}</h4>
              <ul className="space-y-2 text-gray-400">
                <li><button onClick={() => scrollTo('features')} className="hover:text-white transition-colors">{i18n.language === 'en' ? 'Features' : 'Özellikler'}</button></li>
                <li><button onClick={() => scrollTo('how-it-works')} className="hover:text-white transition-colors">{i18n.language === 'en' ? 'How It Works' : 'Nasıl Çalışır'}</button></li>
                <li><Link to="/register" className="hover:text-white transition-colors">{i18n.language === 'en' ? 'Start Free' : 'Ücretsiz Başla'}</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">{i18n.language === 'en' ? 'Support' : 'Destek'}</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="mailto:support@weeme.ai" className="hover:text-white transition-colors">{i18n.language === 'en' ? 'Contact' : 'İletişim'}</a></li>
                <li><Link to="/login" className="hover:text-white transition-colors">{i18n.language === 'en' ? 'Sign In' : 'Giriş Yap'}</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between">
            <p className="text-gray-400 text-sm">
              {i18n.language === 'en' ? '© 2025 weeme.ai. All rights reserved.' : '© 2025 weeme.ai. Tüm hakları saklıdır.'}
            </p>
            <div className="flex items-center gap-6 mt-4 sm:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                {i18n.language === 'en' ? 'Privacy' : 'Gizlilik'}
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                {i18n.language === 'en' ? 'Terms' : 'Şartlar'}
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;