# 📱 PWA Setup Guide - VoxSilva

Aplikasi VoxSilva telah dikonfigurasi sebagai **Progressive Web App (PWA)** yang dapat diinstall seperti aplikasi native dan berfungsi offline.

## ✅ Fitur PWA yang Sudah Diimplementasikan

1. **Service Worker** - Untuk caching dan offline functionality
2. **Web App Manifest** - Untuk install prompt dan metadata aplikasi
3. **Offline Support** - Aplikasi dapat berfungsi tanpa koneksi internet
4. **Install Prompt** - Tombol install otomatis muncul di browser
5. **App Icons** - Ikon aplikasi untuk home screen

## 🚀 Cara Menggunakan

### 1. Generate Icons PWA

Sebelum deploy, Anda perlu membuat ikon PWA:

**Opsi A: Menggunakan Script (Recommended)**
```bash
# Install sharp (jika belum)
npm install sharp --save-dev

# Generate icons
npm run generate-icons
```

**Opsi B: Manual**
- Buka `public/generate-icons.html` di browser untuk instruksi lengkap
- Atau gunakan tool online seperti [RealFaviconGenerator](https://realfavicongenerator.net/)
- Buat `icon-192x192.png` dan `icon-512x512.png`
- Simpan di folder `public/`

### 2. Build & Deploy

```bash
# Build aplikasi (akan copy PWA files otomatis)
npm run build

# Deploy ke Firebase
npm run deploy
```

### 3. Test PWA

1. **Desktop (Chrome/Edge)**:
   - Buka aplikasi di browser
   - Klik ikon "Install" di address bar atau tombol install di aplikasi
   - Aplikasi akan terinstall dan dapat dibuka seperti aplikasi desktop

2. **Mobile (Android)**:
   - Buka aplikasi di Chrome
   - Menu → "Install App" atau "Add to Home Screen"
   - Aplikasi akan muncul di home screen

3. **Test Offline**:
   - Buka DevTools (F12) → Network tab
   - Centang "Offline"
   - Refresh halaman - aplikasi harus tetap berfungsi

## 📁 File PWA yang Penting

```
public/
├── manifest.json                    # Web App Manifest
├── service-worker.js                 # Service Worker untuk offline
├── icon-192x192.png                 # Ikon 192x192 (harus dibuat)
├── icon-512x512.png                 # Ikon 512x512 (harus dibuat)
└── js/
    ├── service-worker-register.js   # Script registrasi SW
    └── pwa-install.js               # Script install prompt
```

## 🔧 Konfigurasi

### Service Worker

Service worker menggunakan strategi caching berikut:
- **Network-first**: Untuk halaman HTML (selalu cek update terbaru)
- **Cache-first**: Untuk assets statis (CSS, JS, images, fonts)
- **Network-only**: Untuk API calls dan Firebase (tidak di-cache)

### Manifest.json

File `manifest.json` berisi:
- Nama aplikasi: "VoxSilva - Smart Forest Monitoring"
- Start URL: `/dashboard.html`
- Display mode: `standalone` (seperti aplikasi native)
- Theme color: `#31694E` (hijau)
- Shortcuts: Dashboard, Monitoring, Device, AI Assistant

## 🐛 Troubleshooting

### Ikon tidak muncul
- Pastikan file `icon-192x192.png` dan `icon-512x512.png` ada di `public/`
- Rebuild aplikasi: `npm run build`
- Clear cache browser dan hard refresh (Ctrl+Shift+R)

### Service Worker tidak terdaftar
- Pastikan aplikasi diakses via HTTPS (di production)
- Buka DevTools → Application → Service Workers
- Cek console untuk error messages
- Pastikan file `service-worker.js` ada di root public folder

### Install prompt tidak muncul
- Pastikan semua kriteria PWA terpenuhi:
  - ✅ HTTPS (di production)
  - ✅ Manifest.json valid
  - ✅ Service Worker terdaftar
  - ✅ Ikon 192x192 dan 512x512 tersedia
- Buka DevTools → Application → Manifest untuk cek error
- Pastikan browser mendukung PWA (Chrome, Edge, Safari iOS)

### Aplikasi tidak berfungsi offline
- Pastikan service worker terdaftar dan aktif
- Cek cache di DevTools → Application → Cache Storage
- Pastikan resources penting sudah di-cache
- Test dengan mode offline di DevTools

## 📱 Browser Support

- ✅ Chrome/Edge (Desktop & Android)
- ✅ Safari iOS (dengan beberapa batasan)
- ✅ Firefox (dengan beberapa batasan)
- ❌ Safari Desktop (tidak support install)

## 🔄 Update PWA

Ketika ada update:
1. Update `CACHE_NAME` di `service-worker.js` (versi baru)
2. Build ulang: `npm run build`
3. Deploy: `npm run deploy`
4. User akan mendapat notifikasi update saat membuka aplikasi

## 📚 Referensi

- [MDN - Progressive Web Apps](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
- [Web.dev - PWA](https://web.dev/progressive-web-apps/)
- [PWA Builder](https://www.pwabuilder.com/)

## ✨ Fitur Tambahan yang Bisa Ditambahkan

- [ ] Push Notifications
- [ ] Background Sync
- [ ] Share Target API
- [ ] File System Access
- [ ] Badge API

---

**Catatan**: Pastikan untuk membuat ikon PWA sebelum deploy ke production!

