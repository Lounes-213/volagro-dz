/* ============================================================================
 * PRODUCTS — registry + specification slots
 * ----------------------------------------------------------------------------
 * Two layers, deliberately separated:
 *
 *   REGISTRY  — what each product IS and WHO it is for. Fully authored, because
 *               it is definitional (a CMV is a "complément minéral vitaminé") and
 *               because the brief supplied the full CMV range, the chick capacity,
 *               the premix capacity and the slaughter cadence.
 *
 *   SPECS     — composition, dosage, packaging, storage, benefits, technical
 *               sheet, FAQ. ALL `pending()`. We were given none of these values,
 *               so none are published: each slot carries a trilingual reason
 *               naming exactly what the client must supply. `SPEC_REQUEST_LIST`
 *               turns those slots into the document request we hand back.
 *
 * Nothing in this file estimates a dosage, a guaranteed analysis or a benefit.
 * ========================================================================= */

import { pending, type Localized, type Pending, type Slot } from './types';

/* ── Taxonomy ────────────────────────────────────────────────────────────── */

/** Drives route generation, `related` typing and the products overview groups. */
export type ProductSlug =
  | 'cmv-poulet-de-chair'
  | 'cmv-pondeuse'
  | 'cmv-repro'
  | 'cmv-dinde'
  | 'cmv-bovin-ovin'
  | 'cmv-vache-laitiere'
  | 'poussins-d-un-jour'
  | 'aliments';

export type ProductFamily = 'cmv' | 'chicks' | 'feed';

/**
 * Keys of the hand-drawn line-icon set (consistent 1.5px stroke on a 24px grid).
 * Six species + two process icons. One icon per card, never an emoji.
 */
export type IconKey =
  | 'broiler'
  | 'layer'
  | 'breeder'
  | 'turkey'
  | 'ruminant'
  | 'dairy'
  | 'chick'
  | 'pellet'
  | 'processing';

export const SPECIES_IMAGES: Record<IconKey, string> = {
  broiler: '/images/species/broiler.jpg',
  layer: '/images/species/layer.jpg',
  breeder: '/images/species/breeder.jpg',
  turkey: '/images/species/turkey.jpg',
  ruminant: '/images/species/ruminant.jpg',
  dairy: '/images/species/dairy.jpg',
  chick: '/images/species/chick.jpg',
  pellet: '/images/species/pellet.jpg',
  processing: '/images/species/broiler.jpg',
};

/** Bento emphasis — editorial hierarchy, not layout. The grid maps 1:1. */
export type Emphasis = 'lead' | 'feature' | 'standard';

export interface ProductFamilyMeta {
  readonly id: ProductFamily;
  readonly label: Localized;
  readonly description: Localized;
}

export const PRODUCT_FAMILIES: readonly ProductFamilyMeta[] = [
  {
    id: 'chicks',
    label: { fr: "Poussins d'un jour", ar: 'كتاكيت عمر يوم واحد', en: 'Day-old chicks' },
    description: {
      fr: "Couvoir de poussins d'un jour de poulet de chair, capacité de 20 000 000 de poussins par an.",
      ar: 'مفقس لإنتاج الكتاكيت عمر يوم واحد لدجاج اللحم، بطاقة 20 000 000 كتكوت سنويًا.',
      en: 'Day-old broiler chick hatchery, with a capacity of 20,000,000 chicks per year.',
    },
  },
  {
    id: 'feed',
    label: { fr: 'Aliments', ar: 'الأعلاف', en: 'Feed' },
    description: {
      fr: "Fabrication d'aliments pour les filières animales.",
      ar: 'صناعة أعلاف للشُّعب الحيوية.',
      en: 'Feed manufacturing for animal production sectors.',
    },
  },
  {
    id: 'cmv',
    label: { fr: 'Prémélanges CMV', ar: 'مكمّلات CMV', en: 'CMV premixes' },
    description: {
      fr: "Compléments minéraux vitaminés (CMV) formulés par espèce et par stade physiologique, avec l'expertise TECHNA.",
      ar: 'مكمّلات معدنية وفيتامينية (CMV) مُركّبة حسب النوع ومرحلة النمو، بخبرة TECHNA.',
      en: 'Mineral and vitamin supplements (CMV) formulated by species and physiological stage, with TECHNA expertise.',
    },
  },
];

