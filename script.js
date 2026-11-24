/* ==========================================================================
   KONFIGURASI UTAMA STUDIO — CUKUP EDIT BAGIAN INI SAAT SUDAH DEAL
   ========================================================================== */
const STUDIO_CONFIG = {
  studioName: "Northside Hair Studio",
  // Ganti dengan nomor WhatsApp reservasi asli (format 628xxx tanpa + atau 0)
  whatsappNumber: "6281234567890",
  openHour: 12, // 12:00 WIB
  closeHour: 23, // 23:00 WIB

  // Daftar Layanan & Harga (bisa diubah sesuai pricelist asli Northside)
  services: [
    {
      id: "haircut",
      name: "Signature Haircut",
      price: 45000,
      duration: "45 mnt",
      desc: "Konsultasi gaya, potong rapi, cuci rambut, pijat ringan & styling."
    },
    {
      id: "haircut-beard",
      name: "Haircut + Beard Trim",
      price: 60000,
      duration: "60 mnt",
      desc: "Paket lengkap potong rambut modern plus perapian kumis & janggut."
    },
    {
      id: "perm",
      name: "Down Perm / Texture Perm",
      price: 150000,
      duration: "90 mnt",
      desc: "Bikin rambut samping lebih nurut atau tekstur bergelombang natural."
    },
    {
      id: "coloring",
      name: "Hair Coloring / Highlight",
      price: 180000,
      duration: "120 mnt",
      desc: "Pewarnaan rambut bergaya streetwear dengan hasil warna tajam."
    },
    {
      id: "creambath",
      name: "Hair Treatment & Spa",
      price: 40000,
      duration: "30 mnt",
      desc: "Nutrisi kulit kepala, relaksasi, dan rambut lebih sehat mudah diatur."
    },
    {
      id: "kids",
      name: "Kids Haircut",
      price: 35000,
      duration: "30 mnt",
      desc: "Potongan rambut rapi dan nyaman khusus anak-anak."
    }
  ],

  // Profil 6 Capster Aktif Northside Hair Studio
  // Jika sudah punya foto asli, isi properti photo, contoh: "./img/arga.jpg"
  capsters: [
    {
      id: "arga",
      name: "Arga",
      role: "Senior Fade Specialist",
      bio: "Detail banget urusan transisi gradasi halus dan potongan clean buat tampilan harian maupun acara penting.",
      skills: ["Skin Fade", "Burst Fade", "Textured Crop"],
      accent: "#3b82f6",
      glow: "rgba(59, 130, 246, 0.38)",
      photo: "./img/tes.jpg"
    },
    {
      id: "rizki",
      name: "Rizki",
      role: "Modern Crop & Styling",
      bio: "Ahli menyesuaikan bentuk kepala dengan potongan anak muda kekinian yang tetap gampang ditata sendiri di rumah.",
      skills: ["French Crop", "Comma Hair", "Two Block"],
      accent: "#ef4444",
      glow: "rgba(239, 68, 68, 0.36)",
      photo: "./img/tes.jpg"
    },
    {
      id: "zent",
      name: "Zent",
      role: "Street Style & Mullet",
      bio: "Cocok buat kamu yang pengin tampil standout dengan karakter potongan tegas, bertekstur, dan berani beda.",
      skills: ["Modern Mullet", "Wolf Cut", "Taper Fade"],
      accent: "#a855f7",
      glow: "rgba(168, 85, 247, 0.36)",
      photo: "./img/tes.jpg"
    },
    {
      id: "rizal",
      name: "Rizal",
      role: "Classic & Precision Cut",
      bio: "Presisi tinggi pada garis rambut dan potongan klasik modern yang rapi untuk kuliah, kerja, hingga hangout.",
      skills: ["Side Part", "Slick Back", "Low Taper"],
      accent: "#06b6d4",
      glow: "rgba(6, 182, 212, 0.36)",
      photo: "./img/tes.jpg"
    },
    {
      id: "fhans",
      name: "Fhans",
      role: "Texture & Perm Expert",
      bio: "Fokus pada volume, tekstur rambut natural, dan hasil akhir yang ringan tanpa bikin rambut terasa kaku.",
      skills: ["Messy Quiff", "Down Perm", "Mid Fade"],
      accent: "#f97316",
      glow: "rgba(249, 115, 22, 0.36)",
      photo: "./img/tes.jpg"
    },
    {
      id: "janu",
      name: "Janu",
      role: "Coloring & Fresh Cut",
      bio: "Teliti memadukan potongan fresh dengan sentuhan warna dan finishing rapi yang langsung bikin percaya diri.",
      skills: ["Highlight", "Drop Fade", "Buzz Cut Design"],
      accent: "#ec4899",
      glow: "rgba(236, 72, 153, 0.36)",
      photo: "./img/tes.jpg"
    }
  ],

  timeSlots: [
    "12:00", "13:00", "14:00", "15:00", "16:00",
    "17:00", "18:00", "19:00", "20:00", "21:00", "22:00"
  ]
};

