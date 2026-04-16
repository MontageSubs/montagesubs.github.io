export const languages = {
  'zh-hans': '简体中文',
  'en': 'English',
} as const;

export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'zh-hans';

export const ui = {
  'zh-hans': {
    // Navigation
    'nav.about': '关于',
    'nav.projects': '项目',
    'nav.tools': '工具',
    'nav.learn': '学习',
    'nav.community': '社区',
    'nav.contribute': '贡献',
    'nav.join': '加入社区',
    'nav.search': '搜索',
    // Footer
    'footer.tagline': '连接观众、译者、开发者与影视工作者，共同构建开放、透明的字幕生态。',
    'footer.quicklinks': '快速链接',
    'footer.learn_resources': '学习资源',
    'footer.community': '社区',
    'footer.contribute': '参与贡献',
    'footer.copyright': '© MontageSubs. 内容采用 CC BY-SA 4.0，代码采用 MIT 协议。',
    'footer.nonprofit': '非营利声明',
    'footer.opensource': '开源协议',
    'footer.copyright_notice': '版权声明',
    'footer.dmca': 'DMCA 投诉',
    'footer.privacy': '隐私政策',
    // Home
    'home.hero.title': '让字幕成为连接观众与创作者的桥梁',
    'home.hero.subtitle': '我们致力于推动影视内容的本地化与民主化创作，连接译者、开发者、观众与影视工作者，共同构建开放、透明的字幕生态。',
    'home.hero.cta_primary': '加入社区',
    'home.hero.cta_secondary': '了解我们的使命',
    'home.focus.title': '我们的领域',
    'home.focus.tools.title': '工具',
    'home.focus.tools.desc': '字幕编辑器、时间轴工具、自动化脚本。为字幕创作者提供高效的技术支持。',
    'home.focus.research.title': '研究',
    'home.focus.research.desc': '翻译笔记、技术标准、本地化理论。探索字幕翻译的艺术与科学。',
    'home.focus.community.title': '社区',
    'home.focus.community.desc': '开源协作、讨论交流、人才培养。这里是所有热爱字幕事业的人的家园。',
    'home.cta.title': '无论你是译者、开发者还是观众，这里都有你的位置。',
    'home.cta.button': '开始贡献 →',
    // Common
    'common.read_more': '阅读更多',
    'common.back': '返回',
    'common.tags': '标签',
    'common.author': '作者',
    'common.date': '日期',
    'common.learn_more': '了解更多',
    'common.status.active': '进行中',
    'common.status.completed': '已完成',
    'common.status.hiatus': '暂停',
    'common.status.beta': '测试版',
    'common.status.archived': '已归档',
    'common.type.online': '在线工具',
    'common.type.installable': '安装型',
    'common.no_translation': '暂无此语言版本',
  },
  'en': {
    'nav.about': 'About',
    'nav.projects': 'Projects',
    'nav.tools': 'Tools',
    'nav.learn': 'Learn',
    'nav.community': 'Community',
    'nav.contribute': 'Contribute',
    'nav.join': 'Join Community',
    'nav.search': 'Search',
    'footer.tagline': 'Connecting audiences, translators, developers and filmmakers to build an open, transparent subtitle ecosystem.',
    'footer.quicklinks': 'Quick Links',
    'footer.learn_resources': 'Learning',
    'footer.community': 'Community',
    'footer.contribute': 'Contribute',
    'footer.copyright': '© MontageSubs. Content under CC BY-SA 4.0, code under MIT.',
    'footer.nonprofit': 'Nonprofit Statement',
    'footer.opensource': 'Open Source',
    'footer.copyright_notice': 'Copyright Notice',
    'footer.dmca': 'DMCA',
    'footer.privacy': 'Privacy Policy',
    'home.hero.title': 'Making Subtitles a Bridge Between Audiences and Creators',
    'home.hero.subtitle': 'We are dedicated to advancing the localization and democratization of film and television content, connecting translators, developers, audiences, and filmmakers to build an open, transparent subtitle ecosystem.',
    'home.hero.cta_primary': 'Join Community',
    'home.hero.cta_secondary': 'Learn Our Mission',
    'home.focus.title': 'Our Focus',
    'home.focus.tools.title': 'Tools',
    'home.focus.tools.desc': 'Subtitle editors, timeline tools, automation scripts. Providing efficient technical support for subtitle creators.',
    'home.focus.research.title': 'Research',
    'home.focus.research.desc': 'Translation notes, technical standards, localization theory. Exploring the art and science of subtitle translation.',
    'home.focus.community.title': 'Community',
    'home.focus.community.desc': 'Open source collaboration, discussions, talent development. A home for everyone passionate about subtitles.',
    'home.cta.title': 'Whether you are a translator, developer, or viewer — there is a place for you here.',
    'home.cta.button': 'Start Contributing →',
    'common.read_more': 'Read More',
    'common.back': 'Back',
    'common.tags': 'Tags',
    'common.author': 'Author',
    'common.date': 'Date',
    'common.learn_more': 'Learn More',
    'common.status.active': 'Ongoing',
    'common.status.completed': 'Completed',
    'common.status.hiatus': 'On Hiatus',
    'common.status.beta': 'Beta',
    'common.status.archived': 'Archived',
    'common.type.online': 'Online',
    'common.type.installable': 'Installable',
    'common.no_translation': 'Not available in this language',
  },
} as const;

export type UIKey = keyof typeof ui[typeof defaultLang];

export function useTranslations(lang: Lang) {
  return function t(key: UIKey): string {
    return ((ui[lang] as typeof ui[typeof defaultLang])[key] ?? ui[defaultLang][key]) as string;
  };
}

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split('/');
  if (lang in languages) return lang as Lang;
  return defaultLang;
}

export function getAlternatePath(currentPath: string, currentLang: Lang, targetLang: Lang): string {
  return currentPath.replace(`/${currentLang}/`, `/${targetLang}/`).replace(`/${currentLang}`, `/${targetLang}`);
}
