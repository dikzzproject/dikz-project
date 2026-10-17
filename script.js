document.documentElement.classList.add("js");

/* ==========================================================
   KONFIGURASI: ubah data di sini, tidak perlu menyentuh kode lain
   ========================================================== */
const CONFIG = {
  whatsappNumber: "6285111509070",      // format internasional tanpa + atau 0
  githubUrl: "https://github.com/dikzzproject",
  typingTexts: [
    "Web Developer",
    "WhatsApp Bot Engineer",
    "Node.js & Automation Enthusiast"
  ],
  skills: [
    { name: "HTML & CSS",          level: 95 },
    { name: "JavaScript",          level: 90 },
    { name: "Node.js (Baileys / WA Bot)", level: 88 },
    { name: "REST API & Database", level: 80 }
  ],
  abilities: [
    {
      icon: "🌐",
      title: "Membuat Web Sederhana",
      desc: "Membuat website yang bersih, responsif, dan mudah dirawat, seperti landing page, profil usaha, dan portofolio.",
      tags: ["HTML", "CSS", "JavaScript"]
    },
    {
      icon: "🤖",
      title: "Membuat Bot WhatsApp & Discord",
      desc: "Membangun bot untuk otomatisasi pesan, perintah, notifikasi, dan layanan pelanggan di WhatsApp maupun Discord.",
      tags: ["Node.js", "WhatsApp", "Discord"]
    },
    {
      icon: "📊",
      title: "Mengoperasikan MS Office",
      desc: "Mengolah dokumen, data, dan presentasi dengan rapi menggunakan Word, Excel, dan PowerPoint.",
      tags: ["Word", "Excel", "PowerPoint"]
    }
  ],
  botReplies: {
    menu:    "📋 Menu layanan:\n1. Pembuatan website\n2. Bot WhatsApp\n3. Integrasi API",
    harga:   "💰 Paket mulai dari Rp500.000 untuk landing page dan Rp1.500.000 untuk bot sederhana.",
    status:  "✅ Semua sistem berjalan normal. Uptime 99,9%.",
    bantuan: "🆘 Perintah tersedia: menu, harga, status, bantuan."
  },
  botFallback: "🤔 Perintah tidak dikenali. Ketik bantuan untuk daftar perintah."
};

/* ==========================================================
   UTILITAS
   ========================================================== */
const $  = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];

function createElement(tag, className, text) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (text !== undefined) el.textContent = text;
  return el;
}

/* ==========================================================
   1. TEMA (terang / gelap)
   ========================================================== */
const themeModule = {
  init() {
    try {
      const saved = localStorage.getItem("theme");
      if (saved) document.documentElement.dataset.theme = saved;
    } catch (e) { /* storage tidak tersedia */ }

    $("#themeToggle").addEventListener("click", () => this.toggle());
  },

  isDark() {
    const forced = document.documentElement.dataset.theme;
    if (forced) return forced === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  },

  toggle() {
    const next = this.isDark() ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch (e) { /* abaikan */ }
  }
};

/* ==========================================================
   2. NAVIGASI (menu mobile & link aktif)
   ========================================================== */
const navModule = {
  init() {
    const menu = $("#menu");

    $("#menuToggle").addEventListener("click", () => menu.classList.toggle("open"));
    $$("a", menu).forEach(link =>
      link.addEventListener("click", () => menu.classList.remove("open"))
    );

    this.highlightOnScroll();
  },

  highlightOnScroll() {
    const links = $$("#menu a");
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        links.forEach(link =>
          link.classList.toggle("active", link.getAttribute("href") === "#" + entry.target.id)
        );
      });
    }, { rootMargin: "-45% 0px -50% 0px" });

    $$("main section[id]").forEach(section => observer.observe(section));
  }
};

/* ==========================================================
   3. EFEK MENGETIK
   ========================================================== */
const typingModule = {
  textIndex: 0,
  charIndex: 0,
  deleting: false,

  init() {
    this.target = $("#typing");
    this.tick();
  },

  tick() {
    const word = CONFIG.typingTexts[this.textIndex];
    this.charIndex += this.deleting ? -1 : 1;
    this.target.textContent = word.slice(0, this.charIndex);

    let delay = this.deleting ? 40 : 80;

    if (!this.deleting && this.charIndex === word.length) {
      this.deleting = true;
      delay = 1500;
    } else if (this.deleting && this.charIndex === 0) {
      this.deleting = false;
      this.textIndex = (this.textIndex + 1) % CONFIG.typingTexts.length;
      delay = 400;
    }

    setTimeout(() => this.tick(), delay);
  }
};

