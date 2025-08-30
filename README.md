# weeme.ai - AI-Powered SEO Automation Platform

Modern, kapsamlı SEO analizi ve AI destekli içerik üretimi platformu. Tek kod satırı ile sitenizi bağlayın, AI destekli raporlar alın.

## 🚀 Özellikler

### 🎯 Temel Özellikler
- **Otomatik SEO Analizi**: Kapsamlı website taraması ve 100 üzerinden skorlama
- **Gerçek Zamanlı Raporlar**: Detaylı SEO metrikleri ve performans analizi
- **Otomatik Takip**: Tek kod ile sürekli site monitörü
- **Çoklu Site Yönetimi**: Birden fazla sitenizi tek panelden yönetin

### 🤖 AI Destekli Özellikler (Pro/Advanced)
- **AI SEO Önerileri**: Yapay zeka destekli kişiselleştirilmiş öneriler
- **Kod Snippet'leri**: Hazır HTML/CSS/JS kod örnekleri (Advanced)
- **AI İçerik Üretimi**: Sosyal medya içerik üretimi (Advanced)
- **30-60-90 Gün Roadmap**: Detaylı iyileştirme planları

### 🛡️ Güvenlik & Performans
- **Enterprise Güvenlik**: SSL, CORS, Rate limiting
- **Responsive Tasarım**: Tüm cihazlarda mükemmel deneyim
- **Hybrid Database**: localStorage + Supabase entegrasyonu
- **Production Ready**: Docker, Vercel, Netlify desteği

## 📋 Gereksinimler

### Development
- Node.js 18+
- npm veya yarn
- OpenAI API Key (AI özellikler için - opsiyonel)
- Supabase hesabı (opsiyonel - localStorage fallback mevcut)

### Production
- SSL sertifikası
- Domain name
- Environment variables
- Supabase database (önerilir)
- OpenAI API Key (AI özellikler için)

## 🛠️ Kurulum

1. **Repository'yi klonlayın**
```bash
git clone <repo-url>
cd weemeai
```

2. **Dependencies yükleyin**
```bash
npm install
```

3. **Environment variables ayarlayın**
```bash
cp .env.example .env.local
# .env.local dosyasını düzenleyin - en azından OPENAI_API_KEY ekleyin
```

4. **Supabase bağlantısı (opsiyonel)**
- Supabase projenizi oluşturun
- VITE_SUPABASE_URL ve VITE_SUPABASE_ANON_KEY'i .env.local'e ekleyin
- Migrations otomatik çalışacak

5. **Development server başlatın**
```bash
npm run dev
```

## 🎮 Hızlı Başlangıç

1. **Kayıt olun**: `/register` - 3 ücretsiz kredi ile başlayın
2. **Site tarayın**: Dashboard'dan URL girin ve "Tara" butonuna basın
3. **Sonuçları görün**: SEO skoru ve detaylı analiz
4. **AI önerileri**: Pro/Advanced planla AI destekli öneriler alın
5. **İçerik üretin**: Advanced planla sosyal medya içeriği oluşturun

## 🔧 Environment Variables

### Zorunlu
```env
# AI özellikler için (yoksa fallback mode)
OPENAI_API_KEY=sk-proj-your-actual-openai-api-key-here
```

### Opsiyonel
```env
# API endpoint
VITE_API_BASE=http://localhost:8787

# Supabase (yoksa localStorage kullanılır)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

# Server
API_PORT=8787
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

## 🚀 Production Deployment

### Hızlı Deployment (Vercel - Önerilen)
```bash
# Vercel CLI ile
npm i -g vercel
vercel --prod

# Environment variables'ları Vercel dashboard'dan ekleyin
```

### 1. Environment Hazırlığı
```env
NODE_ENV=production
OPENAI_API_KEY=sk-proj-prod-key-here
VITE_API_BASE=https://yourdomain.com
FRONTEND_URL=https://yourdomain.com
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 2. Build
```bash
npm run build
```

### 3. Production Start
```bash
npm start
```

## 📊 API Endpoints

### SEO Scan
```
POST /api/seo-scan
Body: { 
  url: "https://example.com" 
}
Response: {
  ok: true,
  report: {
    score: 85,
    positives: [...],
    negatives: [...],
    suggestions: [...],
    reportData: {...}
  }
}
```

### AI Suggestions (Pro/Advanced)
```
POST /api/seo-suggestions
Body: { 
  membershipType: "Pro|Advanced",
  prompt: "SEO sorunuz",
  reportContext: "...",
  useReportBase: true
}
```

### AI Content (Advanced)
```
POST /api/ai-content
Body: { 
  membershipType: "Advanced",
  platform: "linkedin|instagram|twitter|facebook",
  prompt: "İçerik konusu",
  industry: "teknoloji",
  audience: "b2b",
  tone: "profesyonel"
}
```

