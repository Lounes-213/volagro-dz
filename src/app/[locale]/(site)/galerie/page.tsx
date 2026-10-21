import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import {
  GALLERY_PHOTOS,
  type PhotoCategory,
} from '@content/images.manifest';
import { pick } from '@content/types';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { LOCALES, isLocale } from '@/lib/i18n/config';
import { MediaExplorer } from '@/components/gallery/MediaExplorer';

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

  const titles = {
    fr: 'Galerie Photographique — SARL VOLAGRO',
    ar: 'معرض الصور — فولاغرو',
    en: 'Photo Gallery — SARL VOLAGRO',
  };

  const descriptions = {
    fr: 'Découvrez en images les installations industrielles, les rencontres techniques avec TECHNA et les équipes de terrain de VOLAGRO.',
    ar: 'استكشف بالصور منشآت فولاغرو الصناعية، والملتقيات التقنية مع الشريك الفرنسي TECHNA، وفرق العمل الميدانية.',
    en: 'Discover in pictures VOLAGRO industrial facilities, technical events with TECHNA, and field teams.',
  };

  return {
    title: titles[locale],
    description: descriptions[locale],
  };
}

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const categoryLabels: Record<PhotoCategory, { fr: string; ar: string; en: string }> = {
    unites: { fr: 'Unités industrielles', ar: 'المنشآت الصناعية', en: 'Industrial Units' },
    salons: { fr: 'Salons & Foires', ar: 'المعارض والصالونات', en: 'Trade Fairs' },
    evenements: { fr: 'Événements & TECHNA', ar: 'الملتقيات وشراكة TECHNA', en: 'Events & TECHNA' },
    equipes: { fr: 'Équipes & Éleveurs', ar: 'الفرق والمربون', en: 'Teams & Farmers' },
  };

  const labels = {
    eyebrow: { fr: 'ARCHIVES & TERRAIN', ar: 'الأرشيف والميدان', en: 'ARCHIVES & FIELDWORK' },
    title: {
      fr: 'La vie d’une entreprise ancrée dans son territoire',
      ar: 'مسار مؤسسة راسخة في خدمة الإنتاج الوطني',
      en: 'The journey of an enterprise rooted in its territory',
    },
    lead: {
      fr: 'Photographies authentiques retraçant les visites de nos installations à Tala Athmane, le partenariat avec TECHNA et notre présence aux côtés des éleveurs algériens.',
      ar: 'صور حقيقية توثق زيارات المنشآت بتالة عثمان، والشراكة التقنية مع TECHNA، ومرافقة المربين في مختلف الولايات.',
      en: 'Authentic photographs documenting our Tala Athmane facilities, TECHNA partnership, and ongoing presence alongside Algerian farmers.',
    },
    all: { fr: 'Toutes les photos', ar: 'كل الصور', en: 'All photos' },
    realBadge: { fr: 'Photo réelle d’archive', ar: 'صورة أرشيف حقيقية', en: 'Real archive photo' },
  };

  return (
    <div className="py-12 md:py-16">
      <div className="shell">
        <SectionHeading
          eyebrow={pick(labels.eyebrow, locale)}
          title={pick(labels.title, locale)}
          lead={pick(labels.lead, locale)}
          locale={locale}
        />

        <MediaExplorer
          photos={GALLERY_PHOTOS}
          locale={locale}
          categoryLabels={categoryLabels}
          realBadgeLabel={pick(labels.realBadge, locale)}
        />

        {/* ── Editorial note ───────────────────────────────────────────────── */}
        <div className="bg-surface-sunken rounded-none border-s-4 border-green-700 border-t border-e border-b border-line mt-16 p-6 md:p-8">
          <div className="flex items-start gap-3.5">
            <div>
              <h4 className="font-display text-d4 text-ink">
                {pick(
                  {
                    fr: 'Engagement d’authenticité documentaire',
                    ar: 'التزام بالتوثيق والشفافية الميدانية',
                    en: 'Commitment to Documentary Authenticity',
                  },
                  locale,
                )}
              </h4>
              <p className="text-ink-muted mt-2 text-sm leading-relaxed max-w-[65ch]">
                {pick(
                  {
                    fr: 'Toutes les photographies publiées dans cet espace sont des clichés réels issus des archives de la SARL VOLAGRO. Elles témoignent de notre histoire, de nos investissements matériels réels et de nos partenariats scientifiques.',
                    ar: 'جميع الصور المعروضة في هذا الركن هي صور حقيقية ومأخوذة من أرشيف مؤسسة فولاغرو، تعكس استثماراتنا الميدانية وشراكاتنا التقنية الحقيقية.',
                    en: 'All photographs published here are genuine archival images from SARL VOLAGRO, reflecting our real industrial assets, teams, and scientific partnerships.',
                  },
                  locale,
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
