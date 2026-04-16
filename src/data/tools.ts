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
    id: 'subtitle-flow',
    name: 'SubtitleFlow',
    author: 'akibarika',
    description_zh: '浏览器端字幕时间轴编辑器，支持实时预览和多格式导出（SRT、ASS、VTT）。无需安装，打开即用。',
    description_en: 'Browser-based subtitle timeline editor with real-time preview and multi-format export (SRT, ASS, VTT). No installation required.',
    type: 'online',
    url: 'https://github.com/MontageSubs/subtitle-flow',
    tags: ['timeline', 'browser', 'javascript', 'editor'],
    status: 'active',
    lang: ['zh', 'en'],
  },
  {
    id: 'sub-lint',
    name: 'SubLint',
    author: 'akibarika',
    description_zh: '字幕文件规范检查工具，自动检测格式错误、标点问题和排版规范，支持批量处理。',
    description_en: 'Subtitle file linting tool that automatically detects formatting errors, punctuation issues and typesetting problems. Supports batch processing.',
    type: 'installable',
    url: 'https://github.com/MontageSubs/sub-lint',
    tags: ['linting', 'cli', 'quality', 'automation'],
    status: 'beta',
    lang: ['zh', 'en'],
  },
  {
    id: 'timing-helper',
    name: 'TimingHelper',
    author: 'akibarika',
    description_zh: '字幕时间轴辅助工具，支持批量偏移、拉伸和场景检测对齐。',
    description_en: 'Subtitle timing assistant supporting bulk offset, stretching, and scene-detection alignment.',
    type: 'online',
    url: 'https://github.com/MontageSubs/timing-helper',
    tags: ['timing', 'browser', 'utility'],
    status: 'active',
    lang: ['zh'],
  },
];