/* ── Specification row shapes (rendered as the product-page tables) ──────── */

export interface CompositionRow {
  readonly component: Localized;
  /** Amount as printed on the supplier sheet — with its unit, verbatim. */
  readonly amount: Localized;
}

export interface DosageRow {
  /** Life stage: démarrage, croissance, finition, ponte… */
  readonly stage: Localized;
  /** Inclusion rate, e.g. "2 %" — never estimated here. */
  readonly rate: Localized;
  readonly note?: Localized;
}

export interface SpecRow {
  readonly label: Localized;
  readonly value: Localized;
}

/* ── Placeholder factories ───────────────────────────────────────────────────
 * One factory per slot kind, parameterised by the product name so the reason
 * handed back to the client is specific rather than generic boilerplate. */

const compositionPending = (name: Localized): Pending =>
  pending({
    fr: `Composition détaillée du ${name.fr} : liste des minéraux, vitamines et teneurs garanties. À fournir par le service technique (formulation TECHNA) — aucune valeur n'est publiée sans document source.`,
    ar: `التركيبة التفصيلية لـ ${name.ar}: قائمة المعادن والفيتامينات والتراكيز المضمونة. تُقدَّم من المصلحة التقنية (تركيبة TECHNA) — لا تُنشر أي قيمة دون وثيقة مصدرية.`,
    en: `Detailed composition of the ${name.en}: mineral and vitamin list with guaranteed levels. To be supplied by the technical department (TECHNA formulation) — no value is published without a source document.`,
  });

const dosagePending = (name: Localized): Pending =>
  pending({
    fr: `Taux d'incorporation du ${name.fr} par stade physiologique (démarrage, croissance, finition ou ponte) et mode d'emploi au mélangeur. À confirmer par le service technique.`,
    ar: `نسبة إدماج ${name.ar} حسب المرحلة (الانطلاق، النمو، التسمين أو وضع البيض) وطريقة الخلط. تُؤكَّد من المصلحة التقنية.`,
    en: `Inclusion rate for the ${name.en} by physiological stage (starter, grower, finisher or laying) plus mixing instructions. To be confirmed by the technical department.`,
  });

const usagePending = (name: Localized): Pending =>
  pending({
    fr: `Consignes d'utilisation du ${name.fr} au quotidien : ordre d'incorporation, compatibilité avec les matières premières, précautions de transition alimentaire.`,
    ar: `إرشادات الاستعمال اليومي لـ ${name.ar}: ترتيب الإدماج، التوافق مع المواد الأولية، واحتياطات تغيير العلف.`,
    en: `Day-to-day handling instructions for the ${name.en}: order of incorporation, compatibility with raw materials, feed-transition precautions.`,
  });

const packagingPending = (name: Localized): Pending =>
  pending({
    fr: `Conditionnement du ${name.fr} : poids des sacs, palettisation, quantités minimales de commande.`,
    ar: `التعليب الخاص بـ ${name.ar}: وزن الأكياس، التركيب على المنصّات، والكميات الدنيا للطلب.`,
    en: `Packaging for the ${name.en}: bag weights, palletisation, minimum order quantities.`,
  });

const storagePending = (name: Localized): Pending =>
  pending({
    fr: `Conditions de conservation du ${name.fr} : durée de péremption, température, hygrométrie, précautions de stockage.`,
    ar: `شروط حفظ ${name.ar}: مدة الصلاحية، درجة الحرارة، الرطوبة، واحتياطات التخزين.`,
    en: `Storage conditions for the ${name.en}: shelf life, temperature, humidity, handling precautions.`,
  });

const sheetPending = (name: Localized): Pending =>
  pending({
    fr: `La fiche technique PDF du ${name.fr} (fiche produit signée, analyses) n'a pas encore été fournie. Le bouton de téléchargement s'activera dès réception du fichier dans /public/documents.`,
    ar: `البطاقة الفنية (PDF) الخاصة بـ ${name.ar} لم تُسلَّم بعد. سيُفعَّل زر التحميل فور إيداع الملف في /public/documents.`,
    en: `The ${name.en} technical data sheet (PDF) has not been supplied yet. The download button activates as soon as the file lands in /public/documents.`,
  });

