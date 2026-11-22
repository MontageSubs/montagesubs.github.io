import type { APIRoute } from 'astro';
import { siteName } from '../config/site';
import { versionedIcon } from '../config/icons';

const icon = (path: string, size: number, purpose: 'any' | 'maskable') => ({
  src: versionedIcon(path),
  sizes: `${size}x${size}`,
  type: 'image/png',
  purpose,
});

export const GET: APIRoute = () => {
  const manifest = {
    id: '/',
    name: siteName,
    short_name: siteName,
    description: 'A nonprofit, open-source subtitle community.',
    lang: 'en',
    start_url: '/',
    display: 'standalone',
    background_color: '#0E0B07',
    theme_color: '#0E0B07',
    icons: [
      icon('/android-chrome-192x192.png', 192, 'any'),
      icon('/android-chrome-512x512.png', 512, 'any'),
      icon('/android-chrome-maskable-192x192.png', 192, 'maskable'),
      icon('/android-chrome-maskable-512x512.png', 512, 'maskable'),
    ],
  };
  return new Response(JSON.stringify(manifest, null, 2), {
    headers: { 'Content-Type': 'application/manifest+json' },
  });
};
