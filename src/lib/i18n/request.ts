import { getRequestConfig } from 'next-intl/server';

import { DEFAULT_LOCALE, isLocale } from './config';

/**
 * next-intl's request config.
 *
 * NOTE WHAT IS *NOT* HERE: there are no message catalogs. All copy lives in typed
 * `content/` files where a missing language is a compile error rather than a
 * silent fallback to French; `next-intl` is used for routing only (prefix-aware
 * links, pathname-preserving switching, hreflang generation), and the returned
 * `locale` is what its navigation layer resolves against.
 *
 * Kept deliberately tiny, and safe under `output: 'export'`: with no dynamic
 * imports and no `getTranslations` call, this file cannot opt a page out of static
 * rendering.
 */
export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = isLocale(requested) ? requested : DEFAULT_LOCALE;

  return { locale, messages: {} };
});
