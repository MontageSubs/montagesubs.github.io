export interface Member {
  id: string;
  name: string;
  role: ('developer' | 'translator' | 'editor' | 'researcher')[];
  bio_zh: string;
  bio_en?: string;
  joined: string;
  links: {
    github?: string;
    twitter?: string;
    bluesky?: string;
    website?: string;
    telegram?: string;
  };
  lang: string[];
}

export const members: Member[] = [
  {
    id: 'akibarika',
    name: 'akibarika',
    role: ['developer', 'translator'],
    bio_zh: '工具开发者，专注前端字幕工具的设计与实现。热爱翻译，相信好的翻译能让更多人感受到影视作品的魅力。蒙太奇字幕社区创始成员。',
    bio_en: 'Tool developer focused on frontend subtitle tool design and implementation. Passionate about translation, believing that good subtitles make cinematic experiences accessible to all. Founding member of MontageSubs.',
    joined: '2022-03',
    links: {
      github: 'https://github.com/akibarika',
    },
    lang: ['zh', 'en'],
  },
];
