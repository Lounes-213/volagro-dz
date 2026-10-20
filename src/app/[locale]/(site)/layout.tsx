import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';

import { SiteFooter } from '@/components/sections/SiteFooter';
import { SiteHeader } from '@/components/sections/SiteHeader';
import { FloatingWhatsApp } from '@/components/sections/FloatingWhatsApp';
import { CallChoiceModal } from '@/components/sections/CallChoiceModal';
import { LOCALES, isLocale } from '@/lib/i18n/config';

export function generateStaticParams(): { locale: string }[] {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function SiteLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  setRequestLocale(locale);

  return (
    <>
      <SiteHeader locale={locale} />
      <main id="main">
        {children}
      </main>
      <SiteFooter locale={locale} />
      <FloatingWhatsApp locale={locale} />
      <CallChoiceModal locale={locale} />
    </>
  );
}
