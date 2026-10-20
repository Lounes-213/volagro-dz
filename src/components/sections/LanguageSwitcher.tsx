'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';

import { LOCALES, LOCALE_META, isLocale, type Locale } from '@/lib/i18n/config';
import { Link, usePathname } from '@/lib/i18n/navigation';
import { storeLocale } from '@/lib/i18n/preference';
import type { Localized } from '@content/types';
import { cn } from '@/lib/utils/cn';

const LABEL: Localized = {
  fr: 'Langue',
  ar: 'اللغة',
  en: 'Language',
};

/**
 * Language switcher.
 *
 * Two details that matter more than the markup:
 *
 *  1. It preserves the CURRENT PATH. `usePathname()` from the locale-aware
 *     navigation strips the prefix, so `Link href={pathname} locale={next}`
 *     rebuilds the same page in another language. Dropping a visitor on the home
 *     page because they changed language is the single most common i18n defect on
 *     corporate sites.
 *  2. It WRITES the choice (`volagro.locale`). That is what makes the root gate's
 *     detection sticky, and only a deliberate choice does it — we never trap
 *     someone in a language they merely happened to match by header.
 */
export const LanguageSwitcher = ({ className }: { readonly className?: string }) => {
  const pathname = usePathname();
  const params = useParams<{ locale?: string }>();
  const [pending, setPending] = useState<Locale | null>(null);

  const current: Locale = isLocale(params?.locale) ? params.locale : 'fr';

  return (
    <nav className={cn('flex items-center gap-1', className)} aria-label={LABEL[current]}>
      {LOCALES.map((locale) => {
        const isCurrent = locale === current;
        const meta = LOCALE_META[locale];

        if (isCurrent) {
          return (
            <span
              key={locale}
              aria-current="true"
              lang={meta.htmlLang}
              className="bg-charcoal-800 text-cream inline-flex h-9 min-w-9 items-center justify-center rounded-xs px-2 text-xs font-semibold tracking-wider"
            >
              {meta.abbr}
            </span>
          );
        }

        return (
          <Link
            key={locale}
            href={pathname}
            locale={locale}
            hrefLang={meta.hreflang}
            lang={meta.htmlLang}
            onClick={() => {
              setPending(locale);
              storeLocale(locale);
            }}
            aria-label={`${meta.endonym} — ${LABEL[current]}`}
            className={cn(
              'hover:border-accent hover:text-accent inline-flex h-9 min-w-9 items-center justify-center rounded-xs border border-transparent px-2 text-xs font-semibold tracking-wider',
              'transition-colors duration-150',
              pending === locale && 'text-accent',
            )}
          >
            {meta.abbr}
          </Link>
        );
      })}
    </nav>
  );
};
