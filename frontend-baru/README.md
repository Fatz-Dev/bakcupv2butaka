# Butaka Frontend - Guest Management System

Interface user untuk sistem manajemen tamu "Butaka", dibangun menggunakan Vue 3 dan Vite.

## 🚀 Fitur Utama
- **Login Staff**: Halaman masuk untuk Admin dan Resepsionis.
- **Self Check-in**: Link publik untuk tamu mendaftarkan diri secara mandiri.
- **Dashboard Management**: Pemantauan status tamu secara real-time.
- **Form Feedback**: Interface survei kepuasan pelanggan yang interaktif.
- **Profile Management**: Update informasi akun dan ganti password.

## 🛠️ Tech Stack
- **Framework**: Vue.js 3 (Composition API)
- **Build Tool**: Vite
- **Routing**: Vue Router
- **HTTP Client**: Axios (untuk koneksi ke Backend API)
- **Styling**: Vanilla CSS / Scoped Styles

## 📋 Prasyarat
- Node.js (versi terbaru/LTS)
- npm (Node Package Manager)
- Backend API sudah berjalan (lihat dokumentasi backend)

## ⚙️ Cara Setup & Instalasi

### 1. Clone Repositori
```bash
git clone [repository-url]
cd frontend-baru
```

### 2. Instalasi Dependency
```bash
npm install
```

### 3. Konfigurasi Environment
Buat file `.env` di root folder (jika belum ada) dan arahkan ke alamat Backend API:
```env
VITE_API_URL=http://localhost:8000/api
```

### 4. Jalankan Development Server
```bash
npm run dev
```
Aplikasi akan tersedia di `http://localhost:5173`.

## 📦 Building for Production
Untuk membuat build produksi:
```bash
npm run build
```
Hasil build akan berada di folder `dist/`.

## 📖 Cara Kerja & Struktur
- `src/views`: Berisi halaman utama aplikasi (Login, Dashboard, Form Tamu).
- `src/components`: Komponen reusable (Sidebar, Navbar, Card).
- `src/router`: Definisi navigasi aplikasi.
- `src/services`: Konfigurasi axios dan endpoint API.
