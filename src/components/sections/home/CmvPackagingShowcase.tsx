'use client';

import Image from 'next/image';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

import { pick } from '@content/types';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal, RevealItem } from '@/components/motion/Reveal';
import { Glyph } from '@/components/icons/Glyph';
import type { Locale } from '@/lib/i18n/config';

interface PackagingItem {
  readonly id: string;
  readonly image: string;
  readonly title: { fr: string; ar: string; en: string };
  readonly subtitle: { fr: string; ar: string; en: string };
  readonly description: { fr: string; ar: string; en: string };
  readonly specs: readonly { fr: string; ar: string; en: string }[];
}

const PACKAGING_ITEMS: readonly PackagingItem[] = [
  {
    id: 'sack-open',
    image: '/images/products/cmv-sack-open.jpg',
    title: {
      fr: 'Sac 25 kg — Granulométrie & Homogénéité',
      ar: 'كيس 25 كغ — تجانس ونعومة الحبيبات',
      en: '25 kg Sack — Granulometry & Homogeneity',
    },
    subtitle: {
      fr: 'Micro-granulés et poudre fine enrichie en vitamines & oligo-éléments',
      ar: 'حبيبات دقيقة ومسحوق غني بالفيتامينات والمعادن النادرة',
      en: 'Fine micro-granules enriched with vitamins & trace elements',
    },
    description: {
      fr: 'Formulation nutritionnelle de précision conçue pour une dispersibilité optimale dans les rations complètes. L’ouverture facile et le papier kraft multi-parois garantissent zéro altération des vitamines sensibles.',
      ar: 'تركيبة غذائية دقيقة تضمن انتشارًا وتجانسًا مثاليين في الأعلاف المركبة. أكياس الكرافت متعددة الطبقات تحمي الفيتامينات الحساسة من الأكسدة والرطوبة.',
      en: 'Precision nutritional formula engineered for optimal dispersibility in complete feeds. Multi-wall kraft paper protects sensitive vitamins against moisture and oxidation.',
    },
    specs: [
      { fr: 'Poids net standard : 25 kg', ar: 'الوزن الصافي القياسي: 25 كغ', en: 'Standard net weight: 25 kg' },
      { fr: 'Dosage de précision au gramme', ar: 'معايرة دقيقة بالغرام', en: 'Gram-accurate formulation' },
      { fr: 'Barrière anti-humidité étanche', ar: 'عازل متطور ضد الرطوبة', en: 'Moisture-proof inner barrier' },
    ],
  },
  {
    id: 'sacks-pallet',
    image: '/images/products/cmv-sacks-pallet.jpg',
    title: {
      fr: 'Palettisation & Stockage Industriel',
      ar: 'توضيب وتخزين صناعي محكم',
      en: 'Palletization & Industrial Storage',
    },
    subtitle: {
      fr: 'Unité moderne d’ensachage de 5 000 tonnes par an',
      ar: 'وحدة تعبئة حديثة بطاقة 5000 طن سنويًا',
      en: 'Modern 5,000 tonnes/year automated bagging unit',
    },
    description: {
      fr: 'Chaque palette est filmée sous housse étanche dès la sortie des lignes d’ensachage automatisées de notre usine de Tizi-Ouzou, garantissant une conservation exemplaire et une traçabilité lot par lot.',
      ar: 'تُغلَّف كل شحنة بأغشية عازلة محكمة فور خروجها من خطوط التعبئة الآلية بمصنعنا في تيزي وزو، مما يضمن حفظًا مثاليًا وتتبعًا دقيقًا لكل دفعة إنتاج.',
      en: 'Every pallet is shrink-wrapped immediately off our automated bagging line in Tizi-Ouzou, ensuring shelf-life integrity and lot-by-lot batch traceability.',
    },
    specs: [
      { fr: 'Capacité : 5 000 t/an', ar: 'الطاقة: 5000 طن/سنة', en: 'Capacity: 5,000 t/year' },
      { fr: 'Numéro de lot & DLUO imprimés', ar: 'رقم الدفعة وتاريخ الصلاحية', en: 'Batch number & expiry printed' },
      { fr: 'Expédition sur toutes les wilayas', ar: 'توصيل عبر كافة الولايات', en: 'Distribution across all wilayas' },
    ],
  },
  {
    id: 'sacks-lineup',
    image: '/images/products/cmv-lineup.jpg',
    title: {
      fr: 'Code Couleur & Clarté Zootechnique',
      ar: 'ترميز لوني ووضوح بيطري دقيق',
      en: 'Color-Coded Zootechnical Packaging',
    },
    subtitle: {
      fr: 'Sacs identifiables instantanément par espèce et stade d’élevage',
      ar: 'أكياس واضحة المعالم لكل صنف ومرحلة تربية',
      en: 'Instantly identifiable sacks by animal species and farming phase',
    },
    description: {
      fr: 'Des emballages clairs et didactiques : vert pour le poulet de chair, bordeaux pour la pondeuse, blanc-bordeaux pour le ruminant. Cette distinction visuelle prévient toute erreur d’incorporation en élevage.',
      ar: 'تصميم مميز وواضح: الأخضر لدجاج اللحم، العنابي للدجاج البيّاض، والأبيض المدمج للمجترات والمواشي. هذا التمييز يمنع أي خلط أثناء تحضير الأعلاف بالمزارع.',
      en: 'Distinct visual color-coding: green for broilers, burgundy for layers, dual-tone for ruminants. This clear visual distinction prevents any on-farm feeding mixing mistakes.',
    },
    specs: [
      { fr: 'Poulet de chair, Pondeuse, Ruminant', ar: 'دجاج لحم، بياض، مجترات', en: 'Broiler, Layer, Ruminant' },
      { fr: 'Recommandations d’incorporation', ar: 'إرشادات الاستعمال ونسب الخلط', en: 'Feeding inclusion guidance' },
      { fr: 'Formulations sous licence TECHNA', ar: 'تركيبات معتمدة من TECHNA', en: 'Formulated with TECHNA advisory' },
    ],
  },
];

