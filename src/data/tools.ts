export interface Tool {
  id: string;
  name: string;
  author: string;
  description_zh: string;
  description_en: string;
  type: 'online' | 'installable';
  url?: string;
  tags: string[];
  status: 'active' | 'beta' | 'archived';
  lang: string[];
}

export const tools: Tool[] = [
  {
    id: 'svg-to-ass',
    name: 'SVG to ASS Draw',
    author: 'NickCollect / MontageSubs',
    description_zh: '浏览器端 SVG 转 ASS 绘图命令工具，可将 Illustrator、Inkscape 等导出的矢量路径转换为 ASS/SSA \\p 绘图代码，支持智能清理、8x/16x 精度缩放和实时预览。',
    description_en: 'Browser-based SVG to ASS draw converter for turning Illustrator or Inkscape vector paths into ASS/SSA \\p drawing commands, with smart cleanup, 8x/16x precision scaling, and live preview.',
    type: 'online',
    url: 'https://subs.js.org/svg-to-ass/',
    tags: ['svg', 'ass', 'draw', 'typesetting'],
    status: 'active',
    lang: ['zh-hans', 'en'],
  },
  {
    id: 'ass-subset',
    name: 'ASS Subsetter',
    author: 'MontageSubs',
    description_zh: 'ASS/SSA 字幕字体嵌入与子集化工具，可按实际使用字符压缩字体，也可完整嵌入字体；支持 TTF、OTF、TTC、OTC、WOFF、WOFF2、批量处理和绘图命令优化。',
    description_en: 'Font embedding and subsetting tool for ASS/SSA subtitles. It can subset fonts to used characters or embed full fonts, with support for TTF, OTF, TTC, OTC, WOFF, WOFF2, batch processing, and drawing-command optimization.',
    type: 'online',
    url: 'https://subs.js.org/ass-subset/',
    tags: ['ass', 'fonts', 'subset', 'embedding'],
    status: 'active',
    lang: ['zh-hans', 'en'],
  },
  {
    id: 'ass-to-svg',
    name: 'ASS to SVG',
    author: 'NickCollect / MontageSubs',
    description_zh: '浏览器端 ASS/SSA 绘图命令反向转换工具，可将 \\p1 到 \\p5 绘图代码还原为 SVG 矢量图形，支持多行、多绘图块输入、自动精度识别、实时预览和一键复制或下载 SVG。',
    description_en: 'Browser-based reverse converter that restores ASS/SSA \\p1 to \\p5 drawing commands into SVG vector graphics, with multi-line and multi-block input, automatic precision detection, live preview, and one-click copy or SVG download.',
    type: 'online',
    url: 'https://subs.js.org/ass-to-svg/',
    tags: ['ass', 'svg', 'draw', 'reverse'],
    status: 'active',
    lang: ['zh-hans', 'en'],
  },
];
