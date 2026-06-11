// Aplikasi Katalog Produk Digital
document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const catalogContent = document.getElementById("catalog-content");
  const filterCategory = document.getElementById("filter-category");
  const filterSearch = document.getElementById("filter-search");
  const btnClearFilters = document.getElementById("btn-clear-filters");
  const filterStockAll = document.getElementById("filter-stock-all");
  const filterStockReady = document.getElementById("filter-stock-ready");
  
  // Stat Elements
  const statTotalProducts = document.getElementById("stat-total-products");
  const statReadyProducts = document.getElementById("stat-ready-products");
  const statTotalCategories = document.getElementById("stat-total-categories");
  const filteredCount = document.getElementById("filtered-count");

  // Modal Elements
  const productDetailModal = document.getElementById("product-detail-modal");
  const modalImage = document.getElementById("modal-image");
  const modalCategory = document.getElementById("modal-category");
  const modalBadge = document.getElementById("modal-badge");
  const modalTitle = document.getElementById("modal-title");
  const modalPrice = document.getElementById("modal-price");
  const modalOriginalPrice = document.getElementById("modal-original-price");
  const modalStock = document.getElementById("modal-stock");
  const modalFeaturesGrid = document.getElementById("modal-features-grid");
  const modalDescription = document.getElementById("modal-description");
  const modalBtnWa = document.getElementById("modal-btn-wa");
  const modalBtnClose = document.getElementById("modal-btn-close");

  // State
  let currentCategory = "";
  let searchQuery = "";
  let onlyReady = false; // false = all, true = only stock > 0

  // 1. Inisialisasi Kategori Dropdown & Stats Katalog
  function initCatalog() {
    // Isi Dropdown Kategori
    filterCategory.innerHTML = '<option value="">Semua Kategori</option>';
    Object.keys(categories).forEach(key => {
      if (key !== "all") {
        const option = document.createElement("option");
        option.value = key;
        option.textContent = categories[key];
        filterCategory.appendChild(option);
      }
    });

    // Hitung Statistik Utama
    const totalCount = products.length;
    const readyCount = products.filter(p => p.stock > 0).length;
    const categoriesCount = Object.keys(categories).length - 1; // Kurangi 'all'

    statTotalProducts.textContent = totalCount;
    statReadyProducts.textContent = readyCount;
    statTotalCategories.textContent = categoriesCount;

    // Render katalog pertama kali
    renderCatalog();
  }

  // 2. Format Rupiah Utility
  function formatRupiah(number) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0
    }).format(number);
  }

  // 3. Logika Filter Produk
  function getFilteredProducts() {
    return products.filter(product => {
      // Filter Kategori
      const matchCategory = !currentCategory || product.category === currentCategory;
      
      // Filter Pencarian kata kunci (nama produk, kategori, deskripsi, fitur)
      const matchSearch = !searchQuery || 
        product.title.toLowerCase().includes(searchQuery) ||
        categories[product.category].toLowerCase().includes(searchQuery) ||
        product.features.some(f => f.name.toLowerCase().includes(searchQuery));

      // Filter Status Stok
      const matchStock = !onlyReady || product.stock > 0;

      return matchCategory && matchSearch && matchStock;
    });
  }

  // 4. Render Katalog Utama
  function renderCatalog() {
    const filtered = getFilteredProducts();
    filteredCount.textContent = `${filtered.length} produk`;

    // Kosongkan kontainer
    catalogContent.innerHTML = "";

    // Jika tidak ada produk cocok
    if (filtered.length === 0) {
      renderEmptyState();
      return;
    }

    // Kasus A: Sedang melakukan pencarian atau memilih kategori tertentu (Tampilan Grid Datar)
    if (searchQuery || currentCategory) {
      const grid = document.createElement("div");
      grid.className = "products-grid";
      
      filtered.forEach(product => {
        grid.appendChild(createProductCard(product));
      });

      catalogContent.appendChild(grid);
    } 
    // Kasus B: Keadaan Normal / Default (Tampilan Terkelompok Kategori seperti store.exse7en.com)
    else {
      // Ambil kategori unik dari produk yang disaring
      const activeCategories = [...new Set(filtered.map(p => p.category))];

      activeCategories.forEach(catKey => {
        const categoryProducts = filtered.filter(p => p.category === catKey);
        
        if (categoryProducts.length > 0) {
          // Buat Kontainer Kategori
          const catSection = document.createElement("section");
          catSection.className = "category-group";

          // Header Kategori
          const catHeader = document.createElement("div");
          catHeader.className = "category-group-header";
          
          const titleWrap = document.createElement("div");
          const title = document.createElement("h3");
          title.className = "category-group-title";
          title.textContent = categories[catKey];
          
          const subtitle = document.createElement("p");
          subtitle.className = "category-group-subtitle";
          subtitle.textContent = `${categoryProducts.length} produk dalam kategori ini`;
          
          titleWrap.appendChild(title);
          titleWrap.appendChild(subtitle);
          
          const divider = document.createElement("div");
          divider.className = "category-divider";

          catHeader.appendChild(titleWrap);
          catHeader.appendChild(divider);
          catSection.appendChild(catHeader);

          // Grid Kartu Produk
          const grid = document.createElement("div");
          grid.className = "products-grid";
          categoryProducts.forEach(product => {
            grid.appendChild(createProductCard(product));
          });
          
          catSection.appendChild(grid);
          catalogContent.appendChild(catSection);
        }
      });
    }
  }

  // 5. Membuat HTML Kartu Produk
  function createProductCard(product) {
    const card = document.createElement("article");
    // Tambah kelas kategori untuk pewarnaan aksen border atas
    card.className = `product-card card-${product.category}`;

    // Badge Best Seller / custom jika ada
    const badgeHTML = product.badge 
      ? `<span class="card-badge">${product.badge}</span>` 
      : "";

    // Fitur tags (maksimal 4 di kartu)
    const featuresHTML = product.features.slice(0, 4).map(f => `
      <div class="feature-tag" title="${f.name}">
        <i class="${f.icon}"></i>
        <span>${f.name}</span>
      </div>
    `).join("");

    // Stock status class
    const isReady = product.stock > 0;
    const stockClass = isReady ? "ready" : "empty";
    const stockText = isReady ? `Stok ${product.stock}` : "Stok Habis";

    // Tombol WhatsApp
    const waText = encodeURIComponent(`Halo Admin, saya mau beli akun ${product.title} seharga ${formatRupiah(product.price)}. Apakah masih ready?`);
    const waLink = `https://wa.me/${product.waNumber}?text=${waText}`;
    
    const actionButtonHTML = isReady
      ? `<a href="${waLink}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-block">
           <i class="fa-brands fa-whatsapp"></i>
           <span>Beli via WhatsApp</span>
         </a>`
      : `<button type="button" disabled class="btn btn-block">
           <span>Stok Habis</span>
         </button>`;

    card.innerHTML = `
      <div class="card-image-wrapper">
        <img src="${product.image}" alt="${product.title}" class="card-img" loading="lazy">
      </div>
      <div class="card-body">
        <div class="card-meta">
          <span class="card-category">${categories[product.category]}</span>
          ${badgeHTML}
        </div>
        <h4 class="card-title" title="${product.title}">${product.title}</h4>
        <div class="card-price-row">
          <p class="card-price">${formatRupiah(product.price)}</p>
          <span class="stock-badge ${stockClass}">${stockText}</span>
        </div>
        <div class="card-features">
          ${featuresHTML}
        </div>
        <div class="card-desc-preview">
          ${product.description}
        </div>
        <div class="card-actions-wrapper">
          <button type="button" class="btn btn-secondary btn-block btn-detail-trigger">
            Lihat detail
          </button>
          ${actionButtonHTML}
        </div>
      </div>
    `;

    // Pasang Event Listener detail
    card.querySelector(".btn-detail-trigger").addEventListener("click", () => {
      openProductDetail(product.id);
    });

    return card;
  }

  // 6. Rencana Tampilan Kosong (Empty State)
  function renderEmptyState() {
    const emptyState = document.createElement("div");
    emptyState.className = "empty-state";
    emptyState.innerHTML = `
      <i class="fa-solid fa-face-frown"></i>
      <h3>Produk Tidak Ditemukan</h3>
      <p>Tidak ada produk digital yang cocok dengan filter pencarian Anda saat ini.</p>
      <button type="button" id="btn-reset-empty" class="btn btn-secondary btn-sm mt-2">Atur Ulang Pencarian</button>
    `;
    catalogContent.appendChild(emptyState);

    document.getElementById("btn-reset-empty").addEventListener("click", resetFilters);
  }

  // 7. Reset Semua Filter
  function resetFilters() {
    filterCategory.value = "";
    filterSearch.value = "";
    currentCategory = "";
    searchQuery = "";
    onlyReady = false;
    
    filterStockAll.classList.add("active");
    filterStockReady.classList.remove("active");

    renderCatalog();
  }

  // 8. Logika Modal Dialog Detail Produk
  function openProductDetail(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    // Isi Konten Modal
    modalImage.src = product.image;
    modalImage.alt = product.title;
    modalCategory.textContent = categories[product.category];
    
    // Tampilkan/Sembunyikan Badge Kustom
    if (product.badge) {
      modalBadge.textContent = product.badge;
      modalBadge.style.display = "inline-block";
    } else {
      modalBadge.style.display = "none";
    }

    modalTitle.textContent = product.title;
    modalPrice.textContent = formatRupiah(product.price);

    // Tampilkan Harga Asal (Coreng/Diskon) jika ada
    if (product.originalPrice && product.originalPrice > product.price) {
      modalOriginalPrice.textContent = formatRupiah(product.originalPrice);
      modalOriginalPrice.style.display = "inline";
    } else {
      modalOriginalPrice.style.display = "none";
    }

    // Set Status Stok Modal
    const isReady = product.stock > 0;
    modalStock.className = `modal-stock-badge ${isReady ? 'ready' : 'empty'}`;
    modalStock.textContent = isReady ? `Stok ${product.stock}` : "Stok Habis";

    // Muat Fitur-Fitur
    modalFeaturesGrid.innerHTML = product.features.map(f => `
      <div class="modal-feature-card">
        <i class="${f.icon}"></i>
        <span>${f.name}</span>
      </div>
    `).join("");

    // Muat Deskripsi HTML Rinci
    modalDescription.innerHTML = product.description;

    // Pasang tombol checkout WA
    const waText = encodeURIComponent(`Halo Admin, saya mau beli akun ${product.title} seharga ${formatRupiah(product.price)}. Apakah masih ready?`);
    modalBtnWa.href = `https://wa.me/${product.waNumber}?text=${waText}`;

    // Sembunyikan atau aktifkan tombol beli tergantung stok
    if (isReady) {
      modalBtnWa.classList.remove("disabled");
      modalBtnWa.style.pointerEvents = "auto";
      modalBtnWa.innerHTML = `<i class="fa-brands fa-whatsapp"></i><span>Beli Sekarang via WhatsApp</span>`;
    } else {
      modalBtnWa.classList.add("disabled");
      modalBtnWa.style.pointerEvents = "none";
      modalBtnWa.innerHTML = `<span>Stok Habis</span>`;
    }

    // Tampilkan Modal
    productDetailModal.showModal();
  }

  // 9. Event Listeners Filter
  filterCategory.addEventListener("change", (e) => {
    currentCategory = e.target.value;
    renderCatalog();
  });

  filterSearch.addEventListener("input", (e) => {
    searchQuery = e.target.value.toLowerCase().trim();
    renderCatalog();
  });

  btnClearFilters.addEventListener("click", resetFilters);

  filterStockAll.addEventListener("click", () => {
    onlyReady = false;
    filterStockAll.classList.add("active");
    filterStockReady.classList.remove("active");
    renderCatalog();
  });

  filterStockReady.addEventListener("click", () => {
    onlyReady = true;
    filterStockAll.classList.remove("active");
    filterStockReady.classList.add("active");
    renderCatalog();
  });

  // Event Listeners Modal
  modalBtnClose.addEventListener("click", () => {
    productDetailModal.close();
  });

  // Tutup modal jika user mengklik backdrop luar modal dialog
  productDetailModal.addEventListener("click", (e) => {
    const dialogDimensions = productDetailModal.getBoundingClientRect();
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      productDetailModal.close();
    }
  });

  // Mulai Aplikasi
  initCatalog();
});
