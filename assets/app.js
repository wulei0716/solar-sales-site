const datasheetUrls = {
  "deye-hybrid-inverter": "https://deye.com/wp-content/uploads/2025/10/sun-7.6-8k-sg01lp1-eu.pdf",
  "airo-hybrid-inverter": "https://www.solaxpower.com/uploads/file/solax-x1-hybrid-g4-datasheet-en.pdf",
  "goodwe-storage-inverter": "https://en.goodwe.com/Ftp/EN/Downloads/Datasheet/GW_ES%20G2_Datasheet-EN.pdf",
  "deye-storage-battery": "https://deye.com/wp-content/uploads/2025/10/deye-ai-w5.1-b-series_brochure-20250428v1.0.pdf",
  "airo-storage-battery": "https://www.solaxpower.com/uploads/file/solax-t-bat-sys-hv-s3.6-datasheet-en.pdf",
  "goodwe-lynx-battery": "https://en.goodwe.com/Ftp/EN/Downloads/Datasheet/GW_Lynx%20Home%20U%20Series%20(LV)_5.4-20_Datasheet-EN.pdf",
  "longi-module": "https://static.longi.com/2_LR_7_72_HGD_585_620_M_V2_30_30_and_15_V05_EN_c6514bcafc.pdf",
  "jinko-module": "https://www.jinkosolar.com/uploads/JKM625-650N-78HL4-BDV-F9-EN.pdf",
  "trina-module": "https://static.trinasolar.com/sites/default/files/Datasheet_Vertex_NEG21C.20_EN_2023_A_web.pdf",
};

const officialImages = {
  deyeInverter: "https://deye.com/wp-content/uploads/2024/06/sun-7.6-8k-sg01lp1-eu-2-scaled.png",
  solaxInverter: "https://www.solaxpower.com/uploadfile/1/202507/bcf8461737.webp",
  goodweInverter: "https://en.goodwe.com/Public/Uploads/uploadfile/images/20220830/%E4%BA%A7%E5%93%81%E5%90%8D-1.png",
  deyeBattery: "https://deye.com/wp-content/uploads/2023/10/al-w5.1-b-1.jpg",
  solaxBattery: "https://www.solaxpower.com/uploadfile/1/202506/6e55b6eb7a.png",
  goodweBattery: "https://en.goodwe.com/Public/Uploads/uploadfile/images/20231226/Lynx-U%E4%BA%8C%E4%BB%A3%E6%9C%BA-1.png",
  longiModule: "https://static.longi.com/Images_412x612_11869e6bbf.png",
  jinkoModule: "https://www.jinkosolar.com/uploads/665d7173/78-182x182%20BDV.jpg",
  trinaModule: "https://www-cdn.trinasolar.com/wwwstorage/sites/7/725W-TSM-NEG21C20.png",
};

