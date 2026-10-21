/* ============================================================================
 * SARL VOLAGRO — IDENTITY & FIGURES
 * ----------------------------------------------------------------------------
 * Fact sheet. Every value below is traceable to the client brief or the legacy
 * site. Nothing here is estimated, rounded for effect, or embellished. Anything
 * we were NOT given is a `pending()` slot that renders a marked placeholder.
 *
 * Copy is authored in all three locales. Arabic is written natively in Modern
 * Standard Arabic as used in Algerian technical/commercial writing — not
 * transliterated from the French; English is written for a supplier/partner
 * audience (TECHNA, ingredient and equipment vendors), not machine-literal.
 * ========================================================================= */

import { pending, type Localized, type PhoneNumber } from './types';

/* ── Name ────────────────────────────────────────────────────────────────── */

export const IDENTITY = {
  legalName: 'SARL VOLAGRO',
  wordmark: 'VOLAGRO',
  foundedYear: 1998,
  /** Legal form — a fact, not a claim. */
  legalForm: 'SARL' as const,
  ownership: {
    fr: 'Entreprise familiale indépendante',
    ar: 'مؤسسة عائلية مستقلة',
    en: 'Independent, family-owned company',
  } satisfies Localized,
  headOffice: {
    fr: 'Tizi-Ouzou, Algérie',
    ar: 'تيزي وزو، الجزائر',
    en: 'Tizi-Ouzou, Algeria',
  } satisfies Localized,
} as const;

/* ── Positioning copy (restates supplied facts; adds no new ones) ─────────── */

export const TAGLINE: Localized = {
  fr: "Au service de l'optimisation des performances technico-économiques des filières animales algériennes.",
  ar: 'في خدمة تحسين الأداء التقني والاقتصادي لشعب الإنتاج الحيواني الجزائرية.',
  en: "Dedicated to optimising the technical and economic performance of Algeria's animal production sectors.",
};

export const HERO = {
  headline: {
    fr: "Au niveau des élevages, des performances maîtrisées.",
    ar: 'على مستوى مزارع التربية، أداءٌ محكم.',
    en: 'At the farm level, mastered performance.',
  } satisfies Localized,
  subline: TAGLINE,
  intro: {
    fr: "Fondée en 1998, VOLAGRO est une entreprise familiale spécialisée dans la fabrication d'aliments et la production de poussins d'un jour pour poulets de chair. Sa capacité de production est de 20 000 000 de poussins par an.",
    ar: 'تأسّست سنة 1998، وفولاغرو مؤسسة عائلية متخصصة في صناعة الأعلاف وإنتاج الكتاكيت عمر يوم واحد لدجاج اللحم، بطاقة إنتاجية تبلغ 20 000 000 كتكوت في السنة.',
    en: 'Founded in 1998, VOLAGRO is a family-owned company specialising in feed manufacturing and the production of day-old broiler chicks. Its production capacity reaches 20,000,000 chicks per year.',
  } satisfies Localized,
  ctaPrimary: {
    fr: 'Demander un devis',
    ar: 'اطلب تسعيرة',
    en: 'Request a quote',
  } satisfies Localized,
  ctaSecondary: {
    fr: 'Appeler maintenant',
    ar: 'اتصل الآن',
    en: 'Call now',
  } satisfies Localized,
} as const;

/* ── Key figures ─────────────────────────────────────────────────────────────
 * Consumed by the home "key numbers" band (count-up on view) and by the About
 * timeline. `value` is numeric so the count-up animates digits, never strings.
 * Grouping is rendered with Intl.NumberFormat — see src/lib/utils/format.ts.
 */
export interface KeyFigure {
  readonly id: string;
  readonly value: number;
  /**
   * How the figure is written: a foundation year must never be grouped
   * ("1 998"), while a capacity must be ("20 000 000"). Declared rather than
   * inferred, so the renderer never has to guess.
   */
  readonly kind: 'year' | 'quantity';
  readonly suffix?: Localized;
  readonly label: Localized;
  readonly caption?: Localized;
}

export const KEY_FIGURES: readonly KeyFigure[] = [
  {
    id: 'founding',
    value: 1998,
    kind: 'year',
    label: { fr: 'Année de création', ar: 'سنة التأسيس', en: 'Year founded' },
    caption: {
      fr: 'Entreprise familiale',
      ar: 'مؤسسة عائلية',
      en: 'Family-owned company',
    },
  },
  {
    id: 'chicks',
    value: 20,
    kind: 'quantity',
    suffix: { fr: 'millions / an', ar: 'مليون / سنة', en: 'million / year' },
    label: { fr: 'Capacité couvoir', ar: 'طاقة المفقس', en: 'Hatchery capacity' },
    caption: {
      fr: "Poussins d'un jour chair",
      ar: 'كتاكيت عمر يوم واحد لدجاج اللحم',
      en: 'Day-old broiler chicks',
    },
  },
  {
    id: 'premix',
    value: 5_000,
    kind: 'quantity',
    suffix: { fr: 'tonnes', ar: 'طن', en: 'tonnes' },
    label: { fr: 'Unité de prémélanges', ar: 'وحدة إنتاج الـ CMV', en: 'Premix unit' },
    caption: {
      fr: 'Capacité de production',
      ar: 'الطاقة الإنتاجية',
      en: 'Production capacity',
    },
  },
  {
    id: 'partnership',
    value: 2018,
    kind: 'year',
    label: { fr: 'Partenariat VOLAGRO - TECHNA', ar: 'شراكة فولاغرو - تيكنا', en: 'VOLAGRO - TECHNA Partnership' },
    caption: {
      fr: 'Nutrition & zootechnie',
      ar: 'التغذية وعلم تربية الحيوان',
      en: 'Nutrition & zootechnics',
    },
  },
];