const benefitsPending = (name: Localized): Pending =>
  pending({
    fr: `Les bénéfices revendiqués pour le ${name.fr} doivent s'appuyer sur vos essais terrain ou sur les références TECHNA. Aucun argument chiffré n'est inventé : à valider avec le service technique.`,
    ar: `المزايا المعلنة لـ ${name.ar} يجب أن تستند إلى تجاربكم الميدانية أو مراجع TECHNA. لا نُنشئ أي أرقام من عندنا: تُصادق عليها المصلحة التقنية.`,
    en: `Any benefit claimed for the ${name.en} must rest on your own field trials or on TECHNA references. No figure is invented: to be validated by the technical department.`,
  });

const faqPending = (name: Localized): Pending =>
  pending({
    fr: `FAQ du ${name.fr} à co-écrire avec l'équipe technique : questions réellement posées par les éleveurs au téléphone.`,
    ar: `الأسئلة الشائعة حول ${name.ar} تُكتب بالتعاون مع الفريق التقني: الأسئلة التي يطرحها المربّون فعليًا عبر الهاتف.`,
    en: `FAQ for the ${name.en} to be written with the technical team: the questions breeders actually ask over the phone.`,
  });

/* ── The product interface ───────────────────────────────────────────────── */

export interface Product {
  readonly slug: ProductSlug;
  readonly family: ProductFamily;
  readonly icon: IconKey;
  readonly image: string;
  /** Short label for nav, cards and breadcrumbs. */
  readonly name: Localized;
  /** Expansion shown under the H1, when the short name is an abbreviation. */
  readonly fullName?: Localized;
  /** The "Pour qui ?" block — species / stage. */
  readonly target: Localized;
  /** Definitional one-liner. Safe to publish: it describes, it does not claim. */
  readonly summary: Localized;
  readonly emphasis: Emphasis;
  readonly benefits: Slot<readonly Localized[]>;
  readonly composition: Slot<readonly CompositionRow[]>;
  readonly dosage: Slot<readonly DosageRow[]>;
  readonly usage: Slot<Localized>;
  readonly packaging: Slot<readonly Localized[]>;
  readonly storage: Slot<Localized>;
  /** Path to the PDF in /public/documents, once supplied. */
  readonly technicalSheet: Slot<string>;
  readonly faq: Slot<readonly SpecRow[]>;
  readonly related: readonly ProductSlug[];
}

/* ── Registry ───────────────────────────────────────────────────────────────
 * Display order is intentional: it is also the bento order on the home page. */

