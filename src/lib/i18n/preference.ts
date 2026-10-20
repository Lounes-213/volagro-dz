import { isLocale, type Locale } from './config';

/**
 * The *only* place a visitor's language choice is persisted.
 *
 * Two independent consumers must agree on this contract, which is exactly why it
 * lives in one module:
 *   · the language switcher writes it when the user deliberately picks a language;
 *   · the static root gate (`scripts/postbuild.ts` → `out/index.html`) reads it
 *     before falling back to `navigator.languages`.
 *
 * Deliberately NOT a cookie: a cookie would need a consent banner in most of our
 * target markets, and this is a strictly functional, non-personal preference.
 */
export const LOCALE_STORAGE_KEY = 'volagro.locale';

/** Storage can throw (Safari private mode, disabled cookies). Never let it bubble. */
export const readStoredLocale = (): Locale | null => {
  if (typeof window === 'undefined') return null;
  try {
    const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY);
    return isLocale(stored) ? stored : null;
  } catch {
    return null;
  }
};

export const storeLocale = (locale: Locale): void => {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  } catch {
    /* preference is a nicety, never a requirement */
  }
};
