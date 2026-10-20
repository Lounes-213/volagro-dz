import { MAP, PRIMARY_PHONE, SITE_ADDRESS } from '@content/company';
import { CONTACTS, WHATSAPP_TARGET } from '@content/contacts';
import { UI } from '@content/ui';
import { pick } from '@content/types';
import { Glyph } from '@/components/icons/Glyph';
import { ButtonAnchor, ButtonLink } from '@/components/ui/Button';
import { mapsDirectionsHref, mapsHref, telHref, whatsappHref } from '@/lib/contact-links';
import type { Locale } from '@/lib/i18n/config';

/**
 * The closing contact band, and one of only two dark scopes in the product (the
 * other is the footer). `theme-ink` flips every token-based utility at once, so
 * this section needs no dark-specific classes and cannot drift from the palette.
 *
 * Every value comes from `content/contacts.ts` — nothing here is typed by hand,
 * which is what keeps the WhatsApp target, the switchboard and the department
 * numbers in one place when they change.
 */
export const ContactBand = ({ locale }: { readonly locale: Locale }) => {
  const technical = CONTACTS.find((contact) => contact.id === 'technical');
  const sales = CONTACTS.find((contact) => contact.id === 'sales');
  const switchboard = PRIMARY_PHONE;

  return (
    <section className="theme-ink" aria-labelledby="contact-band-title">
      <div className="shell grid gap-12 py-16 lg:grid-cols-[1fr_1.15fr] lg:gap-16 lg:py-20">
        <div>
          <p className="eyebrow text-cream/60 marker">
            <span className="marker-tick" aria-hidden="true" />
            {pick(UI.contact, locale)}
          </p>
          <h2 id="contact-band-title" className="text-d2 text-cream mt-6 text-balance">
            {pick(UI.contactBandTitle, locale)}
          </h2>
          <p className="text-cream/70 mt-5 max-w-[46ch]">{pick(UI.contactBandBody, locale)}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <ButtonLink href="/contact" icon={<Glyph name="mail" size={18} />}>
              {pick(UI.requestQuote, locale)}
            </ButtonLink>
            <ButtonAnchor
              href={whatsappHref(WHATSAPP_TARGET)}
              variant="onInk"
              external
              icon={<Glyph name="whatsapp" size={18} />}
            >
              {pick(UI.whatsapp, locale)}
            </ButtonAnchor>
          </div>
        </div>

        {/* Department contacts: the visitor picks a door instead of a generic form. */}
        <ul className="grid gap-px sm:grid-cols-2">
          {[technical, sales].map((contact) =>
            contact ? (
              <li key={contact.id} className="py-6 sm:px-6 sm:first:ps-0">
                <p className="eyebrow text-cream/55">{pick(contact.title, locale)}</p>
                <p className="font-display text-d4 text-cream mt-3">
                  {contact.person ? pick(contact.person.name, locale) : pick(contact.title, locale)}
                </p>
                <ul className="mt-3 grid gap-1">
                  {contact.phones.map((phone) => (
                    <li key={phone.e164}>
                      <a
                        href={telHref(phone)}
                        className="hover:text-accent text-cream/85 tnum inline-flex min-h-11 items-center gap-2.5 text-sm"
                      >
                        <Glyph name="phone" size={16} className="text-cream/45 shrink-0" />
                        {phone.display}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            ) : null,
          )}

          <li className="border-line border-t pt-6 pb-2 sm:col-span-2">
            <div className="grid gap-6 md:grid-cols-[1.25fr_1fr] md:items-center">
              <div>
                <span className="text-cream/85 inline-flex items-center gap-2 text-sm font-medium">
                  <Glyph name="pin" size={16} className="text-green-400 shrink-0" />
                  {pick(SITE_ADDRESS.full, locale)}
                </span>

                <div className="mt-4 flex flex-wrap gap-4 text-sm">
                  <a
                    href={mapsHref()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-green-400 text-cream/80 inline-flex min-h-10 items-center gap-2 transition-colors"
                  >
                    <Glyph name="pin" size={15} className="text-green-400 shrink-0" />
                    {pick(
                      { fr: 'Voir sur la carte', ar: 'عرض على الخريطة', en: 'View on map' },
                      locale,
                    )}
                  </a>
                  <a
                    href={mapsDirectionsHref()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-green-400 text-cream/80 inline-flex min-h-10 items-center gap-2 transition-colors"
                  >
                    <Glyph name="arrow" size={15} className="flip-rtl text-green-400 shrink-0" />
                    {pick(UI.directions, locale)}
                  </a>
                  <a
                    href={telHref(switchboard)}
                    className="hover:text-green-400 text-cream/80 inline-flex min-h-10 items-center gap-2 transition-colors"
                  >
                    <Glyph name="phone" size={15} className="text-green-400 shrink-0" />
                    <span className="tnum">{switchboard.display}</span>
                  </a>
                </div>
              </div>

              {/* ── Mini carte interactive (sghira à côté) ── */}
              <div className="overflow-hidden rounded-md border border-line bg-charcoal-900 shadow-sm">
                <iframe
                  title="Localisation SARL VOLAGRO - Tizi-Ouzou"
                  src="https://maps.google.com/maps?q=SARL+Volagro,+Zone+d'Activit%C3%A9+Tala+Athmane,+Tizi-Ouzou&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  className="h-32 w-full border-0 opacity-80 transition-opacity hover:opacity-100"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div className="flex items-center justify-between bg-charcoal-950/90 px-3 py-1.5 text-xs text-cream/65">
                  <span className="flex items-center gap-1.5 truncate text-[11px]">
                    <Glyph name="pin" size={12} className="text-green-400 shrink-0" />
                    Tala Athmane, Tizi-Ouzou
                  </span>
                  <a
                    href={mapsHref()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-400 hover:text-green-300 hover:underline shrink-0 text-[11px] font-medium"
                  >
                    Maps ↗
                  </a>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>

      {/* The coordinates and opening hours are genuinely unknown — shown as a
          marked placeholder rather than an approximate pin that would send a
          farmer to the wrong end of the zone. */}
      {MAP.coordinates.status === 'pending' ? (
        <div className="border-line border-t">
          <p className="shell text-cream/45 py-4 text-xs leading-relaxed">
            {pick(MAP.coordinates.reason, locale)}
          </p>
        </div>
      ) : null}
    </section>
  );
};
