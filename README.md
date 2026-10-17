# DikzProject | Website Portofolio

Website portofolio pribadi milik **Mahardika Syafa Rizki**, web developer sekaligus engineer bot WhatsApp. Dibuat dengan HTML, CSS, dan JavaScript dasar (tanpa framework dan tanpa proses build), dengan tampilan minimalis, modern, dan responsif.

## Fitur

- **Tema terang dan gelap**: mengikuti pengaturan perangkat, bisa diganti manual, dan pilihannya diingat browser.
- **Efek mengetik** pada baris peran di bagian hero.
- **Animasi saat scroll**: konten muncul perlahan, angka statistik naik, dan bar keahlian terisi.
- **Kartu kemampuan** yang dirender dari data, bukan ditulis berulang di HTML.
- **Demo bot WhatsApp interaktif**: simulasi chat berbasis perintah (`menu`, `harga`, `status`, `bantuan`).
- **Form kontak** yang membuka WhatsApp dengan pesan yang sudah terisi.
- **Responsif**: nyaman di HP, tablet, dan desktop, termasuk menu mobile.
- **Aksesibel**: mendukung `prefers-reduced-motion`, label ARIA, dan konten tetap tampil walau JavaScript gagal dimuat.

## Struktur Folder

```
dikz-portofolio/
├── index.html     # Struktur dan konten halaman
├── style.css      # Seluruh tampilan (design tokens, komponen, responsif)
├── script.js      # Konfigurasi data dan modul interaksi
├── logo.png       # Logo DikzProject (hero dan footer)
├── favicon.png    # Ikon di tab browser
└── README.md
```

## Teknologi

| Bagian     | Keterangan                                                    |
| ---------- | ------------------------------------------------------------- |
| HTML5      | Markup semantik                                               |
| CSS3       | Custom properties, Grid, Flexbox, `color-mix()`, media query  |
| JavaScript | ES6+, tanpa library, kode dipisah menjadi modul-modul kecil   |
| Font       | Inter dan JetBrains Mono dari Google Fonts                    |

## Menjalankan Secara Lokal

1. Unduh atau clone repositori ini:
   ```bash
   git clone https://github.com/dikzzproject/dikz-project.git
   cd diz-project
   ```
2. Buka `index.html` langsung di browser, atau jalankan server lokal:
   ```bash
   # Python
   python3 -m http.server 8000
   # lalu buka http://localhost:8000
   ```

Pastikan `index.html`, `style.css`, `script.js`, `logo.png`, dan `favicon.png` berada dalam **satu folder yang sama**.

## Kustomisasi

### Data konten (`script.js`)

Semua data ada di objek `CONFIG` pada bagian atas `script.js`, jadi tidak perlu mengubah kode lain.

| Properti          | Fungsi                                              |
| ----------------- | --------------------------------------------------- |
| `whatsappNumber`  | Nomor WhatsApp format internasional (`62812...`)    |
| `githubUrl`       | Tautan akun GitHub                                  |
| `typingTexts`     | Daftar teks pada efek mengetik                      |
| `skills`          | Nama dan persentase bar keahlian                    |
| `abilities`       | Kartu kemampuan (ikon, judul, deskripsi, tag)       |
| `botReplies`      | Perintah dan balasan pada demo bot                  |

### Warna dan ukuran teks (`style.css`)

Warna dan skala tipografi diatur lewat variabel di blok `:root` paling atas.

```css
--accent:   #0b78e3;   /* warna utama (terang) */
--accent-2: #06b6d4;   /* warna pendamping gradasi */
--fs-hero:  clamp(2.4rem, 6vw, 3.8rem);
--fs-h2:    clamp(1.75rem, 3.5vw, 2.25rem);
```

Nilai untuk mode gelap ada di dua blok di bawahnya (`prefers-color-scheme: dark` dan `[data-theme="dark"]`).

### Teks dan logo

- Nama, deskripsi, dan statistik diubah langsung di `index.html`.
- Ganti `logo.png` dan `favicon.png` dengan gambar Anda sendiri. Favicon sebaiknya persegi.

## Deploy dengan GitHub Pages

1. Unggah semua file ke repositori GitHub.
2. Buka **Settings → Pages**.
3. Pada **Source**, pilih branch `main` dan folder `/ (root)`, lalu simpan.
4. Website akan aktif di `https://dikzzproject.github.io/NAMA-REPOSITORI/` dalam beberapa menit.

## Kontak

- GitHub: [@dikzzproject](https://github.com/dikzzproject)
- WhatsApp: [wa.me/6285111509070](https://wa.me/6285111509070)

---

© DikzProject. Dibuat dengan HTML, CSS, dan JavaScript.
