# Changelog

本站的改动记录。最新的在最上面。

---

## 2026-05-04

品牌色定锚后的一次对齐：把全站的"近似黄"换成品牌定的那支金黄，背景顺手暖了一档。

### 改进

- **Hero CRT 外壳换材质**：从米黄塑料（Apple II / VT100 那种 beige）换成品牌 amber 棕调电木——`#A85B00 → #7A3D00 → #3D1800` 三档渐变（顶部亮、中部、底部深），顶边一条 `#FCAB02` 高光模拟塑料反光。屏幕周围 bezel 同步加深到 `#1F0A00 / #0a0500`，保留「凹进去」的层次感。铭牌文字从黑字改成 amber 暗色才读得出来。整体观感从「老 Apple」变成「老电视/老示波器」，跟我们的暖黄磷光更搭。
- **磷光光晕加厚**：corecast halo 从 4 档加到 5 档，新增 `glow-high #FFE872` 这一过渡，光晕更厚更暖；`text-shadow` 内核改用品牌 `core-white #FFFCE0`，外圈改用 `amber-deep #A85B00`；uplight / floorpool / scanbeam 一并改用 `yellow-lit / amber / amber-deep` 精确品牌色。
- **主黄对齐品牌定锚**：`#FACC15`（柠檬黄）→ `#FBC100`（金黄）。CSS 变量、Tailwind token、所有 `rgba(250, 204, 21, ...)` 形态、Hero CRT 磷光屏、404 彩条、Pagefind 搜索 UI 全部一次性换齐。视觉上从冷黄变暖黄，跟 CRT 隐喻更搭。
- **背景暖化**：`--ink` 从纯黑 `#0a0a0a` 换成带极轻微红黄底的 `#0E0B07`（品牌 `ink-deep`），跟黄色叠加时不再有"塑料黑+霓虹黄"的廉价感。
- **卡片 hover 暖化**：`--ink-2`（用于 `bg-ink-800` 卡片 hover 底）从冷灰 `#111111` 换成暖灰 `#1A1410`（品牌 `ink-soft`），首页 focus 卡片、projects/tools 列表 hover 时整体氛围更一致。
- **按钮 hover 亮起色对齐**：`.btn-primary:hover` 从 `#fde047` 换成品牌 `#FDD338`（`yellow-lit`）；新增 `--signal-lit` 与 `signal.yellow-lit` 两个 token。
- **关于页"品牌资产"文案**同步更新：从 `主色调：#FACC15。深背景：#0a0a0a` 改成 `主色调：#FBC100。深背景：#0E0B07`，中英两版统一。

---

## 2026-05-03

视觉简化为主：去装饰、统一节奏；工具页换上真实数据。

### 新增

- **工具页填充真实数据**：[`src/data/tools.ts`](src/data/tools.ts) 的三条占位（SubtitleFlow / SubLint / TimingHelper）替换为实际可用工具——**SVG to ASS Draw**、**ASS Subsetter**、**ASS to SVG**，全部托管在 `subs.js.org` 子域名下。工具页第一次能看到真东西。
- **CRT 隐喻延伸到全站**：
  - section divider 加了一条**黄色扫描线**沿分隔线扫过的动画（12s 周期，相邻分隔线错位 4s），把 hero 的 CRT 视觉延伸到下面所有 section
  - footer 底部加了一行极淡的 "TRANSMITTING ON MONTAGE-CRT 14"  /  SIGNAL: STABLE" 信号条，呼应 hero 那台显示器的型号
  - 自定义了 [404 页面](src/pages/404.astro)：SMPTE 风格的彩条 + 全屏扫描线纹理 + 巨号 "404"（中间 0 是 italic 黄色）+ "NO SIGNAL · 频道丢失" eyebrow + 双语提示，整页是 CRT 收不到信号的视觉
- **项目 / 工具卡片 spotlight 光晕**：鼠标 hover 卡片时背后会出现一个 280px 的黄色光晕跟随光标移动（300ms fade 进出）。触屏设备不触发。

### 改进

- **Footer 主体重组**：从五列等宽网格改成两区布局——左 1/3 站点说明 + 右 2/3 四列链接组，移动端折叠更顺。
- **Header 导航**：去掉桌面 / 移动 nav 项左边的小数字编号（"`01 关于`" → "`关于`"）。
- **Footer 分栏标题**：去掉左边的 "— " 横杠前缀。
- **Hero 高度改用 `100dvh`**：替代原本的 `100vh`，避免 iOS Safari 地址栏出现/隐藏时首屏跳动。
- **按钮 tactile 反馈**：`.btn-primary` / `.btn-ghost` 加 `:active` 状态（`translateY(1px) scale(0.98)`），点击有"被按下"的物理感，移动端尤其明显。
- **磁吸按钮强度**：`STRENGTH` 从 `0.25` 提到 `0.45`，hero CTA 的磁吸效果现在能感觉到了；hero 副 CTA"我们的使命 / Our mission"也补上了 `.magnetic` 包裹，跟主 CTA 一致。
- **Footer 大字 hover 微动**：footer 的 "MontageSubs." 大字 hover 时，黄色 italic 的 "Subs." 部分会轻微右移并倾斜（700ms ease-out），克制但有存在感。
- **搜索页 Pagefind UI 重皮肤**：原本 Pagefind 默认蓝白圆角的"插件感"换掉了——输入框直角 / 深底 / focus 时黄边框，结果高亮 mark 用黄色，全站字体栈与全站一致。中英两版都做了。

### 删除

- 全站页面顶部的 kicker 小标签（about / projects / tools / learn / community / contribute / search 七个页面、中英两版统一移除），让 hero 区域更聚焦。
- Header 右上角的实时时钟（同步清理了 [`src/components/MotionScripts.astro`](src/components/MotionScripts.astro) 里对应的 tick 脚本）。
- 工具卡片右上角的 "N° XX" 编号。
- Footer "回到顶部 ↑" 提示。
- Footer 版本号 "v0.1" 标记。
- Footer 社交平台缩减：移除 Discord / B站 / 微博（保留 Telegram / YouTube / GitHub / X / Bluesky / Mastodon / Instagram）。

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

- **字体策略**：移除所有外部字体依赖（包括 Google Fonts CDN），全站使用系统字体栈，具体字体由用户的操作系统决定（Mac 上是 SF Pro / PingFang SC，Windows 上是 Segoe UI / Microsoft YaHei，等等）。首屏加载更快，无外部网络请求。
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
