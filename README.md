# SITTA - Sistem Informasi Tiras dan Transaksi Bahan Ajar UT

Aplikasi web untuk manajemen stok bahan ajar, tracking delivery order, dan pembuatan order baru. Dibangun menggunakan **Vue.js 2** dengan pendekatan component-based architecture.

## Fitur Aplikasi

1. **📊 Stok Bahan Ajar** - Melihat, menambah, edit, dan menghapus data stok bahan ajar dengan filter berdasarkan UT Daerah dan Kategori
2. **📦 Tracking DO** - Melacak status pengiriman delivery order dan menambahkan progress perjalanan paket
3. **📝 Buat Order Baru** - Form untuk membuat order pembelian bahan ajar baru dengan penyimpanan ke localStorage

## Struktur Proyek

```text
stsi4209-tugas3/
├─ index.html              # File utama aplikasi
├─ README.md               # Dokumentasi
├─ LICENSE                 # Lisensi MIT
├─ data/
│   └─ dataBahanAjar.json # Data master stok, paket, tracking, dan pengiriman
├─ assets/
│   └─ css/
│       └─ style.css      # Styling aplikasi
├─ js/
│   ├─ app.js             # Vue instance utama
│   ├─ services/
│   │   └─ api.js         # Service untuk fetch data dari JSON
│   └─ components/
│       ├─ ba-stock-table.js      # Komponen tabel stok
│       ├─ ba-do-tracking.js      # Komponen tracking delivery order
│       ├─ ba-order-form.js       # Komponen form order baru
│       ├─ ba-status-badge.js     # Komponen badge status stok
│       └─ ba-modal.js            # Komponen modal dialog
└─ templates/              # Folder template HTML (tidak lagi digunakan, di-inline di index.html)
    ├── ba-do-tracking.html
    ├── ba-modal.html
    ├── ba-order-form.html
    ├── ba-status-badge.html
    └── ba-stock-table.html
```

## Cara Menjalankan

### 1. Direct Browser (Tanpa Server)
- Buka file `index.html` langsung di browser (tidak perlu server)
- Aplikasi akan berjalan dan load data dari `data/dataBahanAjar.json`

### 2. Dengan Local Server (Recommended)
```bash
# Python 3
cd stsi4209-tugas3
python3 -m http.server 8000

# Atau gunakan Live Server extension di VS Code
# Atau gunakan Node.js http-server
npx http-server
```

Kemudian buka di browser: `http://localhost:8000`

## Teknologi yang Digunakan

- **Vue.js 2** - Framework JavaScript reaktif
- **HTML5** - Struktur markup
- **CSS3** - Styling dan layout
- **JSON** - Format data master
- **localStorage** - Penyimpanan data order di client-side

## Data Master

File `data/dataBahanAjar.json` berisi:
- `stok` - Data inventaris bahan ajar (4 items contoh)
- `paket` - Data paket pengiriman UT (2 items)
- `tracking` - Data delivery order yang sedang tracking (2 items)
- `upbjjList` - Daftar UT Daerah (Jakarta, Surabaya, Makassar, Padang, Denpasar)
- `kategoriList` - Kategori bahan ajar (MK Wajib, MK Pilihan, Praktikum, Problem-Based)
- `pengirimanList` - Opsi pengiriman (Reguler, Ekspres)

## Status Stok

Aplikasi menampilkan badge status untuk setiap bahan ajar:
- 🟢 **Aman** - Stok di atas safety stock
- 🟡 **Menipis** - Stok kurang dari safety stock
- 🔴 **Kosong** - Stok 0