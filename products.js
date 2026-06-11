// Data Produk Digital
// Pengguna dapat menambah, menghapus, atau mengedit produk di file ini.
const products = [
  {
    id: 1,
    title: "Gemini PRO 1 Tahun HEAD (Garansi 1 Bulan)",
    category: "gemini",
    price: 70000,
    originalPrice: 120000,
    stock: 19,
    isBestSeller: true,
    badge: "Terlaris",
    image: "assets/images/gemini-advanced.jpg",
    features: [
      { name: "Akses Model Gemini 1.5 Pro", icon: "fa-solid fa-brain" },
      { name: "Penyimpanan Google One 5 TB", icon: "fa-brands fa-google-drive" },
      { name: "Integrasi Gmail, Docs, dll.", icon: "fa-solid fa-envelope-open-text" },
      { name: "Google Flow & Video Maker", icon: "fa-solid fa-video" }
    ],
    description: `
      <ul>
        <li>Akses penuh ke model AI tercanggih dari Google.</li>
        <li>Kapasitas penyimpanan awan Google One sebesar 2 TB yang bisa dibagi ke keluarga.</li>
        <li>Gunakan Gemini langsung di dalam Google Workspace (Gmail, Dokumen, Spreadsheet, dll).</li>
        <li>Prioritas akses fitur terbaru sebelum dirilis ke publik.</li>
      </ul>
      <p class="text-sm mt-3 text-slate-500"><strong>Informasi Akun:</strong> Akun disediakan oleh penjual (fresh account/invite family). Proses cepat dan bergaransi.</p>
    `,
    waNumber: "6288293955177"
  },
  {
    id: 2,
    title: "ChatGPT Plus Premium (Private Account 1 Bulan)",
    category: "chatgpt",
    price: 99000,
    originalPrice: 320000,
    stock: 0,
    isBestSeller: true,
    badge: "Rekomendasi",
    image: "assets/images/chatgpt.jpg",
    features: [
      { name: "Akses GPT-4o & GPT-4", icon: "fa-solid fa-bolt" },
      { name: "Analisis Data Tingkat Lanjut", icon: "fa-solid fa-chart-line" },
      { name: "DALL-E 3 Image Generator", icon: "fa-solid fa-image" },
      { name: "Custom GPTs Store Access", icon: "fa-solid fa-cubes" }
    ],
    description: `
      <ul>
        <li>Akses tak terbatas ke GPT-4o, model tercepat dan terpintar dari OpenAI.</li>
        <li>Kecepatan respons yang super cepat bahkan di jam-jam sibuk.</li>
        <li>Akses ke fitur web browsing, analisis data, pembuatan gambar DALL-E 3, dan analisis file.</li>
        <li>Bisa membuat dan menggunakan Custom GPTs dari GPT Store.</li>
      </ul>
      <p class="text-sm mt-3 text-slate-500"><strong>Informasi Akun:</strong> Akun privat (bisa pakai email sendiri atau disediakan penjual). Full garansi selama 30 hari penuh.</p>
    `,
    waNumber: "6288293955177"
  },
  {
    id: 3,
    title: "ChatGPT Plus Sharing (5 User / Akun)",
    category: "chatgpt",
    price: 35000,
    originalPrice: 65000,
    stock: 0,
    isBestSeller: false,
    badge: "",
    image: "assets/images/chatgpt-sharing.jpg",
    features: [
      { name: "Akses GPT-4o & GPT-4", icon: "fa-solid fa-bolt" },
      { name: "Gunakan DALL-E 3", icon: "fa-solid fa-image" },
      { name: "Akun Sharing (Hemat)", icon: "fa-solid fa-users" },
      { name: "Garansi 1 Bulan", icon: "fa-solid fa-shield-halved" }
    ],
    description: `
      <ul>
        <li>Akses ke GPT-4o dengan harga yang sangat ekonomis.</li>
        <li>Satu akun dibagi dengan 5 pengguna lain.</li>
        <li>Direkomendasikan untuk penggunaan ringan hingga sedang.</li>
        <li>Tersedia riwayat percakapan bersama (mohon tidak menghapus chat pengguna lain).</li>
      </ul>
      <p class="text-sm mt-3 text-slate-500"><strong>Informasi Akun:</strong> Kredensial akun dikirim instan oleh admin. Garansi pemakaian selama durasi paket.</p>
    `,
    waNumber: "6288293955177"
  },
  {
    id: 4,
    title: "NordVPN Premium Ultra (Private 1 Tahun)",
    category: "vpn",
    price: 45000,
    originalPrice: 150000,
    stock: 0,
    isBestSeller: false,
    badge: "Pilihan Terbaik",
    image: "assets/images/nordvpn.jpg",
    features: [
      { name: "5400+ Server di Dunia", icon: "fa-solid fa-server" },
      { name: "Kecepatan Ultra Cepat", icon: "fa-solid fa-gauge-high" },
      { name: "Mendukung 6 Perangkat", icon: "fa-solid fa-laptop-code" },
      { name: "Kebijakan Tanpa Log", icon: "fa-solid fa-user-secret" }
    ],
    description: `
      <ul>
        <li>Perlindungan privasi online terbaik dengan enkripsi tingkat militer.</li>
        <li>Bypass pembatasan wilayah (geo-restriction) untuk menonton Netflix US, Disney+, dll.</li>
        <li>Kecepatan koneksi internet tanpa batas, sangat cocok untuk streaming dan gaming.</li>
        <li>Fitur Double VPN untuk perlindungan berlapis dan CyberSec untuk memblokir iklan/malware.</li>
      </ul>
      <p class="text-sm mt-3 text-slate-500"><strong>Informasi Akun:</strong> Akun private premium berdurasi 1 tahun. Garansi penuh selama masa sewa.</p>
    `,
    waNumber: "6288293955177"
  },
  {
    id: 5,
    title: "Spotify Premium Individual (3 Bulan Garansi)",
    category: "streaming",
    price: 25000,
    originalPrice: 75000,
    stock: 0,
    isBestSeller: true,
    badge: "Promo",
    image: "assets/images/spotify.jpg",
    features: [
      { name: "Bebas Iklan (Ad-Free)", icon: "fa-solid fa-ban" },
      { name: "Unduh Musik Offline", icon: "fa-solid fa-download" },
      { name: "Audio Kualitas Tinggi", icon: "fa-solid fa-music" },
      { name: "Mainkan Lagu Apapun", icon: "fa-solid fa-circle-play" }
    ],
    description: `
      <ul>
        <li>Mendengarkan jutaan lagu tanpa jeda iklan yang mengganggu.</li>
        <li>Download lagu favorit langsung ke smartphone atau PC agar bisa diputar offline.</li>
        <li>Audio kualitas tinggi (320 kbps) untuk pengalaman suara yang jernih.</li>
        <li>Bisa digunakan di aplikasi Spotify Mobile, Desktop, Web Player, dan Smart TV.</li>
      </ul>
      <p class="text-sm mt-3 text-slate-500"><strong>Informasi Akun:</strong> Paket Individual (bukan family/invite). Bisa upgrade akun pribadi lama atau akun baru.</p>
    `,
    waNumber: "6288293955177"
  },
  {
    id: 6,
    title: "Canva Pro Team Invite (Aktif Selamanya / Lifetime)",
    category: "produktivitas",
    price: 15000,
    originalPrice: 95000,
    stock: 0,
    isBestSeller: true,
    badge: "Sangat Murah",
    image: "assets/images/canva.jpg",
    features: [
      { name: "100+ Juta Template & Foto", icon: "fa-solid fa-palette" },
      { name: "Penghapus Latar Belakang", icon: "fa-solid fa-wand-magic-sparkles" },
      { name: "Brand Kit & Font Kustom", icon: "fa-solid fa-font" },
      { name: "Penyimpanan Cloud 1 TB", icon: "fa-solid fa-cloud" }
    ],
    description: `
      <ul>
        <li>Akses ke seluruh template premium Canva, stok foto, video, elemen, dan audio tanpa watermark.</li>
        <li>Fitur Background Remover sekali klik yang sangat akurat.</li>
        <li>Resizer gambar cerdas untuk menyesuaikan berbagai ukuran media sosial secara instan.</li>
        <li>Simpan font kustom dan palet warna brand Anda sendiri.</li>
      </ul>
      <p class="text-sm mt-3 text-slate-500"><strong>Informasi Akun:</strong> Cukup berikan email Anda saat checkout, kami akan mengirimkan link undangan resmi tim Canva Pro. Lifetime garansi.</p>
    `,
    waNumber: "6288293955177"
  },
  {
    id: 7,
    title: "Gemini PRO 1 Tahun INV (Garansi 1 Bulan)",
    category: "gemini",
    price: 35000,
    originalPrice: 50000,
    stock: 10,
    isBestSeller: true,
    badge: "Terlaris",
    image: "assets/images/gemini-advanced.jpg",
    features: [
      { name: "Akses Model Gemini 1.5 Pro", icon: "fa-solid fa-brain" },
      { name: "Penyimpanan Google One 5 TB", icon: "fa-brands fa-google-drive" },
      { name: "Integrasi Gmail, Docs, dll.", icon: "fa-solid fa-envelope-open-text" },
      { name: "Google Flow & Video Maker", icon: "fa-solid fa-video" }
    ],
    description: `
      <ul>
        <li>Akses penuh ke model AI tercanggih dari Google.</li>
        <li>Kapasitas penyimpanan awan Google One sebesar 2 TB yang bisa dibagi ke keluarga.</li>
        <li>Gunakan Gemini langsung di dalam Google Workspace (Gmail, Dokumen, Spreadsheet, dll).</li>
        <li>Prioritas akses fitur terbaru sebelum dirilis ke publik.</li>
      </ul>
      <p class="text-sm mt-3 text-slate-500"><strong>Informasi Akun:</strong> Akun disediakan oleh penjual (fresh account/invite family). Proses cepat dan bergaransi.</p>
    `,
    waNumber: "6288293955177"
  },  
];

// Konfigurasi Kategori
const categories = {
  all: "Semua Kategori",
  gemini: "Gemini",
  chatgpt: "ChatGPT",
  vpn: "VPN",
  streaming: "Streaming",
  produktivitas: "Produktivitas"
};

// Ekspor agar bisa digunakan di app.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { products, categories };
}
