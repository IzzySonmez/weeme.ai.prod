import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, UserPlus, Sparkles, Eye, EyeOff, Mail, User, Lock, ArrowRight, CheckCircle2, Shield, Zap, Star, Globe, Award } from 'lucide-react';
import LoadingSpinner from './LoadingSpinner';

type Mode = 'login' | 'register';

interface LoginProps {
  mode?: Mode;
}

const Login: React.FC<LoginProps> = ({ mode }) => {
  const { login, register, user, isLoading } = useAuth();
  const navigate = useNavigate();

  const [active, setActive] = useState<Mode>(mode || 'login');

  // Login/register başarılıysa panele
  useEffect(() => {
    if (user) {
      console.log('User logged in, redirecting to dashboard');
      navigate('/app', { replace: true });
    }
  }, [user, navigate]);

  // Update active mode when prop changes
  useEffect(() => {
    if (mode) {
      setActive(mode);
    }
  }, [mode]);

  // Form state
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState(''); // register için
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      alert('Kullanıcı adı ve şifre girin.');
      return;
    }
    
    setBusy(true);
    try {
      const ok = await login(username.trim(), password);
      if (ok) {
        console.log('Login successful');
        navigate('/app', { replace: true });
      } else {
        alert('Giriş başarısız. Kullanıcı adı veya şifre hatalı.');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Giriş sırasında bir hata oluştu.');
    } finally {
      setBusy(false);
    }
  };

  const handleRegister = async () => {
    if (!username.trim() || !email.trim() || !password.trim()) {
      alert('Tüm alanları doldurun.');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      alert('Geçerli bir e-posta adresi girin.');
      return;
    }
    
    // Password validation
    if (password.length < 6) {
      alert('Şifre en az 6 karakter olmalıdır.');
      return;
    }
    
    setBusy(true);
    try {
      const ok = await register(username.trim(), email.trim(), password);
      if (ok) {
        console.log('Registration successful');
        navigate('/app', { replace: true });
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('Kayıt sırasında bir hata oluştu.');
    } finally {
      setBusy(false);
    }
  };

  if (isLoading) {
    return <LoadingSpinner message="Giriş kontrol ediliyor..." size="lg" fullScreen />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 min-h-screen flex">
        {/* Left Side - Branding */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          
          {/* Decorative Elements */}
          <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full animate-float"></div>
          <div className="absolute bottom-40 right-20 w-24 h-24 bg-white/10 rounded-full animate-float animation-delay-2000"></div>
          <div className="absolute top-1/2 left-10 w-16 h-16 bg-white/10 rounded-full animate-pulse"></div>
          
          <div className="relative z-10 flex flex-col justify-center px-20 text-white">
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  <Sparkles className="h-12 w-12 text-white animate-pulse" />
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full animate-ping"></div>
                </div>
                <span className="text-4xl font-bold">weeme.ai</span>
              </div>
              
              <h1 className="text-5xl font-bold leading-tight mb-6">
                SEO'nuzu{' '}
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                  yapay zekâ
                </span>{' '}
                ile otomatikleştirin
              </h1>
              
              <p className="text-xl text-white/90 leading-relaxed mb-8">
                Tek bir kod satırı ile sitenizi bağlayın. AI destekli kapsamlı SEO analizi, 
                otomatik raporlar ve eylem planları ile organik trafiğinizi artırın.
              </p>
            </div>

            {/* Features */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Zap className="h-5 w-5" />
                </div>
                <span className="text-lg">3 dakikada kurulum</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Shield className="h-5 w-5" />
                </div>
                <span className="text-lg">Güvenli ve GDPR uyumlu</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Award className="h-5 w-5" />
                </div>
                <span className="text-lg">500+ mutlu müşteri</span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/20">
              <div className="text-center">
                <div className="text-3xl font-bold">500+</div>
                <div className="text-white/80">Aktif Site</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">%87</div>
                <div className="text-white/80">Ortalama Artış</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">15K+</div>
                <div className="text-white/80">Toplam Tarama</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Forms */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            {/* Mobile Logo */}
            <div className="lg:hidden text-center mb-8">
              <Link
                to="/"
                className="inline-flex items-center gap-3 group"
              >
                <div className="relative">
                  <Sparkles className="h-10 w-10 text-blue-600 group-hover:text-blue-700 transition-colors animate-pulse" />
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-ping"></div>
                </div>
                <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  weeme.ai
                </span>
              </Link>
            </div>

            {/* Form Card */}
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
              {/* Tab Navigation */}
              <div className="bg-gray-50 p-2">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setActive('login')}
                    className={`relative py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                      active === 'login' 
                        ? 'bg-white text-blue-600 shadow-md' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <LogIn className="h-4 w-4 inline mr-2" />
                    Giriş Yap
                  </button>
                  <button
                    onClick={() => setActive('register')}
                    className={`relative py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                      active === 'register' 
                        ? 'bg-white text-blue-600 shadow-md' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <UserPlus className="h-4 w-4 inline mr-2" />
                    Üye Ol
                  </button>
                </div>
              </div>

              {/* Form Content */}
              <div className="p-8">
                {active === 'login' ? (
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">Tekrar Hoş Geldiniz</h2>
                      <p className="text-gray-600">Hesabınıza giriş yapın</p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Kullanıcı Adı
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <input
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="kullaniciadi"
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Şifre
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <input
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="•••••••"
                            className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                          >
                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                          </button>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={handleLogin}
                      disabled={busy || !username || !password}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-3"
                    >
                      {busy ? (
                        <LoadingSpinner size="sm" message="" />
                      ) : (
                        <LogIn className="h-5 w-5" />
                      )}
                      {busy ? 'Giriş yapılıyor...' : 'Giriş Yap'}
                    </button>

                    <div className="text-center">
                      <p className="text-gray-600">
                        Hesabın yok mu?{' '}
                        <button 
                          onClick={() => setActive('register')}
                          className="text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-colors"
                        >
                          Hemen üye ol
                        </button>
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">Hesap Oluşturun</h2>
                      <p className="text-gray-600">3 ücretsiz kredi ile başlayın</p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Kullanıcı Adı
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <input
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="kullaniciadi"
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          E‑posta
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="ornek@domain.com"
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Şifre
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <input
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="•••••••"
                            className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                          >
                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Benefits */}
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4">
                      <h4 className="font-semibold text-green-900 mb-3 flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5" />
                        Ücretsiz Başlangıç Paketi
                      </h4>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center gap-2">
                          <Zap className="h-4 w-4 text-green-600" />
                          <span className="text-green-800">3 ücretsiz tarama</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Shield className="h-4 w-4 text-green-600" />
                          <span className="text-green-800">Detaylı raporlar</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Globe className="h-4 w-4 text-green-600" />
                          <span className="text-green-800">Çoklu site desteği</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Star className="h-4 w-4 text-green-600" />
                          <span className="text-green-800">Premium destek</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={handleRegister}
                      disabled={busy || !username || !email || !password}
                      className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-3"
                    >
                      {busy ? (
                        <LoadingSpinner size="sm" message="" />
                      ) : (
                        <UserPlus className="h-5 w-5" />
                      )}
                      <span>{busy ? 'Hesap oluşturuluyor...' : 'Ücretsiz Hesap Oluştur'}</span>
                    </button>

                    <div className="text-center">
                      <p className="text-gray-600">
                        Zaten hesabın var mı?{' '}
                        <button 
                          onClick={() => setActive('login')}
                          className="text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-colors"
                        >
                          Giriş yap
                        </button>
                      </p>
                    </div>
                  </div>
                )}

                {/* Terms */}
                <div className="mt-6 text-center">
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Devam ederek{' '}
                    <a href="#" className="text-blue-600 hover:underline">Kullanım Koşulları</a>
                    {' '}ve{' '}
                    <a href="#" className="text-blue-600 hover:underline">Gizlilik Politikası</a>
                    'nı kabul etmiş olursunuz.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;