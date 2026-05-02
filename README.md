# 蒙太奇字幕社区 · MontageSubs

蒙太奇字幕社区（MontageSubs）的官方网站。一个非营利、开源的字幕生态社区，连接观众、译者、开发者与影视工作者。

🌐 线上：<https://montagesubs.github.io>

---

## 技术栈

- [Astro 4](https://astro.build/) + TypeScript（静态站点生成）
- [Tailwind CSS 3](https://tailwindcss.com/)（样式）
- [Pagefind](https://pagefind.app/)（站内搜索，构建后注入）
- 部署：GitHub Pages，通过 GitHub Actions 自动构建（见 [.github/workflows/deploy.yml](.github/workflows/deploy.yml)）

---

## 本地开发

需要 Node 20+。

```bash
npm install
npm run dev          # 启动开发服务器（默认 http://localhost:4321）
npm run build        # 构建到 dist/
npm run preview      # 预览构建产物
```

---

## 目录结构

```
src/
├── pages/
│   ├── zh-hans/             简体中文页面（默认语言）
│   ├── en/                  英文页面
│   └── index.astro          根路径，跳转到默认语言
├── components/              全局组件（Header / Footer / Hero / ...）
├── layouts/
│   └── BaseLayout.astro     全站统一壳：head / Header / Footer / motion
├── content/
│   ├── config.ts            内容集合 schema（Zod）
│   └── blog/                博客 markdown，按语言分目录
├── data/
│   ├── projects.ts          字幕项目数据
│   ├── tools.ts             工具数据
│   └── community.ts         成员数据
├── i18n/
│   └── index.ts             双语 key map（扁平结构）
├── styles/
│   └── global.css           全局样式 + 动画原语
└── env.d.ts

public/                      静态资源
.github/workflows/deploy.yml 部署流水线
astro.config.mjs             Astro 配置（含 sitemap）
tailwind.config.mjs          设计 tokens（颜色 / 字号 / 间距）
```

---

## 添加内容

### 写一篇博客

在 `src/content/blog/zh-hans/`（或 `en/`）下新建 markdown 文件：

```markdown
---
title: 文章标题
date: 2026-05-02
lang: zh-hans
author: 你的 ID
has_translation: false
tags: [标签1, 标签2]
description: 摘要（会用于 RSS / OG）
draft: false
---

正文…
```

文件路径自动决定 URL：`src/content/blog/zh-hans/hello-world.md` → `/zh-hans/learn/blog/hello-world/`

### 加一个项目 / 工具 / 成员

直接编辑对应的 TS 数据文件：

| 类型 | 文件 |
|---|---|
| 项目 | [src/data/projects.ts](src/data/projects.ts) |
| 工具 | [src/data/tools.ts](src/data/tools.ts) |
| 成员 | [src/data/community.ts](src/data/community.ts) |

每个文件顶部有 TS 接口定义，照着加一条记录就行。

### 改文案 / 加翻译

所有页面文案集中在 [src/i18n/index.ts](src/i18n/index.ts)，是一个扁平的双语 key map：

```ts
'home.hero.line1': '让字幕',     // 中文
// 对应位置
'home.hero.line1': 'Subtitles', // 英文
```

新增 key 时两边都要补，否则缺失语种会 fallback 到中文。

---

## 设计 Tokens

集中在 [tailwind.config.mjs](tailwind.config.mjs)。

**颜色**

| Token | 值 | 用途 |
|---|---|---|
| `ink` | `#0a0a0a` | 主背景（近黑） |
| `bone` | `#f5f1e8` | 主文字（暖白） |
| `bone-dim` | `#cfc9bb` | 次要文字 |
| `bone-mute` | `#8a857a` | 标注 / 元数据 |
| `signal-yellow` | `#FACC15` | 品牌主色 |
| `live` | `#22c55e` | 在线状态点 |

**字号**

| Token | 用途 |
|---|---|
| `text-display` | 首屏 / 二级页 hero h1 |
| `text-mega` | section h2 |

**字体**：纯系统字体栈，**不引入任何外部字体文件**（PingFang SC / SF Pro / SF Mono）。

---

## 部署

推送到 `main` 即触发 GitHub Actions 构建并部署到 GitHub Pages。流程：

1. `npm ci`
2. `npm run build`
3. `npx pagefind --site dist`（生成搜索索引）
4. 上传 `dist/` 到 Pages

首次部署前需要在仓库 Settings → Pages 把 Source 设为 **GitHub Actions**。

---

## 协议

- 内容（博客文章 / 文档 / 翻译）：[CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)
- 代码：[MIT](https://opensource.org/licenses/MIT)

---

## 社区与联系

- Telegram：<https://t.me/MontageSubs>
- Discord：<https://discord.gg/montagesubs>
- GitHub Discussions：<https://github.com/MontageSubs/community/discussions>
- 邮件：dev@montagesubs.org（技术合作）/ press@montagesubs.org（媒体）
