import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// ============================================================
// TODO: 请根据你的实际部署情况修改 SITE_URL
//
// 情况一：GitHub Pages 用户/组织站点（username.github.io）
//   site: 'https://username.github.io'
//   不需要设置 base
//
// 情况二：GitHub Pages 项目站点（username.github.io/repo-name）
//   site: 'https://username.github.io'
//   base: '/repo-name'
//
// 情况三：自定义域名
//   site: 'https://yourdomain.com'
//   不需要设置 base
// ============================================================
const SITE_URL = 'https://montagesubs.github.io';
// const BASE_PATH = '/montagesubs'; // 如果是项目站点，取消注释并修改

export default defineConfig({
  site: SITE_URL,
  // base: BASE_PATH, // 如果是项目站点，取消注释

  integrations: [
    tailwind(),
  ],

  output: 'static',
});
