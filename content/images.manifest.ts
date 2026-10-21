/* ============================================================================
 * IMAGE MANIFEST — slot → file → alt(fr/ar/en) → fallback
 * ----------------------------------------------------------------------------
 * Components never reference a file path directly: they ask for a SLOT by name
 * and get back everything needed to render it, including the branded placeholder
 * when the file is not there yet.
 *
 * PROVENANCE IS ENFORCED HERE, not in a review document:
 *   kind 'real'      — the client's own photograph. Never generated, ever.
 *   kind 'generated' — abstract texture / illustration. Allowed for backgrounds,
 *                      textures and species art; NEVER for people, facilities,
 *                      TECHNA, certificates or anything presented as proof.
 *
 * The legacy photographs below were recovered from screenshots of the old site
 * (`npm run images:legacy`) because the client's originals were not supplied.
 * They are low-resolution, and their captions were read off that gallery, so each
 * carries a `confidence` flag for the client to confirm before launch.
 * ========================================================================= */

import { ready, type AspectRatio, type ImageKind, type Localized } from './types';

export type PhotoCategory = 'unites' | 'evenements' | 'equipes' | 'salons';

export interface ManifestEntry {
  /** Stable key components ask for. */
  readonly id: string;
  readonly kind: ImageKind;
  /** Path under public/, or null → the branded placeholder renders instead. */
  readonly file: string | null;
  readonly webp: string | null;
  readonly alt: Localized;
  /** Caption shown in the gallery lightbox; may be identical to alt. */
  readonly caption: Localized;
  readonly category?: PhotoCategory;
  readonly width: number | null;
  readonly height: number | null;
  readonly ratio: AspectRatio;
  /**
   * How sure we are that the caption describes what is actually in the frame.
   * `high` = obvious from the source. `medium` = inferred, please confirm.
   */
  readonly confidence: 'high' | 'medium';
  /** Present for `generated` assets only: what produced it. */
  readonly provenance?: string;
}

const r = (width: number, height: number): AspectRatio => `${width} / ${height}`;

/* ── Legacy photographs (real, recovered, low-resolution) ─────────────────── */

interface LegacySeed {
  readonly n: string;
  readonly width: number;
  readonly height: number;
  readonly category: PhotoCategory;
  readonly confidence: 'high' | 'medium';
  readonly alt: Localized;
}

