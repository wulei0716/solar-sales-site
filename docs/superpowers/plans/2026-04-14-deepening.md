# 光能仓网站深化 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 新增 Brand Strip、About、FAQ 三个区块，改造 Contact 区块为双通道，重构询盘清单数据结构并接入 Formspree + WhatsApp 联系。

**Architecture:** 纯静态 HTML/CSS/JS，无框架，无构建工具。JS 改动集中在 `app.js` 单文件；CSS 新增样式追加到 `styles.css` 末尾现有媒体查询之前；HTML 在 `index.html` 插入三处新区块并修改 Contact 区块。`quote` 数据结构从 `string[]` 升级为 `{id: string, qty: number}[]`，需做向后兼容读取。

**Tech Stack:** Vanilla JS (ES2020)、CSS custom properties、Formspree REST API（静态表单托管）、WhatsApp deep link (`wa.me`)

---

## 文件变更总览

| 文件 | 操作 |
|------|------|
| `index.html` | 新增 Brand Strip（hero 后）、About 区块（overview 后）、FAQ 区块（service 后）；修改 Contact 区块 |
| `assets/styles.css` | 追加 Brand Strip、About、产品状态标签、Contact cards、FAQ、WhatsApp 按钮样式；修改 `.contact` 基础样式 |
| `assets/app.js` | 新增常量 `FORMSPREE_ID` / `WHATSAPP_NUMBER`；产品对象加 `status` 字段；重构 `quote` 数据结构；更新 `renderProducts`、`renderQuote`；替换表单提交逻辑；新增 qty 变更监听、WhatsApp 初始化 |

---

## Task 1: Brand Strip HTML + CSS

**Files:**
- Modify: `index.html` — hero `</section>` 闭合标签后插入 Brand Strip
- Modify: `assets/styles.css` — 在 `/* ─── Sections ───` 注释之前插入样式

- [ ] **Step 1: 在 `index.html` hero 区块结束后插入 Brand Strip**

定位 `index.html` 第 82 行 `</section>` 闭合（hero section），在其后插入：

```html
    <div class="brand-strip" aria-label="合作品牌">
      <p>Deye 德业 · SolaX 艾罗 · GoodWe 固德威 · LONGi 隆基 · JinkoSolar 晶科 · Trinasolar 天合</p>
      <p>官方授权渠道 · CE / IEC 认证产品</p>
    </div>
```

- [ ] **Step 2: 在 `styles.css` 第 444 行（`/* ─── Sections` 注释之前）插入样式**

```css
/* ─── Brand Strip ────────────────────────────────────────────────────────── */

.brand-strip {
  padding: 14px clamp(20px, 5vw, 64px);
  background: #f5f5f7;
  border-bottom: 1px solid var(--line);
  text-align: center;
}

.brand-strip p {
  margin: 0;
  font-size: 0.78rem;
  line-height: 1.7;
}

.brand-strip p:first-child {
  font-weight: 500;
  color: var(--fg);
}

.brand-strip p:last-child {
  font-weight: 400;
  color: var(--muted);
}

```

- [ ] **Step 3: 浏览器验证**

在浏览器打开 `index.html`（直接拖入或 VS Code Live Server）。  
预期：hero 图片下方出现浅灰横条，两行文字居中，上行深色品牌名，下行浅灰资质说明。

- [ ] **Step 4: Commit**

```bash
git add index.html assets/styles.css
git commit -m "feat: 添加品牌资质横条 Brand Strip"
```

---

## Task 2: About 区块 HTML

**Files:**
- Modify: `index.html` — overview `</section>` 后插入 About 区块

About 区块复用现有 `.signal-section` 类，无需新增 CSS（布局、背景、字体全部继承）。

- [ ] **Step 1: 在 `index.html` 第 109 行 overview `</section>` 闭合后插入**

