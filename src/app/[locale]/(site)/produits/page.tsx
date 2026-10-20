import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import Image from 'next/image';
import {
  PRODUCT_FAMILIES,
  productsByFamily,
} from '@content/products';
import { INDUSTRIAL_UNITS } from '@content/company';
import { pick } from '@content/types';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { LOCALES, isLocale } from '@/lib/i18n/config';
import { Link } from '@/lib/i18n/navigation';

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
    fr: 'Gamme Produits & Filières — SARL VOLAGRO',
    ar: 'منتجات وخدمات فولاغرو — تغذية الدواجن والماشية',
    en: 'Product Range & Sectors — SARL VOLAGRO',
  };

  const descriptions = {
    fr: 'Catalogue complet de nutrition animale : prémélanges minéraux vitaminés (CMV), poussins d’un jour de chair et aliments industriels.',
    ar: 'دليل المنتجات الكامل: مكمّلات CMV المعدنية والفيتامينية، كتاكيت عمر يوم واحد، وأعلاف اللحم والبيض.',
    en: 'Complete animal nutrition catalog: mineral and vitamin premixes (CMV), day-old chicks, and animal feed.',
  };

  return {
    title: titles[locale],
    description: descriptions[locale],
  };
}

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const labels = {
    eyebrow: { fr: 'CATALOGUE & FILIÈRES', ar: 'الدليل والشعب', en: 'CATALOG & SECTORS' },
    title: {
      fr: 'Formulations de précision & filières animales intégrées',
      ar: 'تركيبات دقيقة وشعب إنتاج حيواني متكاملة',
      en: 'Precision formulations & integrated livestock sectors',
    },
    lead: {
      fr: 'De la formulation nutritionnelle de précision jusqu’à la conduite technique en élevage, VOLAGRO couvre l’ensemble des besoins technico-économiques des éleveurs algériens.',
      ar: 'من التركيبات الغذائية الدقيقة إلى المرافقة التقنية في المزارع، تغطي فولاغرو كافة المتطلبات التقنية والاقتصادية للمربين في الجزائر.',
      en: 'From precision nutritional formulation to on-farm technical guidance, VOLAGRO covers all technico-economic needs of Algerian livestock breeders.',
    },
    consultSheet: { fr: 'Fiche technique complète', ar: 'البطاقة التقنية للمنتج', en: 'Full technical sheet' },
    requestQuote: { fr: 'Demander une cotation', ar: 'طلب تسعيرة', en: 'Request quote' },
  };

  return (
    <div className="py-12 md:py-16">
      <div className="shell">
        <SectionHeading
          eyebrow={pick(labels.eyebrow, locale)}
          title={pick(labels.title, locale)}
          lead={pick(labels.lead, locale)}
          locale={locale}
        />

        {/* ── Key capacities highlight ─────────────────────────────────────── */}
        <div className="border-line bg-surface-sunken rounded-card mt-12 grid gap-6 border p-6 sm:grid-cols-3">
          <div className="border-line/60 sm:border-e sm:pe-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-green-700">
              Couvoir Ferhat
            </span>
            <p className="font-display text-d3 text-ink mt-1 font-bold">
              20 000 000
            </p>
            <p className="text-ink-subtle text-xs mt-1">Poussins d'un jour / an</p>
          </div>

          <div className="border-line/60 sm:border-e sm:pe-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-green-700">
              {pick(INDUSTRIAL_UNITS.partnership.title, locale)}
            </span>
            <p className="font-display text-d3 text-ink mt-1 font-bold">
              {pick(INDUSTRIAL_UNITS.partnership.capacity, locale)}
            </p>
            <p className="text-ink-subtle text-xs mt-1">Partenariat nutrition & zootechnie</p>
          </div>

          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-green-700">
              {pick(INDUSTRIAL_UNITS.premix.title, locale)}
            </span>
            <p className="font-display text-d3 text-ink mt-1 font-bold">
              {pick(INDUSTRIAL_UNITS.premix.capacity, locale)}
            </p>
            <p className="text-ink-subtle text-xs mt-1">Capacité unité CMV Tala Athmane</p>
          </div>
        </div>

        {/* ── Product families & items ─────────────────────────────────────── */}
        <div className="mt-16 space-y-16">
          {PRODUCT_FAMILIES.map((family) => {
            const familyProducts = productsByFamily(family.id);
            if (familyProducts.length === 0) return null;

            return (
              <section key={family.id} aria-labelledby={`family-${family.id}`}>
                <div className="border-b border-line pb-4 flex items-end justify-between">
                  <div>
                    <h3 id={`family-${family.id}`} className="font-display text-d3 text-ink flex items-center gap-2.5">
                      <span className="h-2 w-2 rounded-full bg-green-600" />
                      <span>{pick(family.label, locale)}</span>
                    </h3>
                    <p className="text-ink-muted mt-1 text-sm max-w-[55ch]">
                      {pick(family.description, locale)}
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-ink-subtle">
                    {familyProducts.length} {familyProducts.length > 1 ? 'produits' : 'service'}
                  </span>
                </div>

                <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {familyProducts.map((product) => (
                    <article
                      key={product.slug}
                      className="bg-surface rounded-2xl border border-line/80 flex flex-col justify-between overflow-hidden shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-red-500/40 group"
                    >
                      <div className="relative h-56 w-full overflow-hidden bg-charcoal-900">
                        <Image
                          src={product.image}
                          alt={pick(product.name, locale)}
                          fill
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-charcoal-950/20 to-transparent" />
                        {product.emphasis === 'lead' ? (
                          <span className="absolute top-3 end-3 rounded-full bg-red-600 text-white px-3 py-1 text-[11px] font-bold shadow-md shadow-red-950/30">
                            Filière phare
                          </span>
                        ) : null}
                        <div className="absolute bottom-3 start-3 flex items-center gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-cream/95 bg-charcoal-900/85 px-2.5 py-1 rounded-md backdrop-blur-md border border-white/10">
                            {product.family.toUpperCase()}
                          </span>
                          <span className="text-[10px] text-cream/80 font-mono">
                            ref: {product.slug.replace('cmv-', '')}
                          </span>
                        </div>
                      </div>

                      <div className="p-6 flex flex-col flex-1 justify-between">
                        <div>
                          <h4 className="font-display text-d4 text-ink group-hover:text-red-600 transition-colors">
                            <Link href={`/produits/${product.slug}`}>
                              {pick(product.name, locale)}
                            </Link>
                          </h4>

                          <p className="text-green-700 font-semibold mt-2 text-xs sm:text-sm leading-snug">
                            {pick(product.target, locale)}
                          </p>

                          <p className="text-ink-muted mt-2.5 text-xs sm:text-sm leading-relaxed line-clamp-2">
                            {pick(product.summary, locale)}
                          </p>
                        </div>

                        <div className="mt-6 border-t border-line/60 pt-4">
                          <Link
                            href={`/produits/${product.slug}`}
                            className="w-full inline-flex items-center justify-center py-2.5 sm:py-3 px-4 rounded-xl font-semibold text-xs sm:text-sm text-white bg-red-600 hover:bg-red-700 active:bg-red-800 shadow-sm shadow-red-600/25 hover:shadow-md hover:shadow-red-600/35 transition-all duration-200"
                          >
                            {pick(labels.consultSheet, locale)}
                          </Link>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