const LEGACY_SEEDS: readonly LegacySeed[] = [
  {
    n: '01',
    width: 330,
    height: 283,
    category: 'salons',
    confidence: 'high',
    alt: {
      fr: "Les équipes de VOLAGRO et TECHNA lors du salon SIPSA, tenu à Alger en 2024.",
      ar: 'فريقا فولاغرو وتيكنا (TECHNA) خلال صالون سيبسا 2024 المنعقد بالجزائر العاصمة.',
      en: 'The VOLAGRO and TECHNA teams at the SIPSA 2024 exhibition held in Algiers.',
    },
  },
  {
    n: '02',
    width: 377,
    height: 283,
    category: 'evenements',
    confidence: 'high',
    alt: {
      fr: "L'équipe VOLAGRO devant le siège de TECHNA France en compagnie des spécialistes TECHNA.",
      ar: 'فريق فولاغرو أمام مقر تيكنا (TECHNA) بفرنسا برفقة أخصائيي تيكنا.',
      en: 'The VOLAGRO team outside TECHNA France headquarters accompanied by TECHNA specialists.',
    },
  },
  {
    n: '03',
    width: 377,
    height: 283,
    category: 'evenements',
    confidence: 'medium',
    alt: {
      fr: "Remise des prix lors d'une conférence professionnelle dédiée à la santé animale à l'Hôtel Bayazid (Sétif).",
      ar: 'تسليم الجوائز خلال ملتقى مهني مخصص للصحة الحيوانية بفندق بايزيد (سطيف).',
      en: 'Award presentation at a professional conference dedicated to animal health at the Bayazid Hotel (Setif).',
    },
  },
  {
    n: '04',
    width: 378,
    height: 283,
    category: 'evenements',
    confidence: 'high',
    alt: {
      fr: "Journée technique : participation de techniciens et éleveurs à la conférence.",
      ar: 'يوم تقني: مشاركة التقنيين والمربّين في المؤتمر.',
      en: 'Technical day: participation of technicians and breeders in the conference.',
    },
  },
  {
    n: '05',
    width: 330,
    height: 283,
    category: 'equipes',
    confidence: 'medium',
    alt: {
      fr: "Une équipe de VOLAGRO dans les bureaux de TECHNA France pour le renforcement des connaissances techniques en nutrition animale.",
      ar: 'فريق من فولاغرو في مكاتب تيكنا (TECHNA) بفرنسا لتطوير المعارف والخبرات التقنية في التغذية الحيوانية.',
      en: 'A VOLAGRO team at the TECHNA France offices to enhance technical expertise in animal nutrition.',
    },
  },
  {
    n: '06',
    width: 377,
    height: 503,
    category: 'salons',
    confidence: 'high',
    alt: {
      fr: "L'équipe de VOLAGRO au salon SIPSA (édition 2025).",
      ar: 'فريق فولاغرو في صالون سيبسا (طبعة 2025).',
      en: 'The VOLAGRO team at the SIPSA 2025 exhibition.',
    },
  },
  {
    n: '07',
    width: 377,
    height: 283,
    category: 'equipes',
    confidence: 'medium',
    alt: {
      fr: "L'équipe VOLAGRO - TECHNA au niveau de l'unité de production PREMIX de Tala Athmane (Tizi Ouzou) -1-",
      ar: 'فريق فولاغرو - تيكنا في وحدة إنتاج بريميكس بتالة عثمان (تيزي وزو) -1-',
      en: 'The VOLAGRO - TECHNA team at the PREMIX production unit in Tala Athmane (Tizi Ouzou) -1-',
    },
  },
  {
    n: '08',
    width: 378,
    height: 283,
    category: 'equipes',
    confidence: 'medium',
    alt: {
      fr: "L'équipe VOLAGRO - TECHNA au niveau de l'unité de production PREMIX de Tala Athmane (Tizi Ouzou) -2-",
      ar: 'فريق فولاغرو - تيكنا في وحدة إنتاج بريميكس بتالة عثمان (تيزي وزو) -2-',
      en: 'The VOLAGRO - TECHNA team at the PREMIX production unit in Tala Athmane (Tizi Ouzou) -2-',
    },
  },
  {
    n: '09',
    width: 330,
    height: 284,
    category: 'unites',
    confidence: 'medium',
    alt: {
      fr: "L'entrée de l'unité de production PREMIX à Tala Athmane.",
      ar: 'مدخل وحدة إنتاج بريميكس بتالة عثمان.',
      en: 'The entrance to the PREMIX production unit in Tala Athmane.',
    },
  },
  {
    n: '10',
    width: 377,
    height: 284,
    category: 'unites',
    confidence: 'medium',
    alt: {
      fr: "En face, bâtiment administratif de l'unité de production PREMIX à Tala Athmane.",
      ar: 'من الأمام، المبنى الإداري لوحدة إنتاج بريميكس بتالة عثمان.',
      en: 'Front view, administrative building of the PREMIX production unit in Tala Athmane.',
    },
  },
  {
    n: '11',
    width: 377,
    height: 284,
    category: 'unites',
    confidence: 'medium',
    alt: {
      fr: "L'entrée de l'unité de production PREMIX à Tala Athmane.",
      ar: 'مدخل وحدة إنتاج بريميكس بتالة عثمان.',
      en: 'The entrance to the PREMIX production unit in Tala Athmane.',
    },
  },
  {
    n: '12',
    width: 800,
    height: 600,
    category: 'evenements',
    confidence: 'high',
    alt: {
      fr: "Colloque International des Ruminants (France, 21-22 mai 2025) — L'équipe VOLAGRO en session plénière et échanges techniques (Photo 1/5).",
      ar: 'الملتقى الدولي للحيوانات المجترة (فرنسا، 21-22 ماي 2025) — وفد فولاڨرو في الجلسات التكوينية وتبادل الخبرات (صورة 1/5).',
      en: 'International Ruminant Symposium (France, May 21-22, 2025) — VOLAGRO delegation during technical sessions (Photo 1/5).',
    },
  },
  {
    n: '13',
    width: 590,
    height: 443,
    category: 'evenements',
    confidence: 'high',
    alt: {
      fr: "Colloque International des Ruminants (France, 21-22 mai 2025) — Présentation des avancées en nutrition et zootechnie (Photo 2/5).",
      ar: 'الملتقى الدولي للحيوانات المجترة (فرنسا، 21-22 ماي 2025) — عرض المستجدات العلمية في التغذية وتربية الماشية (صورة 2/5).',
      en: 'International Ruminant Symposium (France, May 21-22, 2025) — Advances in ruminant nutrition and zootechnics (Photo 2/5).',
    },
  },
  {
    n: '14',
    width: 590,
    height: 443,
    category: 'evenements',
    confidence: 'high',
    alt: {
      fr: "Colloque International des Ruminants (France, 21-22 mai 2025) — Ateliers pratiques et transfert de compétences technologiques (Photo 3/5).",
      ar: 'الملتقى الدولي للحيوانات المجترة (فرنسا، 21-22 ماي 2025) — ورشات تطبيقية ونقل للمهارات التكنولوجية (صورة 3/5).',
      en: 'International Ruminant Symposium (France, May 21-22, 2025) — Practical workshops and technology transfer (Photo 3/5).',
    },
  },
  {
    n: '15',
    width: 590,
    height: 443,
    category: 'evenements',
    confidence: 'high',
    alt: {
      fr: "Colloque International des Ruminants (France, 21-22 mai 2025) — Rencontres et synergies avec les partenaires et experts internationaux (Photo 4/5).",
      ar: 'الملتقى الدولي للحيوانات المجترة (فرنسا، 21-22 ماي 2025) — لقاءات وشراكات مع الخبراء الدوليين (صورة 4/5).',
      en: 'International Ruminant Symposium (France, May 21-22, 2025) — Networking with international experts and partners (Photo 4/5).',
    },
  },
  {
    n: '16',
    width: 590,
    height: 443,
    category: 'evenements',
    confidence: 'high',
    alt: {
      fr: "Colloque International des Ruminants (France, 21-22 mai 2025) — Clôture des travaux et consolidation du savoir-faire VOLAGRO (Photo 5/5).",
      ar: 'الملتقى الدولي للحيوانات المجترة (فرنسا، 21-22 ماي 2025) — اختتام الأشغال وتثبيت مكتسبات فولاڨرو الميدانية (صورة 5/5).',
      en: 'International Ruminant Symposium (France, May 21-22, 2025) — Concluding sessions and consolidating technical know-how (Photo 5/5).',
    },
  },
  {
    n: '17',
    width: 800,
    height: 600,
    category: 'salons',
    confidence: 'high',
    alt: {
      fr: "Clôture du Salon International SIPSA 2025 — Échanges avec les partenaires professionnels, clients et fournisseurs sur le stand VOLAGRO (Photo 1/5).",
      ar: 'إختتام الصالون الدولي للزراعة والإنتاج الحيواني SIPSA 2025 — لقاءات مثمرة مع الشركاء المهنيين والزبائن والممولين (صورة 1/5).',
      en: 'Closing of the SIPSA 2025 International Exhibition — Meetings with professional partners, clients, and suppliers at the VOLAGRO booth (Photo 1/5).',
    },
  },
  {
    n: '18',
    width: 443,
    height: 590,
    category: 'salons',
    confidence: 'high',
    alt: {
      fr: "Salon SIPSA 2025 — Rencontres techniques et conseils personnalisés pour les éleveurs (Photo 2/5).",
      ar: 'صالون SIPSA 2025 — تقديم الاستشارات الفنية والحلول الغذائية المخصصة للمربين (صورة 2/5).',
      en: 'SIPSA 2025 Exhibition — Technical advisory and tailored nutritional guidance for farmers (Photo 2/5).',
    },
  },
  {
    n: '19',
    width: 590,
    height: 443,
    category: 'salons',
    confidence: 'high',
    alt: {
      fr: "Salon SIPSA 2025 — Présentation des gammes de CMV et des performances d'élevage (Photo 3/5).",
      ar: 'صالون SIPSA 2025 — عرض تشكيلات مكملات الـ CMV ونتائج تحسين أداء القطعان (صورة 3/5).',
      en: 'SIPSA 2025 Exhibition — Presentation of CMV premix lines and livestock performance results (Photo 3/5).',
    },
  },
  {
    n: '20',
    width: 590,
    height: 443,
    category: 'salons',
    confidence: 'high',
    alt: {
      fr: "Salon SIPSA 2025 — Concertation et partenariats avec les acteurs de la filière avicole et bovine (Photo 4/5).",
      ar: 'صالون SIPSA 2025 — تعزيز الروابط والشراكات الاستراتيجية مع فاعلي شعبة الدواجن والمجترات (صورة 4/5).',
      en: 'SIPSA 2025 Exhibition — Strategic partnerships with poultry and livestock sector stakeholders (Photo 4/5).',
    },
  },
  {
    n: '21',
    width: 443,
    height: 590,
    category: 'salons',
    confidence: 'high',
    alt: {
      fr: "Salon SIPSA 2025 — L'équipe commerciale et technique VOLAGRO mobilisée au service de la filière (Photo 5/5).",
      ar: 'صالون SIPSA 2025 — فريق فولاڨرو التجاري والتقني مجنّد لخدمة ترقية الإنتاج الوطني (صورة 5/5).',
      en: 'SIPSA 2025 Exhibition — VOLAGRO technical and commercial team dedicated to agricultural excellence (Photo 5/5).',
    },
  },
  {
    n: '22',
    width: 1000,
    height: 563,
    category: 'evenements',
    confidence: 'high',
    alt: {
      fr: "Visite au siège du Groupe TECHNA (Nantes, France) & Salon SPACE de Rennes — Réunion bilatérale au sommet (Photo 1/5).",
      ar: 'زيارة مقر مجمع تيكنا (نانت، فرنسا) بمناسبة صالون SPACE بمدينة رين — اجتماع ثنائي رفيع المستوى (صورة 1/5).',
      en: 'Visit to TECHNA Group HQ (Nantes, France) & SPACE Rennes Exhibition — High-level bilateral summit (Photo 1/5).',
    },
  },
  {
    n: '23',
    width: 590,
    height: 332,
    category: 'evenements',
    confidence: 'high',
    alt: {
      fr: "Visite TECHNA France — Rencontre entre dirigeants et experts en nutrition de précision (Photo 2/5).",
      ar: 'زيارة تيكنا فرنسا — لقاء القيادات وخبراء التغذية الدقيقة الحيوانية (صورة 2/5).',
      en: 'TECHNA France Visit — Leadership and precision animal nutrition specialists meeting (Photo 2/5).',
    },
  },
  {
    n: '24',
    width: 332,
    height: 590,
    category: 'evenements',
    confidence: 'high',
    alt: {
      fr: "Siège de TECHNA à Nantes — Échanges approfondis sur les programmes CMV et innovations zootechniques (Photo 3/5).",
      ar: 'مقر تيكنا بنانت — مباحثات معمقة حول برامج مكملات الـ CMV والابتكار البيطري (صورة 3/5).',
      en: 'TECHNA HQ in Nantes — In-depth discussions on CMV premix programs and zootechnical innovations (Photo 3/5).',
    },
  },
  {
    n: '25',
    width: 590,
    height: 332,
    category: 'evenements',
    confidence: 'high',
    alt: {
      fr: "Délégation VOLAGRO au Salon International SPACE (Rennes) — Découverte des dernières technologies d'élevage (Photo 4/5).",
      ar: 'وفد فولاڨرو بالصالون الدولي للإنتاج الحيواني SPACE (رين) — استكشاف أحدث تكنولوجيات تربية الماشية والدواجن (صورة 4/5).',
      en: 'VOLAGRO delegation at SPACE International Livestock Expo (Rennes) — Exploring cutting-edge farming tech (Photo 4/5).',
    },
  },
  {
    n: '26',
    width: 590,
    height: 332,
    category: 'evenements',
    confidence: 'high',
    alt: {
      fr: "Partenariat VOLAGRO & TECHNA — Photo souvenir scellant la coopération continue et le transfert de savoir-faire (Photo 5/5).",
      ar: 'شراكة فولاڨرو وتيكنا — صورة تذكارية تجسد التعاون المستمر ونقل الخبرات الدولية للجزائر (صورة 5/5).',
      en: 'VOLAGRO & TECHNA Partnership — Commemorative photo cementing ongoing cooperation and know-how transfer (Photo 5/5).',
    },
  },
  {
    n: '27',
    width: 1024,
    height: 576,
    category: 'evenements',
    confidence: 'high',
    alt: {
      fr: "Salon National SEVAGRO (Bouira) — Stand VOLAGRO & équipe d'experts avec les partenaires (Photo 1/5).",
      ar: 'الصالون الوطني للمقاولاتية الخضراء SEVAGRO (البويرة) — جناح فولاڨرو ولقاء الشركاء والخبراء (صورة 1/5).',
      en: 'SEVAGRO National Expo (Bouira) — VOLAGRO booth and expert team with partners (Photo 1/5).',
    },
  },
  {
    n: '28',
    width: 1024,
    height: 768,
    category: 'evenements',
    confidence: 'high',
    alt: {
      fr: "Salon National SEVAGRO (Bouira) — Échanges conviviaux et consultations techniques avec les professionnels (Photo 2/5).",
      ar: 'الصالون الوطني للمقاولاتية الخضراء SEVAGRO (البويرة) — جلسات تشاور تقنية ونقاشات مثمرة مع المهنيين (صورة 2/5).',
      en: 'SEVAGRO National Expo (Bouira) — Technical consultations and discussions with industry professionals (Photo 2/5).',
    },
  },
  {
    n: '29',
    width: 1024,
    height: 768,
    category: 'evenements',
    confidence: 'high',
    alt: {
      fr: "Salon National SEVAGRO (Bouira) — Vue d'ensemble du stand d'exposition VOLAGRO (Photo 3/5).",
      ar: 'الصالون الوطني للمقاولاتية الخضراء SEVAGRO (البويرة) — نظرة شاملة على جناح عرض فولاڨرو واستقبال الزوار (صورة 3/5).',
      en: 'SEVAGRO National Expo (Bouira) — Overview of the VOLAGRO exhibition booth welcoming visitors (Photo 3/5).',
    },
  },
  {
    n: '30',
    width: 1024,
    height: 576,
    category: 'evenements',
    confidence: 'high',
    alt: {
      fr: "Salon National SEVAGRO (Bouira) — Présentation des échantillons de premix et CMV en flacons vitrés (Photo 4/5).",
      ar: 'الصالون الوطني للمقاولاتية الخضراء SEVAGRO (البويرة) — عرض عينات مكملات الـ CMV والبريميكس للزبائن (صورة 4/5).',
      en: 'SEVAGRO National Expo (Bouira) — Display of premix and CMV sample bottles for visitors (Photo 4/5).',
    },
  },
  {
    n: '31',
    width: 1024,
    height: 768,
    category: 'evenements',
    confidence: 'high',
    alt: {
      fr: "Salon National SEVAGRO (Bouira) — Rencontre des éleveurs et acteurs agricoles locaux (Photo 5/5).",
      ar: 'الصالون الوطني للمقاولاتية الخضراء SEVAGRO (البويرة) — لقاء وتكريم الفلاحين والمربين المحليين (صورة 5/5).',
      en: 'SEVAGRO National Expo (Bouira) — Engaging with local farmers and agricultural leaders (Photo 5/5).',
    },
  },
  {
    n: '32',
    width: 800,
    height: 600,
    category: 'evenements',
    confidence: 'high',
    alt: {
      fr: "Salon International SIPSA 2026 — L'équipe SARL VOLAGRO et ses partenaires au stand officiel (Photo 1/3).",
      ar: 'الصالون الدولي للإنتاج الحيواني SIPSA 2026 — فريق شركة فولاڨرو والشركاء في الجناح الرسمي (صورة 1/3).',
      en: 'SIPSA 2026 International Livestock Expo — SARL VOLAGRO team and partners at the official stand (Photo 1/3).',
    },
  },
  {
    n: '33',
    width: 590,
    height: 443,
    category: 'evenements',
    confidence: 'high',
    alt: {
      fr: "Salon International SIPSA 2026 — Accueil des visiteurs et échanges devant l'espace d'exposition SAFEX (Photo 2/3).",
      ar: 'الصالون الدولي للإنتاج الحيواني SIPSA 2026 — استقبال الزوار والوفود أمام فضاء العرض بقصر المعارض (صورة 2/3).',
      en: 'SIPSA 2026 International Livestock Expo — Welcoming visitors and delegations at SAFEX exhibition space (Photo 2/3).',
    },
  },
  {
    n: '34',
    width: 590,
    height: 443,
    category: 'evenements',
    confidence: 'high',
    alt: {
      fr: "Salon International SIPSA 2026 — Clôture et photo d'ensemble de la délégation d'experts (Photo 3/3).",
      ar: 'الصالون الدولي للإنتاج الحيواني SIPSA 2026 — صورة جماعية للوفد والخبراء بمناسبة فعاليات الصالون (صورة 3/3).',
      en: 'SIPSA 2026 International Livestock Expo — Group photo of the expert delegation commemorating the event (Photo 3/3).',
    },
  },
];

