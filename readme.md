# 🏥 MediDiagnosis - Sistem Diagnosis Medis

Aplikasi web untuk sistem diagnosis medis dengan fitur manajemen pasien, penyakit, gejala, dan diagnosis.

## 🚀 Fitur

- ✅ Authentication (Login Admin)
- ✅ Dashboard dengan statistik
- ✅ CRUD Data Pasien
- ✅ CRUD Data Penyakit
- ✅ CRUD Data Gejala
- ✅ Sistem Diagnosis
- ✅ Report dan Statistik

## 📋 Prerequisites

- Node.js 18+ (Download di https://nodejs.org)
- Akun Vercel (Gratis di https://vercel.com)
- Git

## 🔧 Cara Setup di Local

### 1. Clone/Download Project

```bash
# Buat folder project baru
mkdir medical-diagnosis-system
cd medical-diagnosis-system

# Copy semua file yang sudah saya berikan ke folder ini
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Database di Vercel

1. Login ke Vercel: https://vercel.com
2. Buat project baru (atau skip dulu, nanti otomatis saat deploy)
3. Ke Storage → Create Database → Pilih "Postgres"
4. Copy semua environment variables yang diberikan

### 4. Setup Environment Variables

Buat file `.env.local` di root project:

```env
# Paste semua env dari Vercel Postgres di sini
POSTGRES_URL="postgres://default:xxx@xxx.postgres.vercel-storage.com:5432/verceldb"
POSTGRES_PRISMA_URL="postgres://default:xxx@xxx.postgres.vercel-storage.com:5432/verceldb?pgbouncer=true&connect_timeout=15"
POSTGRES_URL_NON_POOLING="postgres://default:xxx@xxx.postgres.vercel-storage.com:5432/verceldb"
POSTGRES_USER="default"
POSTGRES_HOST="xxx.postgres.vercel-storage.com"
POSTGRES_PASSWORD="xxx"
POSTGRES_DATABASE="verceldb"

# Generate random string untuk JWT
JWT_SECRET="your-super-secret-jwt-key-min-32-characters-long"
```

### 5. Initialize Database

Jalankan development server:

```bash
npm run dev
```

Buka browser dan akses:
```
http://localhost:3000/api/init
```

Ini akan membuat semua tabel database dan seed data awal.

### 6. Login

Buka: `http://localhost:3000/login`

**Credentials:**
- Username: `admin`
- Password: `admin123`

## 🌐 Deploy ke Vercel

### Method 1: Deploy via GitHub (Recommended)

1. **Push ke GitHub**

```bash
# Init git (jika belum)
git init

# Add semua file
git add .

# Commit
git commit -m "Initial commit"

# Connect ke GitHub repo (buat repo baru dulu di GitHub)
git remote add origin https://github.com/username/repo-name.git

# Push
git branch -M main
git push -u origin main
```

2. **Deploy di Vercel**

- Login ke https://vercel.com
- Click "Add New" → "Project"
- Import dari GitHub repository Anda
- Vercel akan auto-detect Next.js
- Tambahkan Environment Variables (semua dari `.env.local`)
- Click "Deploy"

3. **Initialize Database Production**

Setelah deploy selesai, buka:
```
https://your-app-name.vercel.app/api/init
```

### Method 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Follow prompts dan set environment variables
```

## 📁 Struktur Project

```
medical-diagnosis-system/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login/route.js
│   │   │   └── logout/route.js
│   │   ├── init/route.js
│   │   ├── patients/route.js
│   │   ├── diseases/route.js
│   │   ├── symptoms/route.js
│   │   ├── diagnoses/route.js
│   │   └── stats/route.js
│   ├── dashboard/
│   │   └── page.js
│   ├── login/
│   │   └── page.js
│   ├── layout.js
│   └── globals.css
├── lib/
│   ├── db.js
│   └── auth.js
├── middleware.js
├── package.json
├── tailwind.config.js
└── .env.local (buat sendiri)
```

## 🔒 Security Notes

- **PENTING:** Ganti `JWT_SECRET` dengan random string yang kuat
- Jangan commit file `.env.local` ke Git
- Password admin di-hash menggunakan bcrypt
- Session menggunakan JWT dengan httpOnly cookies

## 🗃️ Database Schema

### Tables:
- `users` - Admin users
- `patients` - Data pasien
- `diseases` - Data penyakit
- `symptoms` - Data gejala
- `diagnoses` - Data diagnosis
- `diagnosis_symptoms` - Relasi diagnosis & gejala

## 🐛 Troubleshooting

### Error: Database connection failed
- Pastikan environment variables sudah benar
- Cek koneksi internet
- Verify Postgres database di Vercel masih aktif

### Error: Can't access dashboard
- Clear cookies browser
- Login ulang
- Pastikan `/api/init` sudah dijalankan

### Deploy Error di Vercel
- Pastikan semua dependencies terinstall
- Cek Build Logs di Vercel dashboard
- Verify environment variables sudah di-set

## 📞 Support

Jika ada pertanyaan atau issues, silakan contact developer.

## 📄 License

Private Project - All Rights Reserved