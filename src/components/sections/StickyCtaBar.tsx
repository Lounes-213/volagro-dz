import { PRIMARY_PHONE } from '@content/company';
import { WHATSAPP_TARGET } from '@content/contacts';
import { UI } from '@content/ui';
import { pick } from '@content/types';
import { Glyph } from '@/components/icons/Glyph';
import { telHref, whatsappHref } from '@/lib/contact-links';
import type { Locale } from '@/lib/i18n/config';
import { Link } from '@/lib/i18n/navigation';

/**
 * Mobile sticky action bar.
 *
 * The brief's core mobile requirement: most visitors are breeders on mid-range
 * phones, so calling and messaging must never be more than one thumb away. Three
 * actions, 44px+ targets, and a safe-area inset for phones with a home indicator.
 *
 * Rendered as a plain server component — no state, no JS cost, and it is always in
 * the tab order immediately after the header.
 */
export const StickyCtaBar = ({ locale }: { readonly locale: Locale }) => {
  const phone = PRIMARY_PHONE;

  return (
    <div
      className="bg-surface/95 border-line fixed inset-x-0 bottom-0 z-50 border-t backdrop-blur-md lg:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <nav
        aria-label={pick(UI.contact, locale)}
        className="grid grid-cols-3"
        style={{ height: 'var(--vg-cta-bar-h)' }}
      >
        <a
          href={telHref(phone)}
          className="text-ink hover:text-accent flex flex-col items-center justify-center gap-1 text-[0.6875rem] font-medium"
        >
          <Glyph name="phone" size={20} />
          {pick(
            { fr: 'Appeler', ar: 'اتصال', en: 'Call' },
            locale,
          )}
        </a>
        <a
          href={whatsappHref(WHATSAPP_TARGET)}
          target="_blank"
          rel="noopener noreferrer"
          className="text-ink hover:text-accent border-line flex flex-col items-center justify-center gap-1 border-x text-[0.6875rem] font-medium"
        >
          <Glyph name="whatsapp" size={20} />
          {pick(UI.whatsapp, locale)}
        </a>
        <Link
          href="/contact"
          className="bg-red-600 hover:bg-red-700 text-white flex flex-col items-center justify-center gap-1 text-[0.6875rem] font-medium transition-colors"
        >
          <Glyph name="mail" size={20} />
          {pick(
            { fr: 'Devis', ar: 'تسعيرة', en: 'Quote' },
            locale,
          )}
        </Link>
      </nav>
    </div>
  );
};
