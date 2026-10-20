import { describe, expect, it } from 'vitest';

import { formatFigure, formatNumber, formatYear } from '@/lib/utils/format';

/**
 * These assertions exist because both bugs they cover were *shipped* once and
 * only caught by reading the exported HTML:
 *
 *   · `ar-DZ` grouped twenty million as "20.000.000", which reads as a decimal
 *     to a Maghreb reader;
 *   · the founding year came out as "1 998".
 *
 * The narrow no-break space (U+202F) is asserted explicitly rather than as "some
 * space": a regular space here would let a figure wrap mid-number on a 360px
 * phone, which is exactly what we are protecting against.
 */
const NNBSP = '\u202f';

describe('formatNumber', () => {
  it('groups French with narrow no-break spaces', () => {
    expect(formatNumber(20_000_000, 'fr')).toBe(`20${NNBSP}000${NNBSP}000`);
    expect(formatNumber(5_000, 'fr')).toBe(`5${NNBSP}000`);
  });

  it('groups Arabic with narrow no-break spaces and Latin digits', () => {
    const formatted = formatNumber(20_000_000, 'ar');
    expect(formatted).toBe(`20${NNBSP}000${NNBSP}000`);
    // Regression guard: never the ar-DZ default full stop.
    expect(formatted).not.toContain('.');
    // Latin digits for the Maghreb, not Eastern Arabic numerals.
    expect(formatted).toMatch(/^[0-9\u202f ]+$/);
  });

  it('groups English with commas', () => {
    expect(formatNumber(20_000_000, 'en')).toBe('20,000,000');
    expect(formatNumber(3_000, 'en')).toBe('3,000');
  });

  it('rounds to whole units', () => {
    expect(formatNumber(4_999.6, 'en')).toBe('5,000');
  });
});

describe('formatYear', () => {
  it('never groups a year', () => {
    expect(formatYear(1998)).toBe('1998');
    expect(formatYear(1998)).not.toContain(NNBSP);
    expect(formatYear(1998)).not.toContain(',');
  });
});

describe('formatFigure', () => {
  it('dispatches on the declared figure kind', () => {
    expect(formatFigure(1998, 'fr', 'year')).toBe('1998');
    expect(formatFigure(20_000_000, 'fr', 'quantity')).toBe(`20${NNBSP}000${NNBSP}000`);
  });

  it('keeps a year ungrouped in every locale', () => {
    for (const locale of ['fr', 'ar', 'en'] as const) {
      expect(formatFigure(1998, locale, 'year')).toBe('1998');
    }
  });
});
