# augen.pro 参考分析

分析时间：2026-04-14

## 页面结构

- 顶部固定导航使用编号式菜单：Wearable、Neural、Programs、Updates、Search。
- 首屏以品牌标志、短标题、Explore 产品入口和大图为核心。
- 内容顺序是 Overview、Mission / Vision / Ambition、Invisible Approach、Progress、Aim、Scientific Evidence、People、Contact。
- 页脚按 Pages、Follow、Legal 和地域信息分组。

## 技术判断

- 部署平台：响应头显示 `server: Vercel`，并带有 `x-vercel-cache`。
- 前端框架：页面包含 `id="__NUXT_DATA__"`、`window.__NUXT__`、`/_nuxt/` 资源，判断为 Nuxt / Vue。
- 内容系统：源码包含 Storyblok 配置、`Storyblok.util` 模块和 `a.storyblok.com` 图片资源，判断使用 Storyblok CMS。
- 图片策略：首屏和产品图通过 Storyblok CDN 生成多尺寸 WebP，并使用 preload / imagesrcset。
- 动效线索：全局样式出现 `lenis` 类名，判断使用 Lenis 或同类平滑滚动方案。
- 字体：自托管 `PP Neue Montreal` 字体文件。
- SEO：包含 canonical、OG、Twitter image 和 description。

## 已同步到本地站点的方向

- 编号式导航。
- 首屏 Explore 快捷筛选入口。
- Overview / 方法论区块。
- 以产品资料、项目匹配、询盘路径组织页面叙事。
- 更明确的搜索入口和快捷筛选交互。