/* ==========================================================================
   STATE APLIKASI
   ========================================================================== */
const state = {
  spotlightIndex: 0,
  selectedServiceIds: ["haircut"],
  selectedCapsterId: "arga",
  selectedDate: "",
  selectedTime: "19:00",
  customerName: "",
  customerNote: ""
};

let introTimer = null;
let toastTimer = null;

/* ==========================================================================
   UTILITAS
   ========================================================================== */
function formatRupiah(num) {
  return "Rp " + Number(num || 0).toLocaleString("id-ID");
}

function getTodayDateString() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function formatReadableDate(dateStr) {
  if (!dateStr) return "-";
  try {
    const [y, m, d] = dateStr.split("-").map(Number);
    const dateObj = new Date(y, m - 1, d);
    return dateObj.toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  } catch {
    return dateStr;
  }
}

function showToast(message) {
  const toastEl = document.getElementById("toast");
  if (!toastEl) return;
  toastEl.textContent = message;
  toastEl.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toastEl.classList.remove("show");
  }, 2600);
}

/* ==========================================================================
   ANIMASI INTRO SPLASH
   ========================================================================== */
function hideIntro() {
  const overlay = document.getElementById("intro-overlay");
  if (overlay) overlay.classList.add("hidden");
  clearTimeout(introTimer);
}

function playIntro() {
  const overlay = document.getElementById("intro-overlay");
  const bar = document.getElementById("intro-sweep-bar");
  if (!overlay) return;

  clearTimeout(introTimer);
  overlay.classList.remove("hidden");

  if (bar) {
    bar.classList.remove("animate");
    void bar.offsetWidth; // paksa reflow agar animasi ulang mulus
    bar.classList.add("animate");
  }

  introTimer = setTimeout(hideIntro, 1850);
}

/* ==========================================================================
   STATUS JAM BUKA OTOMATIS (WIB / PEKANBARU)
   ========================================================================== */
function updateOpenStatus() {
  const dot = document.getElementById("status-dot");
  const text = document.getElementById("status-text");
  if (!dot || !text) return;

  let currentHour = new Date().getHours();
  try {
    const wibHourStr = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Jakarta",
      hour: "2-digit",
      hour12: false
    }).format(new Date());
    currentHour = parseInt(wibHourStr, 10);
  } catch {
    // Gunakan jam lokal perangkat jika Intl timezone tidak didukung
  }

  const isOpen =
    currentHour >= STUDIO_CONFIG.openHour &&
    currentHour < STUDIO_CONFIG.closeHour;

  if (isOpen) {
    dot.classList.remove("closed");
    text.textContent = "Buka Sekarang • 12:00 – 23:00 WIB";
  } else {
    dot.classList.add("closed");
    text.textContent = "Sedang Tutup • Buka Setiap Hari 12:00 – 23:00 WIB";
  }
}

/* ==========================================================================
   CAPSTER SPOTLIGHT (EDITORIAL SHOWCASE)
   ========================================================================== */
function createSilhouetteSVG(capster) {
  return `
    <div class="spot-silhouette">
      <svg viewBox="0 0 260 300" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <linearGradient id="silBody-${capster.id}" x1="130" y1="30" x2="130" y2="300" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="${capster.accent}" stop-opacity="0.45" />
            <stop offset="55%" stop-color="#1e293b" stop-opacity="0.95" />
            <stop offset="100%" stop-color="#090b12" />
          </linearGradient>
        </defs>
        <circle cx="130" cy="96" r="46" fill="url(#silBody-${capster.id})" stroke="${capster.accent}" stroke-opacity="0.55" stroke-width="2" />
        <path d="M36 296C36 226 74 176 130 176C186 176 224 226 224 296H36Z" fill="url(#silBody-${capster.id})" stroke="${capster.accent}" stroke-opacity="0.45" stroke-width="2" />
      </svg>
      <span class="spot-photo-hint">Slot Foto ${capster.name}</span>
    </div>
  `;
}