const products = [
  {
    id: "deye-hybrid-inverter",
    status: "现货",
    brand: "德业 Deye",
    category: "逆变器",
    model: "SUN-7.6/8K-SG01LP1-EU",
    title: "SUN-7.6/8K-SG01LP1-EU 单相混合逆变器",
    summary: "Deye 官方页显示，该机型支持 AC 耦合改造、最多 16 台并联、190A 充放电电流和柴油发电机储能接入。",
    tags: ["Deye官网", "单相混合", "190A充放电"],
    specs: ["PV接入 15.2/16kW", "电池电压 40-60V", "MPPT 150-425V", "最多16台并联"],
    sourceLabel: "Deye 官方产品页",
    officialUrl: "https://deye.com/product/sun-7-6-8k-sg01lp1-eu/",
    image: officialImages.deyeInverter,
    imageAlt: "Deye SUN-7.6/8K-SG01LP1-EU 官方产品图",
    imageLabel: "Deye官网图",
  },
  {
    id: "airo-hybrid-inverter",
    status: "现货",
    brand: "艾罗 SolaX",
    category: "逆变器",
    aliases: ["爱罗"],
    model: "X1-Hybrid G4",
    title: "X1-Hybrid G4 单相混合逆变器",
    summary: "SolaX 官方页显示，X1-Hybrid G4 覆盖 3.0-7.5kW，可与 T30 电池和 Matebox 组成 X-ESS G4 家庭储能系统。",
    tags: ["SolaX官网", "单相混合", "X-ESS G4"],
    specs: ["3.0-7.5kW", "200% PV oversizing", "充放电效率最高97%", "2路MPPT 16A/16A"],
    sourceLabel: "SolaX 官方产品页",
    officialUrl: "https://www.solaxpower.com/products/x1-hybrid-g4.html",
    image: officialImages.solaxInverter,
    imageAlt: "SolaX X1-Hybrid G4 官方产品图",
    imageLabel: "SolaX官网图",
  },
  {
    id: "goodwe-storage-inverter",
    status: "预订",
    brand: "固德威 GoodWe",
    category: "逆变器",
    model: "ES G2 Series / GW5000-ES-20",
    title: "ES G2 Series 单相低压混合逆变器",
    summary: "GoodWe 官方页显示，ES G2 为 3-6kW 单相低压混合逆变器，支持 UPS 级备用切换并兼容 Lynx Home U 等低压电池。",
    tags: ["GoodWe官网", "3-6kW", "低压混合"],
    specs: ["2路MPPT", "电池电压40-60V", "PV每路16A", "GW5000-ES-20 120A充放电"],
    sourceLabel: "GoodWe 官方产品页",
    officialUrl: "https://en.goodwe.com/es-g2",
    image: officialImages.goodweInverter,
    imageAlt: "GoodWe ES G2 Series 官方产品图",
    imageLabel: "GoodWe官网图",
  },
  {
    id: "deye-storage-battery",
    status: "现货",
    brand: "德业 Deye",
    category: "电池",
    model: "AI-W5.1-B",
    title: "AI-W5.1-B LFP 模块化储能电池",
    summary: "Deye 官方页显示，该低压储能电池采用 LiFePO4 体系，单模块 5.12kWh，IP65，支持堆叠扩展到 30.72kWh。",
    tags: ["Deye官网", "5.12kWh", "LiFePO4"],
    specs: ["5.12kWh/模块", "100Ah / 51.2V", "≥6000次循环 EOL70%", "IP65 堆叠至30.72kWh"],
    sourceLabel: "Deye 官方产品页",
    officialUrl: "https://deye.com/product/ai-w5-1-b/",
    image: officialImages.deyeBattery,
    imageAlt: "Deye AI-W5.1-B 官方产品图",
    imageLabel: "Deye官网图",
  },
  {
    id: "airo-storage-battery",
    status: "预订",
    brand: "艾罗 SolaX",
    category: "电池",
    aliases: ["爱罗"],
    model: "T-BAT-SYS-HV-S3.6",
    title: "T-BAT-SYS-HV-S3.6 高压储能电池",
    summary: "SolaX 官方页显示，该系列为 7.3-47.9kWh LFP 高压电池，采用堆叠模块和即插即用设计。",
    tags: ["SolaX官网", "LFP", "高压堆叠"],
    specs: ["7.3-47.9kWh", "T-BAT HS7.2起", "最大50A充放电", "2-13个模块"],
    sourceLabel: "SolaX 官方产品页",
    officialUrl: "https://www.solaxpower.com/products/t-bat-sys-hv-s3-6.html",
    image: officialImages.solaxBattery,
    imageAlt: "SolaX T-BAT-SYS-HV-S3.6 官方产品图",
    imageLabel: "SolaX官网图",
  },
  {
    id: "goodwe-lynx-battery",
    status: "询价",
    brand: "固德威 GoodWe",
    category: "电池",
    model: "Lynx Home U Series / LX U5.4-20",
    title: "Lynx Home U Series 低压锂电池",
    summary: "GoodWe 官方页显示，Lynx Home U 为 5.4-32.4kWh 低压住宅电池，支持自动识别、即插即用和 IP65 防护。",
    tags: ["GoodWe官网", "5.4-32.4kWh", "低压电池"],
    specs: ["LX U5.4-20", "5.4kWh/模块", "51.2V", "IP65 墙装/落地"],
    sourceLabel: "GoodWe 官方产品页",
    officialUrl: "https://en.goodwe.com/lynx-home-u-series-low-voltage-lithium-battery",
    image: officialImages.goodweBattery,
    imageAlt: "GoodWe Lynx Home U Series 官方产品图",
    imageLabel: "GoodWe官网图",
  },
  {
    id: "longi-module",
    status: "现货",
    brand: "隆基 LONGi",
    category: "组件",
    model: "Hi-MO 7 / LR7-72HGD",
    title: "Hi-MO 7 高效双面组件",
    summary: "LONGi 官方页显示，Hi-MO 7 面向大规模电站，组件功率 610W，组件效率 22.60%，线性功率质保 30 年。",
    tags: ["LONGi官网", "Hi-MO 7", "双面组件"],
    specs: ["Module Power 610W", "效率22.60%", "144片版型", "12年产品/30年功率质保"],
    sourceLabel: "LONGi 官方产品页",
    officialUrl: "https://www.longi.com/en/products/modules/hi-mo-7/",
    image: officialImages.longiModule,
    imageAlt: "LONGi Hi-MO 7 官方产品图",
    imageLabel: "LONGi官网图",
  },
  {
    id: "jinko-module",
    status: "现货",
    brand: "晶科 Jinko",
    category: "组件",
    model: "Tiger Neo 78HC-BDV / JKM625-650N-78HL4-BDV",
    title: "Tiger Neo 78HC-BDV N型双面组件",
    summary: "JinkoSolar 官方 Tiger Neo 页面显示，该 78HC-BDV 组件正面功率 650Wp，组件效率 23.3%，线性功率质保 30 年。",
    tags: ["Jinko官网", "Tiger Neo", "N型TOPCon"],
    specs: ["650Wp正面功率", "效率23.3%", "78HC-BDV", "30年线性功率质保"],
    sourceLabel: "JinkoSolar 官方产品页",
    officialUrl: "https://www.jinkosolar.com/en/site/tigerneo",
    image: officialImages.jinkoModule,
    imageAlt: "JinkoSolar Tiger Neo 78HC-BDV 官方产品图",
    imageLabel: "Jinko官网图",
  },
  {
    id: "trina-module",
    status: "询价",
    brand: "天合 Trina",
    category: "组件",
    model: "Vertex N 725W+ / TSM-NEG21C.20",
    title: "Vertex N 725W+ 超高功率组件",
    summary: "Trinasolar 官方 Vertex N 页面显示，该系列采用 n-type 与 210mm 技术，TSM-NEG21C.20 对应 Vertex N 725W+。",
    tags: ["Trina官网", "Vertex N", "210mm"],
    specs: ["TSM-NEG21C.20", "725W+", "n-type双面", "低温度系数"],
    sourceLabel: "Trinasolar 官方产品页",
    officialUrl: "https://www.trinasolar.com/eu/VertexN/",
    image: officialImages.trinaModule,
    imageAlt: "Trinasolar Vertex N 725W+ TSM-NEG21C.20 官方产品图",
    imageLabel: "Trina官网图",
  },
];

