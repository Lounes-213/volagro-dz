import type { Metadata, Viewport } from 'next';
import { Barlow_Condensed, IBM_Plex_Sans_Arabic, Inter } from 'next/font/google';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';

import { IDENTITY, TAGLINE } from '@content/company';
import { UI } from '@content/ui';
import { pick } from '@content/types';
import { SITE_URL } from '@/lib/config';
import { LOCALES, LOCALE_META, X_DEFAULT_LOCALE, isLocale } from '@/lib/i18n/config';
import { cn } from '@/lib/utils/cn';

import { ScrollToTopOnMount } from '@/components/common/ScrollToTopOnMount';

import '@/styles/globals.css';

/* ── Fonts ───────────────────────────────────────────────────────────────────
 * Self-hosted by `next/font` at build time: no third-party request, no FOUT
 * flash, and `adjustFontFallback` (on by default) injects a metric-matched
 * local fallback so swapping in the real face costs zero layout shift.
 *
 * Barlow Condensed  — display face. Condensed, industrial, holds up at 96px.
 * Inter             — text face. Neutral, excellent at 16px on low-DPI phones.
 * IBM Plex Sans Arabic — Arabic face. Naskh-influenced, real weight range.
 *
 * `preload: false` on the Arabic face on purpose: the layout is shared by all
 * locales, so preloading it would make every French visitor download ~40 KB of
 * Arabic glyphs they will never paint. Latin faces are preloaded; the Arabic one
 * arrives on demand behind a metric-adjusted fallback.
 */
const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-barlow-condensed',
  display: 'swap',
  preload: true,
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
});

const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-plex-arabic',
  display: 'swap',
  preload: false,
});

const fontClassName = cn(barlowCondensed.variable, inter.variable, plexArabic.variable);

/* ── Static generation ───────────────────────────────────────────────────── */

interface LocaleParams {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams(): { locale: string }[] {
  return LOCALES.map((locale) => ({ locale }));
}

/** An unknown /xx/ path must 404 at export time, never render a blank shell. */
export const dynamicParams = false;

/* ── Metadata (copy comes from content/, never from this file) ───────────── */

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const meta = LOCALE_META[locale];

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: `${IDENTITY.legalName} — ${IDENTITY.headOffice[locale]}`,
      template: `%s — ${IDENTITY.wordmark}`,
    },
    description: TAGLINE[locale],
    applicationName: IDENTITY.wordmark,
    alternates: {
      canonical: `/${locale}/`,
      languages: {
        ...Object.fromEntries(LOCALES.map((code) => [LOCALE_META[code].hreflang, `/${code}/`])),
        'x-default': `/${X_DEFAULT_LOCALE}/`,
      },
    },
    openGraph: {
      type: 'website',
      siteName: IDENTITY.legalName,
      locale: locale === 'ar' ? 'ar_DZ' : locale === 'en' ? 'en_GB' : 'fr_DZ',
      url: `/${locale}/`,
    },
    robots: { index: true, follow: true },
    formatDetection: { telephone: true, address: true, email: true },
    other: { 'html-lang': meta.htmlLang, 'content-direction': meta.direction },
  };
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'light',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#faf7f2' },
    { media: '(prefers-color-scheme: dark)', color: '#1f2a2b' },
  ],
};

/* ── Root layout ─────────────────────────────────────────────────────────────
 * There is deliberately no `src/app/layout.tsx`: this file *is* the root layout
 * for the whole site, because the locale segment owns the document language and
 * direction. `/` itself is handled outside React by the post-export language
 * gate (`scripts/postbuild.ts`), since `output: 'export'` has no server to issue
 * a redirect.
 */
export default async function LocaleLayout({
  children,
  params,
}: LocaleParams & { children: React.ReactNode }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  /* Mandatory under `output: 'export'`. Without it, next-intl's request config
   * falls back to reading the Accept-Language header — a dynamic API — and every
   * page fails to prerender. This is what tells it which locale is being built. */
  setRequestLocale(locale);

  const meta = LOCALE_META[locale];

  return (
    <html lang={meta.htmlLang} dir={meta.direction} className={fontClassName}>
      <body className="bg-surface text-ink antialiased">
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if('scrollRestoration' in history){history.scrollRestoration='manual';}}catch(e){}`,
          }}
        />
        <ScrollToTopOnMount />
        {/* Reveal animations start at opacity 0. If JavaScript never runs, that
            leaves the whole page blank — an SEO and accessibility failure that no
            amount of graceful animation would excuse. This is the safety net, and
            it is why every animated wrapper carries `data-reveal`. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>

        <a
          href="#main"
          className="sr-only-focusable bg-accent text-on-accent focus:fixed focus:start-4 focus:top-4 focus:z-90 focus:inline-flex focus:h-11 focus:items-center focus:rounded-sm focus:px-5 focus:text-sm focus:font-medium"
        >
          {pick(UI.skipToContent, locale)}
        </a>

        {/* No message catalogs are passed: all copy lives in typed `content/`
            files. The provider exists because next-intl's client navigation hooks
            (`usePathname`, `useRouter`) resolve the active locale from it — and
            without it they throw while a client component is prerendered on the
            server, which is exactly how this page first failed to export. */}
        <NextIntlClientProvider locale={locale} messages={{}}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
