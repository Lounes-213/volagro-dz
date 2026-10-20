import Image from 'next/image';

import { FAX, IDENTITY, SITE_ADDRESS, SWITCHBOARD, TAGLINE } from '@content/company';
import { MAP_SITES } from '@content/company';
import { FOOTER_COLUMNS } from '@content/navigation';
import { UI } from '@content/ui';
import { pick } from '@content/types';
import { Glyph } from '@/components/icons/Glyph';
import { LanguageSwitcher } from '@/components/sections/LanguageSwitcher';
import { mailtoHref, mapsHref, telHref, whatsappHref } from '@/lib/contact-links';
import { CONTACTS, WHATSAPP_TARGET } from '@content/contacts';
import type { Locale } from '@/lib/i18n/config';
import { Link } from '@/lib/i18n/navigation';

export const SiteFooter = ({ locale }: { readonly locale: Locale }) => {
  const year = new Date().getFullYear();
  const company = CONTACTS.find((contact) => contact.id === 'entreprise');

  return (
    <footer className="theme-ink mt-auto">
      <div className="shell grid gap-12 py-16 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:py-20">
        {/* ── Identity & channels ──────────────────────────────────────────── */}
        <div>
          <div className="inline-flex items-center rounded-md bg-white px-3.5 py-2 shadow-xs">
            <Image
              src="/images/logo/volagro-lockup.png"
              alt={IDENTITY.wordmark}
              width={2158}
              height={729}
              className="h-10 w-auto"
            />
          </div>
          <p className="text-ink-muted mt-6 max-w-[34ch] text-sm leading-relaxed">
            {pick(IDENTITY.ownership, locale)} · {IDENTITY.foundedYear}
          </p>

          <address className="mt-6 grid gap-2 text-sm not-italic">
            <span className="text-ink-muted">{pick(SITE_ADDRESS.full, locale)}</span>
            {SWITCHBOARD.map((phone) => (
              <a
                key={phone.e164}
                href={telHref(phone)}
                className="hover:text-accent inline-flex min-h-11 items-center gap-2.5"
              >
                <Glyph name="phone" size={17} className="text-ink-subtle shrink-0" />
                <span className="tnum">{phone.display}</span>
                <span className="text-ink-subtle text-xs">· {pick(phone.label, locale)}</span>
              </a>
            ))}
            <span className="text-ink-subtle inline-flex items-center gap-2.5 text-xs">
              <span className="tnum">{FAX.display}</span> · {pick(FAX.label, locale)}
            </span>
            {company ? (
              <a
                href={mailtoHref(company.email.value)}
                className="hover:text-accent inline-flex min-h-11 items-center gap-2.5"
              >
                <Glyph name="mail" size={17} className="text-ink-subtle shrink-0" />
                <span className="break-all">{company.email.value}</span>
              </a>
            ) : null}
          </address>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={whatsappHref(WHATSAPP_TARGET)}
              target="_blank"
              rel="noopener noreferrer"
              className="border-line hover:border-green-500 hover:text-green-300 inline-flex h-11 items-center gap-2 rounded-sm border px-4 text-sm font-medium transition-colors"
            >
              <Glyph name="whatsapp" size={18} className="text-green-400" />
              {pick(UI.whatsapp, locale)}
            </a>
            <a
              href={mapsHref()}
              target="_blank"
              rel="noopener noreferrer"
              className="border-line hover:border-green-500 hover:text-green-300 inline-flex h-11 items-center gap-2 rounded-sm border px-4 text-sm font-medium transition-colors"
            >
              <Glyph name="pin" size={18} className="text-green-400" />
              {pick(UI.directions, locale)}
            </a>
          </div>
        </div>

        {/* ── Link columns ─────────────────────────────────────────────────── */}
        {FOOTER_COLUMNS.map((column) => (
          <nav key={column.id} aria-label={pick(column.label, locale)}>
            <p className="eyebrow text-ink-subtle">{pick(column.label, locale)}</p>
            <ul className="mt-4 grid">
              {column.children.map((child) => (
                <li key={child.id}>
                  <Link
                    href={child.href}
                    className="text-ink-muted hover:text-green-400 inline-flex min-h-10 items-center text-sm transition-colors"
                  >
                    {pick(child.label, locale)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      {/* ── Sites ────────────────────────────────────────────────────────────── */}
      <div className="border-line border-t">
        <div className="shell flex flex-wrap items-center gap-x-8 gap-y-3 py-6">
          <span className="eyebrow text-ink-subtle">{pick(UI.visitUs, locale)}</span>
          {MAP_SITES.map((site) => (
            <span key={site.id} className="text-ink-muted inline-flex items-center gap-2 text-sm">
              <Glyph name="pin" size={16} className="text-green-400 shrink-0" />
              {site.name}
            </span>
          ))}
        </div>
      </div>

      {/* ── Tagline strip: vibrant brand red bar ────────────────────────── */}
      <div className="bg-red-700">
        <p className="shell text-cream py-4 text-center text-sm leading-relaxed">
          {pick(TAGLINE, locale)}
        </p>
      </div>

      <div className="bg-charcoal-950">
        <div className="shell flex flex-col items-center gap-4 py-6 md:flex-row md:justify-between">
          <p className="text-ink-subtle text-xs">
            © {year} {IDENTITY.legalName} — {pick(IDENTITY.headOffice, locale)}
          </p>
          <LanguageSwitcher />
        </div>
      </div>
    </footer>
  );
};
