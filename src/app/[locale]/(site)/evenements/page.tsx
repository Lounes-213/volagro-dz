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
      slot: 'photo.legacy.17',
      tag: { fr: 'Salon International', ar: 'صالون دولي', en: 'International Trade Fair' },
      date: 'SIPSA Édition 2025',
      title: {
        fr: 'Participation et clôture du Salon International SIPSA 2025',
        ar: 'مشاركة واختتام فعاليات الصالون الدولي SIPSA 2025',
        en: 'Participation and closing of the SIPSA 2025 International Exhibition',
      },
      desc: {
        fr: 'Une occasion privilégiée de rencontres fructueuses avec nos partenaires, professionnels, éleveurs et fournisseurs pour partager les innovations en nutrition animale et équipements d’élevage.',
        ar: 'فرصة متميزة لعقد لقاءات بنّاءة مع الشركاء المهنيين، الزبائن والممولين، ومشاركة أحدث الابتكارات في التغذية ومكملات CMV وعصارة التجارب الميدانية.',
        en: 'A prime opportunity for constructive meetings with professional partners, clients, and suppliers, showcasing the latest premix innovations and field expertise.',
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
    {
      id: 'visite-techna-space-rennes',
      slot: 'photo.legacy.22',
      tag: { fr: 'Visite Stratégique & Salon', ar: 'زيارة استراتيجية ومعرض', en: 'Strategic Visit & Expo' },
      date: 'Nantes & Rennes, France',
      title: {
        fr: 'Visite au siège du Groupe TECHNA à Nantes & Salon SPACE à Rennes',
        ar: 'زيارة مقر مجمع تيكنا بنانت والمشاركة في صالون SPACE بمدينة رين',
        en: 'Visit to TECHNA Group Headquarters in Nantes & SPACE Expo in Rennes',
      },
      desc: {
        fr: 'Immersion de la délégation VOLAGRO au siège mondial de TECHNA et présence au salon SPACE : réunions au sommet, découverte des dernières innovations zootechniques et consolidation du partenariat.',
        ar: 'تواجد وفد فولاڨرو بالمقر الرئيسي لمجمع TECHNA بفرنسا وزيارة صالون SPACE: جلسات عمل استراتيجية، استكشاف أحدث التكنولوجيات، وتوطيد الشراكة الصناعية والتقنية.',
        en: 'VOLAGRO leadership delegation at TECHNA global HQ and SPACE expo: strategic meetings, discovering state-of-the-art zootechnical innovations, and reinforcing bilateral cooperation.',
      },
    },
    {
      id: 'salon-sevagro-bouira',
      slot: 'photo.legacy.27',
      tag: { fr: 'Salon National', ar: 'صالون وطني', en: 'National Exhibition' },
      date: '12 - 16 Novembre 2025',
      title: {
        fr: 'Participation au Salon National SEVAGRO (Bouira)',
        ar: 'مشاركة فولاڨرو في الصالون الوطني للمقاولاتية الخضراء SEVAGRO (البويرة)',
        en: 'Participation in the SEVAGRO National Exhibition (Bouira)',
      },
      desc: {
        fr: 'Présence active de la SARL VOLAGRO au Salon National de l’Entrepreneuriat Vert, de l’Agriculture et de l’Agroalimentaire à Bouira : présentation des gammes CMV, conseils techniques et rencontres avec les éleveurs.',
        ar: 'مشاركة متميزة لشركة فولاڨرو في الصالون الوطني للمقاولاتية الخضراء للفلاحة والصناعات الغذائية بالبويرة: عرض تشكيلة مكملات CMV، إرشادات تقنية ميدانية ولقاءات مباشرة مع المربين والفلاحين.',
        en: 'Active participation of SARL VOLAGRO at the SEVAGRO National Green Agro-Industry Expo in Bouira: presenting CMV premix lines, technical guidance, and meeting local livestock farmers.',
      },
    },
    {
      id: 'salon-sipsa-2026',
      slot: 'photo.legacy.32',
      tag: { fr: 'Salon International', ar: 'صالون دولي', en: 'International Fair' },
      date: 'Édition SIPSA 2026',
      title: {
        fr: 'Présence de VOLAGRO au Salon International SIPSA 2026',
        ar: 'حضور شركة فولاڨرو في الصالون الدولي للإنتاج الحيواني والعتاد SIPSA 2026',
        en: 'VOLAGRO at the SIPSA 2026 International Livestock Exhibition',
      },
      desc: {
        fr: 'Accueil de nos partenaires et visiteurs au Salon International de l’Élevage et de l’Agroéquipement SIPSA 2026, autour de nos innovations en nutrition animale et partenariats TECHNA.',
        ar: 'استقبال الشركاء والزوار في الصالون الدولي لتربية الحيوانات والعتاد الفلاحي SIPSA 2026، لعرض أحدث برامج التغذية وحلول مجمع تيكنا.',
        en: 'Welcoming partners and visitors at the SIPSA 2026 International Livestock & Agricultural Equipment Show, presenting advanced nutrition programs and TECHNA partnership.',
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