export const PRODUCTS: readonly Product[] = [
  {
    slug: 'cmv-poulet-de-chair',
    family: 'cmv',
    icon: 'broiler',
    image: SPECIES_IMAGES.broiler,
    name: { fr: 'CMV Poulet de chair', ar: 'CMV دجاج اللحم', en: 'CMV Broiler' },
    fullName: {
      fr: 'Complément minéral vitaminé pour poulet de chair',
      ar: 'مكمّل معدني وفيتاميني لدجاج اللحم',
      en: 'Mineral and vitamin supplement for broilers',
    },
    target: {
      fr: 'Poulets de chair, du démarrage à la finition.',
      ar: 'دجاج اللحم، من مرحلة الانطلاق إلى التسمين.',
      en: 'Broilers, from starter to finisher.',
    },
    summary: {
      fr: "Prémélange minéral et vitaminé destiné à être incorporé dans l'aliment du poulet de chair.",
      ar: 'مكمّل معدني وفيتاميني يُدمج في علف دجاج اللحم.',
      en: 'Mineral and vitamin premix intended for incorporation into broiler feed.',
    },
    emphasis: 'lead',
    benefits: benefitsPending({
      fr: 'CMV Poulet de chair',
      ar: 'CMV دجاج اللحم',
      en: 'CMV Broiler',
    }),
    composition: compositionPending({
      fr: 'CMV Poulet de chair',
      ar: 'CMV دجاج اللحم',
      en: 'CMV Broiler',
    }),
    dosage: dosagePending({ fr: 'CMV Poulet de chair', ar: 'CMV دجاج اللحم', en: 'CMV Broiler' }),
    usage: usagePending({ fr: 'CMV Poulet de chair', ar: 'CMV دجاج اللحم', en: 'CMV Broiler' }),
    packaging: packagingPending({
      fr: 'CMV Poulet de chair',
      ar: 'CMV دجاج اللحم',
      en: 'CMV Broiler',
    }),
    storage: storagePending({ fr: 'CMV Poulet de chair', ar: 'CMV دجاج اللحم', en: 'CMV Broiler' }),
    technicalSheet: sheetPending({
      fr: 'CMV Poulet de chair',
      ar: 'CMV دجاج اللحم',
      en: 'CMV Broiler',
    }),
    faq: faqPending({ fr: 'CMV Poulet de chair', ar: 'CMV دجاج اللحم', en: 'CMV Broiler' }),
    related: ['cmv-repro', 'poussins-d-un-jour', 'aliments'],
  },
  {
    slug: 'cmv-pondeuse',
    family: 'cmv',
    icon: 'layer',
    image: SPECIES_IMAGES.layer,
    name: { fr: 'CMV Pondeuse', ar: 'CMV الدجاج البيّاض', en: 'CMV Layer' },
    fullName: {
      fr: 'Complément minéral vitaminé pour poule pondeuse',
      ar: 'مكمّل معدني وفيتاميني للدجاج البيّاض',
      en: 'Mineral and vitamin supplement for laying hens',
    },
    target: {
      fr: 'Poules pondeuses en phase de production.',
      ar: 'الدجاج البيّاض في مرحلة الإنتاج.',
      en: 'Laying hens in the production phase.',
    },
    summary: {
      fr: "Prémélange minéral et vitaminé destiné à l'alimentation des poules pondeuses.",
      ar: 'مكمّل معدني وفيتاميني مخصّص لتغذية الدجاج البيّاض.',
      en: 'Mineral and vitamin premix intended for layer feed.',
    },
    emphasis: 'feature',
    benefits: benefitsPending({
      fr: 'CMV Pondeuse',
      ar: 'CMV الدجاج البيّاض',
      en: 'CMV Layer',
    }),
    composition: compositionPending({
      fr: 'CMV Pondeuse',
      ar: 'CMV الدجاج البيّاض',
      en: 'CMV Layer',
    }),
    dosage: dosagePending({ fr: 'CMV Pondeuse', ar: 'CMV الدجاج البيّاض', en: 'CMV Layer' }),
    usage: usagePending({ fr: 'CMV Pondeuse', ar: 'CMV الدجاج البيّاض', en: 'CMV Layer' }),
    packaging: packagingPending({
      fr: 'CMV Pondeuse',
      ar: 'CMV الدجاج البيّاض',
      en: 'CMV Layer',
    }),
    storage: storagePending({ fr: 'CMV Pondeuse', ar: 'CMV الدجاج البيّاض', en: 'CMV Layer' }),
    technicalSheet: sheetPending({
      fr: 'CMV Pondeuse',
      ar: 'CMV الدجاج البيّاض',
      en: 'CMV Layer',
    }),
    faq: faqPending({ fr: 'CMV Pondeuse', ar: 'CMV الدجاج البيّاض', en: 'CMV Layer' }),
    related: ['cmv-repro', 'cmv-dinde', 'aliments'],
  },
  {
    slug: 'cmv-repro',
    family: 'cmv',
    icon: 'breeder',
    image: SPECIES_IMAGES.breeder,
    name: { fr: 'CMV Repro', ar: 'CMV أمهات دجاج اللحم', en: 'CMV Breeder' },
    fullName: {
      fr: 'Complément minéral vitaminé pour reproducteurs de chair',
      ar: 'مكمّل معدني وفيتاميني لأمهات دجاج اللحم',
      en: 'Mineral and vitamin supplement for broiler breeders',
    },
    target: {
      fr: 'Poules reproductrices de chair et coqs.',
      ar: 'أمهات دجاج اللحم والديوك.',
      en: 'Broiler breeder hens and cockerels.',
    },
    summary: {
      fr: "Prémélange minéral et vitaminé destiné à l'alimentation des reproducteurs de chair.",
      ar: 'مكمّل معدني وفيتاميني مخصّص لتغذية أمهات دجاج اللحم.',
      en: 'Mineral and vitamin premix intended for broiler breeder feed.',
    },
    emphasis: 'feature',
    benefits: benefitsPending({
      fr: 'CMV Repro',
      ar: 'CMV أمهات دجاج اللحم',
      en: 'CMV Breeder',
    }),
    composition: compositionPending({
      fr: 'CMV Repro',
      ar: 'CMV أمهات دجاج اللحم',
      en: 'CMV Breeder',
    }),
    dosage: dosagePending({ fr: 'CMV Repro', ar: 'CMV أمهات دجاج اللحم', en: 'CMV Breeder' }),
    usage: usagePending({ fr: 'CMV Repro', ar: 'CMV أمهات دجاج اللحم', en: 'CMV Breeder' }),
    packaging: packagingPending({
      fr: 'CMV Repro',
      ar: 'CMV أمهات دجاج اللحم',
      en: 'CMV Breeder',
    }),
    storage: storagePending({ fr: 'CMV Repro', ar: 'CMV أمهات دجاج اللحم', en: 'CMV Breeder' }),
    technicalSheet: sheetPending({
      fr: 'CMV Repro',
      ar: 'CMV أمهات دجاج اللحم',
      en: 'CMV Breeder',
    }),
    faq: faqPending({ fr: 'CMV Repro', ar: 'CMV أمهات دجاج اللحم', en: 'CMV Breeder' }),
    related: ['cmv-poulet-de-chair', 'poussins-d-un-jour'],
  },
  {
    slug: 'cmv-dinde',
    family: 'cmv',
    icon: 'turkey',
    image: SPECIES_IMAGES.turkey,
    name: { fr: 'CMV Dinde', ar: 'CMV الديك الرومي', en: 'CMV Turkey' },
    fullName: {
      fr: 'Complément minéral vitaminé pour dinde',
      ar: 'مكمّل معدني وفيتاميني للديك الرومي',
      en: 'Mineral and vitamin supplement for turkeys',
    },
    target: {
      fr: 'Dindes de chair.',
      ar: 'الديك الرومي للتسمين.',
      en: 'Meat turkeys.',
    },
    summary: {
      fr: "Prémélange minéral et vitaminé destiné à l'alimentation des dindes.",
      ar: 'مكمّل معدني وفيتاميني مخصّص لتغذية الديك الرومي.',
      en: 'Mineral and vitamin premix intended for turkey feed.',
    },
    emphasis: 'standard',
    benefits: benefitsPending({ fr: 'CMV Dinde', ar: 'CMV الديك الرومي', en: 'CMV Turkey' }),
    composition: compositionPending({ fr: 'CMV Dinde', ar: 'CMV الديك الرومي', en: 'CMV Turkey' }),
    dosage: dosagePending({ fr: 'CMV Dinde', ar: 'CMV الديك الرومي', en: 'CMV Turkey' }),
    usage: usagePending({ fr: 'CMV Dinde', ar: 'CMV الديك الرومي', en: 'CMV Turkey' }),
    packaging: packagingPending({ fr: 'CMV Dinde', ar: 'CMV الديك الرومي', en: 'CMV Turkey' }),
    storage: storagePending({ fr: 'CMV Dinde', ar: 'CMV الديك الرومي', en: 'CMV Turkey' }),
    technicalSheet: sheetPending({ fr: 'CMV Dinde', ar: 'CMV الديك الرومي', en: 'CMV Turkey' }),
    faq: faqPending({ fr: 'CMV Dinde', ar: 'CMV الديك الرومي', en: 'CMV Turkey' }),
    related: ['cmv-poulet-de-chair', 'aliments'],
  },
  {
    slug: 'cmv-bovin-ovin',
    family: 'cmv',
    icon: 'ruminant',
    image: SPECIES_IMAGES.ruminant,
    name: { fr: 'CMV Bovin Ovin', ar: 'CMV الأبقار والأغنام', en: 'CMV Cattle & Sheep' },
    fullName: {
      fr: 'Complément minéral vitaminé pour bovins et ovins',
      ar: 'مكمّل معدني وفيتاميني للأبقار والأغنام',
      en: 'Mineral and vitamin supplement for cattle and sheep',
    },
    target: { fr: 'Bovins et ovins.', ar: 'الأبقار والأغنام.', en: 'Cattle and sheep.' },
    summary: {
      fr: "Prémélange minéral et vitaminé destiné à l'alimentation des ruminants.",
      ar: 'مكمّل معدني وفيتاميني مخصّص لتغذية المجترات.',
      en: 'Mineral and vitamin premix intended for ruminant feed.',
    },
    emphasis: 'standard',
    benefits: benefitsPending({
      fr: 'CMV Bovin Ovin',
      ar: 'CMV الأبقار والأغنام',
      en: 'CMV Cattle & Sheep',
    }),
    composition: compositionPending({
      fr: 'CMV Bovin Ovin',
      ar: 'CMV الأبقار والأغنام',
      en: 'CMV Cattle & Sheep',
    }),
    dosage: dosagePending({
      fr: 'CMV Bovin Ovin',
      ar: 'CMV الأبقار والأغنام',
      en: 'CMV Cattle & Sheep',
    }),
    usage: usagePending({
      fr: 'CMV Bovin Ovin',
      ar: 'CMV الأبقار والأغنام',
      en: 'CMV Cattle & Sheep',
    }),
    packaging: packagingPending({
      fr: 'CMV Bovin Ovin',
      ar: 'CMV الأبقار والأغنام',
      en: 'CMV Cattle & Sheep',
    }),
    storage: storagePending({
      fr: 'CMV Bovin Ovin',
      ar: 'CMV الأبقار والأغنام',
      en: 'CMV Cattle & Sheep',
    }),
    technicalSheet: sheetPending({
      fr: 'CMV Bovin Ovin',
      ar: 'CMV الأبقار والأغنام',
      en: 'CMV Cattle & Sheep',
    }),
    faq: faqPending({
      fr: 'CMV Bovin Ovin',
      ar: 'CMV الأبقار والأغنام',
      en: 'CMV Cattle & Sheep',
    }),
    related: ['cmv-vache-laitiere', 'aliments'],
  },
  {
    slug: 'cmv-vache-laitiere',
    family: 'cmv',
    icon: 'dairy',
    image: SPECIES_IMAGES.dairy,
    name: { fr: 'CMV Vache Laitière', ar: 'CMV الأبقار الحلوب', en: 'CMV Dairy Cow' },
    fullName: {
      fr: 'Complément minéral vitaminé pour vache laitière',
      ar: 'مكمّل معدني وفيتاميني للأبقار الحلوب',
      en: 'Mineral and vitamin supplement for dairy cows',
    },
    target: {
      fr: 'Vaches laitières en lactation.',
      ar: 'الأبقار الحلوب خلال فترة الحلابة.',
      en: 'Dairy cows in lactation.',
    },
    summary: {
      fr: "Prémélange minéral et vitaminé destiné à l'alimentation des vaches laitières.",
      ar: 'مكمّل معدني وفيتاميني مخصّص لتغذية الأبقار الحلوب.',
      en: 'Mineral and vitamin premix intended for dairy cow feed.',
    },
    emphasis: 'standard',
    benefits: benefitsPending({
      fr: 'CMV Vache Laitière',
      ar: 'CMV الأبقار الحلوب',
      en: 'CMV Dairy Cow',
    }),
    composition: compositionPending({
      fr: 'CMV Vache Laitière',
      ar: 'CMV الأبقار الحلوب',
      en: 'CMV Dairy Cow',
    }),
    dosage: dosagePending({
      fr: 'CMV Vache Laitière',
      ar: 'CMV الأبقار الحلوب',
      en: 'CMV Dairy Cow',
    }),
    usage: usagePending({
      fr: 'CMV Vache Laitière',
      ar: 'CMV الأبقار الحلوب',
      en: 'CMV Dairy Cow',
    }),
    packaging: packagingPending({
      fr: 'CMV Vache Laitière',
      ar: 'CMV الأبقار الحلوب',
      en: 'CMV Dairy Cow',
    }),
    storage: storagePending({
      fr: 'CMV Vache Laitière',
      ar: 'CMV الأبقار الحلوب',
      en: 'CMV Dairy Cow',
    }),
    technicalSheet: sheetPending({
      fr: 'CMV Vache Laitière',
      ar: 'CMV الأبقار الحلوب',
      en: 'CMV Dairy Cow',
    }),
    faq: faqPending({
      fr: 'CMV Vache Laitière',
      ar: 'CMV الأبقار الحلوب',
      en: 'CMV Dairy Cow',
    }),
    related: ['cmv-bovin-ovin', 'aliments'],
  },
  {
    slug: 'poussins-d-un-jour',
    family: 'chicks',
    icon: 'chick',
    image: SPECIES_IMAGES.chick,
    name: { fr: "Poussins d'un jour", ar: 'كتاكيت عمر يوم واحد', en: 'Day-old chicks' },
    fullName: {
      fr: "Poussins d'un jour de poulet de chair",
      ar: 'كتاكيت عمر يوم واحد لدجاج اللحم',
      en: 'Day-old broiler chicks',
    },
    target: {
      fr: 'Éleveurs de poulets de chair, bâtiments de démarrage.',
      ar: 'مربّو دجاج اللحم، عنابر الانطلاق.',
      en: 'Broiler farmers, brooding houses.',
    },
    summary: {
      fr: "Production de poussins d'un jour de poulet de chair, avec une capacité de 20 000 000 de poussins par an.",
      ar: 'إنتاج الكتاكيت عمر يوم واحد لدجاج اللحم، بطاقة 20 000 000 كتكوت سنويًا.',
      en: 'Production of day-old broiler chicks, with a capacity of 20,000,000 chicks per year.',
    },
    emphasis: 'feature',
    benefits: benefitsPending({
      fr: "poussin d'un jour",
      ar: 'الكتكوت عمر يوم',
      en: 'day-old chick',
    }),
    composition: pending({
      fr: "Souche et lignée génétiques utilisées au couvoir, poids moyen du poussin à la sortie, taux d'éclosion : données de production internes à publier seulement si le client le souhaite.",
      ar: 'السلالة الوراثية المستعملة في المفقس، الوزن المتوسط للكتكوت عند الخروج، ونسبة الفقس: معطيات إنتاج داخلية لا تُنشر إلا بموافقة المؤسسة.',
      en: 'Genetic strain and line used at the hatchery, average chick weight at pull-out, hatch rate: internal production data, published only if the client wants it published.',
    }),
    dosage: pending({
      fr: "Aucune posologie : il s'agit d'un produit vivant, pas d'un complément. Le champ reste présent pour la cohérence du gabarit de fiche et n'est pas affiché sur cette fiche.",
      ar: 'لا يوجد أي مقدار: هذا منتج حيّ وليس مكمّلًا. يُحفظ الحقل لتماسك قالب البطاقة ولا يُعرض في هذه الصفحة.',
      en: 'No dosage: this is a live product, not a supplement. The field is kept for template consistency and is not displayed on this sheet.',
    }),
    usage: pending({
      fr: "Conduite du démarrage à documenter si le client le souhaite : température d'ambiance, densité, accès eau et aliment, plan de prophylaxie. À valider par le service technique.",
      ar: 'تدبير مرحلة الانطلاق يحتاج توثيقًا إن رغبت المؤسسة: درجة الحرارة، الكثافة، الماء والعلف، والبرنامج الوقائي. يُصادق عليه تقنيًا.',
      en: 'Brooding management to document if the client wishes: house temperature, stocking density, water and feed access, health programme. To be validated by the technical department.',
    }),
    packaging: pending({
      fr: 'Conditionnement de livraison des poussins (caisses, nombre par caisse) et logistique (véhicules, tournées, zones desservies).',
      ar: 'طريقة تسليم الكتاكيت (الصناديق وعدد الكتاكيت فيها) واللوجستيك (المركبات، الدوريات، المناطق المخدومة).',
      en: 'Chick delivery packaging (boxes, chicks per box) and logistics (vehicles, rounds, areas served).',
    }),
    storage: pending({
      fr: "Ce produit ne se stocke pas : conditions de transport du couvoir jusqu'à l'élevage à documenter.",
      ar: 'هذا المنتج لا يُخزَّن: شروط النقل من المفقس إلى المربّى تحتاج توثيقًا.',
      en: 'This product is not stored: transport conditions from hatchery to farm are to be documented.',
    }),
    technicalSheet: sheetPending({
      fr: "poussin d'un jour",
      ar: 'الكتكوت عمر يوم',
      en: 'day-old chick',
    }),
    faq: faqPending({ fr: "poussin d'un jour", ar: 'الكتكوت عمر يوم', en: 'day-old chick' }),
    related: ['cmv-poulet-de-chair', 'aliments'],
  },
  {
    slug: 'aliments',
    family: 'feed',
    icon: 'pellet',
    image: SPECIES_IMAGES.pellet,
    name: { fr: 'Aliments', ar: 'الأعلاف', en: 'Feed' },
    fullName: { fr: "Fabrication d'aliments", ar: 'صناعة الأعلاف', en: 'Feed manufacturing' },
    target: {
      fr: 'Éleveurs de volailles et de ruminants.',
      ar: 'مربّو الدواجن والمجترات.',
      en: 'Poultry and ruminant farmers.',
    },
    summary: {
      fr: "Fabrication d'aliments pour les filières animales, activité historique de VOLAGRO depuis 1998.",
      ar: 'صناعة الأعلاف للشُّعب الحيوية، نشاط فولاغرو التاريخي منذ 1998.',
      en: 'Feed manufacturing for animal production sectors — VOLAGRO generation-long activity since 1998.',
    },
    emphasis: 'standard',
    benefits: benefitsPending({ fr: 'aliment VOLAGRO', ar: 'علف فولاغرو', en: 'VOLAGRO feed' }),
    composition: pending({
      fr: 'Gamme exacte des aliments fabriqués (espèces, stades, formules, présentation farine ou granulé) et matières premières utilisées : à confirmer par le service technique avant publication.',
      ar: 'القائمة الدقيقة للأعلاف المصنّعة (الأنواع، المراحل، التركيبات، شكل العلف دقيق أم مكبّب) والمواد الأولية المستعملة: تنتظر تأكيد المصلحة التقنية قبل النشر.',
      en: 'Exact range of feed manufactured (species, stages, formulas, mash or pellet form) and the raw materials used: to be confirmed by the technical department before publication.',
    }),
    dosage: pending({
      fr: "Plans d'alimentation par espèce et par stade (quantités journalières, programmes lumineux associés).",
      ar: 'مخطّطات التغذية حسب النوع والمرحلة (الكميات اليومية والبرامج الضوئية المرافقة).',
      en: 'Feeding programmes by species and stage (daily quantities, associated lighting programmes).',
    }),
    usage: pending({
      fr: "Recommandations de conduite alimentaire et transitions entre aliments à documenter avec l'équipe technique.",
      ar: 'توصيات التدبير الغذائي والانتقال بين الأعلاف تُوثَّق مع الفريق التقني.',
      en: 'Feeding-management recommendations and transitions between feeds to be documented with the technical team.',
    }),
    packaging: packagingPending({ fr: 'aliment', ar: 'العلف', en: 'VOLAGRO feed' }),
    storage: storagePending({ fr: 'aliment', ar: 'العلف', en: 'VOLAGRO feed' }),
    technicalSheet: sheetPending({ fr: 'aliment', ar: 'العلف', en: 'VOLAGRO feed' }),
    faq: faqPending({ fr: 'aliment', ar: 'العلف', en: 'VOLAGRO feed' }),
    related: ['cmv-poulet-de-chair', 'poussins-d-un-jour'],
  },
];

