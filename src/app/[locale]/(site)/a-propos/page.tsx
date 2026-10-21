import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import {
  IDENTITY,
  KEY_FIGURES,
  MAP_SITES,
  TAGLINE,
} from '@content/company';
import { pick } from '@content/types';
import { ButtonLink } from '@/components/ui/Button';
import { Glyph } from '@/components/icons/Glyph';
import { LOCALES, isLocale } from '@/lib/i18n/config';
import { VideoCardsGrid } from '@/components/sections/VideoCardsGrid';
import { AboutHeroHeader } from '@/components/sections/about/AboutHeroHeader';

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
    fr: "L'Entreprise — SARL VOLAGRO",
    ar: 'عن المؤسسة — فولاغرو',
    en: 'About the Company — SARL VOLAGRO',
  };

  const descriptions = {
    fr: 'Découvrez l’histoire de la SARL VOLAGRO depuis 1998, nos unités industrielles à Tala Athmane (Tizi-Ouzou) et notre mission au service de l’aviculture algérienne.',
    ar: 'تعرف على تاريخ مؤسسة فولاغرو منذ 1998، ووحدات الإنتاج الصناعي بتالة عثمان (تيزي وزو) ومهمتنا في مرافقة شعبة الدواجن الوطنية.',
    en: 'Discover SARL VOLAGRO history since 1998, our industrial units in Tala Athmane (Tizi-Ouzou) and our mission in Algerian poultry farming.',
  };

  return {
    title: titles[locale],
    description: descriptions[locale],
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const labels = {
    eyebrow: { fr: 'HISTOIRE & VISION', ar: 'المسار والرؤية', en: 'HISTORY & VISION' },
    title: {
      fr: 'Plus de 25 ans d’engagement dans l’élevage national',
      ar: 'أكثر من 25 سنة من الالتزام في خدمة الإنتاج الحيواني',
      en: 'Over 25 years of commitment to national livestock farming',
    },
    lead: {
      fr: 'Fondée en 1998 à Tizi-Ouzou, SARL VOLAGRO s’est développée comme un acteur industriel majeur de la nutrition animale et de la filière avicole en Algérie.',
      ar: 'تأسست سنة 1998 بتيزي وزو، وتطورت مؤسسة فولاغرو لتصبح قطباً صناعياً رائداً في التغذية الحيوانية وترقية شعبة الدواجن في الجزائر.',
      en: 'Founded in 1998 in Tizi-Ouzou, SARL VOLAGRO has developed into a major industrial player in animal nutrition and the Algerian poultry industry.',
    },
    sitesTitle: { fr: 'Nos sites industriels', ar: 'مواقعنا ومنشآتنا', en: 'Our Industrial Sites' },
    milestonesTitle: { fr: 'Les grandes étapes', ar: 'محطات التطوير', en: 'Key Milestones' },
    overviewCta: { fr: "Vue d'ensemble", ar: 'نظرة عامة', en: 'Overview' },
  };

  const milestones = [
    {
      year: '1998',
      title: { fr: 'Fondation de l’entreprise', ar: 'تأسيس المؤسسة', en: 'Company Founding' },
      body: {
        fr: 'Création de l’entreprise familiale à Tizi-Ouzou, posant les bases d’une proximité constante avec les éleveurs de la région et du centre du pays.',
        ar: 'انطلاق المؤسسة العائلية بتيزي وزو، واضعةً أسس القرب والمرافقة المستمرة لمربي الدواجن في المنطقة والوسط.',
        en: 'Founding of the family enterprise in Tizi-Ouzou, establishing enduring proximity with regional livestock breeders.',
      },
    },
    {
      year: '2018',
      title: { fr: 'Alliance technique avec TECHNA', ar: 'شراكة تقنية مع TECHNA', en: 'Technical Alliance with TECHNA' },
      body: {
        fr: 'Signature du partenariat avec le Groupe TECHNA FRANCE pour élever le standard des formulations et de l’assistance technique.',
        ar: 'إبرام الشراكة مع مجمع TECHNA الفرنسي المتخصص في التغذية الحيوانية لرفع جودة التركيبات والمرافقة التقنية للمربين.',
        en: 'Partnership with the TECHNA FRANCE Group to raise formulation standards and technical advisory.',
      },
    },
    {
      year: '2022',
      title: { fr: 'Inauguration de l’unité industrielle CMV', ar: 'تدشين وحدة إنتاج الـ CMV الحديثة', en: 'Inauguration of the CMV Industrial Unit' },
      body: {
        fr: 'Mise en service de l’unité de production ultramoderne de prémélanges CMV (5 000 t/an) à Tala Athmane avec dosage et ensachage automatisés.',
        ar: 'تشغيل وحدة إنتاج مكمّلات الـ CMV فائقة الحداثة بطاقة 5000 طن/سنة بمنطقة النشاط تالة عثمان بتقنيات خلط وتعبئة متطورة.',
        en: 'Commissioning of the state-of-the-art CMV premix production unit (5,000 t/year) in Tala Athmane with automated batching and bagging.',
      },
    },
  ];

  return (
    <div>
      {/* ── Hero d'introduction avec fond animé cinématographique ─────── */}
      <section className="relative isolate overflow-hidden bg-charcoal-950 py-16 text-cream md:py-20">
        <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster="/images/real/legacy-01.jpg"
            className="pointer-events-none absolute inset-0 h-full w-full scale-[1.03] object-cover object-center brightness-[0.72] contrast-[1.08] saturate-[1.12]"
          >
            <source src="/videos/ved_bg.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal-950/90 via-charcoal-950/70 to-charcoal-950/50" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_25%,rgba(220,38,38,0.22)_0%,transparent_70%)]" />
          <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-red-500 to-transparent shadow-[0_0_12px_rgba(220,38,38,0.8)]" />
        </div>

        <AboutHeroHeader
          eyebrow={pick(labels.eyebrow, locale)}
          title={pick(labels.title, locale)}
          lead={pick(labels.lead, locale)}
          locale={locale}
        />
      </section>

      <div className="py-12 md:py-16">
        <div className="shell">

        {/* ── Key Figures Band ─────────────────────────────────────────────── */}
        <div className="border-line bg-surface rounded-none mt-12 grid gap-6 border p-6 sm:grid-cols-2 lg:grid-cols-4 shadow-xs">
          {KEY_FIGURES.map((fig) => (
            <div key={fig.id} className="border-line/60 sm:border-e sm:last:border-none sm:pe-6">
              <span className="text-xs font-semibold text-green-700">
                {pick(fig.label, locale)}
              </span>
              <p className="font-display text-d2 text-ink mt-2">
                {fig.kind === 'year' ? fig.value : fig.value.toLocaleString()}
                {fig.suffix ? <span className="text-sm font-sans ms-1 text-ink-subtle">{pick(fig.suffix, locale)}</span> : null}
              </p>
              {fig.caption ? (
                <p className="text-ink-subtle text-xs mt-1">{pick(fig.caption, locale)}</p>
              ) : null}
            </div>
          ))}
        </div>

        {/* ── Timeline Section ─────────────────────────────────────────────── */}
        <div className="mt-16">
          <div className="border-b border-line pb-4">
            <div className="border-s-2 border-green-700 ps-3">
              <h3 className="font-display text-d3 text-ink">
                {pick(labels.milestonesTitle, locale)}
              </h3>
            </div>
          </div>

          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {milestones.map((m) => (
              <div
                key={m.year}
                className="bg-surface rounded-none border-line relative flex flex-col justify-between border p-6 shadow-xs"
              >
                <div>
                  <span className="inline-block rounded-none bg-green-50 border border-green-200 px-3 py-1 font-mono text-sm font-bold text-green-800">
                    {m.year}
                  </span>
                  <h4 className="font-display text-d4 text-ink mt-4">
                    {pick(m.title, locale)}
                  </h4>
                  <p className="text-ink-muted mt-3 text-sm leading-relaxed">
                    {pick(m.body, locale)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Reportages & Vidéos Officielles de l'Entreprise ─────────────── */}
        <div className="mt-16">
          <div className="border-b border-line pb-4">
            <span className="border-s-2 border-red-600 ps-2.5 text-xs font-bold uppercase tracking-wider text-red-600 inline-block">
              {locale === 'ar' ? 'فيديوهات وتغطيات الميدان' : 'Médiathèque & Savoir-faire'}
            </span>
            <h3 className="font-display text-d3 text-ink mt-2">
              {locale === 'ar'
                ? 'فيديوهات حصرية: التأسيس والتغذية الدقيقة للحيوانات'
                : 'Vidéos de Référence : De la fondation aux solutions de nutrition'}
            </h3>
            <p className="text-ink-muted text-sm mt-1">
              {locale === 'ar'
                ? 'استكشف بالفيديو منشآتنا الصناعية، وحلول CMV المتخصصة لدجاج التسمين، الأبقار الحلوب، الأغنام، الماعز والخيول.'
                : 'Visionnez nos présentations institutionnelles et nos dossiers techniques sur le rôle crucial des CMV pour chaque espèce d’élevage.'}
            </p>
          </div>

          <VideoCardsGrid locale={locale} />
        </div>

        {/* ── Industrial Sites (Placés sous les vidéos) ────────────────────── */}
        <div className="mt-16">
          <div className="border-b border-line pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-green-700">
              {locale === 'ar' ? 'البنية التحتية والإنتاج' : 'Infrastructures & Capacités'}
            </span>
            <h3 className="font-display text-d3 text-ink mt-1">
              {pick(labels.sitesTitle, locale)}
            </h3>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {MAP_SITES.map((site) => (
              <div
                key={site.id}
                className="bg-surface rounded-none border-line border p-6 shadow-xs transition-colors hover:border-red-400"
              >
                <div className="flex items-center gap-2 text-green-800">
                  <Glyph name="pin" size={17} />
                  <span className="text-xs font-bold uppercase tracking-wider">Site d'exploitation</span>
                </div>
                <h4 className="font-display text-d4 text-ink mt-3 font-bold">
                  {site.name}
                </h4>
                <p className="text-ink-muted mt-2 text-xs leading-relaxed">
                  Zone d’Activité Tala Athmane, Wilaya de Tizi-Ouzou, Algérie.
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── CTA Band ─────────────────────────────────────────────────────── */}
        <div className="bg-surface-sunken rounded-card border-line mt-16 border p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="font-display text-d3 text-ink">
              {IDENTITY.legalName}
            </h4>
            <p className="text-ink-muted mt-1 text-sm">
              {pick(TAGLINE, locale)}
            </p>
          </div>
          <ButtonLink href="/" size="lg">
            {pick(labels.overviewCta, locale)}
          </ButtonLink>
        </div>
      </div>
    </div>
  </div>
  );
}
