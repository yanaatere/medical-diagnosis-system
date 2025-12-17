# 📂 Struktur File Project - Medical Diagnosis System

## Checklist File yang Harus Dibuat

Buat folder `medical-diagnosis-system` dan copy semua file berikut dengan struktur yang PERSIS seperti ini:

```
medical-diagnosis-system/
│
├── 📁 app/
│   ├── 📁 api/
│   │   ├── 📁 auth/
│   │   │   ├── 📁 login/
│   │   │   │   └── route.js          ✅ Sudah dibuat
│   │   │   └── 📁 logout/
│   │   │       └── route.js          ✅ Sudah dibuat
│   │   ├── 📁 init/
│   │   │   └── route.js              ✅ Sudah dibuat
│   │   ├── 📁 patients/
│   │   │   └── route.js              ✅ Sudah dibuat
│   │   ├── 📁 diseases/
│   │   │   └── route.js              ✅ Sudah dibuat
│   │   ├── 📁 symptoms/
│   │   │   └── route.js              ✅ Sudah dibuat
│   │   ├── 📁 diagnoses/
│   │   │   └── route.js              ✅ Sudah dibuat
│   │   └── 📁 stats/
│   │       └── route.js              ✅ Sudah dibuat
│   ├── 📁 dashboard/
│   │   └── page.js                   ✅ Sudah dibuat
│   ├── 📁 login/
│   │   └── page.js                   ✅ Sudah dibuat
│   ├── layout.js                     ✅ Sudah dibuat
│   ├── page.js                       ✅ Sudah dibuat
│   └── globals.css                   ✅ Sudah dibuat
│
├── 📁 lib/
│   ├── db.js                         ✅ Sudah dibuat
│   └── auth.js                       ✅ Sudah dibuat
│
├── middleware.js                     ✅ Sudah dibuat
├── package.json                      ✅ Sudah dibuat
├── next.config.js                    ✅ Sudah dibuat
├── tailwind.config.js                ✅ Sudah dibuat
├── postcss.config.js                 ✅ Sudah dibuat
├── .gitignore                        ✅ Sudah dibuat
├── .env.example                      ✅ Sudah dibuat (rename ke .env.local)
├── README.md                         ✅ Sudah dibuat
├── QUICK_SETUP.md                    ✅ Sudah dibuat
└── FILE_STRUCTURE.md                 ✅ File ini
```

## 📋 Cara Setup File

### Method 1: Copy Paste Manual (Recommended)

1. Buat folder `medical-diagnosis-system`
2. Buat struktur folder seperti di atas
3. Copy paste isi setiap file dari artifacts yang saya berikan
4. Pastikan nama file dan lokasi folder PERSIS sama

### Method 2: Via Terminal (Advanced)

```bash
# 1. Buat folder utama
mkdir medical-diagnosis-system
cd medical-diagnosis-system

# 2. Buat struktur folder
mkdir -p app/api/auth/login app/api/auth/logout app/api/init app/api/patients app/api/diseases app/api/symptoms app/api/diagnoses app/api/stats
mkdir -p app/dashboard app/login
mkdir -p lib

# 3. Buat file kosong dulu
touch app/layout.js app/page.js app/globals.css
touch app/login/page.js
touch app/dashboard/page.js
touch app/api/auth/login/route.js
touch app/api/auth/logout/route.js
touch app/api/init/route.js
touch app/api/patients/route.js
touch app/api/diseases/route.js
touch app/api/symptoms/route.js
touch app/api/diagnoses/route.js
touch app/api/stats/route.js
touch lib/db.js lib/auth.js
touch middleware.js
touch package.json next.config.js tailwind.config.js postcss.config.js
touch .gitignore .env.example
touch README.md QUICK_SETUP.md FILE_STRUCTURE.md

# 4. Sekarang copy paste isi file dari artifacts ke masing-masing file
```

## ✅ Verifikasi Checklist

Setelah semua file dibuat, cek dengan:

```bash
# Cek struktur folder
ls -R

# Install dependencies
npm install

# Test run
npm run dev
```

Jika sukses, Anda akan melihat:
```
✓ Ready in 2s
○ Local: http://localhost:3000
```

## 🎯 Urutan Setup yang Benar

1. ✅ Buat semua folder dan file
2. ✅ Copy paste isi file dari artifacts
3. ✅ Run `npm install`
4. ✅ Buat file `.env.local` dari `.env.example`
5. ✅ Setup Vercel Postgres dan copy env variables
6. ✅ Run `npm run dev`
7. ✅ Akses `http://localhost:3000/api/init`
8. ✅ Login di `http://localhost:3000/login`
9. ✅ Push ke GitHub
10. ✅ Deploy ke Vercel

## 🚨 Common Mistakes

❌ **Salah nama folder** - Harus lowercase dan persis
❌ **Missing file** - Harus semua file ada
❌ **Salah struktur** - Folder harus nested dengan benar
❌ **Lupa .env.local** - Database tidak akan connect
❌ **Tidak run npm install** - Dependencies tidak terinstall

## 💡 Tips

- Gunakan code editor seperti VS Code untuk mudah navigasi
- Buka folder project di VS Code: `code .`
- VS Code akan show file tree di sidebar
- Pastikan tidak ada typo di nama file/folder
- File route.js harus di dalam folder route-nya sendiri (Next.js 13+ App Router)

---

Jika ada file yang kurang atau error, refer ke artifacts yang sudah saya berikan!