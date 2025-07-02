# Rick and Morty Characters Browser

Rick and Morty API'sini kullanarak karakterleri listeleme ve filtreleme uygulaması.

## 🚀 Kurulum ve Çalıştırma

### Gereksinimler

- Node.js 18+
- npm

### Kurulum

1. **Projenin klonlanması**:

```bash
git clone [repository-url]
cd isbul-frontend
```

2. **Bağımlılıkların yüklenmesi**:

```bash
npm install
```

3. **Geliştirme sunucusunun başlatılması**:

```bash
npm run dev
```

4. **Uygulamaya erişim**:
   Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açın.

## 📝 Kullanılabilir Komutlar

```bash
npm run dev         # Geliştirme sunucusunu başlat
npm run build       # Üretim için build et
npm run start       # Üretim sunucusunu başlat
npm run lint        # ESLint ile kod kontrolü
npm run format      # Prettier ile kodu formatla
```

## 🛠️ Kullanılan Teknolojiler

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS + shadcn/ui
- React Query
- Zustand
- nuqs

## 📁 Proje Yapısı

```
src/
├── app/              # Next.js sayfa dosyaları
├── components/       # React bileşenleri
├── hooks/           # Custom hooks
├── services/        # API servisleri
├── store/           # State management
└── types/           # TypeScript tipleri
```

## 🔧 Production Build

```bash
npm run build
npm run start
``
```
