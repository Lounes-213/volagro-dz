import { defineRouting } from 'next-intl/routing';

import { DEFAULT_LOCALE, LOCALES } from './config';

/**
 * `next-intl` is used here as a **routing layer only** (prefix-aware links,
 * pathname-preserving locale switch, canonical/hreflang generation). Copy is
 * not kept in ICU message catalogs: it lives in typed `content/` files where a
 * missing Arabic string is a TypeScript error rather than a silent fallback.
 *
 * `localePrefix: 'always'` — both `/fr/...` and `/ar/...` are real, peer URLs.
 * That gives each language its own indexable URL space with no content
 * negotiation, which is what static export needs (there is no server to sniff
 * `Accept-Language`). `/` is handled by an edge redirect + meta-refresh gate,
 * see `src/app/page.tsx`.
 */
export const routing = defineRouting({
  locales: LOCALES,
  defaultLocale: DEFAULT_LOCALE,
  localePrefix: 'always',
  localeDetection: false,
});
