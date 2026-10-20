import { notFound } from 'next/navigation';

import { ChainDiagram } from '@/components/sections/home/ChainDiagram';
import { CmvBento } from '@/components/sections/home/CmvBento';
import { CmvPackagingShowcase } from '@/components/sections/home/CmvPackagingShowcase';
import { ContactBand } from '@/components/sections/home/ContactBand';
import { GalleryTeaser } from '@/components/sections/home/GalleryTeaser';
import { Hero } from '@/components/sections/home/Hero';
import { KeyFigures } from '@/components/sections/home/KeyFigures';
import { TechnaSplit } from '@/components/sections/home/TechnaSplit';
import { Timeline } from '@/components/sections/home/Timeline';
import { LOCALES, isLocale } from '@/lib/i18n/config';

export function generateStaticParams(): { locale: string }[] {
  return LOCALES.map((locale) => ({ locale }));
}

/**
 * HOME
 *
 * Thin by design: the page assembles sections and passes the locale down. Every
 * string lives in `content/`, every list length is decided by the data, and no
 * section knows about another. That is what keeps /ar and /en from drifting — they
 * render the same tree with different words, not a different layout.
 */
export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <>
      <Hero locale={locale} />
      <KeyFigures locale={locale} />
      <ChainDiagram locale={locale} />
      <CmvBento locale={locale} />
      <CmvPackagingShowcase locale={locale} />
      <TechnaSplit locale={locale} />
      <Timeline locale={locale} />
      <GalleryTeaser locale={locale} />
      <ContactBand locale={locale} />
    </>
  );
}