/* ── Sites & channels ────────────────────────────────────────────────────── */

export const SITE_ADDRESS = {
  street: {
    fr: "Zone d'Activité Tala Athmane, N°16",
    ar: 'منطقة النشاط تالة عثمان، رقم 16',
    en: 'Tala Athmane Industrial Zone, No. 16',
  } satisfies Localized,
  city: { fr: 'Tizi-Ouzou', ar: 'تيزي وزو', en: 'Tizi-Ouzou' } satisfies Localized,
  country: { fr: 'Algérie', ar: 'الجزائر', en: 'Algeria' } satisfies Localized,
  /** Single-line form for footers/maps metadata. */
  full: {
    fr: "Zone d'Activité Tala Athmane, N°16, Tizi-Ouzou, Algérie",
    ar: 'منطقة النشاط تالة عثمان، رقم 16، تيزي وزو، الجزائر',
    en: 'Tala Athmane Industrial Zone, No. 16, Tizi-Ouzou, Algeria',
  } satisfies Localized,
} as const;

/**
 * Switchboard. `e164` = Algeria (+213) 26 44 18 xx, leading 0 dropped.
 *
 * Declared as a TUPLE, not `readonly PhoneNumber[]`: under
 * `noUncheckedIndexedAccess` an array index is `PhoneNumber | undefined`, which
 * would push a pointless null-check into every component that just wants the main
 * line. A tuple keeps the first element's type exact — the type system still
 * guards the list, but a phone number stays a phone number.
 */
export const SWITCHBOARD = [
  {
    e164: '+21326441870',
    display: '026 44 18 70',
    label: { fr: 'Standard', ar: 'الهاتف الرئيسي', en: 'Switchboard' },
  },
  {
    e164: '+21326441871',
    display: '026 44 18 71',
    label: {
      fr: 'Standard (2ᵉ ligne)',
      ar: 'الهاتف الرئيسي (الخط الثاني)',
      en: 'Switchboard (2nd line)',
    },
  },
] as const satisfies readonly PhoneNumber[];

/** The line every header, hero and sticky bar dials. Guaranteed to exist. */
export const PRIMARY_PHONE: PhoneNumber = SWITCHBOARD[0];

export const FAX = {
  display: '026 44 18 73',
  label: { fr: 'Fax', ar: 'الفاكس', en: 'Fax' },
} as const;

/**
 * Sites pinned on the public map. Coordinates omitted on purpose: the brief
 * supplied site *names*, not geodata — see `pending` below.
 */
export const MAP_SITES = [
  { id: 'couvoir-ferhat', name: 'SARL Volagro Couvoir Ferhat' },
  { id: 'premix-cmv', name: 'SARL Volagro Premix CMV' },
] as const;

/** Google's own embed for the two sites, as captured from the legacy page. */
export const MAP = {
  /** Query used for the "Ouvrir dans Maps" / "Get directions" deep links. */
  searchQuery: 'SARL Volagro, Zone d’Activité Tala Athmane, Tizi-Ouzou',
  /** Geo coordinates for exact pinning — NOT supplied by the client yet. */
  coordinates: pending({
    fr: "Coordonnées GPS exactes de la Zone d'Activité Tala Athmane à confirmer par le client (relevé sur place) pour un repère précis sur les plans.",
    ar: 'إحداثيات نظام تحديد المواقع الدقيقة لمنطقة النشاط تالة عثمان يرجى تأكيدها من المؤسسة لتحديد الموقع بدقة على الخرائط.',
    en: 'Exact GPS coordinates for the Tala Athmane Industrial Zone must be confirmed by the client (site survey) so the map pin is precise rather than approximate.',
  }),
  hours: pending({
    fr: "Horaires d'ouverture et jours de fermeture à confirmer (jours fériés algériens inclus).",
    ar: 'ساعات العمل وأيام الإغلاق مع العطل الرسمية الجزائرية — تنتظر التأكيد.',
    en: 'Opening hours and closing days to be confirmed, including Algerian public holidays.',
  }),
} as const;

/* ── Milestones (given facts only) ───────────────────────────────────────── */

