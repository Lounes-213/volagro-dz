import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from 'next';

/**
 * Static export configuration.
 *
 * `output: 'export'` means there is **no server at runtime**: every route must be
 * fully renderable at build time. That has three consequences this config encodes:
 *
 *  1. `next/image` cannot optimise on demand -> `unoptimized: true`. Assets shipped in
 *     `public/images` are pre-optimised (AVIF/WebP, 3 widths) by `scripts/optimize-images.ts`.
 *  2. `redirects()` / `rewrites()` / `headers()` are not supported. Legacy `.html` URLs are
 *     handled by host-level files shipped in `public/` (`_redirects`, `_headers` for
 *     Cloudflare Pages; `vercel.json` for Vercel). See `docs/ARCHITECTURE.md`.
 *  3. `trailingSlash: true` emits `/<route>/index.html`, which every static host resolves
 *     identically and keeps the canonical URL space consistent across /fr, /ar and /en.
 */
const isDev = process.env.NODE_ENV !== 'production';

const nextConfig: NextConfig = {
  ...(!isDev ? { output: 'export' } : {}),
  reactStrictMode: true,
  trailingSlash: true,
  poweredByHeader: false,
  pageExtensions: ['ts', 'tsx', 'mdx'],
  ...(isDev
    ? {
        async redirects() {
          return [
            {
              source: '/',
              destination: '/fr/',
              permanent: false,
            },
          ];
        },
      }
    : {}),

  images: {
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [360, 480, 640, 828, 1080, 1280, 1600, 1920, 2560],
    imageSizes: [96, 128, 192, 256, 384, 512],
  },

  async generateBuildId() {
    // Content-only deploys should not invalidate every client chunk.
    return process.env.BUILD_ID ?? 'volagro-stable';
  },
};

/**
 * The next-intl plugin exists here ONLY to resolve the request-config alias that
 * its navigation layer (`Link`, `usePathname`) imports at runtime. We ship no
 * message catalogs — copy lives in typed `content/` files.
 */
const withNextIntl = createNextIntlPlugin('./src/lib/i18n/request.ts');

export default withNextIntl(nextConfig);
