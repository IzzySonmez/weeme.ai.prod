import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import LanguageSwitcher from './LanguageSwitcher';
import { 
  Sparkles, 
  Rocket, 
  BarChart3, 
  CheckCircle2, 
  CalendarClock, 
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
  Quote
} from 'lucide-react';

const Home: React.FC = () => {
  const { t } = useTranslation();
  const [activeStep, setActiveStep] = useState(0);
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
        sites: 500,
        improvement: 87,
        scans: 15000,
        satisfaction: 98
      });
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Auto-rotate steps
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const steps = [
    {
      title: t('home.howItWorks.steps.addCode.title'),
      description: t('home.howItWorks.steps.addCode.description'),
      icon: "🔗"
    },
    {
      title: t('home.howItWorks.steps.autoScan.title'),
      description: t('home.howItWorks.steps.autoScan.description'),
      icon: "🤖"
    },
    {
      title: t('home.howItWorks.steps.getResults.title'),
      description: t('home.howItWorks.steps.getResults.description'),
      icon: "📊"
    }
  ];

  const testimonials = [
    {
      name: i18n.language === 'en' ? "John Smith" : "Ahmet Yılmaz",
      role: i18n.language === 'en' ? "E-commerce Manager" : "E-ticaret Müdürü",
      company: "TechStore",
      content: i18n.language === 'en' 
        ? "Thanks to weeme.ai, our organic traffic increased by 150% in 3 months. Automated reports are very valuable."
        : "weeme.ai sayesinde organik trafiğimiz 3 ayda %150 arttı. Otomatik raporlar çok değerli.",
      rating: 5,
      avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
    },
    {
      name: i18n.language === 'en' ? "Sarah Johnson" : "Elif Kaya",
      role: i18n.language === 'en' ? "Digital Marketing Specialist" : "Dijital Pazarlama Uzmanı",
      company: "StartupCo",
      content: i18n.language === 'en'
        ? "AI suggestions really work. My SEO knowledge was limited but now I get professional results."
        : "AI önerileri gerçekten işe yarıyor. SEO bilgim sınırlıydı ama şimdi profesyonel sonuçlar alıyorum.",
      rating: 5,
      avatar: "https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
    },
    {
      name: i18n.language === 'en' ? "Michael Brown" : "Mehmet Özkan",
      role: i18n.language === 'en' ? "Founder" : "Kurucu",
      company: "DigitalAgency",
      content: i18n.language === 'en'
        ? "The reports we provide to our clients are very professional. weeme.ai accelerated our business processes."
        : "Müşterilerimize sunduğumuz raporlar çok profesyonel. weeme.ai iş süreçlerimizi hızlandırdı.",
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
              <Sparkles className="h-7 w-7 text-purple-600 animate-pulse" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-ping"></div>
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              weeme.ai
            </span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <button onClick={() => scrollTo('features')} className="text-gray-600 hover:text-purple-600 transition-colors">
              {t('navigation.features')}
            </button>
            <button onClick={() => scrollTo('how-it-works')} className="text-gray-600 hover:text-purple-600 transition-colors">
              {t('navigation.howItWorks')}
            </button>
            <button onClick={() => scrollTo('plans')} className="text-gray-600 hover:text-purple-600 transition-colors">
              {t('navigation.plans')}
            </button>
            <button onClick={() => scrollTo('testimonials')} className="text-gray-600 hover:text-purple-600 transition-colors">
              {t('navigation.testimonials')}
            </button>
            <LanguageSwitcher />
            <Link 
              to="/login" 
              className="px-4 py-2 rounded-lg border border-gray-300 hover:border-purple-300 hover:bg-purple-50 transition-all duration-200"
            >
              {t('auth.login')}
            </Link>
            <Link 
              to="/register" 
              className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              {t('home.startFree')}
            </Link>
          </nav>
          
          <div className="md:hidden">
            <LanguageSwitcher />
            <Link 
              to="/register" 
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-medium"
            >
              {t('home.startFree')}
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-purple-200 text-sm font-medium text-purple-700">
                <Zap className="h-4 w-4" />
                <span>{t('home.aiPoweredSeo')}</span>
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
                {t('home.subtitle')}{' '}
                <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent animate-gradient">
                  {i18n.language === 'en' ? 'artificial intelligence' : 'yapay zekâ'}
                </span>{' '}
                {i18n.language === 'en' ? '' : 'ile otomatikleştirin'}
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
                {t('home.description')}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/register" 
                  className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-200 shadow-xl hover:shadow-2xl"
                >
                  <Rocket className="h-5 w-5 group-hover:animate-bounce" />
                  {t('home.startFree')}
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                
                <button 
                  onClick={() => scrollTo('demo')}
                  className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-white/80 backdrop-blur-sm border border-gray-200 text-gray-700 font-semibold text-lg hover:bg-white hover:border-purple-300 transition-all duration-200"
                >
                  <Play className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  {t('home.watchDemo')}
                </button>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    {stats.sites.toLocaleString('tr-TR')}+
                  </div>
                  <div className="text-sm text-gray-600">{t('home.stats.activeSites')}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    %{stats.improvement}
                  </div>
                  <div className="text-sm text-gray-600">{t('home.stats.averageIncrease')}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    {stats.scans.toLocaleString('tr-TR')}+
                  </div>
                  <div className="text-sm text-gray-600">{t('home.stats.totalScans')}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    %{stats.satisfaction}
                  </div>
                  <div className="text-sm text-gray-600">{t('home.stats.satisfaction')}</div>
                </div>
              </div>
            </div>

            {/* Right - Interactive Dashboard Preview */}
            <div className="relative">
              <div className="relative bg-white/60 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-8 transform hover:scale-105 transition-all duration-500">
                {/* Dashboard Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                  <div className="text-sm text-gray-500">weeme.ai Dashboard</div>
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
                        strokeDasharray={`${2 * Math.PI * 50 * 0.85} ${2 * Math.PI * 50}`}
                        className="animate-pulse"
                      />
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#8b5cf6" />
                          <stop offset="100%" stopColor="#ec4899" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                          85
                        </div>
                        <div className="text-xs text-gray-500">SEO Skoru</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200/50">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      <span className="text-xs font-medium text-green-700">Güçlü</span>
                    </div>
                    <div className="text-2xl font-bold text-green-800">12</div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl p-4 border border-yellow-200/50">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="h-4 w-4 text-yellow-600" />
                      <span className="text-xs font-medium text-yellow-700">İyileştir</span>
                    </div>
                    <div className="text-2xl font-bold text-yellow-800">5</div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-blue-50 to-sky-50 rounded-xl p-4 border border-blue-200/50">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-4 w-4 text-blue-600" />
                      <span className="text-xs font-medium text-blue-700">Trend</span>
                    </div>
                    <div className="text-2xl font-bold text-blue-800">+15%</div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-white/50 rounded-lg border border-gray-200/50">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-700">Meta başlıklar optimize edildi</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white/50 rounded-lg border border-gray-200/50">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-700">Sitemap güncellendi</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white/50 rounded-lg border border-gray-200/50">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-700">AI önerileri hazır</span>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white animate-bounce">
                <Sparkles className="h-6 w-6" />
              </div>
              <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              {t('home.howItWorks.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('home.howItWorks.subtitle')}
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div 
                key={index}
                className={`relative group cursor-pointer transition-all duration-500 ${
                  activeStep === index ? 'scale-105' : 'hover:scale-105'
                }`}
                onClick={() => setActiveStep(index)}
              >
                <div className={`relative bg-white rounded-2xl p-8 border-2 transition-all duration-300 ${
                  activeStep === index 
                    ? 'border-purple-300 shadow-2xl bg-gradient-to-br from-purple-50 to-pink-50' 
                    : 'border-gray-200 shadow-lg hover:border-purple-200 hover:shadow-xl'
                }`}>
                  {/* Step Number */}
                  <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </div>

                  {/* Icon */}
                  <div className="text-6xl mb-6 text-center">{step.icon}</div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold mb-4 text-center">{step.title}</h3>
                  <p className="text-gray-600 text-center leading-relaxed">{step.description}</p>

                  {/* Active Indicator */}
                  {activeStep === index && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-4 h-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full animate-pulse"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              {t('home.features.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('home.features.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: BarChart3,
                title: t('home.features.seoAnalysis.title'),
                description: t('home.features.seoAnalysis.description'),
                gradient: "from-blue-500 to-purple-600"
              },
              {
                icon: CalendarClock,
                title: t('home.features.autoReporting.title'),
                description: t('home.features.autoReporting.description'),
                gradient: "from-green-500 to-blue-500"
              },
              {
                icon: Sparkles,
                title: t('home.features.aiSuggestions.title'),
                description: t('home.features.aiSuggestions.description'),
                gradient: "from-purple-500 to-pink-500"
              },
              {
                icon: Shield,
                title: t('home.features.secureIntegration.title'),
                description: t('home.features.secureIntegration.description'),
                gradient: "from-orange-500 to-red-500"
              },
              {
                icon: Globe,
                title: t('home.features.multiSite.title'),
                description: t('home.features.multiSite.description'),
                gradient: "from-teal-500 to-green-500"
              },
              {
                icon: TrendingUp,
                title: t('home.features.performanceTracking.title'),
                description: t('home.features.performanceTracking.description'),
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

      {/* Demo Video Section */}
      <section id="demo" className="py-24 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              {t('home.watchDemo')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {i18n.language === 'en' 
                ? "See how weeme.ai works in 2 minutes"
                : "weeme.ai'nin nasıl çalıştığını 2 dakikada görün"
              }
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="relative bg-white/60 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                <button className="group flex items-center justify-center w-20 h-20 bg-white/90 backdrop-blur-sm rounded-full shadow-xl hover:scale-110 transition-all duration-300">
                  <Play className="h-8 w-8 text-purple-600 ml-1 group-hover:scale-110 transition-transform" />
                </button>
              </div>
              
              {/* Video Overlay Info */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/80 backdrop-blur-sm rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {i18n.language === 'en' ? 'SEO Automation Demo' : 'SEO Otomasyonu Demo'}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {i18n.language === 'en' ? 'Complete process from setup to results' : 'Kurulumdan sonuçlara kadar tüm süreç'}
                    </p>
                  </div>
                  <div className="text-sm text-gray-500">2:30</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              {t('home.testimonials.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('home.testimonials.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="relative bg-white rounded-2xl p-8 border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                {/* Quote Icon */}
                <div className="absolute -top-4 left-8 w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
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
                    <div className="text-sm text-purple-600">{testimonial.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="plans" className="py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              {t('home.pricing.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('home.pricing.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <div className="relative bg-white rounded-2xl p-8 border-2 border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">{t('home.pricing.free.title')}</h3>
                <div className="text-4xl font-bold mb-2">{t('home.pricing.free.price')}</div>
                <p className="text-gray-600">{t('home.pricing.free.description')}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {t('home.pricing.free.features', { returnObjects: true }).map((feature: string, index: number) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link 
                to="/register" 
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 border-gray-300 text-gray-700 font-semibold hover:border-purple-300 hover:bg-purple-50 transition-all duration-200"
              >
                {t('home.startFree')}
              </Link>
            </div>

            {/* Pro Plan */}
            <div className="relative bg-white rounded-2xl p-8 border-2 border-blue-300 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold rounded-full">
                {t('home.pricing.pro.popular')}
              </div>

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">{t('home.pricing.pro.title')}</h3>
                <div className="text-4xl font-bold mb-2">
                  {t('home.pricing.pro.price')}<span className="text-lg text-gray-500">{i18n.language === 'en' ? '/mo' : '/ay'}</span>
                </div>
                <p className="text-gray-600">{t('home.pricing.pro.description')}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {t('home.pricing.pro.features', { returnObjects: true }).map((feature: string, index: number) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link 
                to="/register" 
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                {i18n.language === 'en' ? 'Go Pro' : 'Pro\'ya Geç'}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Advanced Plan */}
            <div className="relative bg-white rounded-2xl p-8 border-2 border-purple-300 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold rounded-full">
                {t('home.pricing.advanced.badge')}
              </div>

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">{t('home.pricing.advanced.title')}</h3>
                <div className="text-4xl font-bold mb-2">
                  {t('home.pricing.advanced.price')}<span className="text-lg text-gray-500">{i18n.language === 'en' ? '/mo' : '/ay'}</span>
                </div>
                <p className="text-gray-600">{t('home.pricing.advanced.description')}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {t('home.pricing.advanced.features', { returnObjects: true }).map((feature: string, index: number) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link 
                to="/register" 
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                {i18n.language === 'en' ? 'Go Advanced' : 'Advanced\'e Geç'}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Sık Sorulan{' '}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Sorular
              </span>
            </h2>
            <p className="text-xl text-gray-600">
              Merak ettiklerinizin cevapları burada
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                question: i18n.language === 'en' ? "How to install weeme.ai?" : "weeme.ai nasıl kurulur?",
                answer: i18n.language === 'en' 
                  ? "Very simple! Add the single line of code generated in the panel to your site's <head> section. Installation is completed in 3 minutes and scanning starts immediately."
                  : "Çok basit! Panelde üretilen tek satır kodu sitenizin <head> bölümüne ekleyin. Kurulum 3 dakikada tamamlanır ve hemen tarama başlar."
              },
              {
                question: i18n.language === 'en' ? "Which CMS platforms are supported?" : "Hangi CMS'ler destekleniyor?",
                answer: i18n.language === 'en'
                  ? "WordPress, Shopify, Wix, Squarespace, custom HTML sites and all modern web platforms are supported. The only requirement is HTML head access."
                  : "WordPress, Shopify, Wix, Squarespace, custom HTML siteleri ve tüm modern web platformları desteklenir. Tek gereksinim HTML head erişimi."
              },
              {
                question: i18n.language === 'en' ? "How reliable are AI suggestions?" : "AI önerileri ne kadar güvenilir?",
                answer: i18n.language === 'en'
                  ? "Our AI model was trained with 10,000+ successful SEO cases. It tracks Google's current algorithm changes and has 95%+ accuracy rate."
                  : "AI modelimiz 10,000+ başarılı SEO vakası ile eğitildi. Google'ın güncel algoritma değişikliklerini takip eder ve %95+ doğruluk oranına sahiptir."
              },
              {
                question: i18n.language === 'en' ? "How is data security ensured?" : "Veri güvenliği nasıl sağlanıyor?",
                answer: i18n.language === 'en'
                  ? "All data is encrypted with SSL, GDPR compliant. We only collect necessary SEO metrics, no personal data is stored."
                  : "Tüm veriler SSL ile şifrelenir, GDPR uyumludur. Sadece gerekli SEO metriklerini toplarız, kişisel veri saklamayız."
              },
              {
                question: i18n.language === 'en' ? "What are the free plan limitations?" : "Ücretsiz plan sınırları neler?",
                answer: i18n.language === 'en'
                  ? "Includes 3 scan credits, basic report and dashboard access. When credits run out, you can buy additional credits or upgrade to Pro plan."
                  : "3 tarama kredisi, temel rapor ve panel erişimi içerir. Kredi bitince ek kredi satın alabilir veya Pro plana geçebilirsiniz."
              },
              {
                question: i18n.language === 'en' ? "What happens when I want to cancel?" : "İptal etmek istediğimde ne olur?",
                answer: i18n.language === 'en'
                  ? "You can cancel anytime. Service continues until the end of current period, auto-renewal stops."
                  : "İstediğiniz zaman iptal edebilirsiniz. Mevcut dönem sonuna kadar hizmet devam eder, otomatik yenileme durur."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-6 hover:bg-gray-100 transition-colors duration-200">
                <h3 className="text-lg font-semibold mb-3 text-gray-900">{faq.question}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            {t('home.cta.title')}
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            {t('home.cta.description')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/register" 
             className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-white text-purple-600 font-semibold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-xl"
            >
              <Rocket className="h-5 w-5" />
              {t('home.startFree')}
            </Link>
            
            <button 
              onClick={() => scrollTo('demo')}
             className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl border-2 border-white text-white font-semibold text-lg hover:bg-white hover:text-purple-600 transition-all duration-200"
            >
              <Play className="h-5 w-5" />
              {t('home.watchDemo')}
            </button>
          </div>

          <div className="mt-12 flex items-center justify-center gap-8 text-white/80">
            {t('home.cta.benefits', { returnObjects: true }).map((benefit: string, index: number) => (
              <div key={index} className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5" />
                <span className="font-medium">{benefit}</span>
              </div>
            ))}
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
                <Sparkles className="h-6 w-6 text-purple-400" />
                <span className="font-bold text-xl">weeme.ai</span>
              </div>
              <p className="text-gray-400 leading-relaxed max-w-md">
                {i18n.language === 'en'
                  ? "Increase your site's organic traffic with AI-powered SEO automation. Professional results, simple setup."
                  : "AI destekli SEO otomasyonu ile sitenizin organik trafiğini artırın. Profesyonel sonuçlar, basit kurulum."
                }
              </p>
              <div className="flex items-center gap-4 mt-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <span className="text-sm text-gray-400">
                  {i18n.language === 'en' ? '500+ happy customers' : '500+ mutlu müşteri'}
                </span>
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-semibold mb-4">{i18n.language === 'en' ? 'Product' : 'Ürün'}</h4>
              <ul className="space-y-2 text-gray-400">
                <li><button onClick={() => scrollTo('features')} className="hover:text-white transition-colors">{t('navigation.features')}</button></li>
                <li><button onClick={() => scrollTo('plans')} className="hover:text-white transition-colors">{t('navigation.plans')}</button></li>
                <li><button onClick={() => scrollTo('demo')} className="hover:text-white transition-colors">{t('home.watchDemo')}</button></li>
                <li><Link to="/register" className="hover:text-white transition-colors">{t('home.startFree')}</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">{i18n.language === 'en' ? 'Support' : 'Destek'}</h4>
              <ul className="space-y-2 text-gray-400">
                <li><button onClick={() => scrollTo('faq')} className="hover:text-white transition-colors">{i18n.language === 'en' ? 'FAQ' : 'SSS'}</button></li>
                <li><a href="mailto:support@weeme.ai" className="hover:text-white transition-colors">{t('navigation.contact')}</a></li>
                <li><Link to="/login" className="hover:text-white transition-colors">{t('auth.login')}</Link></li>
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
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                {i18n.language === 'en' ? 'Cookies' : 'Çerezler'}
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;