### Health Check
```
GET /health
Response: {
  status: "healthy",
  openai: "configured|fallback_mode",
  environment: "development|production"
}
```

## 🔒 Güvenlik

- **Helmet.js**: Güvenlik başlıkları (CSP, HSTS, XSS koruması)
- **Rate Limiting**: 15 dakikada 50-100 istek (prod/dev)
- **CORS**: Whitelist bazlı origin kontrolü
- **Input Validation**: express-validator ile
- **API Key Security**: Client'a asla expose edilmez
- **RLS**: Supabase Row Level Security aktif
- **SSL**: Production'da zorunlu HTTPS

## 📈 Performans

- **Fallback Systems**: OpenAI/Supabase olmadan da çalışır
- **Error Handling**: Graceful degradation
- **Request Timeouts**: 30s API, 10s site fetch
- **Caching**: localStorage + Supabase hybrid
- **Code Splitting**: Vendor, router, UI chunks
- **Lazy Loading**: Component ve image lazy loading
- **Bundle Optimization**: Tree shaking, minification

## 🐛 Troubleshooting

### Genel Sorunlar
```bash
# Tüm dependencies'i yeniden yükle
rm -rf node_modules package-lock.json server/node_modules server/package-lock.json
npm install
cd server && npm install

# Cache temizle
npm run build
```

### OpenAI API Hatası
```bash
# API key test et
node server/test-openai.js

# .env.local kontrol et
cat .env.local | grep OPENAI
```

### Supabase Bağlantı Sorunu
```bash
# Environment variables kontrol
echo $VITE_SUPABASE_URL
echo $VITE_SUPABASE_ANON_KEY

# Fallback localStorage kullanılır
```

### Server Başlatma Sorunu
```bash
# Port kontrolü
lsof -i :8787 || netstat -tulpn | grep 8787

# Farklı port dene
API_PORT=8788 npm run dev:server
```

### Build Hatası
```bash
# TypeScript kontrol
npx tsc --noEmit

# Lint kontrol
npm run lint

# Temiz build
rm -rf dist && npm run build
```

## 📝 Changelog

### v1.1.0 (Güncel)
- Tutarlı tasarım sistemi
- Gelişmiş animasyonlar ve micro-interactions
- Hybrid database (localStorage + Supabase)
- Production-ready deployment
- Comprehensive error handling
- Enhanced user experience

### v1.0.0
- İlk release
- Temel SEO analizi
- AI entegrasyonu
- Üyelik sistemi

## 🏗️ Mimari

### Frontend
- **React 18** + TypeScript
- **Tailwind CSS** + Custom animations
- **React Router** v7 routing
- **Lucide React** icons
- **Vite** build tool

### Backend
- **Express.js** API server
- **OpenAI GPT-4o-mini** AI integration
- **Helmet.js** security
- **Rate limiting** protection

### Database
- **Hybrid approach**: localStorage + Supabase
- **Automatic migration**: v0 -> v1
- **RLS policies**: Row-level security
- **Fallback support**: Offline-first design

### Deployment
- **Vercel**: Recommended (zero-config)
- **Netlify**: Alternative option
- **Docker**: Container support
- **VPS**: Manual deployment guide

## 🤝 Contributing

1. Fork the project
2. Create feature branch
3. Commit changes
4. Push to branch
5. Open Pull Request

### Development Setup
```bash
# Clone & install
git clone <repo-url>
cd weemeai
npm install
cd server && npm install && cd ..

# Environment setup
cp .env.example .env.local
# Edit .env.local with your keys

# Start development
npm run dev
```

## 📄 License

MIT License - detaylar için LICENSE dosyasına bakın.

## 🔑 API Keys & Configuration

### OpenAI Setup
1. [OpenAI Platform](https://platform.openai.com/api-keys)'da API key oluşturun
2. `.env.local` dosyasına `OPENAI_API_KEY=sk-proj-...` ekleyin
3. Billing setup yapın (kullanım başına ödeme)
4. Rate limits ayarlayın

### Supabase Setup (Opsiyonel)
1. [Supabase](https://supabase.com) projesi oluşturun
2. Database URL ve anon key alın
3. `.env.local`'e ekleyin
4. Migrations otomatik çalışacak

### Production Checklist
- ✅ SSL sertifikası aktif
- ✅ Environment variables set
- ✅ OpenAI API key geçerli
- ✅ Supabase RLS policies aktif
- ✅ CORS origins doğru
- ✅ Rate limiting aktif
- ✅ Error monitoring setup

---

**🚀 Production Ready!** Tüm özellikler test edildi ve canlı ortam için hazır.