const grid = document.querySelector("#productGrid");
const searchInput = document.querySelector("#productSearch");
const filterButtons = document.querySelectorAll("[data-filter]");
const quotePanel = document.querySelector("#quotePanel");
const quoteList = document.querySelector("#quoteList");
const quoteForm = document.querySelector("#quoteForm");
const formNote = document.querySelector("#formNote");
const quoteCountNodes = document.querySelectorAll("[data-quote-count]");
const siteHeader = document.querySelector(".site-header");
const hero = document.querySelector(".hero");
const navToggle = document.querySelector(".nav-toggle");

let activeFilter = "全部";
let quote = JSON.parse(localStorage.getItem("solarQuote") || "[]");
let revealObserver;
let scrollTicking = false;
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let enableParallax = window.innerWidth >= 768;

window.addEventListener("resize", () => {
  enableParallax = window.innerWidth >= 768;
}, { passive: true });

function matchesProduct(product, term) {
  const haystack = [
    product.brand,
    product.category,
    product.model,
    product.title,
    product.summary,
    product.aliases?.join(" "),
    product.tags.join(" "),
    product.specs?.join(" "),
    product.sourceLabel,
  ]
    .filter(Boolean)
    .join(" ");
  return haystack.toLowerCase().includes(term.toLowerCase());
}