function renderSpotlight() {
  const capster = STUDIO_CONFIG.capsters[state.spotlightIndex];
  if (!capster) return;

  const card = document.getElementById("spotlight-card");
  if (card) {
    card.style.setProperty("--spot-color", capster.accent);
    card.style.setProperty("--spot-glow", capster.glow);
  }

  const total = String(STUDIO_CONFIG.capsters.length).padStart(2, "0");
  const idx = String(state.spotlightIndex + 1).padStart(2, "0");

  document.getElementById("spot-watermark").textContent = capster.name;
  document.getElementById("spot-index").textContent = `CAPSTER ${idx} / ${total}`;
  document.getElementById("spot-name").textContent = capster.name;
  document.getElementById("spot-role").textContent = capster.role;
  document.getElementById("spot-bio").textContent = capster.bio;

  const tagsEl = document.getElementById("spot-tags");
  tagsEl.innerHTML = capster.skills
    .map((skill) => `<span class="spot-tag">${skill}</span>`)
    .join("");

  const bookBtn = document.getElementById("spot-book-btn");
  bookBtn.textContent = `Booking dengan ${capster.name}`;

  const portraitWrap = document.getElementById("spot-portrait-wrap");
  if (capster.photo) {
    portraitWrap.innerHTML = `<img class="spot-portrait-img" src="${capster.photo}" alt="Capster ${capster.name} - Northside Hair Studio" />`;
  } else {
    portraitWrap.innerHTML = createSilhouetteSVG(capster);
  }

  // Update tab aktif
  const tabs = document.querySelectorAll(".spot-tab");
  tabs.forEach((tab, i) => {
    tab.classList.toggle("active", i === state.spotlightIndex);
    tab.setAttribute("aria-selected", String(i === state.spotlightIndex));
  });
}

function buildSpotlightTabs() {
  const tabsContainer = document.getElementById("spot-tabs");
  if (!tabsContainer) return;

  tabsContainer.innerHTML = STUDIO_CONFIG.capsters
    .map(
      (c, i) => `
      <button class="spot-tab ${i === 0 ? "active" : ""}" type="button" role="tab" data-index="${i}">
        ${c.name}
      </button>
    `
    )
    .join("");

  tabsContainer.addEventListener("click", (e) => {
    const btn = e.target.closest(".spot-tab");
    if (!btn) return;
    state.spotlightIndex = Number(btn.dataset.index);
    renderSpotlight();
  });
}

/* ==========================================================================
   RENDER FORM BOOKING (LAYANAN, CAPSTER, JAM)
   ========================================================================== */
function renderServices() {
  const grid = document.getElementById("service-grid");
  if (!grid) return;

  grid.innerHTML = STUDIO_CONFIG.services
    .map((svc) => {
      const isSelected = state.selectedServiceIds.includes(svc.id);
      return `
        <button type="button" class="service-card ${isSelected ? "selected" : ""}" data-id="${svc.id}">
          <div>
            <div class="service-top">
              <span class="service-name">${svc.name}</span>
              <span class="service-check">${isSelected ? "✓" : ""}</span>
            </div>
            <p class="service-desc">${svc.desc}</p>
          </div>
          <div class="service-bottom">
            <span class="service-price">${formatRupiah(svc.price)}</span>
            <span class="service-dur">${svc.duration}</span>
          </div>
        </button>
      `;
    })
    .join("");
}

function renderCapsterPicker() {
  const grid = document.getElementById("capster-grid");
  if (!grid) return;

  const allOptions = [
    ...STUDIO_CONFIG.capsters,
    {
      id: "any",
      name: "Bebas / Ready",
      role: "Kursi tercepat",
      accent: "#64748b",
      photo: ""
    }
  ];

  grid.innerHTML = allOptions
    .map((c) => {
      const isSelected = state.selectedCapsterId === c.id;
      const avatarHtml = c.photo
        ? `<img class="capster-avatar" src="${c.photo}" alt="${c.name}" />`
        : `<div class="capster-avatar" style="background: linear-gradient(135deg, ${c.accent}, #0f172a)">${c.name.slice(0, 2).toUpperCase()}</div>`;

      return `
        <button type="button" class="capster-option ${isSelected ? "selected" : ""}" data-id="${c.id}">
          ${avatarHtml}
          <span class="capster-option-name">${c.name}</span>
          <span class="capster-option-role">${c.role}</span>
        </button>
      `;
    })
    .join("");
}

