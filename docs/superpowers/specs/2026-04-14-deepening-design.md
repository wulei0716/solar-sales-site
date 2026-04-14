# 光能仓网站深化设计文档

**日期：** 2026-04-14  
**目标：** 将现有展示型单页站升级为真实可转化的 B2B 询盘站，修通联系通路、增强信任信号。

---

## 背景与目标

网站基础结构（Hero、产品目录、Solutions、Service、Contact）已完成，视觉体系（Inter 字体、暗色 Hero、蓝色强调色）已落地。

本次深化聚焦两件事：
1. **修通询盘**：现有 `mailto:` 在无邮件客户端的设备上失效，需替换为可靠的多渠道联系机制。
2. **建立信任**：B2B 客户在询盘前需判断"这家公司靠不靠谱"，需补充货源、覆盖范围、认证能力等信任信号。

技术约束：保持纯静态 HTML/CSS/JS，部署于 GitHub Pages，不引入后端。

---

## 页面结构（最终顺序）

```
Hero
Brand Strip（新增）
Overview（现有）
About（新增）
Catalog（现有，产品卡加库存状态标签）
Solutions（现有）
Service / Process（现有）
FAQ（新增）
Contact（改造）
```

---

## 区块设计

### 1. Brand Strip

**位置：** Hero 紧下方，全宽。  
**样式：** 背景 `#f5f5f7`，高度约 56px，单行居中，字号 `0.78rem`，中等字重。  
**内容：**
```
Deye 德业  ·  SolaX 艾罗  ·  GoodWe 固德威  ·  LONGi 隆基  ·  JinkoSolar 晶科  ·  Trinasolar 天合
官方授权渠道 · CE / IEC 认证产品
```
两行文字，第一行品牌列表，第二行资质说明，均居中。无图标，纯文字，保持当前设计语言。

---

### 2. About 区块

**位置：** Overview 之后、Catalog 之前。  
**布局：** 复用现有 `signal-section` 布局（左文字 + 右三格卡片）。  
**HTML 结构：** 与 `signal-section` 相同，`id="about"`，`aria-labelledby="about-title"`。

**左侧文字：**
- Eyebrow：`About`
- 标题：`专注光伏设备的采购与交付支持`（带 `<br>`）
- 描述：从国内头部品牌直接配货，支持按项目清单、按柜采购，覆盖欧洲、东南亚、中东主要市场。

**右侧三格卡：**

| 编号 | 标题 | 描述 |
|------|------|------|
| 0.5 | Source | 直接对接品牌原厂或一级经销，货源可溯源 |
| 0.6 | Coverage | 欧洲 CE、东南亚、中东区域认证配货支持 |
| 0.7 | Delivery | 支持按柜、按 BOM 清单出货，协助清关文件 |

---

### 3. 产品卡片库存状态标签

**位置：** 产品卡图片区右上角，绝对定位。  
**样式：** 圆角胶囊，小字，带颜色圆点前缀。

| 状态值 | 圆点颜色 | 背景/文字 |
|--------|----------|-----------|
| `现货` | 绿色 `#22c55e` | 绿底浅色文字 |
| `预订` | 橙色 `#f97316` | 橙底浅色文字 |
| `询价` | 灰色 `#9ca3af` | 灰底文字 |

**产品初始状态：**

| 产品 ID | 状态 |
|---------|------|
| deye-hybrid-inverter | 现货 |
| airo-hybrid-inverter | 现货 |
| goodwe-storage-inverter | 预订 |
| deye-storage-battery | 现货 |
| airo-storage-battery | 预订 |
| goodwe-lynx-battery | 询价 |
| longi-module | 现货 |
| jinko-module | 现货 |
| trina-module | 询价 |

**数据层：** 在 `app.js` 每个产品对象新增 `status` 字段，`renderProducts` 模板中条件渲染该标签。

---

### 4. FAQ 区块

**位置：** Service 之后、Contact 之前。  
**技术：** 原生 `<details><summary>` 元素，CSS 控制展开动画，无需 JS。  
**样式：** 与 service-steps 类似的上下分割线列表风格，`summary` 作为行标题，展开内容用灰色小字。

**5 条 FAQ：**