function renderProducts() {
  const term = searchInput.value.trim();
  const visibleProducts = products.filter((product) => {
    const categoryMatch = activeFilter === "全部" || product.category === activeFilter;
    return categoryMatch && matchesProduct(product, term);
  });

  grid.innerHTML = visibleProducts
    .map((product) => {
      const isAdded = quote.includes(product.id);
      return `
        <article class="product-card">
          <div class="product-media">
            <img src="${product.image}" alt="${product.imageAlt || `${product.title}官方产品图`}" loading="lazy" />
            <span class="media-label">${product.imageLabel || "官网产品图"}</span>
            ${product.status ? `<span class="product-status" data-status="${product.status}">${product.status}</span>` : ""}
          </div>
          <div class="product-body">
            <div class="product-meta">
              <span class="product-brand">${product.brand}</span>
              <span class="product-category">${product.category}</span>
            </div>
            <h3>${product.title}</h3>
            ${product.model ? `<span class="product-model">${product.model}</span>` : ""}
            <p>${product.summary}</p>
            ${
              product.specs
                ? `<div class="spec-list" aria-label="${product.title}关键参数">
                    ${product.specs.map((spec) => `<span>${spec}</span>`).join("")}
                  </div>`
                : ""
            }
            <div class="tag-list" aria-label="${product.title}标签">
              ${product.tags.map((tag) => `<span>${tag}</span>`).join("")}
            </div>
            ${
              datasheetUrls[product.id]
                ? `<a class="datasheet-link" href="${datasheetUrls[product.id]}" target="_blank" rel="noopener">规格书下载 PDF</a>`
                : ""
            }
            <button class="button button-primary" type="button" data-add-product="${product.id}">
              ${isAdded ? "已加入询盘" : "加入询盘"}
            </button>
          </div>
        </article>
      `;
    })
    .join("");

  if (!visibleProducts.length) {
    grid.innerHTML = `<p class="quote-empty">没有找到匹配产品，可以换一个关键词再试。</p>`;
  }

  requestAnimationFrame(() => observeRevealTargets(grid));
}

function renderQuote() {
  const selectedProducts = quote.map((id) => products.find((product) => product.id === id)).filter(Boolean);
  quoteCountNodes.forEach((node) => {
    node.textContent = selectedProducts.length;
  });

  if (!selectedProducts.length) {
    quoteList.innerHTML = `<p class="quote-empty">还没有加入产品。先在目录里选择需要报价的逆变器、电池或组件。</p>`;
    return;
  }

  quoteList.innerHTML = selectedProducts
    .map(
      (product) => `
        <div class="quote-item">
          <div>
            <strong>${product.title}</strong>
            <span>${product.brand} · ${product.category}</span>
          </div>
          <button type="button" data-remove-product="${product.id}">移除</button>
        </div>
      `,
    )
    .join("");
}

function saveQuote() {
  localStorage.setItem("solarQuote", JSON.stringify(quote));
  renderQuote();
  renderProducts();
}

function openQuote() {
  document.body.classList.add("quote-open");
  quotePanel.setAttribute("aria-hidden", "false");
}

function closeQuote() {
  document.body.classList.remove("quote-open");
  quotePanel.setAttribute("aria-hidden", "true");
}

function syncFilterButtons() {
  filterButtons.forEach((item) => {
    item.classList.toggle("is-active", item.dataset.filter === activeFilter);
  });
}

function moveToCatalog() {
  document.querySelector("#catalog").scrollIntoView({
    behavior: reduceMotion ? "auto" : "smooth",
    block: "start",
  });
}

function applyCatalogShortcut(filter, term = "") {
  activeFilter = filter;
  searchInput.value = term;
  syncFilterButtons();
  renderProducts();
  moveToCatalog();
}

function observeRevealTargets(scope = document) {
  const targets = scope.querySelectorAll("[data-reveal], .signal-grid article, .product-card, .solution-layout article, .service-steps li");

  targets.forEach((target, index) => {
    target.style.transitionDelay = `${Math.min(index * 55, 220)}ms`;

    if (!revealObserver || reduceMotion) {
      target.classList.add("is-visible");
      return;
    }

    revealObserver.observe(target);
  });
}

