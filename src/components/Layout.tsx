import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LogOut, BarChart3, Lightbulb, Sparkles, CreditCard, Settings, User, Crown, Bell, Search, Menu, X, Zap, Target } from 'lucide-react';

type Tab = 'dashboard' | 'suggestions' | 'ai-content';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
  onOpenBilling: () => void;
  onOpenDataTools?: () => void;
  onLogout?: () => void;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  activeTab,
  onTabChange,
  onOpenBilling,
  onOpenDataTools,
  onLogout,
}) => {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const tabs: Array<{ id: Tab; label: string; icon: React.ComponentType<any>; guard: (m?: string) => boolean; description: string }> = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3, guard: () => true, description: 'SEO raporları ve site yönetimi' },
    { id: 'suggestions', label: 'AI Öneriler', icon: Lightbulb, guard: (m?: string) => m === 'Pro' || m === 'Advanced', description: 'Yapay zeka destekli SEO önerileri' },
    { id: 'ai-content', label: 'İçerik Üret', icon: Sparkles, guard: (m?: string) => m === 'Advanced', description: 'AI ile sosyal medya içeriği' },
  ];

  const membershipConfig = {
    'Advanced': { 
      badge: <span className="px-3 py-1 rounded-full text-xs bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold">Advanced</span>,
      icon: <Crown className="h-4 w-4 text-purple-600" />,
      color: 'purple'
    },
    'Pro': { 
      badge: <span className="px-3 py-1 rounded-full text-xs bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold">Pro</span>,
      icon: <Target className="h-4 w-4 text-blue-600" />,
      color: 'blue'
    },
    'Free': { 
      badge: <span className="px-3 py-1 rounded-full text-xs bg-gray-100 text-gray-700 font-semibold">Free</span>,
      icon: <User className="h-4 w-4 text-gray-600" />,
      color: 'gray'
    }
  };

  const currentMembership = membershipConfig[user?.membershipType || 'Free'];

  const creditDisplay =
    user?.membershipType === 'Free'
      ? <div className="flex items-center gap-2 text-sm text-gray-700 bg-white/80 px-3 py-1 rounded-full border">
          <Zap className="h-4 w-4 text-green-500" />
          <span>Kredi: <strong>{user?.credits ?? 0}</strong></span>
        </div>
      : <div className="flex items-center gap-2 text-sm text-gray-700 bg-white/80 px-3 py-1 rounded-full border">
          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
          <span><strong>Sınırsız</strong></span>
        </div>;

  const handleLogout = () => {
    logout();
    onLogout?.();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link
                to="/"
                className="flex items-center gap-3 group"
                aria-label="weeme.ai ana sayfa"
              >
                <div className="relative">
                  <Sparkles className="h-7 w-7 text-blue-600 group-hover:text-blue-700 transition-colors" />
                  <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent group-hover:from-blue-700 group-hover:to-purple-700 transition-all">
                  weeme.ai
                </span>
              </Link>
            </div>

            {/* Desktop User Info & Actions */}
            <div className="hidden lg:flex items-center space-x-6">
              <div className="flex items-center gap-4">
                <div className="text-gray-700">
                  Merhaba, <span className="font-semibold text-gray-900">{user?.username}</span>
                </div>
                <div className="flex items-center gap-2">
                  {currentMembership.icon}
                  {currentMembership.badge}
                </div>
                {creditDisplay}
              </div>

              <button className="relative p-2 rounded-xl hover:bg-gray-100 transition-colors">
                <Bell className="h-5 w-5 text-gray-600" />
                <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full"></div>
              </button>

              <button
                onClick={onOpenBilling}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
                aria-label="Plan ve ödeme ayarları"
              >
                <CreditCard className="h-4 w-4" />
                <span>Plan & Ödeme</span>
              </button>

              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 px-3 py-2 rounded-xl hover:bg-gray-100 transition-all duration-200"
                aria-label="Çıkış yap"
              >
                <LogOut className="h-4 w-4" />
                <span className="font-medium">Çıkış</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden border-t border-gray-200 bg-white/95 backdrop-blur-xl">
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-4 pb-4 border-b border-gray-200">
                  <div className="text-gray-700">
                    <span className="font-semibold text-gray-900">{user?.username}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {currentMembership.icon}
                    {currentMembership.badge}
                  </div>
                </div>
                
                {creditDisplay}
                
                <button
                  onClick={() => {
                    onOpenBilling();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                >
                  <CreditCard className="h-5 w-5" />
                  Plan & Ödeme
                </button>
                
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-gray-600 px-6 py-3 rounded-xl border border-gray-300 flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                  Çıkış Yap
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white/60 backdrop-blur-xl border-b border-gray-200/50 shadow-sm sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const allowed = tab.guard(user?.membershipType);
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => allowed && onTabChange(tab.id)}
                  className={`relative flex items-center space-x-2 py-4 px-6 font-semibold transition-all duration-300 rounded-t-xl whitespace-nowrap ${
                    active 
                      ? 'bg-white text-blue-600 shadow-lg border-b-2 border-blue-600'
                      : allowed
                        ? 'text-gray-700 hover:text-blue-600 hover:bg-white/80'
                        : 'text-gray-400 cursor-not-allowed opacity-50'
                  }`}
                  disabled={!allowed}
                  aria-current={active ? 'page' : undefined}
                  title={!allowed ? `Bu sekme ${tab.guard('Pro') ? 'Pro' : 'Advanced'} üyelerde aktif` : tab.description}
                  role="tab"
                  aria-selected={active}
                >
                  <Icon className="h-5 w-5" />
                  <span className="hidden sm:inline">{tab.label}</span>
                  
                  {!allowed && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                      <Crown className="h-2 w-2 text-white" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
};

export default Layout;