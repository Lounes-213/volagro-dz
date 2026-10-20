/**
 * Technical site configuration. Not content — nothing here is copy.
 * Canonical origin is overridable per environment so preview deploys never
 * emit production canonicals/hreflang (that is how previews get indexed).
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.volagro.dz').replace(
  /\/+$/,
  '',
);

/** Used as the mailto/wa.me reply-to context and in JSON-LD @id anchors. */
export const ORG_ID = `${SITE_URL}/#organization`;

export const IS_PRODUCTION_BUILD = process.env.NODE_ENV === 'production';

/**
 * Feature flag for the quote form's network endpoint. Disabled by default: the
 * form is deliberately backend-less (WhatsApp + mailto). Flipping this to a
 * Cloudflare Worker or Formspree URL is the only change needed to start posting.
 */
export const QUOTE_ENDPOINT = process.env.NEXT_PUBLIC_QUOTE_ENDPOINT ?? '';
