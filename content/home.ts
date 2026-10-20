/* ============================================================================
 * HOME PAGE CONTENT
 * ----------------------------------------------------------------------------
 * The integrated chain is the signature section of the site, and its four steps
 * are the four activities the client actually described. Nothing here is
 * inferred: chick production, feed and premixes, technical support, slaughter.
 * ========================================================================= */

import type { Localized } from './types';

export interface ChainStep {
  readonly id: string;
  /** Display index, rendered oversized in the condensed face ("01"). */
  readonly index: string;
  readonly title: Localized;
  readonly body: Localized;
  /** Where this link of the chain leads. */
  readonly href: string;
  /** Optional headline figure attached to the step. */
  readonly metric?: Localized;
}

export const CHAIN_STEPS: readonly ChainStep[] = [
  {
    id: 'couvoir',
    index: '01',
    title: { fr: 'Couvoir', ar: 'المفقس', en: 'Hatchery' },
    body: {
      fr: "Production de poussins d'un jour de poulet de chair, capacité de 20 000 000 de poussins par an.",
      ar: 'إنتاج الكتاكيت عمر يوم واحد لدجاج اللحم، بطاقة 20 000 000 كتكوت سنويًا.',
      en: 'Production of day-old broiler chicks, with a capacity of 20,000,000 chicks per year.',
    },
    href: '/produits/poussins-d-un-jour',
    metric: { fr: '20 M / an', ar: '20 مليون/سنة', en: '20M / year' },
  },
  {
    id: 'aliment',
    index: '02',
    title: {
      fr: 'Aliment & prémélanges',
      ar: 'العلف والـ CMV',
      en: 'Feed & premixes',
    },
    body: {
      fr: "Fabrication d'aliments et unité de production de prémélanges CMV d'une capacité de 5 000 tonnes.",
      ar: 'صناعة الأعلاف ووحدة إنتاج مكمّلات CMV بطاقة 5000 طن.',
      en: 'Feed manufacturing and a CMV premix unit with a capacity of 5,000 tonnes.',
    },
    href: '/produits',
    metric: { fr: '5 000 t', ar: '5000 طن', en: '5,000 t' },
  },
  {
    id: 'accompagnement',
    index: '03',
    title: {
      fr: 'Accompagnement technique',
      ar: 'المرافقة التقنية',
      en: 'Technical support',
    },
    body: {
      fr: "Formulations, suivi des élevages et appui de TECHNA : l'expertise en nutrition et zootechnie depuis 2018.",
      ar: 'التركيبات، متابعة المربّين ودعم TECHNA: خبرة التغذية وعلم تربية الحيوان منذ 2018.',
      en: 'Formulations, farm monitoring and TECHNA backing: nutrition and zootechnics expertise since 2018.',
    },
    href: '/expertise',
    metric: { fr: 'Depuis 2018', ar: 'منذ 2018', en: 'Since 2018' },
  },
];

/** Copy for the gallery teaser, which is the home page's photographic proof. */
export const GALLERY_TEASER = {
  title: {
    fr: "Sur le terrain, chez nous et chez vous",
    ar: 'في الميدان، عندنا وعندكم',
    en: 'In the field, at our place and yours',
  },
  lead: {
    fr: "Visites TECHNA, journées techniques, salons professionnels et unités de production : les photos de l'entreprise, sans mise en scène.",
    ar: 'زيارات TECHNA، الأيام التقنية، الصالونات المهنية ووحدات الإنتاج: صور المؤسسة كما هي.',
    en: 'TECHNA visits, technical days, trade fairs and production units: the company’s own photographs.',
  },
} as const;

/** A short, factual line for the TECHN|A split section — one real photograph. */
export const EXPERTISE_FEATURE = {
  title: {
    fr: 'Une formulation tenue par des zootechniciens',
    ar: 'تركيبة تحت إشراف خبراء التغذية الحيوانية',
    en: 'Formulations held by zootechnicians',
  },
  body: {
    fr: "En 2018, VOLAGRO a conclu un partenariat avec le Groupe TECHNA FRANCE pour bénéficier de son expertise en nutrition et zootechnie. Concrètement : des formules par espèce et par stade, et un accompagnement technique des élevages.",
    ar: 'سنة 2018، أبرمت فولاغرو شراكة مع مجمع TECHNA الفرنسي للاستفادة من خبرته في التغذية وعلم تربية الحيوان؛ أي تركيبات حسب النوع والمرحلة، ومرافقة تقنية للمربّين.',
    en: 'In 2018 VOLAGRO entered a partnership with the TECHNA FRANCE Group to draw on its expertise in nutrition and zootechnics. In practice: formulations per species and stage, and technical support on farms.',
  },
  photoCaption: {
    fr: "L'équipe VOLAGRO lors d'une visite chez TECHNA.",
    ar: 'فريق فولاغرو خلال زيارة إلى TECHNA.',
    en: 'The VOLAGRO team during a visit to TECHNA.',
  },
} as const;
