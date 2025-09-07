import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LanguageSwitcher from './LanguageSwitcher';
import { LogOut, BarChart3, Sparkles, User, Menu, X, Search } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
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
                aria-label="weeme.ai home"
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
              <LanguageSwitcher />
              <div className="flex items-center gap-4">
                <div className="text-gray-700">
                  {t('dashboard.welcome')}, <span className="font-semibold text-gray-900">{user?.username}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-600" />
                  <span className="px-3 py-1 rounded-full text-xs bg-gray-100 text-gray-700 font-semibold">
                    {t('home.pricing.free.title')}
                  </span>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 px-3 py-2 rounded-xl hover:bg-gray-100 transition-all duration-200"
                aria-label={t('auth.logout')}
              >
                <LogOut className="h-4 w-4" />
                <span className="font-medium">{t('auth.logout')}</span>
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
                    <User className="h-4 w-4 text-gray-600" />
                    <span className="px-3 py-1 rounded-full text-xs bg-gray-100 text-gray-700 font-semibold">
                      {t('home.pricing.free.title')}
                    </span>
                  </div>
                </div>
                
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-gray-600 px-6 py-3 rounded-xl border border-gray-300 flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                  {t('auth.logout')}
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
            <div className="relative flex items-center space-x-2 py-4 px-6 font-semibold bg-white text-blue-600 shadow-lg border-b-2 border-blue-600 rounded-t-xl whitespace-nowrap">
              <BarChart3 className="h-5 w-5" />
              <span className="hidden sm:inline">{t('navigation.dashboard')}</span>
            </div>
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