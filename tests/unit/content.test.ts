import { describe, expect, it } from 'vitest';

import { CERTIFICATIONS, IDENTITY, KEY_FIGURES, PARTNERSHIP } from '@content/company';
import { CONTACTS, WHATSAPP_TARGET, unverifiedFields } from '@content/contacts';
import { PRODUCTS, PRODUCT_SLUGS, PRODUCT_BY_SLUG, SPEC_REQUEST_LIST } from '@content/products';
import { TIMELINE } from '@content/timeline';

/* ─────────────────────────────────────────────────────────────────────────────
 * CONTENT INTEGRITY
 *
 * The brief's hardest constraint is "never invent a number". That is not a
 * style preference, it is a legal and commercial risk for the client, and a code
 * review will not catch it reliably. These tests encode it instead:
 *
 *   · every Localized value is authored in ALL THREE languages (no silent
 *     French fallback on the Arabic page);
 *   · the four supplied figures are locked to the brief's exact values, so an
 *     accidental edit fails CI rather than going live;
 *   · no product may carry a `ready` specification until the client signs off —
 *     adding real data therefore requires deliberately updating this file, which
 *     is precisely the moment to double-check the source document;
 *   · every contact stays flagged until someone consciously verifies it.
 * ──────────────────────────────────────────────────────────────────────────── */

const LOCALES = ['fr', 'ar', 'en'] as const;

type Object_ = Record<string, unknown>;

const isPlainObject = (value: unknown): value is Object_ =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const isLocalized = (value: Object_): boolean => {
  const keys = Object.keys(value).slice().sort();
  return keys.length === 3 && keys[0] === 'ar' && keys[1] === 'en' && keys[2] === 'fr';
};

interface LocalizedHit {
  readonly path: string;
  readonly value: Object_;
}

const collectLocalized = (
  node: unknown,
  path: string,
  out: LocalizedHit[] = [],
): LocalizedHit[] => {
  if (Array.isArray(node)) {
    node.forEach((child, index) => collectLocalized(child, `${path}[${index}]`, out));
    return out;
  }
  if (!isPlainObject(node)) return out;
  if (isLocalized(node)) {
    out.push({ path, value: node });
    return out;
  }
  for (const [key, child] of Object.entries(node)) {
    collectLocalized(child, path === '' ? key : `${path}.${key}`, out);
  }
  return out;
};

const ALL_CONTENT = {
  IDENTITY,
  KEY_FIGURES,
  PARTNERSHIP,
  CERTIFICATIONS,
  TIMELINE,
  PRODUCTS,
  CONTACTS,
  WHATSAPP: WHATSAPP_TARGET,
};

const hits = collectLocalized(ALL_CONTENT, '');
const pathOf = (target: unknown): string => {
  const hit = hits.find((h) => h.value === target);
  return hit ? hit.path : '<unknown>';
};

describe('localization completeness', () => {
  it('finds a substantial amount of localized copy to check', () => {
    // Guards against the walker silently matching nothing after a refactor.
    expect(hits.length).toBeGreaterThan(80);
  });

  it('authors every value in fr, ar and en — non-empty', () => {
    const failures = hits
      .filter(({ value }) =>
        LOCALES.some((locale) => {
          const entry = value[locale];
          return typeof entry !== 'string' || entry.trim().length === 0;
        }),
      )
      .map(({ path }) => path);

    expect(failures, `Untranslated or empty values:\n${failures.join('\n')}`).toEqual([]);
  });

  it('never leaves unaccented French copied into the English slot', () => {
    // Catches the classic paste error: French text with accents sitting in `en`.
    const frenchMarkers = /[éèêëàâäôöûüùîïçœ]/i;
    const failures = hits
      .filter(({ value }) => {
        const fr = value.fr;
        const en = value.en;
        return (
          typeof fr === 'string' &&
          typeof en === 'string' &&
          fr === en &&
          fr.length > 25 &&
          frenchMarkers.test(fr)
        );
      })
      .map(({ path }) => path);

    expect(failures, `English left as French:\n${failures.join('\n')}`).toEqual([]);
  });
});

describe('the supplied figures are locked to the brief', () => {
  it('carries exactly the four documented key figures', () => {
    expect(KEY_FIGURES.map((figure) => [figure.id, figure.value, figure.kind])).toEqual([
      ['founding', 1998, 'year'],
      ['chicks', 20, 'quantity'],
      ['premix', 5_000, 'quantity'],
      ['partnership', 2018, 'year'],
    ]);
  });

  it('pins the founding year and the family ownership', () => {
    expect(IDENTITY.foundedYear).toBe(1998);
    expect(IDENTITY.legalName).toBe('SARL VOLAGRO');
    expect(IDENTITY.ownership.fr).toContain('familiale');
  });

  it('dates the TECHNA partnership to 2018', () => {
    expect(PARTNERSHIP.since).toBe(2018);
    expect(PARTNERSHIP.partnerName).toBe('TECHNA');
  });

  it('keeps exactly the three supplied milestones, in order', () => {
    expect(TIMELINE.map((milestone) => milestone.year)).toEqual([1998, 2018, 2022]);
  });
});

describe('product registry', () => {
  it('exposes the eight product pages exactly once each', () => {
    expect(PRODUCT_SLUGS).toEqual([
      'cmv-poulet-de-chair',
      'cmv-pondeuse',
      'cmv-repro',
      'cmv-dinde',
      'cmv-bovin-ovin',
      'cmv-vache-laitiere',
      'poussins-d-un-jour',
      'aliments',
    ]);
    expect(new Set(PRODUCT_SLUGS).size).toBe(PRODUCT_SLUGS.length);
  });

  it('publishes no technical value until the client supplies one', () => {
    const ready = SPEC_REQUEST_LIST.filter((request) => !request.reason).map((r) => r.product);
    expect(ready).toEqual([]);
    // 8 products x 8 specification slots.
    expect(SPEC_REQUEST_LIST).toHaveLength(64);
  });

  it('only ever links to products that exist', () => {
    for (const product of PRODUCTS) {
      for (const related of product.related) {
        expect(PRODUCT_BY_SLUG[related], `${product.slug} -> ${related}`).toBeDefined();
        expect(related).not.toBe(product.slug);
      }
    }
  });

  it('keeps the CMV range at six products', () => {
    expect(PRODUCTS.filter((product) => product.family === 'cmv')).toHaveLength(6);
  });
});

describe('contacts stay flagged until verified', () => {
  it('flags every contact, phone and e-mail carried over from the legacy site', () => {
    expect(CONTACTS).toHaveLength(3);
    expect(CONTACTS.map((contact) => contact.id)).toEqual(['entreprise', 'technical', 'sales']);
    for (const contact of CONTACTS) {
      expect(contact.email.verified, `${contact.id} email must not be auto-verified`).toBe(false);
    }
  });

  it('generates the pre-launch checklist from the data itself', () => {
    const audit = unverifiedFields();
    expect(audit.length).toBeGreaterThanOrEqual(7);
    // Every entry must explain *why* it is unverified, in all three languages.
    for (const entry of audit) {
      const why = entry.why;
      expect(why, `${entry.department}/${entry.field}`).toBeDefined();
      expect(why && pathOf(why).length > 0).toBe(true);
    }
  });

  it('never guesses an email domain silently', () => {
    const company = CONTACTS.find((contact) => contact.id === 'entreprise');
    // The legacy ".dz.com" must not survive anywhere.
    for (const contact of CONTACTS) {
      expect(contact.email.value).not.toMatch(/\.dz\.com$/);
    }
    expect(company?.email.note?.fr).toContain('dz.com');
  });
});
