import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { pick } from '@content/types';
import { WELCOME } from '@content/welcome';
import { WelcomeScreen } from '@/components/sections/welcome/WelcomeScreen';
import { LOCALES, isLocale } from '@/lib/i18n/config';

export function generateStaticParams(): { locale: string }[] {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  return {
    title: pick(WELCOME.eyebrow, locale),
    robots: { index: false, follow: true },
  };
}

/**
 * WELCOME
 *
 * Lives outside the `(site)` group on purpose: no header, no footer, no sticky
 * CTA — just the introduction, then the home page. The route is reachable from
 * the language gate at `/`, which resolves the visitor's locale first.
 */
export default async function WelcomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return <WelcomeScreen locale={locale} />;
}