/* ── Typed lookups & guards ──────────────────────────────────────────────── */

export const PRODUCT_SLUGS: readonly ProductSlug[] = PRODUCTS.map((p) => p.slug);

export const PRODUCT_BY_SLUG: Readonly<Record<ProductSlug, Product>> = PRODUCTS.reduce(
  (acc, product) => {
    acc[product.slug] = product;
    return acc;
  },
  {} as Record<ProductSlug, Product>,
);

export const isProductSlug = (value: string): value is ProductSlug =>
  Object.prototype.hasOwnProperty.call(PRODUCT_BY_SLUG, value);

export const productPath = (slug: ProductSlug): string => `/produits/${slug}`;

export const productsByFamily = (family: ProductFamily): readonly Product[] =>
  PRODUCTS.filter((product) => product.family === family);

export const cmvProducts = (): readonly Product[] => productsByFamily('cmv');

/* ── The document request we hand back to the client ─────────────────────────
 * Every `pending` slot in the registry, flattened into a checklist. Built at
 * module load from the data itself, so it can never fall out of sync with what
 * the pages actually render as placeholders. */

export interface SpecRequest {
  readonly product: ProductSlug;
  readonly field: keyof Product;
  readonly reason: Localized;
}

export const SPEC_REQUEST_LIST: readonly SpecRequest[] = PRODUCTS.flatMap((product) => {
  const fields = [
    'benefits',
    'composition',
    'dosage',
    'usage',
    'packaging',
    'storage',
    'technicalSheet',
    'faq',
  ] as const;
  return fields.flatMap((field) => {
    const slot = product[field] as Slot<unknown>;
    return slot.status === 'pending'
      ? [{ product: product.slug, field: field as keyof Product, reason: slot.reason }]
      : [];
  });
});