function renderTimeSlots() {
  const wrap = document.getElementById("time-slots");
  if (!wrap) return;

  wrap.innerHTML = STUDIO_CONFIG.timeSlots
    .map(
      (time) => `
      <button type="button" class="time-slot ${state.selectedTime === time ? "selected" : ""}" data-time="${time}">
        ${time}
      </button>
    `
    )
    .join("");
}

/* ==========================================================================
   RINGKASAN & GENERATOR PESAN WHATSAPP
   ========================================================================== */
function getSelectedServices() {
  return STUDIO_CONFIG.services.filter((s) =>
    state.selectedServiceIds.includes(s.id)
  );
}

function getSelectedCapsterName() {
  if (state.selectedCapsterId === "any") return "Bebas / Siapa Saja Ready";
  const found = STUDIO_CONFIG.capsters.find(
    (c) => c.id === state.selectedCapsterId
  );
  return found ? found.name : "Bebas / Siapa Saja Ready";
}

function buildWhatsAppMessage() {
  const services = getSelectedServices();
  const serviceText =
    services.length > 0
      ? services.map((s) => `- ${s.name} (${formatRupiah(s.price)})`).join("\n")
      : "- (Belum dipilih)";
  const total = services.reduce((acc, s) => acc + s.price, 0);
  const name = state.customerName.trim() || "[Nama Kamu]";
  const capsterName = getSelectedCapsterName();
  const readableDate = formatReadableDate(state.selectedDate);
  const noteLine = state.customerNote.trim()
    ? `\nCatatan: ${state.customerNote.trim()}`
    : "";

  return [
    `Halo Admin ${STUDIO_CONFIG.studioName}, saya mau reservasi potong rambut:`,
    ``,
    `Nama: ${name}`,
    `Capster: ${capsterName}`,
    `Tanggal: ${readableDate}`,
    `Jam: ${state.selectedTime} WIB`,
    `Layanan:`,
    serviceText,
    `Estimasi Total: ${formatRupiah(total)}${noteLine}`,
    ``,
    `Apakah slot jam tersebut tersedia? Terima kasih!`
  ].join("\n");
}

function updateSummary() {
  const services = getSelectedServices();
  const total = services.reduce((acc, s) => acc + s.price, 0);

  document.getElementById("summary-services").textContent =
    services.length > 0
      ? services.map((s) => s.name).join(", ")
      : "Belum dipilih";

  document.getElementById("summary-capster").textContent =
    getSelectedCapsterName();

  document.getElementById("summary-datetime").textContent = `${formatReadableDate(
    state.selectedDate
  )} • ${state.selectedTime} WIB`;

  document.getElementById("summary-total").textContent = formatRupiah(total);
  document.getElementById("wa-preview-text").textContent =
    buildWhatsAppMessage();
}

/* ==========================================================================
   EVENT LISTENERS & INISIALISASI
   ========================================================================== */
