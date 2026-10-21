import Image from 'next/image';
import { PRODUCT_BY_SLUG, type ProductSlug } from '@content/products';
import { UI } from '@content/ui';
import { pick } from '@content/types';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal, RevealItem } from '@/components/motion/Reveal';
import { Link } from '@/lib/i18n/navigation';
import type { Locale } from '@/lib/i18n/config';
import { cn } from '@/lib/utils/cn';

/**
 * Editorial bento ordering and grid spans across all 8 products:
 * Row 1: Poultry Meat pillars (Poulet de chair CMV + Poussins d'un jour couvoir) - 2 wide cards (2+2 = 4 cols)
 * Row 2: Specialized lines (Pondeuse, Repro, Dinde, Aliments) - 4 standard cards (1+1+1+1 = 4 cols)
 * Row 3: Large ruminants & Dairy (Bovin & Ovin + Vache laitière) - 2 wide cards (2+2 = 4 cols)
 */
const BENTO_PRODUCTS: readonly { slug: ProductSlug; span: string }[] = [
  { slug: 'poussins-d-un-jour', span: 'lg:col-span-2' },
  { slug: 'aliments', span: 'lg:col-span-2' },
  { slug: 'cmv-poulet-de-chair', span: 'lg:col-span-2' },
  { slug: 'cmv-pondeuse', span: 'lg:col-span-1' },
  { slug: 'cmv-repro', span: 'lg:col-span-1' },
  { slug: 'cmv-dinde', span: 'lg:col-span-1' },
  { slug: 'cmv-bovin-ovin', span: 'lg:col-span-1' },
  { slug: 'cmv-vache-laitiere', span: 'lg:col-span-2' },
];

interface FamilyMeta {
  readonly label: { fr: string; ar: string; en: string };
  readonly badge: { fr: string; ar: string; en: string };
  readonly style: string;
}

const DEFAULT_FAMILY_META: FamilyMeta = {
  label: { fr: 'Prémélange CMV', ar: 'مكمّل CMV', en: 'CMV Premix' },
  badge: { fr: 'Sac 25 kg', ar: 'كيس 25 كغ', en: '25 kg bag' },
  style: 'text-green-700 bg-green-50 border-green-200/60',
};

const FAMILY_BADGES: Record<string, FamilyMeta> = {
  cmv: DEFAULT_FAMILY_META,
  chicks: {
    label: { fr: 'Couvoir industriel', ar: 'مفقس صناعي', en: 'Industrial hatchery' },
    badge: { fr: '20 M / an', ar: '20 مليون / سنة', en: '20 M / yr' },
    style: 'text-amber-700 bg-amber-50 border-amber-200/70',
  },
  feed: {
    label: { fr: 'Unité Aliments', ar: 'مصنع الأعلاف', en: 'Feed Unit' },
    badge: { fr: 'Autoconsommation', ar: 'للاستهلاك الذاتي', en: 'Internal Use' },
    style: 'text-amber-800 bg-amber-50 border-amber-300',
  },
};

export const CmvBento = ({ locale }: { readonly locale: Locale }) => {
  return (
    <section className="shell section" aria-labelledby="range-title">
      <SectionHeading
        eyebrow={pick(UI.ourRange, locale)}
        title={pick(UI.cmvTitle, locale)}
        lead={pick(UI.cmvBody, locale)}
        locale={locale}
        id="range-title"
        action={
          <Link
            href="/produits"
            className="inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-semibold text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors"
          >
            {pick(UI.seeAllProducts, locale)}
          </Link>
        }
      />

      <Reveal
        stagger={0.06}
        amount={0.08}
        className="mt-10 sm:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7"
      >
        {BENTO_PRODUCTS.map(({ slug, span }) => {
          const product = PRODUCT_BY_SLUG[slug];
          if (!product) return null;
          const isWide = span === 'lg:col-span-2';
          const meta: FamilyMeta = FAMILY_BADGES[product.family] ?? DEFAULT_FAMILY_META;

          return (
            <RevealItem key={product.slug} as="article" className={span}>
              <div
                className={cn(
                  'bg-surface rounded-2xl border border-line/80 group flex h-full flex-col overflow-hidden shadow-xs',
                  'transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-red-500/40 hover:bg-surface-raised',
                  'p-5 sm:p-6',
                )}
              >
                {/* ── Enlarged Product Image Header ────────────────────────── */}
                <div
                  className={cn(
                    'relative w-full overflow-hidden rounded-xl bg-charcoal-900 shadow-inner',
                    isWide ? 'h-48 sm:h-56' : 'h-44 sm:h-48',
                  )}
                >
                  <Image
                    src={product.image}
                    alt={pick(product.name, locale)}
                    fill
                    sizes={isWide ? '(min-width: 1024px) 50vw, 92vw' : '(min-width: 1024px) 25vw, (min-width: 640px) 45vw, 92vw'}
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  />
                  {/* Subtle photographic vignette gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-charcoal-950/20 to-transparent" />

                  {/* Top Badges overlay */}
                  <div className="absolute top-3 inset-x-3 flex items-center justify-between gap-2 pointer-events-none">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-charcoal-950/80 text-cream/95 backdrop-blur-md border border-white/10 shadow-xs">
                      {pick(meta.label, locale)}
                    </span>
                    <span className={cn('text-[10px] font-bold px-2.5 py-1 rounded-md backdrop-blur-md border shadow-xs', meta.style)}>
                      {pick(meta.badge, locale)}
                    </span>
                  </div>

                  {/* Bottom title highlight on mobile/hover */}
                  <div className="absolute bottom-3 start-3 end-3 flex items-center gap-1.5">
                    <span className="text-[11px] font-semibold text-cream/90 truncate tracking-wide">
                      SARL VOLAGRO · Algérie
                    </span>
                  </div>
                </div>

                {/* ── Card Body ────────────────────────────────────────────── */}
                <div className="flex flex-1 flex-col pt-5">
                  <h3
                    className={cn(
                      'font-display font-bold text-ink transition-colors duration-200 group-hover:text-red-600',
                      isWide ? 'text-lg sm:text-2xl' : 'text-base sm:text-lg',
                    )}
                  >
                    {pick(product.name, locale)}
                  </h3>

                  <p className="text-green-700 font-semibold text-xs mt-1.5">
                    {pick(product.target, locale)}
                  </p>

                  <p className="text-ink-muted text-xs sm:text-sm mt-2.5 line-clamp-2 leading-relaxed">
                    {pick(product.summary, locale)}
                  </p>

                  {/* ── Direct Action Button (NO ARROWS) ───────────────────── */}
                  <div className="mt-auto pt-5">
                    <Link
                      href={`/produits/${product.slug}`}
                      className="w-full inline-flex items-center justify-center py-2.5 sm:py-3 px-4 rounded-xl font-semibold text-xs sm:text-sm text-white bg-red-600 hover:bg-red-700 active:bg-red-800 shadow-sm shadow-red-600/25 hover:shadow-md hover:shadow-red-600/35 transition-all duration-200 cursor-pointer"
                    >
                      {pick(UI.seeSheet, locale)}
                    </Link>
                  </div>
                </div>
              </div>
            </RevealItem>
          );
        })}
      </Reveal>
    </section>
  );
};