/* ==========================================================
   4. ANIMASI SAAT SCROLL (reveal, statistik, skill bar)
   ========================================================== */
const scrollModule = {
  init() {
    this.renderSkills();

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        this.animateCounters(entry.target);
        this.fillSkills(entry.target);
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.15 });

    $$(".reveal").forEach(el => observer.observe(el));
  },

  renderSkills() {
    const wrapper = $("#skills");
    CONFIG.skills.forEach(skill => {
      const item = createElement("div", "skill");
      item.innerHTML = `
        <div class="skill__head"><span></span><span>${skill.level}%</span></div>
        <div class="skill__bar"><div class="skill__fill" data-level="${skill.level}"></div></div>`;
      $("span", item).textContent = skill.name;
      wrapper.appendChild(item);
    });
  },

  fillSkills(container) {
    $$(".skill__fill", container).forEach(bar => (bar.style.width = bar.dataset.level + "%"));
  },

  animateCounters(container) {
    $$("[data-count]", container).forEach(el => {
      const target = Number(el.dataset.count);
      const duration = 1200;
      const start = performance.now();

      const step = now => {
        const progress = Math.min((now - start) / duration, 1);
        el.textContent = Math.round(progress * target) + (progress === 1 ? "+" : "");
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  }
};

/* ==========================================================
   5. KEMAMPUAN (render kartu)
   ========================================================== */
const abilitiesModule = {
  init() {
    const wrapper = $("#abilities");

    CONFIG.abilities.forEach(ability => {
      const card = createElement("article", "card ability reveal");
      card.append(
        createElement("div", "ability__icon", ability.icon),
        createElement("h3", "", ability.title),
        createElement("p", "", ability.desc)
      );

      const tags = createElement("div", "ability__tags");
      ability.tags.forEach(tag => tags.appendChild(createElement("span", "tag", tag)));
      card.appendChild(tags);

      wrapper.appendChild(card);
    });
  }
};

/* ==========================================================
   6. DEMO CHAT BOT
   ========================================================== */
const chatModule = {
  init() {
    this.body  = $("#chatBody");
    this.input = $("#chatInput");

    this.renderQuickButtons();
    this.addMessage("Halo! 👋 Saya bot demo. Ketik bantuan untuk melihat perintah.", "bot");

    $("#chatForm").addEventListener("submit", event => {
      event.preventDefault();
      this.send(this.input.value);
      this.input.value = "";
    });
  },

  renderQuickButtons() {
    const wrapper = $("#chatQuick");
    Object.keys(CONFIG.botReplies).forEach(command => {
      const btn = createElement("button", "", command);
      btn.type = "button";
      btn.addEventListener("click", () => this.send(command));
      wrapper.appendChild(btn);
    });
  },

  send(rawText) {
    const text = rawText.trim();
    if (!text) return;

    this.addMessage(text, "user");

    const reply = CONFIG.botReplies[text.toLowerCase()] || CONFIG.botFallback;
    setTimeout(() => this.addMessage(reply, "bot"), 600);
  },

  addMessage(text, sender) {
    this.body.appendChild(createElement("div", "msg msg--" + sender, text));
    this.body.scrollTop = this.body.scrollHeight;
  }
};

/* ==========================================================
   7. KONTAK (kirim ke WhatsApp)
   ========================================================== */
const contactModule = {
  init() {
    const waBase = "https://wa.me/" + CONFIG.whatsappNumber;
    $("#waLink").href = waBase;
    $("#githubLink").href = CONFIG.githubUrl;
    $("#year").textContent = new Date().getFullYear();

    $("#contactForm").addEventListener("submit", event => {
      event.preventDefault();
      this.submit(new FormData(event.target), waBase);
    });
  },

  submit(data, waBase) {
    const name = data.get("name").trim();
    const message = data.get("message").trim();
    const note = $("#formNote");

    if (!name || !message) {
      note.textContent = "Mohon isi nama dan pesan terlebih dahulu.";
      return;
    }

    const text = encodeURIComponent(`Halo, saya ${name}.\n\n${message}`);
    window.open(`${waBase}?text=${text}`, "_blank", "noopener");
    note.textContent = "Membuka WhatsApp...";
  }
};

/* ==========================================================
   INISIALISASI
   ========================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const modules = [
    themeModule, navModule, typingModule, abilitiesModule,
    scrollModule, chatModule, contactModule
  ];

  modules.forEach(module => {
    try {
      module.init();
    } catch (error) {
      console.error("Gagal menjalankan modul:", error);
    }
  });
});
