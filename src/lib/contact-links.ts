import { MAP, SITE_ADDRESS } from '@content/company';
import type { PhoneNumber } from '@content/types';

/**
 * Protocol-link builders.
 *
 * These exist so that no component ever assembles a `tel:` or `wa.me` URL by hand
 * — the class of bug where a formatted phone number ("0770 55 23 28") ends up
 * inside a link and silently fails on Android, which is most of our audience.
 * `e164` is the only input, and the ESLint config blocks inline numbers in `src/`.
 */

export const telHref = (phone: PhoneNumber): string => `tel:${phone.e164}`;

interface WhatsAppOptions {
  /** Pre-filled message body. Composed by the quote form (Part 5). */
  readonly message?: string;
}

/**
 * `https://wa.me/<digits>` with no `+`, no spaces and no dashes. The country code
 * must be present, otherwise WhatsApp treats the number as local to the *viewer*.
 */
export const whatsappHref = (
  target: { readonly e164: string },
  options: WhatsAppOptions = {},
): string => {
  const digits = target.e164.replace(/\D/g, '');
  const base = `https://wa.me/${digits}`;
  return options.message ? `${base}?text=${encodeURIComponent(options.message)}` : base;
};

interface MailtoOptions {
  readonly subject?: string;
  readonly body?: string;
}

export const mailtoHref = (email: string, options: MailtoOptions = {}): string => {
  const params = new URLSearchParams();
  if (options.subject) params.set('subject', options.subject);
  if (options.body) params.set('body', options.body);
  const query = params.toString();
  return query ? `mailto:${email}?${query}` : `mailto:${email}`;
};

/** A search pin — how a breeder actually looks a place up on a phone. */
export const mapsHref = (query: string = MAP.searchQuery): string =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

export const mapsDirectionsHref = (query: string = MAP.searchQuery): string =>
  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(query)}`;

/** One-line address for metadata, footers and map cards. */
export const fullAddress = (locale: 'fr' | 'ar' | 'en'): string => SITE_ADDRESS.full[locale];