function setupReveal() {
  document.querySelectorAll(".signal-section, .catalog-section, .solutions, .service, .faq-section, .contact").forEach((section) => {
    section.setAttribute("data-reveal", "");
  });

  if (!("IntersectionObserver" in window) || reduceMotion) {
    observeRevealTargets();
    return;
  }

  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.16,
      rootMargin: "0px 0px -8% 0px",
    },
  );

  observeRevealTargets();
}

function updateScrollMotion() {
  const scrollY = window.scrollY || 0;
  siteHeader.classList.toggle("is-scrolled", scrollY > 12);

  if (!reduceMotion && enableParallax && hero) {
    const heroRect = hero.getBoundingClientRect();
    const progress = Math.min(Math.max(-heroRect.top / heroRect.height, 0), 1);
    document.documentElement.style.setProperty("--hero-shift", `${progress * 48}px`);
  }

  scrollTicking = false;
}

function setupScrollMotion() {
  updateScrollMotion();

  window.addEventListener(
    "scroll",
    () => {
      if (!scrollTicking) {
        requestAnimationFrame(updateScrollMotion);
        scrollTicking = true;
      }
    },
    { passive: true },
  );
}

function closeNav() {
  document.body.classList.remove("nav-open");
  navToggle?.setAttribute("aria-expanded", "false");
  navToggle?.setAttribute("aria-label", "展开导航菜单");
}

navToggle?.addEventListener("click", () => {
  const isOpen = document.body.classList.toggle("nav-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
  navToggle.setAttribute("aria-label", isOpen ? "关闭导航菜单" : "展开导航菜单");
});

document.querySelector("#mainNav")?.addEventListener("click", (e) => {
  if (e.target.closest("a")) closeNav();
});

document.addEventListener("click", (event) => {
  if (
    document.body.classList.contains("nav-open") &&
    !event.target.closest(".nav-toggle") &&
    !event.target.closest("#mainNav")
  ) {
    closeNav();
  }

  const addButton = event.target.closest("[data-add-product]");
  const removeButton = event.target.closest("[data-remove-product]");
  const openButton = event.target.closest("[data-open-quote]");
  const closeButton = event.target.closest("[data-close-quote]");
  const quickSearchButton = event.target.closest("[data-quick-search]");
  const quickFilterButton = event.target.closest("[data-quick-filter]");
  const focusSearchLink = event.target.closest("[data-focus-search]");

  if (addButton) {
    const productId = addButton.dataset.addProduct;
    if (!quote.includes(productId)) {
      quote = [...quote, productId];
      saveQuote();
    }
    openQuote();
  }

  if (removeButton) {
    quote = quote.filter((id) => id !== removeButton.dataset.removeProduct);
    saveQuote();
  }

  if (openButton) {
    openQuote();
  }

  if (closeButton) {
    closeQuote();
  }

  if (quickSearchButton) {
    applyCatalogShortcut("全部", quickSearchButton.dataset.quickSearch);
  }

  if (quickFilterButton) {
    applyCatalogShortcut(quickFilterButton.dataset.quickFilter);
  }

  if (focusSearchLink) {
    setTimeout(() => searchInput.focus(), 260);
  }
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    syncFilterButtons();
    renderProducts();
  });
});

searchInput.addEventListener("input", renderProducts);

quoteForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(quoteForm);
  const selectedProducts = quote
    .map((id) => products.find((product) => product.id === id))
    .filter(Boolean)
    .map((product) => {
      const officialSource = product.officialUrl ? `（官网：${product.officialUrl}）` : "";
      return `- ${product.brand} / ${product.title}${officialSource}`;
    })
    .join("\n");
  const body = encodeURIComponent([
    `姓名或公司：${data.get("name")}`,
    `联系方式：${data.get("contact")}`,
    "询盘产品：",
    selectedProducts || "- 暂未选择产品",
    "项目需求：",
    data.get("message") || "请联系我确认配置。",
  ].join("\n"));

  const subject = encodeURIComponent("太阳能产品询盘");
  window.location.href = `mailto:sales@your-domain.com?subject=${subject}&body=${body}`;
  formNote.textContent = "已生成邮件草稿。上线前请把 sales@your-domain.com 替换为你的真实邮箱。";
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeQuote();
    closeNav();
  }
});

setupReveal();
setupScrollMotion();
renderProducts();
renderQuote();
