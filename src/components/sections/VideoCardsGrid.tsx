'use client';

import { useState } from 'react';
import type { Locale } from '@/lib/i18n/config';

export interface MediaVideoItem {
  readonly id: string;
  readonly src: string;
  readonly title: { fr: string; ar: string; en: string };
  readonly description: { fr: string; ar: string; en: string };
  readonly targetAnimal: { fr: string; ar: string; en: string };
  readonly badge: { fr: string; ar: string; en: string };
  readonly tagColor: string;
}

export const VOLAGRO_VIDEOS: readonly MediaVideoItem[] = [
  {
    id: 'v_institutionnel',
    src: '/videos/video_volagro_6.mp4',
    title: {
      fr: 'Présentation Institutionnelle : Fondée en 1998, Capacité 20M & Équipements',
      ar: 'العرض التعريفي الشامل: التأسيس سنة 1998، طاقة 20 مليون وتجهيزات المزارع',
      en: 'Institutional Presentation: Founded 1998, 20M Capacity & Equipment',
    },
    description: {
      fr: 'Découvrez l’histoire de SARL VOLAGRO, entreprise familiale leader en nutrition animale, produisant 20 millions de poussins/an, avec 150 000 reproducteurs chair, 40 000 en dinde et sa filiale dédiée aux équipements d’élevage.',
      ar: 'تعرف على تاريخ فولاغرو، المؤسسة العائلية الرائدة في التغذية الحيوانية، بطاقة 20 مليون كتكوت سنوياً، 150 ألف أمهات دجاج، 40 ألف ديك رومي وفرعها المتخصص في عتاد التربية.',
      en: 'Discover the story of SARL VOLAGRO, leader in animal nutrition producing 20 million chicks annually with 150,000 broiler breeders and poultry equipment subsidiary.',
    },
    targetAnimal: {
      fr: 'Filière Intégrée & Équipements',
      ar: 'الشعبة المتكاملة والعتاد',
      en: 'Integrated Poultry & Equipment',
    },
    badge: {
      fr: 'Édition Spéciale — Histoire & Usine',
      ar: 'إصدار خاص — التاريخ والمنشآت',
      en: 'Special Feature — Story & Facility',
    },
    tagColor: 'border-red-500/30 bg-red-50 text-red-700',
  },
  {
    id: 'v_poulet_chair',
    src: '/videos/video_volagro_2.mp4',
    title: {
      fr: 'Le CMV : Élément Indispensable pour la Santé et la Productivité des Poulets de Chair',
      ar: 'الـ CMV : عنصر لا غنى عنه لصحة وإنتاجية دجاج التسمين (Chair)',
      en: 'CMV: Essential Element for Broiler Health and Productivity',
    },
    description: {
      fr: 'L’élevage de poulets de chair fournit une source majeure de protéines. Le CMV (Complément Minéral et Vitaminique) de VOLAGRO garantit une croissance osseuse solide, une rentabilité maximale et une valorisation génétique supérieure.',
      ar: 'تربية دجاج التسمين قطاع اقتصادي حيوي. يوفر مكمل CMV فولاغرو الفيتامينات والمعادن الأساسية لتحقيق أعلى معدل تحويل غذائي وصحة مثالية للقطيع.',
      en: 'Broiler farming provides vital animal proteins. VOLAGRO CMV premixes guarantee solid bone development, enhanced feed conversion, and maximized profitability.',
    },
    targetAnimal: {
      fr: 'Poulet de Chair',
      ar: 'دجاج التسمين',
      en: 'Broiler Chickens',
    },
    badge: {
      fr: 'Aviculture Chair',
      ar: 'تربية التسمين',
      en: 'Broiler Farming',
    },
    tagColor: 'border-amber-500/30 bg-amber-50 text-amber-800',
  },
  {
    id: 'v_vache_laitiere',
    src: '/videos/video_volagro_5.mp4',
    title: {
      fr: 'Le CMV dans l’Alimentation des Vaches Laitières : Qualité et Quantité de Lait',
      ar: 'دور الـ CMV في تغذية الأبقار الحلوب: تعزيز كمية وجودة الحليب',
      en: 'CMV in Dairy Cow Nutrition: Boosting Milk Yield and Quality',
    },
    description: {
      fr: 'Crucial pour prévenir les troubles de reproduction et la baisse d’immunité chez la vache laitière. Le CMV VOLAGRO enrichit les rations alimentaires en oligo-éléments et vitamines indispensables à une lactation abondante et saine.',
      ar: 'حاسم للوقاية من اضطرابات الخصوبة وضعف المناعة لدى الأبقار. يضمن مكمل CMV تعويض النقص في الأعلاف الطبيعية لإنتاج وفير لحليب ذي جودة عالية.',
      en: 'Vital for preventing reproduction disorders and immune drops. VOLAGRO CMV ensures dairy cows receive all required minerals for optimal milk yield.',
    },
    targetAnimal: {
      fr: 'Bovins Laitiers',
      ar: 'الأبقار الحلوب',
      en: 'Dairy Cattle',
    },
    badge: {
      fr: 'Élevage Bovin',
      ar: 'تربية الأبقار',
      en: 'Cattle Farming',
    },
    tagColor: 'border-blue-500/30 bg-blue-50 text-blue-800',
  },
  {
    id: 'v_caprins',
    src: '/videos/video_volagro_1.mp4',
    title: {
      fr: 'Le CMV : Facteur Clé pour la Santé et la Productivité des Caprins',
      ar: 'الـ CMV : عنصر أساسي لصحة وإنتاجية الماعز (Caprins)',
      en: 'CMV: Key Factor for Goat Health and Productivity',
    },
    description: {
      fr: 'Pour garantir la durabilité de l’élevage caprin (lait, viande et fromage), le CMV VOLAGRO apporte l’équilibre nutritionnel indispensable pour résister aux carences et stimuler la fertilité.',
      ar: 'لضمان مردودية تربية الماعز وإنتاج الحليب والجبن. يؤمن مكمل CMV توازناً غذائياً فعالاً يحمي من نقص المعادن ويدعم صحة القطيع.',
      en: 'Supporting goat farming productivity (milk and cheese). VOLAGRO CMV provides comprehensive trace minerals to stimulate fertility and resist deficiencies.',
    },
    targetAnimal: {
      fr: 'Caprins (Chèvres)',
      ar: 'الماعز',
      en: 'Goats',
    },
    badge: {
      fr: 'Filière Caprine',
      ar: 'تربية الماعز',
      en: 'Goat Breeding',
    },
    tagColor: 'border-emerald-500/30 bg-emerald-50 text-emerald-800',
  },
  {
    id: 'v_ovins',
    src: '/videos/video_volagro_4.mp4',
    title: {
      fr: 'Le CMV : Solution Nutritionnelle pour la Santé et la Productivité des Ovins',
      ar: 'الـ CMV : الحل الغذائي لصحة ومردودية الأغنام (Ovins)',
      en: 'CMV: Nutritional Solution for Sheep Health and Productivity',
    },
    description: {
      fr: 'L’élevage ovin est au cœur des traditions pastorales en Algérie. Le CMV évite les carences alimentaires en période de gestation et assure une excellente conformation d’engraissement.',
      ar: 'تربية الأغنام ركيزة أساسية للإنتاج الحيواني الوطني. يساهم CMV في تحسين وزن الخراف وحماية النعاج أثناء فترات الحمل والتسمين.',
      en: 'Sheep breeding is central to pastoral heritage. VOLAGRO CMV prevents dietary gaps during gestation and optimizes fattening performance.',
    },
    targetAnimal: {
      fr: 'Ovins (Moutons & Agneaux)',
      ar: 'الأغنام والخراف',
      en: 'Sheep & Lambs',
    },
    badge: {
      fr: 'Filière Ovine',
      ar: 'تربية الأغنام',
      en: 'Sheep Breeding',
    },
    tagColor: 'border-amber-600/30 bg-amber-50 text-amber-900',
  },
  {
    id: 'v_chevaux',
    src: '/videos/video_volagro_3.mp4',
    title: {
      fr: 'Le CMV Équin : Vital pour la Robustesse, l’Énergie et la Santé des Chevaux',
      ar: 'الـ CMV للخيول: ضروري لقوة البنية، الطاقة والنشاط لدى الأحصنة',
      en: 'Equine CMV: Vital for Horse Stamina, Energy, and Muscular Health',
    },
    description: {
      fr: 'L’élevage de chevaux requiert une nutrition de précision. Le CMV équin VOLAGRO renforce le squelette, protège les articulations et apporte l’énergie nécessaire aux chevaux de loisir et de compétition.',
      ar: 'تتطلب تربية الخيول دقة غذائية فائقة. يعمل مكمل CMV على تقوية العظام، حماية المفاصل وإمداد الخيول بالطاقة اللازمة لمختلف الأنشطة والسباقات.',
      en: 'Equine breeding demands precision nutrition. VOLAGRO Equine CMV fortifies bone density and joint protection for sports and recreation horses.',
    },
    targetAnimal: {
      fr: 'Équins (Chevaux)',
      ar: 'الخيول والأحصنة',
      en: 'Equine / Horses',
    },
    badge: {
      fr: 'Nutrition Équine',
      ar: 'تغذية الخيول',
      en: 'Equine Nutrition',
    },
    tagColor: 'border-purple-500/30 bg-purple-50 text-purple-900',
  },
];

