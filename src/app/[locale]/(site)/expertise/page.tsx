import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { PARTNERSHIP } from '@content/company';
import { EXPERTISE_FEATURE } from '@content/home';
import { pick } from '@content/types';
import { Figure } from '@/components/ui/Figure';
import { ButtonLink } from '@/components/ui/Button';
import { SectionHeading } from '@/components/ui/SectionHeading';
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

  const titles = {
    fr: 'Expertise Technique & Partenariat TECHNA — SARL VOLAGRO',
    ar: 'الخبرة التقنية وشراكة TECHNA — فولاغرو',
    en: 'Technical Expertise & TECHNA Partnership — SARL VOLAGRO',
  };

  const descriptions = {
    fr: 'Formulation zootechnique, audits de terrain et conseil en nutrition animale avec l’accompagnement du Groupe TECHNA FRANCE depuis 2018.',
    ar: 'تركيبات غذائية دقيقة، متابعة بيطرية وزيارات ميدانية بالشراكة مع مجمع TECHNA الفرنسي منذ 2018.',
    en: 'Zootechnical formulation, field farm audits and animal nutrition advisory backed by TECHNA FRANCE Group since 2018.',
  };

  return {
    title: titles[locale],
    description: descriptions[locale],
  };
}

export default async function ExpertisePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const labels = {
    eyebrow: { fr: 'NUTRITION & ZOOTECHNIE', ar: 'التغذية والتربية الحيوانية', en: 'NUTRITION & ZOOTECHNICS' },
    title: {
      fr: 'Une rigueur scientifique au service de l’éleveur',
      ar: 'دقة علمية في خدمة مردودية المربين',
      en: 'Scientific rigor at the service of livestock breeders',
    },
    lead: {
      fr: 'Grâce à notre alliance stratégique avec le Groupe TECHNA FRANCE, VOLAGRO conjugue connaissance intime du terrain algérien et savoir-faire nutritionnel international de pointe.',
      ar: 'بفضل شراكتنا الاستراتيجية مع مجمع TECHNA الفرنسي، تجمع فولاغرو بين المعرفة العميقة بخصوصيات الميدان الجزائري والخبرة الغذائية العالمية.',
      en: 'Through our strategic alliance with TECHNA FRANCE Group, VOLAGRO blends close knowledge of the Algerian territory with state-of-the-art international nutrition science.',
    },
    technaBadge: { fr: 'Partenaire depuis 2018', ar: 'شريك منذ 2018', en: 'Partner since 2018' },
    pillarsTitle: { fr: 'Nos 4 piliers d’intervention technique', ar: 'محاور التدخل التقني الأربعة', en: 'Our 4 Technical Pillars' },
    contactCta: { fr: 'Échanger avec nos ingénieurs', ar: 'تواصل مع مهندسينا التقنيين', en: 'Speak with our engineers' },
  };

  const pillars = [
    {
      id: 'formulation',
      num: '01',
      title: {
        fr: 'Formulation sur-mesure',
        ar: 'تركيبات مخصصة ودقيقة',
        en: 'Custom Formulation',
      },
      desc: {
        fr: 'Ajustement rigoureux des équilibres en acides aminés, vitamines, macro et micro-minéraux selon la matière première locale et le climat algérien.',
        ar: 'ضبط دقيق لتوازن الأحماض الأمينية والفيتامينات والمعادن وفق خصائص المواد الأولية المتوفرة والمناخ الجزائري.',
        en: 'Precise balancing of amino acids, vitamins, macro and micro-minerals tailored to local raw materials and Algerian climate.',
      },
    },
    {
      id: 'audit',
      num: '02',
      title: {
        fr: 'Audits de terrain & zootechnie',
        ar: 'زيارات ميدانية ومتابعة فنية',
        en: 'On-Farm Audits & Zootechnics',
      },
      desc: {
        fr: 'Visites régulières des techniciens chez les éleveurs : analyse de la litière, ventilation, indices de consommation (IC) et contrôle du poids.',
        ar: 'زيارات دورية للتقنيين في المزارع: تحليل التهوية، ومتابعة معامل التحويل الغذائي، ومراقبة تطور الأوزان.',
        en: 'Regular on-farm visits: litter analysis, ventilation checks, feed conversion ratios (FCR), and batch growth tracking.',
      },
    },
    {
      id: 'control',
      num: '03',
      title: {
        fr: 'Contrôle qualité en continu',
        ar: 'مراقبة الجودة المستمرة',
        en: 'Continuous Quality Control',
      },
      desc: {
        fr: 'Échantillonnage strict et traçabilité des lots de CMV sortant de notre unité industrielle de Tala Athmane (5 000 tonnes/an).',
        ar: 'مراقبة العينات وتتبع مسار كل دفعة من الـ CMV تخرج من وحدة الإنتاج الصناعي بتالة عثمان (5000 طن/سنة).',
        en: 'Strict sampling and complete traceability for all CMV batches produced at our Tala Athmane industrial plant (5,000 t/year).',
      },
    },
    {
      id: 'performance',
      num: '04',
      title: {
        fr: 'Optimisation technico-économique',
        ar: 'تحسين المردودية الاقتصادية',
        en: 'Economic Performance Optimization',
      },
      desc: {
        fr: 'L’objectif central : maximiser le gain moyen quotidien (GMQ) et réduire le coût du kilo vif pour garantir la viabilité de l’éleveur.',
        ar: 'الهدف الرئيسي: رفع معدل النمو اليومي، وخفض تكلفة الكيلوغرام الحي، لضمان ربحية واستدامة المستثمرة.',
        en: 'Primary goal: maximize average daily gain (ADG) and reduce live-weight production costs to secure farm profitability.',
      },
    },
  ];

  return (
    <div className="py-12 md:py-16">
      <div className="shell">
        <SectionHeading
          eyebrow={pick(labels.eyebrow, locale)}
          title={pick(labels.title, locale)}
          lead={pick(labels.lead, locale)}
          locale={locale}
        />

        {/* ── Techna Partnership Banner ────────────────────────────────────── */}
        <div className="bg-surface-sunken border-line rounded-card mt-12 grid items-center gap-10 border p-8 lg:grid-cols-12 md:p-12 shadow-xs">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-green-300 bg-green-50 px-3 py-1 text-xs font-semibold text-green-800">
              <span className="h-1.5 w-1.5 rounded-full bg-green-600" />
              {pick(labels.technaBadge, locale)}
            </span>

            <h3 className="font-display text-d2 text-ink mt-4">
              {pick(PARTNERSHIP.title, locale)}
            </h3>

            <p className="text-ink-muted mt-4 text-base leading-relaxed">
              {pick(PARTNERSHIP.body, locale)}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <ButtonLink href="/contact" size="md">
                {pick(labels.contactCta, locale)}
              </ButtonLink>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="overflow-hidden rounded-card border border-line bg-charcoal-900 shadow-sm">
              <Figure
                slot="photo.legacy.02"
                locale={locale}
                sizes="(min-width: 1024px) 40vw, 100vw"
                imageClassName="h-auto w-full object-cover"
              />
              <div className="bg-surface p-3 text-xs text-ink-subtle">
                {pick(EXPERTISE_FEATURE.photoCaption, locale)}
              </div>
            </div>
          </div>
        </div>

        {/* ── 4 Pillars Grid ───────────────────────────────────────────────── */}
        <div className="mt-16">
          <div className="border-b border-line pb-4">
            <div className="border-s-2 border-green-700 ps-3">
              <h3 className="font-display text-d3 text-ink">
                {pick(labels.pillarsTitle, locale)}
              </h3>
            </div>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((pillar) => (
              <div
                key={pillar.id}
                className="bg-surface rounded-card border-line flex flex-col justify-between border p-6 shadow-xs transition hover:shadow-md"
              >
                <div>
                  <span className="font-display text-d2 text-green-700/40 font-bold">
                    {pillar.num}
                  </span>
                  <h4 className="font-display text-d4 text-ink mt-2">
                    {pick(pillar.title, locale)}
                  </h4>
                  <p className="text-ink-muted mt-3 text-xs leading-relaxed">
                    {pick(pillar.desc, locale)}
                  </p>
                </div>
                <div className="mt-6 border-t border-line/60 pt-3">
                  <span className="text-[11px] font-semibold text-green-700 uppercase tracking-wider">
                    Méthodologie certifiée
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