const LEGACY_PHOTOS: readonly ManifestEntry[] = LEGACY_SEEDS.map((seed) => ({
  id: `photo.legacy.${seed.n}`,
  kind: 'real' as const,
  file: `/images/real/legacy-${seed.n}.jpg`,
  webp: `/images/real/legacy-${seed.n}.webp`,
  alt: seed.alt,
  caption: seed.alt,
  category: seed.category,
  width: seed.width,
  height: seed.height,
  ratio: r(seed.width, seed.height),
  confidence: seed.confidence,
}));

/* ── Brand artwork ─────────────────────────────────────────────────────────── */

const BRAND: readonly ManifestEntry[] = [
  {
    id: 'brand.lockup',
    kind: 'real',
    file: '/images/logo/volagro-lockup.png',
    webp: null,
    alt: {
      fr: 'VOLAGRO, expertise TECHNA.',
      ar: 'فولاغرو، بخبرة TECHNA.',
      en: 'VOLAGRO, TECHNA expertise.',
    },
    caption: {
      fr: 'Logo VOLAGRO',
      ar: 'شعار فولاغرو',
      en: 'VOLAGRO logo',
    },
    width: 197,
    height: 40,
    ratio: r(197, 40),
    confidence: 'high',
  },
  {
    id: 'brand.emblem',
    kind: 'real',
    file: '/images/logo/volagro-emblem.png',
    webp: null,
    alt: {
      fr: 'Emblème VOLAGRO : feuilles et crête.',
      ar: 'شعار فولاغرو: ورقتان وعُرف.',
      en: 'The VOLAGRO emblem: leaves and crest.',
    },
    caption: {
      fr: 'Emblème',
      ar: 'الشعار',
      en: 'Emblem',
    },
    width: 150,
    height: 178,
    ratio: r(150, 178),
    confidence: 'high',
  },
  {
    id: 'brand.animals',
    kind: 'real',
    file: '/images/logo/volagro-animaux.png',
    webp: null,
    alt: {
      fr: "Les espèces accompagnées par VOLAGRO : bovin, volaille, poisson, lapin et œufs.",
      ar: 'الأنواع التي ترافقها فولاغرو: الأبقار، الدواجن، الأسماك، الأرانب والبيض.',
      en: 'The species VOLAGRO serves: cattle, poultry, fish, rabbit and eggs.',
    },
    caption: {
      fr: 'Les filières accompagnées',
      ar: 'الشعب المرافَقة',
      en: 'The sectors we serve',
    },
    width: 583,
    height: 467,
    ratio: r(583, 467),
    confidence: 'high',
  },
];