export const VideoCardsGrid = ({ locale }: { readonly locale: Locale }) => {
  const [fullscreenVideo, setFullscreenVideo] = useState<MediaVideoItem | null>(null);

  const institutionalVideo: MediaVideoItem =
    VOLAGRO_VIDEOS.find((v) => v.id === 'v_institutionnel') ?? (VOLAGRO_VIDEOS[0] as MediaVideoItem);
  const technicalVideos = VOLAGRO_VIDEOS.filter((v) => v.id !== 'v_institutionnel');

  return (
    <div className="mt-8 space-y-12">
      {/* ── 1. Grande Vidéo Institutionnelle / Présentation Centrale ─────── */}
      <section className="relative overflow-hidden rounded-none border-2 border-red-600 bg-surface p-6 sm:p-8 lg:p-10 shadow-lg">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line/80 pb-4">
          <div className="flex items-center gap-2">
            <span className="border-s-2 border-red-600 ps-2.5 text-xs font-bold uppercase tracking-wider text-red-600">
              {locale === 'ar'
                ? 'الفيديو التعريفي الرئيسي للمؤسسة'
                : locale === 'en'
                  ? 'Main Corporate Presentation Video'
                  : 'Vidéo Principale de Présentation'}
            </span>
            <span className="text-xs font-semibold text-ink-subtle">
              • SARL VOLAGRO (1998 – 2026)
            </span>
          </div>
          <button
            type="button"
            onClick={() => setFullscreenVideo(institutionalVideo)}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 hover:text-red-700 hover:underline"
          >
            {locale === 'ar'
              ? 'عرض على كامل الشاشة'
              : locale === 'en'
                ? 'Watch Fullscreen'
                : 'Visionner en plein écran'} &rarr;
          </button>
        </div>

        <div className="mt-6 space-y-6">
          {/* Lecteur Vidéo Grand Format avec Taille d'Origine Complète (object-contain, zéro recadrage) */}
          <div className="relative w-full overflow-hidden rounded-none bg-black shadow-2xl flex items-center justify-center">
            <video
              controls
              playsInline
              preload="metadata"
              className="w-full max-h-[75vh] object-contain"
            >
              <source src={institutionalVideo.src} type="video/mp4" />
            </video>
          </div>

          {/* Fiche descriptive institutionnelle */}
          <div className="grid gap-6 md:grid-cols-12 md:items-center border-t border-line/60 pt-5">
            <div className="md:col-span-8">
              <span className="inline-block border-s-2 border-red-600 ps-2 text-[0.6875rem] font-bold uppercase tracking-widest text-red-700">
                {institutionalVideo.badge[locale]}
              </span>
              <h4 className="mt-2 font-display text-xl sm:text-2xl font-bold leading-snug text-ink">
                {institutionalVideo.title[locale]}
              </h4>
              <p className="mt-2.5 text-sm leading-relaxed text-ink-muted">
                {institutionalVideo.description[locale]}
              </p>
            </div>

            <div className="md:col-span-4 space-y-2.5 border-t border-line/60 pt-4 md:border-t-0 md:border-s md:ps-6 md:pt-0">
              <div className="flex items-center justify-between text-xs font-semibold text-ink-subtle">
                <span>
                  {locale === 'ar'
                    ? 'القدرة الإنتاجية :'
                    : locale === 'en'
                      ? 'Production Capacity:'
                      : 'Capacité :'}
                </span>
                <span className="font-mono text-ink font-bold">20 000 000 / an</span>
              </div>
              <div className="flex items-center justify-between text-xs font-semibold text-ink-subtle">
                <span>
                  {locale === 'ar'
                    ? 'الشريك التقني :'
                    : locale === 'en'
                      ? 'Technical Partner:'
                      : 'Partenaire technique :'}
                </span>
                <span className="font-mono text-ink font-bold">TECHNA France</span>
              </div>
              <div className="flex items-center justify-between text-xs font-semibold text-ink-subtle">
                <span>
                  {locale === 'ar'
                    ? 'سنة التأسيس :'
                    : locale === 'en'
                      ? 'Founded:'
                      : 'Fondation :'}
                </span>
                <span className="font-mono text-ink font-bold">1998</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Dossiers Thématiques : Affichage direct sans overlay agrandir ── */}
      <section>
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-3">
          <div>
            <span className="border-s-2 border-red-600 ps-2.5 text-xs font-bold uppercase tracking-wider text-red-600">
              {locale === 'ar'
                ? 'ملفات الـ CMV حسب الشعبة'
                : locale === 'en'
                  ? 'CMV Dossiers by Species'
                  : 'Dossiers CMV par Espèce'}
            </span>
            <h4 className="font-display text-xl font-bold text-ink mt-1">
              {locale === 'ar'
                ? 'فيديوهات وتغطيات التغذية الحيوانية المتخصصة'
                : locale === 'en'
                  ? 'Technical Videos & Animal Nutrition Solutions'
                  : 'Vidéos thématiques & Solutions de nutrition'}
            </h4>
          </div>
          <span className="text-xs text-ink-subtle font-mono">
            {technicalVideos.length}{' '}
            {locale === 'ar'
              ? 'فيديوهات متخصصة'
              : locale === 'en'
                ? 'specialized videos'
                : 'vidéos thématiques'}
          </span>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {technicalVideos.map((vid) => (
            <article
              key={vid.id}
              className="group flex flex-col justify-between overflow-hidden rounded-none border border-line bg-surface p-5 shadow-xs transition-all duration-300 hover:border-red-400 hover:shadow-md"
            >
              <div>
                {/* Lecteur vidéo autonome jouable directement sur place */}
                <div className="relative aspect-video w-full overflow-hidden rounded-none bg-black">
                  <video
                    controls
                    playsInline
                    preload="metadata"
                    className="h-full w-full object-contain"
                  >
                    <source src={vid.src} type="video/mp4" />
                  </video>
                </div>

                <div className="mt-3.5">
                  <div className="flex items-center gap-2">
                    <span className="border-s-2 border-red-600 ps-1.5 text-[0.65rem] font-bold uppercase tracking-wider text-red-700">
                      {vid.badge[locale]}
                    </span>
                    <span className="text-xs font-semibold text-ink-subtle">
                      {vid.targetAnimal[locale]}
                    </span>
                  </div>
                  <h4 className="font-display text-base font-bold text-ink mt-2 leading-snug group-hover:text-red-700 transition-colors">
                    {vid.title[locale]}
                  </h4>
                  <p className="mt-2 text-xs leading-relaxed text-ink-muted line-clamp-3">
                    {vid.description[locale]}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-line/60 pt-3">
                <span className="font-mono text-[0.65rem] font-semibold text-ink-subtle uppercase">
                  SARL VOLAGRO • NUTRITION
                </span>
                <button
                  type="button"
                  onClick={() => setFullscreenVideo(vid)}
                  className="inline-flex items-center gap-1 text-xs font-bold text-red-600 hover:text-red-700 hover:underline"
                >
                  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                    />
                  </svg>
                  <span>
                    {locale === 'ar'
                      ? 'ملء الشاشة'
                      : locale === 'en'
                        ? 'Fullscreen'
                        : 'Plein écran'}
                  </span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── Modal / Lightbox Fullscreen ─────────────────────────────────── */}
      {fullscreenVideo ? (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[120] flex items-center justify-center bg-charcoal-950/90 p-4 backdrop-blur-md"
        >
          <div className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-white/20 bg-charcoal-900 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-3 text-cream">
              <span className="font-display text-sm font-bold text-red-400">
                {fullscreenVideo.badge[locale]}
              </span>
              <button
                type="button"
                onClick={() => setFullscreenVideo(null)}
                className="rounded-lg p-1 text-cream/70 hover:bg-white/10 hover:text-white"
                aria-label="Fermer"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="aspect-video w-full bg-black">
              <video
                autoPlay
                controls
                playsInline
                className="h-full w-full object-contain"
                src={fullscreenVideo.src}
              />
            </div>

            <div className="p-5 text-cream">
              <h3 className="font-display text-lg font-bold text-white">
                {fullscreenVideo.title[locale]}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-cream/80">
                {fullscreenVideo.description[locale]}
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