```html
      <section class="signal-section" id="about" aria-labelledby="about-title">
        <div class="signal-copy">
          <p class="eyebrow">About</p>
          <h2 id="about-title">专注光伏设备的<br>采购与交付支持</h2>
          <p>
            从国内头部品牌直接配货，支持按项目清单、按柜采购，覆盖欧洲、东南亚、中东主要市场。
          </p>
        </div>
        <div class="signal-grid" aria-label="服务能力">
          <article>
            <span>0.5</span>
            <h3>Source</h3>
            <p>直接对接品牌原厂或一级经销，货源可溯源。</p>
          </article>
          <article>
            <span>0.6</span>
            <h3>Coverage</h3>
            <p>欧洲 CE、东南亚、中东区域认证配货支持。</p>
          </article>
          <article>
            <span>0.7</span>
            <h3>Delivery</h3>
            <p>支持按柜、按 BOM 清单出货，协助清关文件。</p>
          </article>
        </div>
      </section>
```

- [ ] **Step 2: 浏览器验证**

滚动至 Overview 区块下方，预期：出现与 Overview 外观一致的"专注光伏设备的采购与交付支持"区块，含 Source / Coverage / Delivery 三格卡片，带入场动画。

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: 添加关于我们 About 区块"
```

---

## Task 3: FAQ 区块 HTML + CSS

**Files:**
- Modify: `index.html` — service `</section>` 后插入 FAQ
- Modify: `assets/styles.css` — Contact 注释之前插入 FAQ 样式
- Modify: `assets/app.js` — `setupReveal` 选择器加入 `.faq-section`

- [ ] **Step 1: 在 `index.html` service 区块 `</section>` 后插入 FAQ**

定位 `</section>` 闭合 `id="service"` 的 section（位于 contact section 之前），插入：

```html
      <section class="faq-section" id="faq" aria-labelledby="faq-title">
        <div class="section-heading">
          <p class="eyebrow">FAQ</p>
          <h2 id="faq-title">常见问题</h2>
        </div>
        <div class="faq-list">
          <details class="faq-item">
            <summary>最小起订量是多少？</summary>
            <p>逆变器和电池支持单台起订，组件一般以托 / 柜为单位，具体以询盘确认为准。</p>
          </details>
          <details class="faq-item">
            <summary>支持哪些付款方式？</summary>
            <p>支持 T/T、L/C，部分订单可接受分批付款，大额项目可议。</p>
          </details>
          <details class="faq-item">
            <summary>交货周期一般多长？</summary>
            <p>现货产品 7–15 个工作日可出；预订产品视品牌排期，通常 4–8 周。</p>
          </details>
          <details class="faq-item">
            <summary>是否提供 CE、IEC 等认证证书？</summary>
            <p>所有品牌均有对应区域认证，询盘时注明目标市场，我们会提供对应证书复印件。</p>
          </details>
          <details class="faq-item">
            <summary>可以提供样品吗？</summary>
            <p>逆变器和电池支持单台样品订单，组件可提供小批量样件，运费到付。</p>
          </details>
        </div>
      </section>
```

- [ ] **Step 2: 在 `styles.css` 的 `/* ─── Contact` 注释行之前插入 FAQ 样式**

```css
/* ─── FAQ ────────────────────────────────────────────────────────────────── */

.faq-section {
  padding: 112px clamp(20px, 5vw, 64px);
  background: var(--surface);
  border-top: 1px solid var(--line);
}

.faq-list {
  margin-top: 40px;
  border-top: 1px solid var(--line);
}

.faq-item {
  border-bottom: 1px solid var(--line);
}

.faq-item summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 22px 0;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: -0.02em;
  list-style: none;
  user-select: none;
}

.faq-item summary::-webkit-details-marker {
  display: none;
}

.faq-item summary::after {
  content: "+";
  flex-shrink: 0;
  font-size: 1.3rem;
  font-weight: 300;
  color: var(--muted);
  transition: transform 260ms cubic-bezier(0.16, 1, 0.3, 1);
}

