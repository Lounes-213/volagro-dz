import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { pick } from '@content/types';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ButtonLink } from '@/components/ui/Button';
import { Figure } from '@/components/ui/Figure';
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
    fr: 'Événements & Journées Techniques — SARL VOLAGRO',
    ar: 'الأحداث والأيام التقنية — فولاغرو',
    en: 'Events & Technical Days — SARL VOLAGRO',
  };

  const descriptions = {
    fr: 'Retrouvez les journées techniques, séminaires zootechniques et salons professionnels de la filière avicole organisés par la SARL VOLAGRO.',
    ar: 'متابعة الأيام التقنية، والملتقيات المتخصصة في تربية الدواجن وصالونات الفلاحة التي تنظمها أو تشارك فيها فولاغرو.',
    en: 'Follow technical days, zootechnical seminars, and poultry trade fairs organized by SARL VOLAGRO.',
  };

  return {
    title: titles[locale],
    description: descriptions[locale],
  };
}

export default async function EventsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const labels = {
    eyebrow: { fr: 'RENCONTRES & SAVOIR', ar: 'اللقاءات وتبادل الخبرة', en: 'MEETINGS & KNOWLEDGE' },
    title: {
      fr: 'Partager le savoir zootechnique avec le terrain',
      ar: 'مشاركة المعرفة التقنية والبيطرية مع المربين',
      en: 'Sharing zootechnical knowledge directly with the field',
    },
    lead: {
      fr: 'VOLAGRO organise et participe régulièrement à des séminaires d’élevage, des journées de formation nutritionnelle et des salons professionnels à travers toute l’Algérie.',
      ar: 'تنظم فولاغرو وتشارك باستمرار في ندوات المرافقة، والأيام التكوينية في التغذية، والصالونات المهنية عبر ربوع الوطن.',
      en: 'VOLAGRO regularly organizes and takes part in farming seminars, nutritional training days, and trade fairs across Algeria.',
    },
    participateCta: { fr: 'S’inscrire à une prochaine journée', ar: 'التسجيل في اليوم التقني القادم', en: 'Register for the next event' },
  };

  const eventsList = [
    {
      id: 'journee-technique-nutrition',
      slot: 'photo.legacy.04',
      tag: { fr: 'Journée Technique', ar: 'يوم تقني', en: 'Technical Day' },
      date: 'Édition annuelle',
      title: {
        fr: 'Journée technique sur la nutrition et la biosécurité en élevage de chair',
        ar: 'يوم تقني حول التغذية والأمن الحيوي في تربية دجاج اللحم',
        en: 'Technical day on nutrition and biosecurity in broiler farming',
      },
      desc: {
        fr: 'Conférence interactive réunissant éleveurs, techniciens et vétérinaires autour des meilleures pratiques de ventilation, de gestion de litière et de gestion du stress thermique.',
        ar: 'لقاء تفاعلي يجمع المربين والتقنيين والبياطرة حول أحسن ممارسات التهوية وإدارة الفرشة ومقاومة الإجهاد الحراري.',
        en: 'Interactive conference bringing together breeders, technicians, and veterinarians on ventilation best practices, litter management, and heat stress.',
      },
    },
    {
      id: 'salon-professionnel-sipsa',
      slot: 'photo.legacy.01',
      tag: { fr: 'Salon Professionnel', ar: 'معرض مهني', en: 'Trade Fair' },
      date: 'Participation continue',
      title: {
        fr: 'Présence aux salons internationaux de l’élevage et de l’agroalimentaire',
        ar: 'المشاركة في المعارض الدولية للإنتاج الحيواني والصناعات الغذائية',
        en: 'Presence at international livestock and agribusiness trade fairs',
      },
      desc: {
        fr: 'Accueil des partenaires industriels, éleveurs de reproducteurs et fabricants d’aliments sur le stand VOLAGRO pour présenter les nouvelles formules de prémélanges.',
        ar: 'استقبال الشركاء والمربين ومصنعي الأعلاف بجناح فولاغرو لعرض أحدث تركيبات مكمّلات الـ CMV وتوفير الاستشارات الفنية.',
        en: 'Welcoming industrial partners, breeders, and feed manufacturers at the VOLAGRO booth to present newly developed premix formulations.',
      },
    },
    {
      id: 'visite-techna-france',
      slot: 'photo.legacy.08',
      tag: { fr: 'Partenariat Scientifique', ar: 'شراكة علمية', en: 'Scientific Partnership' },
      date: 'Coopération continue',
      title: {
        fr: 'Visites d’usines & séminaires de formulation avec les experts TECHNA',
        ar: 'زيارات ميدانية وورشات عمل مشتركة مع خبراء مجمع TECHNA',
        en: 'Site visits & formulation workshops with TECHNA specialists',
      },
      desc: {
        fr: 'Échanges continus entre nos ingénieurs algériens et les experts français en physiologie aviaire pour affiner les programmes nutritionnels selon les souches de poulets.',
        ar: 'تبادل مستمر للخبرات بين مهندسينا والخبراء الفرنسيين في فيزيولوجيا الطيور لضبط البرامج الغذائية حسب سلالات الدواجن.',
        en: 'Ongoing technical exchanges between our engineers and French poultry physiology experts to calibrate feed programs to bird genetics.',
      },
    },
    {
      id: 'colloque-ruminants-france',
      slot: 'photo.legacy.12',
      tag: { fr: 'Colloque International', ar: 'ملتقى دولي', en: 'International Symposium' },
      date: '21 - 22 Mai 2025',
      title: {
        fr: 'Participation au Colloque International des Ruminants en France',
        ar: 'مشاركة فولاڨرو في الملتقى الدولي للحيوانات المجترة بفرنسا',
        en: 'Participation in the International Ruminant Symposium in France',
      },
      desc: {
        fr: 'Présence des représentants de SARL VOLAGRO aux côtés d’experts internationaux : échange d’expertises, montée en compétences et transfert de savoir-faire en nutrition animale.',
        ar: 'حضور ممثلي شركة فولاڨرو للتغذية الحيوانية إلى جانب خبراء دوليين: تبادل للخبرات، إعادة تأهيل، ونقل المهارات المتقدمة في تغذية المجترات.',
        en: 'SARL VOLAGRO representatives alongside international experts: sharing field expertise, capacity building, and advanced nutrition knowledge transfer.',
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

        {/* ── Events Grid ─────────────────────────────────────────────────── */}
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {eventsList.map((event) => (
            <article
              key={event.id}
              className="bg-surface rounded-card border-line flex flex-col justify-between overflow-hidden border shadow-xs transition hover:shadow-md"
            >
              <div>
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-charcoal-900">
                  <Figure
                    slot={event.slot}
                    locale={locale}
                    sizes="(min-width: 768px) 33vw, 100vw"
                    imageClassName="h-full w-full object-cover"
                  />
                  <span className="absolute top-3 start-3 rounded-full bg-green-800/90 text-white px-3 py-0.5 text-[11px] font-semibold backdrop-blur-sm">
                    {pick(event.tag, locale)}
                  </span>
                </div>

                <div className="p-6">
                  <span className="text-xs font-semibold text-ink-subtle">
                    {event.date}
                  </span>

                  <h3 className="font-display text-d4 text-ink mt-2">
                    {pick(event.title, locale)}
                  </h3>

                  <p className="text-ink-muted mt-3 text-xs leading-relaxed">
                    {pick(event.desc, locale)}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-line/50 mt-4">
                <ButtonLink href="/contact" size="md" variant="onInk" className="w-full justify-center">
                  {pick(labels.participateCta, locale)}
                </ButtonLink>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
