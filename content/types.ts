/* ============================================================================
 * CONTENT PRIMITIVES
 * ----------------------------------------------------------------------------
 * This file is the reason no invented fact can ever reach the page.
 *
 * Three ideas, and nothing else:
 *
 *   Localized<T>   — the same value authored in EVERY locale. Because the record
 *                    key is the `Locale` union, forgetting Arabic is a build
 *                    error, not a runtime fallback. This is why we do not use
 *                    ICU message catalogs for site copy.
 *
 *   Slot<T>        — a value we either HAVE (`ready`) or do NOT have yet
 *                    (`pending`, carrying the reason and what we need from the
 *                    client). Components render `.status === 'pending'` as a
 *                    visibly marked placeholder. There is no code path in which
 *                    a missing dosage becomes a plausible-looking number.
 *
 *   Flagged<T>     — data that came from the old site and must be confirmed
 *                    before launch (emails, phone numbers, job titles). Carries
 *                    `verified`, so a QA script can enumerate everything unverified
 *                    and the UI can mark it in development.
 * ========================================================================= */

import type { Locale } from '@/lib/i18n/config';

export type { Locale };

/** A value authored in every locale. `Localized<string>` is the common case. */
export type Localized<T = string> = Readonly<Record<Locale, T>>;

/** Pick the right locale out of a fan-out. Total: the key always exists. */
export const pick = <T>(localized: Localized<T>, locale: Locale): T => localized[locale];

/* ── Slot: have it, or say you don't ─────────────────────────────────────── */

export interface Ready<T> {
  readonly status: 'ready';
  readonly value: T;
}

export interface Pending {
  readonly status: 'pending';
  /** Bilingual explanation of *why* it is missing and what unblocks it. */
  readonly reason: Localized;
}

export type Slot<T> = Ready<T> | Pending;

export const ready = <T>(value: T): Ready<T> => ({ status: 'ready', value });

export const pending = (reason: Localized): Pending => ({ status: 'pending', reason });

export const isReady = <T>(slot: Slot<T>): slot is Ready<T> => slot.status === 'ready';

/** `valueOf` is the rendering-time read: `undefined` means "render placeholder". */
export const valueOf = <T>(slot: Slot<T>): T | undefined =>
  slot.status === 'ready' ? slot.value : undefined;

/* ── Flagged: came from the legacy site, needs a signature ───────────────── */

export interface Flagged<T> {
  readonly value: T;
  /** Must be `true` before the value is published as authoritative. */
  readonly verified: boolean;
  /** What to confirm and with whom. */
  readonly note?: Localized;
}

export const flagged = <T>(value: T, verified: boolean, note?: Localized): Flagged<T> => ({
  value,
  verified,
  ...(note === undefined ? {} : { note }),
});

/* ── Contact primitives ──────────────────────────────────────────────────── */

/**
 * A phone number in both of the forms we need. `e164` is used verbatim in
 * `tel:` and `wa.me` links (no formatting, no spaces — a single stray space
 * silently breaks a WhatsApp deep link on Android); `display` is what the
 * client prints on their letterhead and what a human reads.
 */
export interface PhoneNumber {
  readonly e164: string;
  readonly display: string;
  readonly label: Localized;
}

export type PhoneRole = 'switchboard' | 'technical' | 'sales' | 'mobile';

/* ── Imagery ─────────────────────────────────────────────────────────────── */

/**
 * `real`      — a photograph or scan we own. NEVER AI-generated.
 *               People, facilities, TECHNA visits, certificates, awards.
 * `generated` — abstract backgrounds, textures, species illustrations, OG
 *               fallbacks. Logged in docs/ASSET_LICENSES.md.
 */
export type ImageKind = 'real' | 'generated';

/** An intrinsic aspect ratio as a CSS-ready `w / h` pair, e.g. `'21 / 9'`. */
export type AspectRatio = `${number} / ${number}`;

export interface ImageSlot {
  /** Stable key components ask for by name, e.g. `hero.wheat.field`. */
  readonly id: string;
  readonly kind: ImageKind;
  /** Required, bilingual, and written like alt text — not like a filename. */
  readonly alt: Localized;
  readonly ratio: AspectRatio;
  /**
   * Path under `public/`, or `null` while the asset is outstanding. The
   * placeholder system keys off `null`: dropping the file in and re-running
   * `npm run images` fills this in and the real photo appears with no code
   * change anywhere in the component tree.
   */
  readonly source: string | null;
  /** Tiny base64 LQIP produced by the optimiser; painted behind the image. */
  readonly blurhash: string | null;
  readonly width: number | null;
  readonly height: number | null;
  /** Only meaningful for `generated`: model + prompt reference. */
  readonly provenance?: string;
  /** Only meaningful for `real`: who shot it / where it came from. */
  readonly credit?: string;
}
