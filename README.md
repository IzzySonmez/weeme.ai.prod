# weeme.ai - Ücretsiz AI SEO Tarayıcı

Basit, hızlı ve etkili SEO analizi. GPT-4 ile desteklenen ücretsiz araç.

## 🎯 MVP Özellikleri

### ✨ Temel Özellikler
- **Ücretsiz SEO Analizi**: 3 ücretsiz tarama hakkı
- **GPT-4 Destekli**: En son AI teknolojisi ile analiz
- **Anında Sonuç**: Saniyeler içinde detaylı rapor
- **Basit Kullanım**: URL gir, analiz et, sonucu al

### 🚀 3 Adımda SEO Analizi
1. **URL Gir**: Web sitesi adresini yapıştır
2. **AI Analizi**: GPT-4 ile kapsamlı tarama
3. **Sonuçları Al**: Güçlü yönler, sorunlar ve öneriler

## 🛠️ Kurulum

```bash
# Repository'yi klonla
git clone <repo-url>
cd weemeai

# Dependencies yükle
npm install

# Environment variables ayarla
cp .env.example .env.local
# .env.local dosyasına OpenAI API key ekle

# Development server başlat
npm run dev
```

## 🔑 Gerekli Environment Variables

```env
# OpenAI API Key (ZORUNLU)
OPENAI_API_KEY=sk-proj-your-actual-openai-api-key-here

# API Base URL
VITE_API_BASE=http://localhost:8787
```

## 🚀 Production Deployment

### Vercel (Önerilen)
```bash
npm i -g vercel
vercel --prod
```

### Manuel Deployment
```bash
npm run build
npm start
```

## 📊 API Endpoints

### SEO Tarama
```
POST /api/seo-scan
Body: { url: "https://example.com" }
Response: {
  ok: true,
  report: {
    score: 85,
    positives: [...],
    negatives: [...],
    suggestions: [...]
  }
}
```

### Health Check
```
GET /health
Response: {
  status: "healthy",
  openai: "configured"
}
```

## 🎨 Özellikler

- ✅ **Tamamen Ücretsiz**: 3 tarama hakkı
- ✅ **GPT-4 Destekli**: En gelişmiş AI analizi
- ✅ **Responsive Tasarım**: Tüm cihazlarda çalışır
- ✅ **Hızlı Sonuç**: 10 saniyede analiz
- ✅ **Detaylı Rapor**: Güçlü yönler, sorunlar, öneriler
- ✅ **Kredi Sistemi**: Daha fazla tarama için kredi satın alma

## 🔧 Teknik Detaylar

### Frontend
- **React 18** + TypeScript
- **Tailwind CSS** + Custom animations
- **React Router** v7
- **Vite** build tool

### Backend
- **Express.js** API server
- **OpenAI GPT-4 Mini** integration
- **Rate limiting** protection
- **CORS** security

### AI Integration
- **GPT-4 Mini** model kullanımı
- **Semantic search** optimizasyonu
- **2025 SEO trends** dahil
- **Fallback system** API olmadığında

## 💡 Kullanım Senaryoları

1. **Web Geliştiriciler**: Müşteri sitelerini hızlı analiz
2. **Dijital Ajanslar**: SEO audit raporları
3. **İşletme Sahipleri**: Kendi sitelerini kontrol
4. **SEO Uzmanları**: Hızlı ön değerlendirme

## 🔄 Gelecek Özellikler

- 💳 **Kredi Satın Alma**: Stripe entegrasyonu
- 📊 **Detaylı Raporlar**: PDF export
- 🔄 **Otomatik Takip**: Periyodik taramalar
- 📈 **Trend Analizi**: Zaman içinde değişim

## 🐛 Troubleshooting

### OpenAI API Hatası
```bash
# API key kontrol et
echo $OPENAI_API_KEY

# Test et
node server/test-openai.js
```

### Server Başlatma Sorunu
```bash
# Port kontrol
lsof -i :8787

# Temiz başlatma
npm run clean && npm install
```

## 📄 License

MIT License - detaylar için LICENSE dosyasına bakın.

---

**🎯 MVP Ready!** Basit, hızlı ve etkili SEO analizi.