export interface Project {
  id: string;
  title_zh: string;
  title_en: string;
  description_zh: string;
  description_en: string;
  tmdb_poster_path?: string;
  status: 'ongoing' | 'completed' | 'hiatus';
  lang: string[];
  members: string[];
  related_tools: string[];
  tags_zh: string[];
  tags_en: string[];
  year?: number;
}

export const projects: Project[] = [
  {
    id: 'shakespeare-series',
    title_zh: '莎士比亚系列翻译企划',
    title_en: 'Shakespeare Translation Project',
    description_zh: '系统性地翻译莎士比亚戏剧改编影视作品，注重文学性与可读性的平衡。每部作品附带详细的翻译思维记录，探讨古典文学在现代影视中的本地化方法。',
    description_en: 'Systematically translating film and TV adaptations of Shakespeare plays, balancing literary quality with readability. Each work includes detailed translation notes exploring localization methods for classical literature in modern media.',
    tmdb_poster_path: undefined,
    status: 'ongoing',
    lang: ['zh'],
    members: ['akibarika'],
    related_tools: ['subtitle-flow'],
    tags_zh: ['戏剧', '英国', '经典', '文学翻译'],
    tags_en: ['drama', 'british', 'classic', 'literary translation'],
    year: 2023,
  },
  {
    id: 'nordic-noir',
    title_zh: '北欧犯罪剧字幕计划',
    title_en: 'Nordic Noir Subtitle Project',
    description_zh: '专注于斯堪的纳维亚犯罪剧的字幕翻译，在保留北欧文化特色的同时确保中文观众的观看体验。',
    description_en: 'Focused on subtitling Scandinavian crime dramas, preserving Nordic cultural nuances while ensuring a smooth viewing experience for Chinese audiences.',
    status: 'ongoing',
    lang: ['zh'],
    members: ['akibarika'],
    related_tools: ['subtitle-flow', 'sub-lint'],
    tags_zh: ['犯罪', '北欧', '斯堪的纳维亚'],
    tags_en: ['crime', 'nordic', 'scandinavian'],
    year: 2024,
  },
];