/* ── Generated / abstract assets ───────────────────────────────────────────────
 * Backgrounds and textures only. Registered here with `kind: 'generated'` so the
 * rule is auditable rather than remembered, and logged in docs/ASSET_LICENSES.md.
 * `file: null` means the hero currently draws its field with CSS + SVG; dropping
 * the real golden-hour photograph in later needs no code change. */

const GENERATED: readonly ManifestEntry[] = [
  {
    id: 'hero.field',
    kind: 'generated',
    file: '/images/generated/hero-field.jpg',
    webp: null,
    alt: {
      fr: "Champ de blé à l'heure dorée avec les installations d'un élevage moderne à l'horizon.",
      ar: 'حقل قمح في الساعة الذهبية مع منشآت تربية حديثة في الأفق.',
      en: 'A wheat field at golden hour with a modern poultry farm on the horizon.',
    },
    caption: {
      fr: 'Le champ et l’élevage',
      ar: 'الحقل والمربّى',
      en: 'Field and farm',
    },
    width: null,
    height: null,
    ratio: '21 / 9',
    confidence: 'high',
    provenance: 'pending — see docs/IMAGE_PROMPTS.md #1 (hero.field)',
  },
  {
    id: 'texture.wheat',
    kind: 'generated',
    file: null,
    webp: null,
    alt: {
      fr: "Texture de grains de blé en gros plan.",
      ar: 'ملمس حبوب القمح عن قرب.',
      en: 'A close-up texture of wheat grain.',
    },
    caption: {
      fr: 'Grain',
      ar: 'الحبوب',
      en: 'Grain',
    },
    width: null,
    height: null,
    ratio: '16 / 9',
    confidence: 'high',
    provenance: 'pending — see docs/IMAGE_PROMPTS.md #2 (texture.wheat)',
  },
];