function initEvents() {
  // Intro buttons
  document.getElementById("btn-skip-intro")?.addEventListener("click", hideIntro);
  document.getElementById("btn-replay-intro")?.addEventListener("click", playIntro);

  // Mobile Menu
  const btnMenu = document.getElementById("btn-menu");
  const mobileNav = document.getElementById("mobile-nav");
  btnMenu?.addEventListener("click", () => {
    mobileNav?.classList.toggle("open");
  });
  mobileNav?.addEventListener("click", (e) => {
    if (e.target.closest("a")) mobileNav.classList.remove("open");
  });

  // Spotlight Prev / Next
  document.getElementById("spot-prev")?.addEventListener("click", () => {
    const len = STUDIO_CONFIG.capsters.length;
    state.spotlightIndex = (state.spotlightIndex - 1 + len) % len;
    renderSpotlight();
  });

  document.getElementById("spot-next")?.addEventListener("click", () => {
    const len = STUDIO_CONFIG.capsters.length;
    state.spotlightIndex = (state.spotlightIndex + 1) % len;
    renderSpotlight();
  });

  // Swipe HP pada Spotlight Card
  const spotCard = document.getElementById("spotlight-card");
  let touchStartX = 0;
  spotCard?.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.changedTouches[0].screenX;
    },
    { passive: true }
  );
  spotCard?.addEventListener(
    "touchend",
    (e) => {
      const diff = e.changedTouches[0].screenX - touchStartX;
      if (Math.abs(diff) < 45) return;
      const len = STUDIO_CONFIG.capsters.length;
      state.spotlightIndex =
        diff < 0
          ? (state.spotlightIndex + 1) % len
          : (state.spotlightIndex - 1 + len) % len;
      renderSpotlight();
    },
    { passive: true }
  );

  // Tombol "Booking dengan [Capster]" dari Spotlight
  document.getElementById("spot-book-btn")?.addEventListener("click", () => {
    const capster = STUDIO_CONFIG.capsters[state.spotlightIndex];
    if (!capster) return;
    state.selectedCapsterId = capster.id;
    renderCapsterPicker();
    updateSummary();
    showToast(`Capster ${capster.name} terpilih untuk booking!`);
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
  });

  // Pilih Layanan (multi-select)
  document.getElementById("service-grid")?.addEventListener("click", (e) => {
    const card = e.target.closest(".service-card");
    if (!card) return;
    const id = card.dataset.id;
    if (state.selectedServiceIds.includes(id)) {
      state.selectedServiceIds = state.selectedServiceIds.filter((x) => x !== id);
    } else {
      state.selectedServiceIds.push(id);
    }
    document.getElementById("form-error").textContent = "";
    renderServices();
    updateSummary();
  });

  // Pilih Capster di Form Booking
  document.getElementById("capster-grid")?.addEventListener("click", (e) => {
    const btn = e.target.closest(".capster-option");
    if (!btn) return;
    state.selectedCapsterId = btn.dataset.id;
    renderCapsterPicker();
    updateSummary();
  });

  // Pilih Jam
  document.getElementById("time-slots")?.addEventListener("click", (e) => {
    const btn = e.target.closest(".time-slot");
    if (!btn) return;
    state.selectedTime = btn.dataset.time;
    renderTimeSlots();
    updateSummary();
  });

  // Input Nama, Tanggal, Catatan
  const inputName = document.getElementById("input-name");
  const inputDate = document.getElementById("input-date");
  const inputNote = document.getElementById("input-note");

  inputName?.addEventListener("input", (e) => {
    state.customerName = e.target.value;
    document.getElementById("form-error").textContent = "";
    updateSummary();
  });

  inputDate?.addEventListener("change", (e) => {
    state.selectedDate = e.target.value;
    updateSummary();
  });

  inputNote?.addEventListener("input", (e) => {
    state.customerNote = e.target.value;
    updateSummary();
  });

  // Kirim WhatsApp
  document.getElementById("btn-book-wa")?.addEventListener("click", () => {
    const errEl = document.getElementById("form-error");
    if (state.selectedServiceIds.length === 0) {
      errEl.textContent = "Pilih minimal 1 layanan terlebih dahulu.";
      return;
    }
    if (!state.customerName.trim()) {
      errEl.textContent = "Masukkan nama kamu dulu supaya admin gampang mencatat jadwal.";
      inputName?.focus();
      return;
    }

    errEl.textContent = "";
    const msg = buildWhatsAppMessage();
    const waUrl = `https://wa.me/${STUDIO_CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`;
    window.open(waUrl, "_blank", "noopener,noreferrer");
    showToast("Membuka WhatsApp dengan format reservasi...");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  try {
    state.selectedDate = getTodayDateString();
    const dateInput = document.getElementById("input-date");
    if (dateInput) {
      dateInput.value = state.selectedDate;
      dateInput.min = state.selectedDate;
    }

    const yearEl = document.getElementById("footer-year");
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());

    updateOpenStatus();
    setInterval(updateOpenStatus, 60000);

    buildSpotlightTabs();
    renderSpotlight();
    renderServices();
    renderCapsterPicker();
    renderTimeSlots();
    updateSummary();
    initEvents();
    playIntro();
  } catch (err) {
    console.error("Gagal inisialisasi:", err);
    hideIntro();
  }
});