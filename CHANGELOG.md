# Changelog

本站的改动记录。最新的在最上面。

---

## 2026-05-02

整体过了一遍脚手架阶段遗留问题，并完成了一次主要的视觉迭代。

### 新增

- **全新首页设计**：深底 + 暖白文字 + 黄色主色，首屏右上角加了一台 CRT 显示器作为视觉锚点（黄色磷光屏 + 开机动画 + 打字效果），随页面滚动一起离开屏幕。
- **完整的设计 Token 系统**：颜色、字号、间距、动画原语集中在 `tailwind.config.mjs` 和 `src/styles/global.css`，二级页面统一受益。
- **所有二级页面重构**：关于 / 项目 / 工具 / 学习 / 社区 / 贡献，全部按新设计系统重做。
- **`/projects` 和 `/tools` 的筛选按钮**接通了客户端 JS，可按状态、类型实时过滤。
- **站点地图自动生成**：构建时输出 `sitemap-index.xml`，每个页面 `<head>` 也带上对应链接。
- **README.md**：项目介绍、技术栈、本地开发、目录结构、添加内容的方法、设计 token 速查、部署说明，新人上手用。

### 改进

- **字体策略**：移除所有外部字体依赖（包括 Google Fonts CDN），全站统一系统字体栈（PingFang SC / SF Pro / SF Mono）。首屏加载更快，无外部网络请求。
- **字号比例**重新校准，避免粗体 sans 下整体显得过满。
- **Header / Footer 重做**：保留原版那个带边框的黄色 "M" logo；语言切换简化为 ZH / EN 直接切换。
- **博客列表读取方式**改为从 Astro Content Collection 取数据：新增博客只需在 `src/content/blog/{zh-hans,en}/` 下加一个 markdown 文件即可。
- **数据层语言代码统一**：`'zh'` → `'zh-hans'`，与 i18n key 对齐。
- **成员数据**从 `members.ts` 迁到 `community.ts`，字段形状跟着新页面调整。
- **全站文案**集中在 `src/i18n/index.ts`，扁平双语 key map，新设计涉及的所有 section 都补全了 key。

### 修复

- **站点地图**：`@astrojs/sitemap` 依赖装了但没在 `astro.config.mjs` 里启用，现在正确生效。同时把版本固定在 3.4.x（上游 3.5+ 用了只有 Astro 5 才有的 hook，跟我们当前 Astro 4 不兼容）。
- **搜索页文案**：原本是面向开发者的本地构建说明（"先运行 `npx pagefind --site dist`"），换成面向访客的搜索范围说明。

### 删除

- **首页"03 / 12+ / 06 / 24K"四宫格统计**：占位的虚构数据，按真实情况移除。
- **未使用的依赖** `archiver`。
- 旧的 `src/data/members.ts`（已由 `community.ts` 替代）。

### 工程细节

- 项目状态枚举从 `'ongoing'` 改为 `'active'`，与新设计的筛选 UI 对齐。
- `.gitignore` 补充了本地工具配置目录（`.idea/`、`.vscode/` 等）。

---

## 早于此日期

最初由 [`dd02343`](https://github.com/MontageSubs/montagesubs.github.io/commit/dd02343) 起步的脚手架版本，包含 Astro + Tailwind 基础结构、双语首页、空白二级页面、单篇博客示例。
