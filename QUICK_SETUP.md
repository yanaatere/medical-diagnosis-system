# 🚀 Quick Setup Guide - MediDiagnosis

## Langkah-langkah Deploy (30 Menit)

### ✅ Step 1: Persiapan (5 menit)

1. Install Node.js dari https://nodejs.org (pilih versi LTS)
2. Install Git dari https://git-scm.com
3. Buat akun GitHub di https://github.com (jika belum punya)
4. Buat akun Vercel di https://vercel.com (gunakan GitHub untuk login)

### ✅ Step 2: Setup Project di Local (10 menit)

```bash
# 1. Buat folder project
mkdir medical-diagnosis-system
cd medical-diagnosis-system

# 2. Copy SEMUA file yang saya berikan ke folder ini
# Struktur folder harus seperti ini:
# medical-diagnosis-system/
# ├── app/
# ├── lib/
# ├── middleware.js
# ├── package.json
# ├── next.config.js
# ├── tailwind.config.js
# ├── postcss.config.js
# └── .gitignore

# 3. Install dependencies
npm install

# 4. Test jalankan (optional)
npm run dev
```

### ✅ Step 3: Setup Database Vercel Postgres (5 menit)

1. Login ke https://vercel.com
2. Go to **Storage** tab
3. Click **Create Database**
4. Pilih **Postgres** (free tier)
5. Klik **Create**
6. Setelah selesai, go to **.env.local** tab
7. **COPY SEMUA ENVIRONMENT VARIABLES**

### ✅ Step 4: Setup Environment Variables Local (2 menit)

Buat file baru `.env.local` di root folder project:

```env
# Paste semua env dari Vercel Postgres
POSTGRES_URL="postgres://default:xxx@xxx.postgres.vercel-storage.com:5432/verceldb"
POSTGRES_PRISMA_URL="postgres://default:xxx@xxx.postgres.vercel-storage.com:5432/verceldb?pgbouncer=true&connect_timeout=15"
POSTGRES_URL_NON_POOLING="postgres://default:xxx@xxx.postgres.vercel-storage.com:5432/verceldb"
POSTGRES_USER="default"
POSTGRES_HOST="xxx.postgres.vercel-storage.com"
POSTGRES_PASSWORD="xxx"
POSTGRES_DATABASE="verceldb"

# Tambahkan JWT Secret (buat random string sendiri)
JWT_SECRET="ini-adalah-secret-key-yang-sangat-rahasia-minimal-32-karakter"
```

### ✅ Step 5: Push ke GitHub (5 menit)

```bash
# 1. Init Git
git init

# 2. Add semua file
git add .

# 3. Commit
git commit -m "Initial commit - Medical Diagnosis System"

# 4. Buat repo baru di GitHub
# - Buka https://github.com/new
# - Nama repo: medical-diagnosis-system
# - Set sebagai Private (recommended)
# - Jangan centang "Initialize with README"
# - Click "Create repository"

# 5. Connect & Push
git remote add origin https://github.com/YOUR_USERNAME/medical-diagnosis-system.git
git branch -M main
git push -u origin main
```

### ✅ Step 6: Deploy ke Vercel (5 menit)

1. Login ke https://vercel.com
2. Click **"Add New..."** → **"Project"**
3. **Import Git Repository** → Pilih repo GitHub Anda
4. Vercel akan auto-detect Next.js
5. Click **"Deploy"** (jangan isi environment variables dulu)
6. Tunggu deploy selesai (2-3 menit)
7. Setelah deploy, go to **Settings** → **Environment Variables**
8. **Tambahkan semua env variables** (sama seperti di `.env.local`):
   - POSTGRES_URL
   - POSTGRES_PRISMA_URL
   - POSTGRES_URL_NON_POOLING
   - POSTGRES_USER
   - POSTGRES_HOST
   - POSTGRES_PASSWORD
   - POSTGRES_DATABASE
   - JWT_SECRET
9. **Redeploy** - Go to Deployments → Click menu (⋯) → Redeploy

### ✅ Step 7: Initialize Database Production (2 menit)

Setelah deploy selesai, buka di browser:

```
https://your-app-name.vercel.app/api/init
```

Anda akan melihat response:
```json
{
  "success": true,
  "message": "Database initialized successfully! Admin credentials: username=admin, password=admin123"
}
```

### ✅ Step 8: Login & Test (1 menit)

1. Buka: `https://your-app-name.vercel.app/login`
2. Login dengan:
   - **Username:** `admin`
   - **Password:** `admin123`
3. Coba semua fitur: tambah pasien, penyakit, gejala, diagnosis

## 🎉 Selesai!

Website Anda sudah live dan bisa diakses dari mana saja!

---

## 📝 Catatan Penting

### Jika Ada Error Setelah Deploy:

1. **Cek Build Logs** di Vercel
2. **Pastikan semua Environment Variables** sudah di-set
3. **Redeploy** setelah set env variables
4. **Akses /api/init** untuk initialize database

### Update Code:

```bash
# Setelah edit code
git add .
git commit -m "Update features"
git push

# Vercel akan auto-deploy!
```

### Custom Domain (Optional):

1. Go to Vercel project → Settings → Domains
2. Add custom domain Anda
3. Follow DNS setup instructions

---

## 🔐 Security Checklist:

- [ ] Ganti JWT_SECRET dengan random string yang kuat
- [ ] Ganti password admin default setelah login pertama
- [ ] Jangan share credentials ke publik
- [ ] Set GitHub repo sebagai Private

---

## 📞 Need Help?

Jika stuck di step manapun, screenshot error-nya dan contact developer!