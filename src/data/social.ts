export interface SocialLink {
  name: string;
  handle: string;
  href: string;
}

export const telegramChannelUrl = 'https://t.me/s/MTSubs';
export const discussionsUrl = '#';

export const socialLinks: SocialLink[] = [
  { name: 'Telegram',  handle: '@MTSubs',                       href: telegramChannelUrl },
  { name: 'YouTube',   handle: '@MontageSubs',                  href: 'https://youtube.com/@MontageSubs' },
  { name: 'GitHub',    handle: 'MontageSubs',                   href: 'https://github.com/MontageSubs' },
  { name: 'X',         handle: '@Montage_Subs',                 href: 'https://twitter.com/Montage_Subs' },
  { name: 'Bluesky',   handle: '@montagesubs.bsky.social',      href: 'https://bsky.app/profile/montagesubs.bsky.social' },
  { name: 'Mastodon',  handle: '@MontageSubs@mastodon.social',  href: 'https://mastodon.social/@MontageSubs' },
  { name: 'Instagram', handle: '@MontageSubs',                  href: 'https://instagram.com/MontageSubs' },
  { name: 'Substack',  handle: '@montagesubs',                  href: 'https://substack.com/@montagesubs' },
];