1. **最小起订量是多少？**  
   逆变器和电池支持单台起订，组件一般以托/柜为单位，具体以询盘确认为准。

2. **支持哪些付款方式？**  
   支持 T/T、L/C，部分订单可接受分批付款，大额项目可议。

3. **交货周期一般多长？**  
   现货产品 7–15 个工作日可出；预订产品视品牌排期，通常 4–8 周。

4. **是否提供 CE、IEC 等认证证书？**  
   所有品牌均有对应区域认证，询盘时注明目标市场，我们会提供对应证书复印件。

5. **可以提供样品吗？**  
   逆变器和电池支持单台样品订单，组件可提供小批量样件，运费到付。

---

### 5. Contact 区块改造

**保留：** 顶部 eyebrow `Contact` + 标题 `告诉我们你的需求` + 描述文字。  
**改造：** 按钮区替换为两列卡片。

**左卡 — 发送询盘：**
- 小标题：发送询盘
- 描述：填写产品清单和项目需求，我们在 1 个工作日内回复报价。
- 按钮：打开询盘清单（现有 `data-open-quote` 逻辑不变）

**右卡 — WhatsApp 直联：**
- 小标题：WhatsApp 直联
- 描述：工作时间即时回复，也可发送图纸或项目文件。
- 按钮：跳转链接 `https://wa.me/{WHATSAPP_NUMBER}?text={预填文字}`
- 预填文字（URL 编码）：`您好，我想咨询太阳能产品报价。`
- `{WHATSAPP_NUMBER}` 为占位符，上线前替换为真实号码（纯数字含国家码，如 `8613800138000`）

---

### 6. 询盘面板改造

**询盘条目加数量输入：**
- 每条产品条目右侧增加 `<input type="number" min="1" value="1">` 数量字段
- 数量存入 `quote` 数据结构，从 `string[]` 改为 `{id: string, qty: number}[]`
- 生成邮件/表单提交时带入"产品名 × 数量"

**表单新增项目类型字段：**
```html
<label>
  项目类型
  <select name="projectType">
    <option value="">请选择</option>
    <option value="户用储能">户用储能</option>
    <option value="工商业并网">工商业并网</option>
    <option value="批量出口">批量出口</option>
    <option value="其他">其他</option>
  </select>
</label>
```

**表单提交改为 Formspree：**
- 用户需在 [formspree.io](https://formspree.io) 注册，创建表单后获得 `form_id`（格式如 `xpwzabcd`）
- 将 `app.js` 中 `FORMSPREE_ID` 常量替换为真实 ID
- 提交逻辑：
  ```js
  const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
    method: "POST",
    headers: { Accept: "application/json" },
    body: formData,
  });
  ```
- 成功：面板内显示"已发送，我们将在 1 个工作日内回复。"，清空表单
- 失败：显示"发送失败，请直接通过 WhatsApp 联系我们。"，附 WhatsApp 跳转链接

---

## 技术实现要点

### 文件变更范围

| 文件 | 变更类型 |
|------|----------|
| `index.html` | 新增 Brand Strip、About、FAQ 段落；改造 Contact 区块 |
| `assets/styles.css` | 新增上述区块样式；产品卡状态标签样式；FAQ details/summary 动画 |
| `assets/app.js` | `quote` 数据结构改为 `{id, qty}[]`；`renderProducts` 加状态标签；询盘面板加数量输入；Formspree 提交逻辑 |

### 数据结构变更

`quote` 从 `string[]` 改为 `{ id: string; qty: number }[]`，`localStorage` key 不变（`solarQuote`），但存储格式变更——需在读取时做向后兼容处理（若读到旧格式 string，转换为 `{id, qty: 1}`）。

### 占位符（上线前需替换）

| 占位符 | 位置 | 说明 |
|--------|------|------|
| `{WHATSAPP_NUMBER}` | `index.html` Contact 区块、`app.js` | 替换为真实 WhatsApp 号码（含国家码） |
| `FORMSPREE_ID` | `app.js` 顶部常量 | 替换为 Formspree 表单 ID |

---

## 不在本次范围内

- 产品详情页（单产品独立页面）
- 产品对比功能
- 后台 CMS / 产品数据管理
- 多语言支持
