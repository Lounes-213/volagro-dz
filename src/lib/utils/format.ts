import type { Locale } from '@/lib/i18n/config';

/**
 * Number formatting, locale-aware — and deliberately *not* delegated blindly to
 * `Intl.NumberFormat(locale)`.
 *
 * Two corrections we made after inspecting real output (both were visible in the
 * exported HTML, which is exactly why we check the artifact and not the intent):
 *
 * 1. `ar-DZ` groups with a FULL STOP — `20.000.000`. In the Maghreb that reads
 *    as a decimal-separated value, not as twenty million. Algeria writes numbers
 *    with Latin digits and French-style spacing, in Arabic copy as well, so `ar`
 *    reuses the same grouped formatter as `fr`.
 *
 * 2. Years must never be grouped: grouping turned 1998 into "1 998". `formatYear`
 *    exists so the count-up band can ask for the right thing instead of hoping a
 *    generic formatter guesses.
 *
 * Formatters are built once at module scope: the count-up re-formats on every
 * animation frame, and `Intl.NumberFormat` construction is the expensive part.
 */
const GROUPED_LATIN = new Intl.NumberFormat('fr-DZ', { maximumFractionDigits: 0 });
const GROUPED_ENGLISH = new Intl.NumberFormat('en-GB', { maximumFractionDigits: 0 });

const grouped: Readonly<Record<Locale, Intl.NumberFormat>> = {
  // Narrow no-break spaces: a number never wraps mid-figure, in either language.
  fr: GROUPED_LATIN,
  ar: GROUPED_LATIN,
  // Comma grouping, which is what TECHNA and equipment suppliers read.
  en: GROUPED_ENGLISH,
};

/** Grouped integer: 20000000 -> "20 000 000" (fr/ar), "20,000,000" (en). */
export const formatNumber = (value: number, locale: Locale): string =>
  grouped[locale].format(Math.round(value));

/** Years and other ordinals: 1998 -> "1998", never "1 998". */
export const formatYear = (value: number): string => String(Math.round(value));

/** What a figure *is* decides how it is written. Explicit beats inference. */
export type FigureKind = 'year' | 'quantity';

/**
 * The count-up band's formatter. Kept here (not in the component) so it is unit
 * testable without a DOM — see tests/unit/format.test.ts.
 */
export const formatFigure = (value: number, locale: Locale, kind: FigureKind): string =>
  kind === 'year' ? formatYear(value) : formatNumber(value, locale);
