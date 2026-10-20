/**
 * Locale mechanics — the single definition of what a locale *is*.
 *
 * Three locales:
 *   fr — default. Primary language of Algerian B2B agriculture and of the
 *        client's own legacy site.
 *   ar — Modern Standard Arabic, RTL. Required for state tenders, public
 *        procurement and a large share of the breeder base.
 *   en — English. Requested for ingredient/equipment suppliers, foreign
 *        partners and TECHNA-side visitors.
 *
 * Display labels ("Français", "العربية", "English") are endonyms — a switcher
 * must never show a language in a language the reader might not have.
 *
 * `lib/` is mechanics, `content/` is words.
 */

export const LOCALES = ['fr', 'ar', 'en'] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'fr';

export type Direction = 'ltr' | 'rtl';

interface LocaleMeta {
  /** BCP-47 tag for `<html lang>`, region-qualified: the audience is Algerian. */
  readonly htmlLang: string;
  /** `hreflang` alternate value: language-only keeps the alternate set broad. */
  readonly hreflang: string;
  readonly direction: Direction;
  /** Endonym — self-identifying, and the only label a switcher may show. */
  readonly endonym: string;
  /** Compact endonym form for the header pill. */
  readonly abbr: string;
  /** The *other* locales, in switcher presentation order. */
  readonly others: readonly Locale[];
}

export const LOCALE_META: Readonly<Record<Locale, LocaleMeta>> = {
  fr: {
    htmlLang: 'fr-DZ',
    hreflang: 'fr',
    direction: 'ltr',
    endonym: 'Français',
    abbr: 'FR',
    others: ['ar', 'en'],
  },
  ar: {
    htmlLang: 'ar-DZ',
    hreflang: 'ar',
    direction: 'rtl',
    endonym: 'العربية',
    abbr: 'ع',
    others: ['fr', 'en'],
  },
  en: {
    htmlLang: 'en-DZ',
    hreflang: 'en',
    direction: 'ltr',
    endonym: 'English',
    abbr: 'EN',
    others: ['fr', 'ar'],
  },
};

/** The locale alternate every engine should fall back to (docs: x-default). */
export const X_DEFAULT_LOCALE: Locale = DEFAULT_LOCALE;

export const isLocale = (value: unknown): value is Locale =>
  typeof value === 'string' && (LOCALES as readonly string[]).includes(value);

/** Narrow an untrusted route param. Never let a bad segment reach a page. */
export const toLocale = (value: string | undefined): Locale =>
  isLocale(value) ? value : DEFAULT_LOCALE;

export const isRtl = (locale: Locale): boolean => LOCALE_META[locale].direction === 'rtl';

export const dir = (locale: Locale): Direction => LOCALE_META[locale].direction;

/** Order used by the language switcher: the full list, self included. */
export const localeSwitcherOrder = (): readonly Locale[] => LOCALES;