/* ── Registry & lookup ───────────────────────────────────────────────────── */

export const IMAGES: readonly ManifestEntry[] = [...BRAND, ...LEGACY_PHOTOS, ...GENERATED];

export const IMAGE_BY_ID: ReadonlyMap<string, ManifestEntry> = new Map(
  IMAGES.map((entry) => [entry.id, entry]),
);

export const GALLERY_PHOTOS: readonly ManifestEntry[] = LEGACY_PHOTOS;

export const photosByCategory = (category: PhotoCategory): readonly ManifestEntry[] =>
  LEGACY_PHOTOS.filter((photo) => photo.category === category);

export const CATEGORY_ORDER: readonly PhotoCategory[] = [
  'unites',
  'evenements',
  'salons',
  'equipes',
];

/**
 * The launch checklist for imagery. Derived, never hand-written — it reports
 * exactly what is still a placeholder and therefore cannot silently ship.
 */
export const MISSING_ASSETS: readonly ManifestEntry[] = IMAGES.filter(
  (entry) => entry.file === null,
);

/** Photos whose caption was inferred rather than confirmed. */
export const CAPTIONS_TO_REVIEW: readonly ManifestEntry[] = IMAGES.filter(
  (entry) => entry.confidence === 'medium',
);

/** Convenience wrapper so callers cannot forget the `ready()` narrowing. */
export const imageSlot = (id: string) => ready(IMAGE_BY_ID.get(id) ?? null);