export const CmvPackagingShowcase = ({ locale }: { readonly locale: Locale }) => {
  const [activeImage, setActiveImage] = useState<string | null>(null);

  const labels = {
    eyebrow: {
      fr: 'CONDITIONNEMENT & ENSACHAGE',
      ar: 'التعبئة والتغليف المعتمد',
      en: 'PACKAGING & BAGGING',
    },
    title: {
      fr: 'Le CMV dans son emballage de haute protection',
      ar: 'مكمّلات الـ CMV في أكياسها القياسية عالية الحماية',
      en: 'CMV Premixes in High-Protection Packaging',
    },
    lead: {
      fr: 'Découvrez la présentation authentique de nos prémélanges minéraux et vitaminés : sacs étanches de 25 kg conçus pour préserver la fraîcheur des oligo-éléments et des vitamines jusqu’à la mangeoire.',
      ar: 'اكتشف الشكل الحقيقي لمكمّلاتنا المعدنية والفيتامينية: أكياس متينة 25 كغ مصممة لحفظ الفيتامينات والمعادن النادرة من الرطوبة والتلف حتى وصولها للأعلاف.',
      en: 'Discover the authentic packaging of our mineral and vitamin premixes: heavy-duty 25 kg bags engineered to preserve active micronutrient potency from production to feeding.',
    },
    clickToZoom: {
      fr: 'Cliquer pour agrandir',
      ar: 'انقر للتكبير',
      en: 'Click to enlarge',
    },
    close: {
      fr: 'Fermer',
      ar: 'إغلاق',
      en: 'Close',
    },
  };

  return (
    <section className="shell section" aria-labelledby="packaging-title">
      <SectionHeading
        eyebrow={pick(labels.eyebrow, locale)}
        title={pick(labels.title, locale)}
        lead={pick(labels.lead, locale)}
        locale={locale}
        id="packaging-title"
      />

      <Reveal
        stagger={0.08}
        amount={0.15}
        className="mt-12 grid gap-8 lg:grid-cols-3"
      >
        {PACKAGING_ITEMS.map((item) => (
          <RevealItem key={item.id} as="article">
            <div className="bg-surface rounded-2xl border border-line/80 group flex h-full flex-col overflow-hidden p-5 sm:p-6 shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-red-500/40">
              {/* Image banner with interactive click-to-zoom */}
              <div
                role="button"
                tabIndex={0}
                onClick={() => setActiveImage(item.image)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveImage(item.image);
                  }
                }}
                className="relative aspect-4/3 w-full cursor-zoom-in overflow-hidden rounded-md bg-charcoal-900 focus-visible:outline-2 focus-visible:outline-green-600"
                aria-label={`${pick(item.title, locale)} — ${pick(labels.clickToZoom, locale)}`}
              >
                <Image
                  src={item.image}
                  alt={pick(item.title, locale)}
                  fill
                  loading="lazy"
                  decoding="async"
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
                  className="img-zoom object-cover will-change-transform"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/70 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-40" />


                <span className="absolute bottom-3 end-3 inline-flex items-center gap-1 rounded-sm bg-charcoal-900/80 px-2 py-0.5 text-[10px] font-medium text-cream/90 backdrop-blur-xs opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  <Glyph name="pin" size={12} className="text-green-400" />
                  {pick(labels.clickToZoom, locale)}
                </span>
              </div>

              {/* Text content */}
              <div className="flex flex-1 flex-col pt-5">
                <h3 className="font-display text-d4 text-ink transition-colors group-hover:text-accent">
                  {pick(item.title, locale)}
                </h3>

                <p className="text-green-700 font-medium text-xs mt-1">
                  {pick(item.subtitle, locale)}
                </p>

                <p className="text-ink-muted text-xs sm:text-sm mt-3 leading-relaxed">
                  {pick(item.description, locale)}
                </p>

                {/* Micro specs chips */}
                <div className="mt-auto pt-5 border-t border-line/60">
                  <ul className="space-y-1.5">
                    {item.specs.map((spec, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-[11px] sm:text-xs text-ink-subtle">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-600 shrink-0" />
                        <span>{pick(spec, locale)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </RevealItem>
        ))}
      </Reveal>

      {/* Lightbox Zoom Modal */}
      <AnimatePresence>
        {activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-90 flex items-center justify-center bg-charcoal-950/85 p-4 backdrop-blur-sm"
            onClick={() => setActiveImage(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-h-[90vh] max-w-4xl overflow-hidden rounded-card bg-surface shadow-2xl border border-line"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-4/3 w-[85vw] max-w-3xl sm:aspect-16/10">
                <Image
                  src={activeImage}
                  alt="Packaging CMV VOLAGRO 25 kg"
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              <div className="flex items-center justify-between border-t border-line bg-surface p-4">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-green-600" />
                  <span className="text-xs font-semibold text-ink">
                    SARL VOLAGRO — Conditionnement officiel en sacs de 25 kg
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveImage(null)}
                  className="rounded-xs bg-charcoal-800 px-3.5 py-1.5 text-xs font-semibold text-cream hover:bg-charcoal-900 transition-colors"
                >
                  {pick(labels.close, locale)}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
