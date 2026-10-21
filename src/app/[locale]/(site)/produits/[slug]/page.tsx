import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import {
  PRODUCT_BY_SLUG,
  PRODUCT_SLUGS,
  isProductSlug,
  type ProductSlug,
} from '@content/products';
import { WHATSAPP_TARGET } from '@content/contacts';
import { pick } from '@content/types';
import { Glyph } from '@/components/icons/Glyph';
import { whatsappHref } from '@/lib/contact-links';
import { LOCALES, isLocale } from '@/lib/i18n/config';
import { Link } from '@/lib/i18n/navigation';

export function generateStaticParams(): { locale: string; slug: string }[] {
  return LOCALES.flatMap((locale) =>
    PRODUCT_SLUGS.map((slug) => ({
      locale,
      slug,
    })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale) || !isProductSlug(slug)) return {};

  const product = PRODUCT_BY_SLUG[slug];
  const name = pick(product.name, locale);

  return {
    title: `${name} — SARL VOLAGRO`,
    description: pick(product.summary, locale),
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale) || !isProductSlug(slug)) notFound();

  const product = PRODUCT_BY_SLUG[slug];
  const relatedProducts = product.related
    .map((relSlug) => PRODUCT_BY_SLUG[relSlug as ProductSlug])
    .filter(Boolean);

  const labels = {
    back: { fr: 'Tous les produits', ar: 'كل المنتجات', en: 'All products' },
    targetTitle: { fr: 'Animaux et stade cible', ar: 'الحيوانات والمرحلة المستهدفة', en: 'Target Animals & Stage' },
    summaryTitle: { fr: 'Description zootechnique', ar: 'الوصف الفني والعلمي', en: 'Zootechnical Description' },
    orderCta: { fr: 'Commander / Demander un devis via WhatsApp', ar: 'طلب تسعيرة أو حجز عبر واتساب', en: 'Order / Request Quote via WhatsApp' },
    specsTitle: { fr: 'Spécifications techniques', ar: 'الخصائص والمواصفات', en: 'Technical Specifications' },
    composition: { fr: 'Composition nutritionnelle', ar: 'التركيبة الغذائية', en: 'Nutritional Composition' },
    dosage: { fr: 'Taux d’incorporation & dosage', ar: 'نسبة الاستعمال والجرعة', en: 'Inclusion Rate & Dosage' },
    packaging: { fr: 'Conditionnement & emballage', ar: 'التعبئة والتغليف', en: 'Packaging & Form' },
    storage: { fr: 'Conseils de conservation', ar: 'شروط التخزين والحفظ', en: 'Storage Conditions' },
    relatedTitle: { fr: 'Produits et filières complémentaires', ar: 'منتجات وشعب مكمّلة', en: 'Complementary Products' },
    noticePending: {
      fr: 'Fiche détaillée en cours d’actualisation par nos ingénieurs agronomes.',
      ar: 'البطاقة الفنية قيد التحيين المستمر من قِبل مهندسينا الزراعيين.',
      en: 'Detailed technical sheet currently being updated by our agricultural engineers.',
    },
  };

  return (
    <div className="py-10 md:py-16">
      <div className="shell">
        {/* ── Breadcrumb ───────────────────────────────────────────────────── */}
        <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-xs text-ink-subtle">
          <Link href="/" className="hover:text-green-700 transition">
            {pick({ fr: 'Accueil', ar: 'الرئيسية', en: 'Home' }, locale)}
          </Link>
          <span>/</span>
          <Link href="/produits" className="hover:text-green-700 transition">
            {pick(labels.back, locale)}
          </Link>
          <span>/</span>
          <span className="text-ink font-semibold">{pick(product.name, locale)}</span>
        </nav>

        {/* ── Product Header Block ─────────────────────────────────────────── */}
        <div className="border-line bg-surface rounded-card grid gap-8 border p-6 md:p-10 lg:grid-cols-12 shadow-xs">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-4">
              <div className="relative h-16 w-16 sm:h-20 sm:w-20 shrink-0 overflow-hidden rounded-xl border border-line shadow-xs bg-cream-warm">
                <Image
                  src={product.image}
                  alt={pick(product.name, locale)}
                  fill
                  className="object-cover"
                  sizes="80px"
                  priority
                />
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-green-700">
                  Filière {product.family.toUpperCase()}
                </span>
                <h1 className="font-display text-d2 text-ink mt-0.5">
                  {pick(product.name, locale)}
                </h1>
              </div>
            </div>

            {product.fullName ? (
              <p className="font-display text-d4 text-ink-muted mt-5">
                {pick(product.fullName, locale)}
              </p>
            ) : null}

            <div className="mt-6 border-s-2 border-green-600 ps-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-subtle">
                {pick(labels.targetTitle, locale)}
              </p>
              <p className="text-ink mt-1 font-medium">
                {pick(product.target, locale)}
              </p>
            </div>

            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-subtle">
                {pick(labels.summaryTitle, locale)}
              </p>
              <p className="text-ink-muted mt-1.5 text-base leading-relaxed">
                {pick(product.summary, locale)}
              </p>
            </div>
          </div>

          {/* Quick order card / Internal consumption notice */}
          <div className="bg-surface-sunken rounded-none border-line flex flex-col justify-between border p-6 lg:col-span-4 card-interactive">
            {product.slug === 'aliments' ? (
              <div>
                <div className="flex items-center justify-between">
                  <span className="inline-block border-s-2 border-amber-600 ps-2 text-xs font-bold uppercase tracking-wider text-amber-800">
                    {locale === 'ar' ? 'استخدام داخلي حصري' : 'Usage interne exclusif'}
                  </span>
                  <span className="bg-amber-100 text-amber-900 px-2 py-0.5 text-[10px] font-bold">
                    {locale === 'ar' ? 'غير مخصص للبيع' : 'Non commercialisé'}
                  </span>
                </div>

                <p className="font-display text-d4 text-ink mt-4 font-bold">
                  {locale === 'ar' ? 'إنتاج مخصص للاستهلاك الذاتي' : 'Production dédiée à nos élevages'}
                </p>
                <p className="text-ink-muted mt-2 text-xs leading-relaxed">
                  {locale === 'ar'
                    ? 'هذا المنتوج مصنّع خصيصاً لتغطية الاحتياجات الغذائية الداخلية لمزارع ومحطات تربية فولاغرو، ولا يخضع للطلبات التجارية الخارجية.'
                    : 'Les aliments fabriqués par notre unité industrielle sont exclusivement réservés à l’autoconsommation et aux besoins nutritionnels de nos propres élevages intégrés.'}
                </p>

                <div className="mt-6 border-s-2 border-green-600 bg-surface p-4 border-t border-e border-b border-line">
                  <p className="text-xs font-semibold text-ink leading-relaxed">
                    {locale === 'ar'
                      ? 'لطلب مكمّلات الـ CMV المخصصة لتحضير أعلافكم، يُرجى الاطلاع على تشكيلة Prémélanges CMV.'
                      : 'Pour composer vos propres aliments à la ferme, découvrez notre gamme de Prémélanges CMV formulés avec TECHNA.'}
                  </p>
                  <Link
                    href="/produits"
                    className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-red-600 hover:text-red-700 hover:underline"
                  >
                    {locale === 'ar' ? 'استكشاف مكملات CMV المتاحة' : 'Voir les CMV disponibles'} &rarr;
                  </Link>
                </div>
              </div>
            ) : (
              <>
                <div>
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-green-700">
                      <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-ping" />
                      Commande & Disponibilité
                    </span>
                    {product.family === 'cmv' && (
                      <span className="rounded-none bg-green-100 text-green-800 px-2 py-0.5 text-[10px] font-bold">
                        Sac 25 kg
                      </span>
                    )}
                  </div>

                  {product.family === 'cmv' && (
                    <div className="relative mt-3 aspect-4/3 w-full overflow-hidden rounded-none border border-line bg-charcoal-900 group">
                      <Image
                        src="/images/products/cmv-sack-open.jpg"
                        alt={`${pick(product.name, locale)} — Conditionnement sac 25 kg`}
                        fill
                        sizes="(min-width: 1024px) 25vw, 90vw"
                        className="img-zoom object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/70 via-transparent to-transparent opacity-50" />
                      <span className="absolute bottom-2 start-2 text-[10px] font-semibold text-cream bg-charcoal-900/80 px-2 py-0.5 rounded-none backdrop-blur-xs">
                        VOLAGRO CMV · 25 kg
                      </span>
                    </div>
                  )}

                  <p className="font-display text-d4 text-ink mt-3">
                    Approvisionnement régulier
                  </p>
                  <p className="text-ink-muted mt-1 text-xs leading-relaxed">
                    Produit formulé dans notre unité industrielle à Tala Athmane (Tizi-Ouzou) en partenariat avec TECHNA.
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-line">
                  <a
                    href={whatsappHref(WHATSAPP_TARGET, {
                      message: `Bonjour VOLAGRO, je souhaite obtenir les tarifs et disponibilités pour : ${pick(product.name, locale)}.`,
                    })}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-700 hover:bg-green-800 text-white inline-flex w-full items-center justify-center gap-2 rounded-none py-3 text-xs font-semibold transition-all shadow-xs hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <Glyph name="whatsapp" size={17} />
                    <span>{pick(labels.orderCta, locale)}</span>
                  </a>
                </div>
              </>
            )}
          </div>
        </div>

        {/* ── Technical specs list ─────────────────────────────────────────── */}
        <div className="mt-12">
          <div className="border-s-2 border-green-700 ps-3 mb-6">
            <h2 className="font-display text-d3 text-ink">
              {pick(labels.specsTitle, locale)}
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="bg-surface rounded-none border-line border p-6 card-interactive">
              <h3 className="font-display text-d4 text-ink border-s-2 border-green-600 ps-2.5">
                {pick(labels.composition, locale)}
              </h3>
              <p className="text-ink-muted mt-3 text-sm leading-relaxed">
                {product.composition.status === 'ready'
                  ? JSON.stringify(product.composition.value)
                  : pick(product.composition.reason, locale)}
              </p>
            </div>

            <div className="bg-surface rounded-none border-line border p-6 card-interactive">
              <h3 className="font-display text-d4 text-ink border-s-2 border-green-600 ps-2.5">
                {pick(labels.dosage, locale)}
              </h3>
              <p className="text-ink-muted mt-3 text-sm leading-relaxed">
                {product.dosage.status === 'ready'
                  ? JSON.stringify(product.dosage.value)
                  : pick(product.dosage.reason, locale)}
              </p>
            </div>

            <div className="bg-surface rounded-none border-line border p-6 card-interactive">
              <h3 className="font-display text-d4 text-ink border-s-2 border-green-600 ps-2.5">
                {pick(labels.packaging, locale)}
              </h3>
              {product.family === 'cmv' ? (
                <div className="mt-3 text-sm text-ink-muted space-y-2">
                  <p className="leading-relaxed">
                    {pick({
                      fr: "Sac kraft multi-couches renforcé de 25 kg avec doublure polypropylène étanche anti-humidité. Palettisation standard sous housse étanche (40 sacs / palette soit 1 000 kg). Big Bags de 1 000 kg disponibles pour unités industrielles.",
                      ar: "أكياس كرافت مقواة متعددة الطبقات سعة 25 كغ مزودة بعازل بولي بروبيلين محكم ضد الرطوبة. توضيب قياسي على منصات مشمعة (40 كيسًا / منصة = 1 طن). تتوفر أكياس كبرى (Big Bags) سعة 1000 كغ للمصانع.",
                      en: "Heavy-duty 25 kg multi-wall kraft paper sack with moisture-proof inner poly liner. Standard palletized shrink-wrapped load of 40 bags (1,000 kg). 1,000 kg Big Bags available for industrial feed mills.",
                    }, locale)}
                  </p>
                  <div className="inline-flex items-center gap-2 rounded-xs bg-green-50 px-2.5 py-1 text-xs font-medium text-green-800 border border-green-200">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-600" />
                    {pick({
                      fr: "Conditionnement garanti 100% étanche usine Tala Athmane",
                      ar: "تعبئة أصلية ومضمونة من مصنع تالة عثمان",
                      en: "100% factory-sealed at Tala Athmane plant",
                    }, locale)}
                  </div>
                </div>
              ) : (
                <p className="text-ink-muted mt-3 text-sm leading-relaxed">
                  {product.packaging.status === 'ready'
                    ? JSON.stringify(product.packaging.value)
                    : pick(product.packaging.reason, locale)}
                </p>
              )}
            </div>

            <div className="bg-surface rounded-card border-line border p-6">
              <h3 className="font-display text-d4 text-ink flex items-center gap-2">
                <Glyph name="pin" size={16} className="text-green-600" />
                <span>{pick(labels.storage, locale)}</span>
              </h3>
              <p className="text-ink-muted mt-3 text-sm leading-relaxed">
                {product.storage.status === 'ready'
                  ? pick(product.storage.value, locale)
                  : pick(product.storage.reason, locale)}
              </p>
            </div>
          </div>
        </div>

        {/* ── Related Products ─────────────────────────────────────────────── */}
        {relatedProducts.length > 0 ? (
          <div className="mt-16 border-t border-line pt-12">
            <h3 className="font-display text-d4 text-ink mb-6">
              {pick(labels.relatedTitle, locale)}
            </h3>
            <div className="grid gap-6 sm:grid-cols-3">
              {relatedProducts.map((rel) => (
                <div
                  key={rel.slug}
                  className="bg-surface rounded-2xl border border-line/80 overflow-hidden shadow-xs p-4 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-red-500/40 group"
                >
                  <div>
                    <div className="relative h-36 w-full overflow-hidden rounded-xl bg-charcoal-900 shadow-inner mb-3">
                      <Image
                        src={rel.image}
                        alt={pick(rel.name, locale)}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(min-width: 640px) 30vw, 90vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/70 via-transparent to-transparent" />
                    </div>
                    <h4 className="font-display text-sm font-bold text-ink group-hover:text-red-600 transition-colors">
                      <Link href={`/produits/${rel.slug}`}>
                        {pick(rel.name, locale)}
                      </Link>
                    </h4>
                    <p className="text-green-700 text-xs font-medium mt-1 truncate">
                      {pick(rel.target, locale)}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-line/60">
                    <Link
                      href={`/produits/${rel.slug}`}
                      className="w-full inline-flex items-center justify-center py-2 px-3 rounded-lg font-semibold text-xs text-white bg-red-600 hover:bg-red-700 active:bg-red-800 shadow-xs transition-colors"
                    >
                      {pick({ fr: 'Voir la fiche', ar: 'عرض البطاقة', en: 'View sheet' }, locale)}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