.faq-item[open] summary::after {
  transform: rotate(45deg);
}

.faq-item p {
  margin: 0;
  padding: 0 0 22px;
  color: var(--muted);
  line-height: 1.78;
  font-weight: 300;
  max-width: 760px;
}

```

- [ ] **Step 3: 在 `app.js` 中将 `.faq-section` 加入 `setupReveal` 的选择器**

定位 `setupReveal` 函数（约第 338 行），将：

```js
  document.querySelectorAll(".signal-section, .catalog-section, .solutions, .service, .contact").forEach((section) => {
```

改为：

```js
  document.querySelectorAll(".signal-section, .catalog-section, .solutions, .service, .faq-section, .contact").forEach((section) => {
```

- [ ] **Step 4: 浏览器验证**

滚动至 Service 区块之后，预期：出现"常见问题"区块，点击每个问题标题后展开答案，`+` 号旋转为 `×`，再次点击收起。

- [ ] **Step 5: Commit**

```bash
git add index.html assets/styles.css assets/app.js
git commit -m "feat: 添加 FAQ 折叠区块"
```

---

## Task 4: Contact 区块改造 HTML + CSS

**Files:**
- Modify: `index.html` — 替换 Contact 区块内容
- Modify: `assets/styles.css` — 替换 `.contact` 规则，追加 contact-card 和 WhatsApp 按钮样式

- [ ] **Step 1: 替换 `index.html` 中的 Contact 区块**

将现有 Contact section（第 189–198 行）整体替换为：

```html
      <section class="contact" id="contact" aria-labelledby="contact-title">
        <div class="contact-intro">
          <p class="eyebrow">Contact</p>
          <h2 id="contact-title">告诉我们你的需求</h2>
          <p>
            在产品目录里选好型号并加入清单，附上项目国家、装机容量和交期要求，我们会回复具体型号推荐与报价。
          </p>
        </div>
        <div class="contact-cards">
          <div class="contact-card">
            <h3>发送询盘</h3>
            <p>填写产品清单和项目需求，我们在 1 个工作日内回复报价。</p>
            <button class="button button-primary" type="button" data-open-quote>打开询盘清单</button>
          </div>
          <div class="contact-card contact-card-wa">
            <h3>WhatsApp 直联</h3>
            <p>工作时间即时回复，也可发送图纸或项目文件。</p>
            <a class="button button-wa" data-whatsapp href="#" target="_blank" rel="noopener">WhatsApp 联系</a>
          </div>
        </div>
      </section>
```

- [ ] **Step 2: 替换 `styles.css` 中的 `.contact` 规则并追加新样式**

将现有 `/* ─── Contact` 区块（第 1006–1020 行）内容替换为：

```css
/* ─── Contact ─────────────────────────────────────────────────────────────── */

.contact {
  background: var(--paper);
  border-top: 1px solid var(--line);
}

.contact-intro {
  max-width: 680px;
  margin-bottom: 48px;
}

.contact-cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.contact-card {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 32px;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 16px;
}

.contact-card h3 {
  margin: 0;
  font-size: 1.05rem;
  font-weight: 700;
  letter-spacing: -0.03em;
}

.contact-card > p {
  flex: 1;
  margin: 0;
  color: var(--muted);
  font-size: 0.92rem;
  line-height: 1.65;
  font-weight: 300;
}

.contact-card .button {
  align-self: start;
}

.button-wa {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  align-self: start;
  padding: 0 24px;
  height: 44px;
  background: #25d366;
  color: #fff;
  font-size: 0.92rem;
  font-weight: 600;
  letter-spacing: -0.01em;
  border-radius: 100px;
  text-decoration: none;
  transition: background 160ms ease, transform 120ms ease, opacity 160ms ease;
}

.button-wa:hover {
  background: #1db954;
  transform: scale(1.03);
}

```

- [ ] **Step 3: 在 `styles.css` 移动端媒体查询中追加 contact-cards 折行规则**

在文件末尾（`@media (max-width: 640px)` 块内，最后一个规则之后，`}` 闭合之前）插入：

```css
  .contact-cards {
    grid-template-columns: 1fr;
  }
```

- [ ] **Step 4: 删除已失效的旧 Contact 移动端规则**

在移动端媒体查询中找到并删除以下规则（该规则针对旧版 Contact 里直接存在的 `.button`）：

```css
  .contact .button {
    justify-self: start;
  }
```

- [ ] **Step 5: 浏览器验证**

滚动至页面底部 Contact 区块，预期：标题下方出现两张并排卡片，左卡"发送询盘"带蓝色按钮，右卡"WhatsApp 直联"带绿色按钮。移动端两卡竖排。WhatsApp 按钮此时 href="#" 属于正常（Task 8 会修复）。

- [ ] **Step 6: Commit**

```bash
git add index.html assets/styles.css
git commit -m "feat: 改造 Contact 区块为双通道卡片布局"
```

---

## Task 5: 产品状态标签

**Files:**
- Modify: `assets/app.js` — 每个产品对象新增 `status` 字段；`renderProducts` 模板插入状态徽章
- Modify: `assets/styles.css` — 追加状态徽章样式

- [ ] **Step 1: 在 `app.js` 每个产品对象中添加 `status` 字段**

按以下表格为每个产品在 `id` 字段同一行之后加一行 `status`:

```
deye-hybrid-inverter    → status: "现货",
airo-hybrid-inverter    → status: "现货",
goodwe-storage-inverter → status: "预订",
deye-storage-battery    → status: "现货",
airo-storage-battery    → status: "预订",
goodwe-lynx-battery     → status: "询价",
longi-module            → status: "现货",
jinko-module            → status: "现货",
trina-module            → status: "询价",
```

例如 `deye-hybrid-inverter` 对象的修改：
```js
  {
    id: "deye-hybrid-inverter",
    status: "现货",
    brand: "德业 Deye",
    // ... 其余字段不变
  },
```

- [ ] **Step 2: 在 `renderProducts` 模板中插入状态徽章**

定位 `renderProducts` 函数中的模板字符串，找到：

```js
          <div class="product-media">
            <img src="${product.image}" alt="${product.imageAlt || `${product.title}官方产品图`}" loading="lazy" />
            <span class="media-label">${product.imageLabel || "官网产品图"}</span>
          </div>
```

替换为：

```js
          <div class="product-media">
            <img src="${product.image}" alt="${product.imageAlt || `${product.title}官方产品图`}" loading="lazy" />
            <span class="media-label">${product.imageLabel || "官网产品图"}</span>
            ${product.status ? `<span class="product-status" data-status="${product.status}">${product.status}</span>` : ""}
          </div>
```

- [ ] **Step 3: 在 `styles.css` 文件末尾（第一个 `@media` 之前）追加状态徽章样式**

在 `/* ─── Reveal animations` 注释之前插入：

```css
/* ─── Product status badge ──────────────────────────────────────────────── */

.product-status {
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 4px 10px;
  border-radius: 100px;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  backdrop-filter: blur(8px);
}

.product-status::before {
  content: "";
  width: 6px;
  height: 6px;
  border-radius: 50%;
  flex-shrink: 0;
}

.product-status[data-status="现货"] {
  background: rgba(34, 197, 94, 0.14);
  color: #16a34a;
}

.product-status[data-status="现货"]::before {
  background: #22c55e;
}

.product-status[data-status="预订"] {
  background: rgba(249, 115, 22, 0.14);
  color: #ea580c;
}

.product-status[data-status="预订"]::before {
  background: #f97316;
}

.product-status[data-status="询价"] {
  background: rgba(156, 163, 175, 0.14);
  color: #6b7280;
}

.product-status[data-status="询价"]::before {
  background: #9ca3af;
}

```

- [ ] **Step 4: 浏览器验证**

刷新页面，产品目录中每张卡片右上角应出现彩色状态徽章，绿色"现货"、橙色"预订"、灰色"询价"。

- [ ] **Step 5: Commit**

```bash
git add assets/app.js assets/styles.css
git commit -m "feat: 产品卡片添加库存状态标签"
```

---

## Task 6: Quote 数据结构重构

**Files:**
- Modify: `assets/app.js` — `quote` 从 `string[]` 改为 `{id, qty}[]`，涉及读取、写入、增删、渲染

此任务是最高风险的重构，需逐一更新所有涉及 `quote` 的地方。

- [ ] **Step 1: 在 `app.js` 顶部、`datasheetUrls` 之前添加两个占位常量**

```js
const FORMSPREE_ID = "XXXXXXXX"; // 上线前替换为 Formspree 表单 ID
const WHATSAPP_NUMBER = "XXXXXXXX"; // 上线前替换为真实号码，含国家码，如 8613800138000
```

- [ ] **Step 2: 添加 `parseQuote` 辅助函数，放在 `products` 数组之后、`const grid` 之前**

```js
function parseQuote(raw) {
  try {
    const parsed = JSON.parse(raw || "[]");
    return parsed.map((item) =>
      typeof item === "string" ? { id: item, qty: 1 } : item,
    );
  } catch {
    return [];
  }
}
```

- [ ] **Step 3: 更新 `quote` 初始化（约第 178 行）**

将：
```js
let quote = JSON.parse(localStorage.getItem("solarQuote") || "[]");
```
改为：
```js
let quote = parseQuote(localStorage.getItem("solarQuote"));
```

- [ ] **Step 4: 更新 `renderProducts` 中的 `isAdded` 检查**

将：
```js
      const isAdded = quote.includes(product.id);
```
改为：
```js
      const isAdded = quote.some((item) => item.id === product.id);
```

- [ ] **Step 5: 更新 click handler 中的「加入询盘」逻辑**

将：
```js
  if (addButton) {
    const productId = addButton.dataset.addProduct;
    if (!quote.includes(productId)) {
      quote = [...quote, productId];
      saveQuote();
    }
    openQuote();
  }
```
改为：
```js
  if (addButton) {
    const productId = addButton.dataset.addProduct;
    if (!quote.some((item) => item.id === productId)) {
      quote = [...quote, { id: productId, qty: 1 }];
      saveQuote();
    }
    openQuote();
  }
```

- [ ] **Step 6: 更新 click handler 中的「移除」逻辑**

将：
```js
  if (removeButton) {
    quote = quote.filter((id) => id !== removeButton.dataset.removeProduct);
    saveQuote();
  }
```
改为：
```js
  if (removeButton) {
    quote = quote.filter((item) => item.id !== removeButton.dataset.removeProduct);
    saveQuote();
  }
```

- [ ] **Step 7: 更新 `renderQuote` 函数**

将完整的 `renderQuote` 函数替换为：

```js
function renderQuote() {
  const selectedItems = quote
    .map((item) => ({ product: products.find((p) => p.id === item.id), qty: item.qty }))
    .filter(({ product }) => product);

  quoteCountNodes.forEach((node) => {
    node.textContent = selectedItems.length;
  });

  if (!selectedItems.length) {
    quoteList.innerHTML = `<p class="quote-empty">还没有加入产品。先在目录里选择需要报价的逆变器、电池或组件。</p>`;
    return;
  }

  quoteList.innerHTML = selectedItems
    .map(
      ({ product, qty }) => `
        <div class="quote-item">
          <div>
            <strong>${product.title}</strong>
            <span>${product.brand} · ${product.category}</span>
          </div>
          <div class="quote-item-controls">
            <input type="number" min="1" value="${qty}" data-qty-for="${product.id}" aria-label="数量">
            <button type="button" data-remove-product="${product.id}">移除</button>
          </div>
        </div>
      `,
    )
    .join("");
}
```

- [ ] **Step 8: 在 `quoteList` 上添加数量变更监听器**

在 `filterButtons.forEach(...)` 代码块之后、`searchInput.addEventListener(...)` 之前插入：

```js
quoteList.addEventListener("change", (e) => {
  const input = e.target.closest("[data-qty-for]");
  if (!input) return;
  const id = input.dataset.qtyFor;
  const newQty = Math.max(1, parseInt(input.value, 10) || 1);
  input.value = newQty;
  quote = quote.map((item) => (item.id === id ? { ...item, qty: newQty } : item));
  saveQuote();
});
```

- [ ] **Step 9: 浏览器验证**

点击任意产品"加入询盘"，询盘面板应正常打开，显示产品条目，右侧有数字输入框。修改数量后关闭面板再打开，数量应保留。刷新页面后重新打开面板，数量依然保留（localStorage 持久化）。

- [ ] **Step 10: Commit**

```bash
git add assets/app.js
git commit -m "refactor: quote 数据结构升级为 {id, qty}，支持数量输入"
```

---

## Task 7: Quote 面板 UI — 数量样式 + 项目类型下拉

**Files:**
- Modify: `index.html` — quoteForm 新增项目类型字段，修改提交按钮文案
- Modify: `assets/styles.css` — 追加 `.quote-item-controls` 和 `select` 样式

- [ ] **Step 1: 在 `index.html` quoteForm 的联系方式字段后插入项目类型下拉**

定位 quoteForm（约第 211 行），在 `<label>联系方式...</label>` 与 `<label>项目需求...</label>` 之间插入：

```html
        <label>
          项目类型
          <select name="projectType">
            <option value="">请选择（可选）</option>
            <option value="户用储能">户用储能</option>
            <option value="工商业并网">工商业并网</option>
            <option value="批量出口">批量出口</option>
            <option value="其他">其他</option>
          </select>
        </label>
```

- [ ] **Step 2: 更新提交按钮文案**

将 quoteForm 中的提交按钮：
```html
        <button class="button button-primary" type="submit">生成邮件询盘</button>
```
改为：
```html
        <button class="button button-primary" type="submit">提交询盘</button>
```

- [ ] **Step 3: 追加 `quote-item-controls` 和 `select` 样式**

在 `styles.css` 的 `/* ─── FAB` 注释之前（即 Quote Panel 样式区块末尾）插入：

```css
.quote-item-controls {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 6px;
  flex-shrink: 0;
}

.quote-item-controls input[type="number"] {
  width: 60px;
  padding: 5px 8px;
  font-size: 0.88rem;
  font-weight: 600;
  text-align: center;
  border: 1px solid var(--line);
  border-radius: 7px;
  background: var(--paper);
  color: var(--fg);
  -moz-appearance: textfield;
}

.quote-item-controls input[type="number"]::-webkit-inner-spin-button,
.quote-item-controls input[type="number"]::-webkit-outer-spin-button {
  opacity: 1;
}

.quote-form select {
  padding: 11px 12px;
  font-size: 0.9rem;
  background: var(--paper);
  color: var(--fg);
  border: 1px solid var(--line);
  border-radius: 9px;
  cursor: pointer;
}

```

- [ ] **Step 4: 浏览器验证**

打开询盘面板，加入 2 个产品，每条条目右侧应显示数字输入框和移除按钮，竖向排列。表单中应出现"项目类型"下拉字段，选项齐全。提交按钮文案为"提交询盘"。

- [ ] **Step 5: Commit**

```bash
git add index.html assets/styles.css
git commit -m "feat: 询盘面板添加数量输入和项目类型字段"
```

---

## Task 8: Formspree + WhatsApp 集成

**Files:**
- Modify: `assets/app.js` — 替换 `quoteForm` submit handler；添加 `initWhatsApp()`

- [ ] **Step 1: 替换 `quoteForm.addEventListener("submit", ...)` 整块**

将现有的 submit handler（约第 472–495 行）完整替换为：

```js
quoteForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = new FormData(quoteForm);

  const productLines = quote
    .map((item) => ({ product: products.find((p) => p.id === item.id), qty: item.qty }))
    .filter(({ product }) => product)
    .map(({ product, qty }) => `- ${product.brand} / ${product.title} × ${qty}台`)
    .join("\n") || "- 暂未选择产品";

  data.set("产品清单", productLines);

  const submitBtn = quoteForm.querySelector("[type=submit]");
  submitBtn.disabled = true;
  submitBtn.textContent = "发送中…";
  formNote.textContent = "";

  try {
    const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
      method: "POST",
      headers: { Accept: "application/json" },
      body: data,
    });
    if (!res.ok) throw new Error("non-2xx");
    formNote.textContent = "已发送，我们将在 1 个工作日内回复。";
    quoteForm.reset();
  } catch {
    const waText = encodeURIComponent("您好，我想咨询太阳能产品报价。");
    formNote.innerHTML = `发送失败，请通过 <a href="https://wa.me/${WHATSAPP_NUMBER}?text=${waText}" target="_blank" rel="noopener">WhatsApp</a> 联系我们。`;
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "提交询盘";
  }
});
```

- [ ] **Step 2: 在 `app.js` 末尾（`renderQuote()` 调用之后）添加 WhatsApp 初始化函数并调用**

```js
function initWhatsApp() {
  const text = encodeURIComponent("您好，我想咨询太阳能产品报价。");
  document.querySelectorAll("[data-whatsapp]").forEach((el) => {
    el.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
  });
}

initWhatsApp();
```

- [ ] **Step 3: 浏览器验证（表单提交）**

打开询盘面板，填写姓名/联系方式，点击"提交询盘"。由于 `FORMSPREE_ID` 为 `XXXXXXXX`，请求会失败，预期：按钮恢复可点击，`formNote` 显示"发送失败，请通过 WhatsApp 联系我们"，其中 WhatsApp 为可点击链接（但 `WHATSAPP_NUMBER` 也是占位符，href 格式正确即可）。

- [ ] **Step 4: 浏览器验证（WhatsApp 按钮）**

滚动至 Contact 区块，右侧卡片的 WhatsApp 按钮 `href` 应变为 `https://wa.me/XXXXXXXX?text=...`（不再是 `#`），可在浏览器开发工具中检查 DOM 确认。

- [ ] **Step 5: Commit**

```bash
git add assets/app.js
git commit -m "feat: Formspree 表单提交 + WhatsApp 深链初始化"
```

---

## Task 9: 部署到 GitHub Pages

**Files:** 无代码变更，仅 push

- [ ] **Step 1: 推送到远端**

```bash
git remote set-url origin https://{GITHUB_TOKEN}@github.com/wulei0716/solar-sales-site.git
git push origin main
git remote set-url origin https://github.com/wulei0716/solar-sales-site.git
```

- [ ] **Step 2: 验证 GitHub Pages**

等待约 30 秒后访问 `https://wulei0716.github.io/solar-sales-site/`，确认所有新区块正常显示。

---

## 上线前必做（部署后）

| 项目 | 位置 | 操作 |
|------|------|------|
| Formspree ID | `app.js` 顶部 `FORMSPREE_ID` 常量 | 在 [formspree.io](https://formspree.io) 注册，创建表单，将 `XXXXXXXX` 替换为真实 ID（格式如 `xpwzabcd`） |
| WhatsApp 号码 | `app.js` 顶部 `WHATSAPP_NUMBER` 常量 | 替换为真实 WhatsApp 号码，含国家码，纯数字，如 `8613800138000` |