export const PARTNERSHIP = {
  partnerName: 'TECHNA',
  partnerOrigin: { fr: 'France', ar: 'فرنسا', en: 'France' } satisfies Localized,
  since: 2018,
  title: {
    fr: 'Expertise TECHNA en nutrition et zootechnie',
    ar: 'خبرة TECHNA في التغذية وعلم تربية الحيوان',
    en: 'TECHNA expertise in nutrition and zootechnics',
  } satisfies Localized,
  body: {
    fr: 'En 2018, VOLAGRO a conclu un partenariat avec le Groupe TECHNA FRANCE pour bénéficier de son expertise en nutrition et zootechnie. Cet accompagnement structure nos formulations et nos recommandations sur le terrain.',
    ar: 'سنة 2018، أبرمت فولاغرو شراكة مع مجمع TECHNA الفرنسي للاستفادة من خبرته في التغذية وعلم تربية الحيوان؛ شراكة تُؤطّر تركيباتنا وتوصياتنا الميدانية.',
    en: 'In 2018 VOLAGRO entered a partnership with the TECHNA FRANCE Group to draw on its expertise in nutrition and zootechnics. That support underpins both our formulations and the advice we give in the field.',
  } satisfies Localized,
  /** Formal scope of the agreement — never supplied, so never asserted. */
  scope: pending({
    fr: "Périmètre contractuel exact du partenariat TECHNA (nature de l'assistance, périodicité des visites, prestations couvertes) à confirmer avant publication.",
    ar: 'النطاق التعاقدي الدقيق للشراكة مع TECHNA (طبيعة المساعدة، دورية الزيارات، الخدمات المشمولة) يرجى تأكيده قبل النشر.',
    en: 'The exact contractual scope of the TECHNA partnership (nature of the assistance, visit frequency, services covered) must be confirmed before publication.',
  }),
} as const;

export const INDUSTRIAL_UNITS = {
  year: 2022,
  premix: {
    title: { fr: 'Unité de prémélanges', ar: 'وحدة إنتاج الـ CMV', en: 'Premix unit' },
    capacity: { fr: '5 000 tonnes', ar: '5000 طن', en: '5,000 tonnes' },
  },
  partnership: {
    title: { fr: 'Alliance TECHNA', ar: 'شراكة TECHNA', en: 'TECHNA Alliance' },
    capacity: { fr: 'Depuis 2018', ar: 'منذ 2018', en: 'Since 2018' },
  },
  body: {
    fr: "En 2022, l'entreprise a inauguré une unité de production moderne de prémélanges (CMV) d'une capacité de 5 000 tonnes par an à Tala Athmane.",
    ar: 'سنة 2022، دشّنت المؤسسة وحدة صناعية حديثة لإنتاج مكملات الـ CMV بطاقة 5000 طن سنويًا بمنطقة النشاط تالة عثمان.',
    en: 'In 2022 the company commissioned a modern premix production unit (CMV) with an annual capacity of 5,000 tonnes in Tala Athmane.',
  } satisfies Localized,
} as const;

/* ── Compliance ──────────────────────────────────────────────────────────────
 * The brief lists no certification, approval number or audit reference. We
 * therefore publish none. When the client supplies documents, this slot turns
 * into a rendered list with no component changes. */

export const CERTIFICATIONS = pending({
  fr: "Aucun agrément, certificat d'établissement ou référence sanitaire ne nous a été communiqué à ce jour. Aucune mention de conformité n'est donc affichée : nous ne publions pas d'allégation non vérifiable sur ce point.",
  ar: 'لم يتسنّ لنا الحصول على أي اعتماد أو شهادة مؤسسة أو مرجع صحي إلى اليوم، ولذلك لا يُنشر أي ادّعاء بشأن المطابقة.',
  en: 'No approval, establishment certificate or health reference has been provided to us. Nothing about compliance is therefore displayed: we do not publish unverifiable claims on this point.',
});

/* ── Brand assets ────────────────────────────────────────────────────────────
 * The supplied logo is used unmodified. `mark`/`wordmark` files are the cropped
 * derivatives (emblem + wordmark only); the animal collage is a separate
 * illustrative asset used in the hero, never as a header lockup. */

export const BRAND_ASSETS = {
  /** Full supplied lockup, untouched — for print hand-off and about page. */
  fullLogo: '/images/logo/volagro-logo.png',
  /** Compact horizontal lockup for the sticky header (emblem + wordmark). */
  compactLogo: '/images/logo/volagro-logo-compact.png',
  /** Emblem alone: rounded-square, used for favicon/avatar/small marks. */
  emblem: '/images/logo/volagro-emblem.png',
  /** The animal collage from the old identity, hero/illustrative use only. */
  collage: '/images/logo/volagro-animaux.png',
  /** Sampled from the supplied logo — documented in docs/ARCHITECTURE.md. */
  sampledAccent: '#a00611',
} as const;
