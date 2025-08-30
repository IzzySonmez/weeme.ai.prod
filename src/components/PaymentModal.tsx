import React, { useState } from 'react';
import { X, CreditCard, Crown, Sparkles, Loader, CheckCircle2, Zap, Target, Users, BarChart3, Code, Globe, Shield, Star, ArrowRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type PackageKey = 'credits' | 'pro' | 'advanced';

const PACKS: Record<PackageKey, {
  title: string;
  price: string;
  originalPrice?: string;
  description: string;
  features: string[];
  popular?: boolean;
  gradient: string;
  icon: React.ComponentType<any>;
  badge?: string;
  savings?: string;
}> = {
  credits: {
    title: '50 Kredi Paketi',
    price: '₺29.99',
    description: 'Free üyeliğinize 50 kredi ekler.',
    features: ['50 SEO taraması', 'Temel raporlar', 'E-posta desteği', '30 gün geçerlilik'],
    gradient: 'from-green-500 to-emerald-600',
    icon: Zap,
    badge: 'HIZLI ÇÖZÜM'
  },
  pro: {
    title: 'Pro Üyelik',
    price: '₺99.99',
    originalPrice: '₺149.99',
    description: 'Sınırsız SEO taraması + AI önerileri',
    features: ['Sınırsız tarama', 'AI SEO önerileri', 'Detaylı raporlar', 'Öncelikli destek', 'Çoklu site yönetimi'],
    popular: true,
    gradient: 'from-blue-600 to-purple-600',
    icon: Target,
    badge: 'EN POPÜLER',
    savings: '%33 İNDİRİM'
  },
  advanced: {
    title: 'Advanced Üyelik',
    price: '₺199.99',
    originalPrice: '₺299.99',
    description: 'Tüm özellikler + AI içerik üretimi',
    features: ['Tüm Pro özellikleri', 'AI içerik üretimi', 'Sosyal medya entegrasyonu', 'Kod snippet\'leri', '7/24 destek', 'API erişimi'],
    gradient: 'from-purple-600 to-pink-600',
    icon: Sparkles,
    badge: 'EN GELİŞMİŞ',
    savings: '%33 İNDİRİM'
  },
};

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose }) => {
  const { user, addCredits, upgradeMembership, refreshUser } = useAuth();
  const [selected, setSelected] = useState<PackageKey>('pro');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = async () => {
    if (!user) return;
    setLoading(true);

    // Demo implementation - replace with real payment processing
    setTimeout(() => {
      if (selected === 'credits') {
        addCredits(50);
        alert('🎉 50 kredi hesabınıza eklendi!');
      } else if (selected === 'pro') {
        upgradeMembership('Pro');
        alert('🚀 Pro üyelik aktif! Tüm AI öneriler artık kullanılabilir.');
      } else if (selected === 'advanced') {
        upgradeMembership('Advanced');
        alert('✨ Advanced üyelik aktif! AI içerik üretimi de dahil tüm özellikler açıldı.');
      }

      refreshUser();
      setLoading(false);
      onClose();
    }, 1500);
  };

  const selectedPack = PACKS[selected];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="text-white">
              <h3 className="text-2xl font-bold">Plan Seçimi</h3>
              <p className="text-white/90 mt-1">İhtiyacınıza en uygun planı seçin</p>
            </div>
            <button 
              onClick={onClose} 
              className="p-2 rounded-full hover:bg-white/20 transition-colors text-white"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
        </div>

        <div className="p-8">
          {/* Current Plan Info */}
          {user && (
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mb-8 border border-blue-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-blue-600 font-medium">Mevcut Planınız</div>
                    <div className="font-bold text-blue-900 text-lg">
                      {user.membershipType} {user.membershipType === 'Free' && `• ${user.credits} kredi kaldı`}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-blue-600 font-medium">Seçilen Plan</div>
                  <div className="font-bold text-blue-900 text-lg">{selectedPack.title}</div>
                </div>
              </div>
            </div>
          )}

          {/* Plans Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {Object.entries(PACKS).map(([key, pack]) => {
              const Icon = pack.icon;
              const isSelected = selected === key;
              
              return (
                <div
                  key={key}
                  className={`relative cursor-pointer transition-all duration-300 ${
                    isSelected ? 'transform scale-105' : 'hover:scale-102'
                  }`}
                  onClick={() => setSelected(key as PackageKey)}
                >
                  {/* Popular Badge */}
                  {pack.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                      <div className="bg-gradient-to-r from-orange-400 to-red-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                        {pack.badge}
                      </div>
                    </div>
                  )}

                  {/* Savings Badge */}
                  {pack.savings && (
                    <div className="absolute -top-3 -right-3 z-10">
                      <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                        {pack.savings}
                      </div>
                    </div>
                  )}

                  <div className={`relative border-3 rounded-2xl p-6 h-full transition-all duration-300 ${
                    isSelected 
                      ? `border-transparent bg-gradient-to-br ${pack.gradient} text-white shadow-2xl` 
                      : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-xl'
                  }`}>
                    {/* Selection Indicator */}
                    {isSelected && (
                      <div className="absolute top-4 right-4 w-6 h-6 bg-white rounded-full flex items-center justify-center">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                      </div>
                    )}

                    {/* Icon */}
                    <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl mb-4 ${
                      isSelected 
                        ? 'bg-white/20 backdrop-blur-sm' 
                        : `bg-gradient-to-r ${pack.gradient}`
                    }`}>
                      <Icon className="h-7 w-7 text-white" />
                    </div>

                    {/* Title */}
                    <h4 className={`text-xl font-bold mb-2 ${isSelected ? 'text-white' : 'text-gray-900'}`}>
                      {pack.title}
                    </h4>

                    {/* Price */}
                    <div className="mb-4">
                      <div className={`text-3xl font-bold ${isSelected ? 'text-white' : 'text-gray-900'}`}>
                        {pack.price}
                        {key !== 'credits' && <span className="text-lg font-normal opacity-70"> / ay</span>}
                      </div>
                      {pack.originalPrice && (
                        <div className={`text-sm line-through ${isSelected ? 'text-white/70' : 'text-gray-500'}`}>
                          {pack.originalPrice}
                        </div>
                      )}
                    </div>

                    {/* Description */}
                    <p className={`text-sm mb-6 ${isSelected ? 'text-white/90' : 'text-gray-600'}`}>
                      {pack.description}
                    </p>

                    {/* Features */}
                    <ul className="space-y-3">
                      {pack.features.map((feature, index) => (
                        <li key={index} className={`flex items-center gap-3 text-sm ${
                          isSelected ? 'text-white/90' : 'text-gray-700'
                        }`}>
                          <CheckCircle2 className={`h-4 w-4 flex-shrink-0 ${
                            isSelected ? 'text-white' : 'text-green-500'
                          }`} />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Selection Glow Effect */}
                    {isSelected && (
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/10 to-transparent pointer-events-none"></div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Payment Section */}
          <div className="bg-gray-50 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h4 className="text-lg font-bold text-gray-900">Ödeme Özeti</h4>
                <p className="text-gray-600">Seçiminizi onaylayın</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">{selectedPack.price}</div>
                {selectedPack.originalPrice && (
                  <div className="text-sm text-gray-500 line-through">{selectedPack.originalPrice}</div>
                )}
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-xl p-4 border border-gray-200 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <CreditCard className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">Güvenli Ödeme</div>
                  <div className="text-sm text-gray-600">256-bit SSL şifreleme ile korunur</div>
                </div>
                <div className="ml-auto flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-500" />
                  <span className="text-sm text-green-600 font-medium">Güvenli</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4">
              <button
                onClick={onClose}
                className="flex-1 px-6 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors font-medium"
              >
                İptal
              </button>
              
              <button
                onClick={handleConfirm}
                disabled={loading}
                className={`flex-1 inline-flex items-center justify-center gap-3 px-6 py-3 rounded-xl text-white font-bold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-60 disabled:transform-none bg-gradient-to-r ${selectedPack.gradient}`}
              >
                {loading ? (
                  <>
                    <Loader className="h-5 w-5 animate-spin" />
                    <span>İşleniyor...</span>
                  </>
                ) : (
                  <>
                    <CreditCard className="h-5 w-5" />
                    <span>Onayla & Öde</span>
                    <ArrowRight className="h-5 w-5" />
                  </>
                )}
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="mt-6 flex items-center justify-center gap-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-green-500" />
                <span>SSL Güvenli</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span>İstediğiniz zaman iptal</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-500" />
                <span>7 gün para iade garantisi</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;