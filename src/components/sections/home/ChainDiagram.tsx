import Image from 'next/image';
import { CHAIN_STEPS } from '@content/home';
import { UI } from '@content/ui';
import { pick } from '@content/types';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { InlineLink } from '@/components/ui/Button';
import { Reveal, RevealItem } from '@/components/motion/Reveal';
import type { Locale } from '@/lib/i18n/config';
import { Link } from '@/lib/i18n/navigation';

/** High-resolution imagery for each stage of the integrated value chain */
const STAGE_IMAGES: Record<string, string> = {
  couvoir: '/images/chain/couvoir.jpg',
  aliment: '/images/chain/aliment.jpg',
  accompagnement: '/images/chain/expertise.jpg',
};

export const ChainDiagram = ({ locale }: { readonly locale: Locale }) => {
  return (
    <section className="shell section" aria-labelledby="chain-title">
      <SectionHeading
        eyebrow={pick(UI.chainEyebrow, locale)}
        title={pick(UI.chainTitle, locale)}
        lead={pick(UI.chainBody, locale)}
        locale={locale}
        id="chain-title"
      />

      <Reveal
        stagger={0.06}
        className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {CHAIN_STEPS.map((step) => {
          const imageSrc = STAGE_IMAGES[step.id] ?? '/images/chain/couvoir.jpg';

          return (
            <RevealItem key={step.id} as="article">
              <div className="bg-surface rounded-card border-line group flex h-full flex-col overflow-hidden border p-5 shadow-xs transition-all duration-300 hover:bg-surface-raised hover:-translate-y-1.5 hover:shadow-md">
                <div className="relative aspect-16/10 w-full overflow-hidden rounded-md bg-charcoal-900 border border-line/60">
                  <Image
                    src={imageSrc}
                    alt={pick(step.title, locale)}
                    fill
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/60 via-transparent to-transparent opacity-40" />
                  <span className="absolute top-3 end-3 font-display text-base font-bold text-cream/90 bg-charcoal-900/80 px-2.5 py-0.5 rounded-full border border-white/10 backdrop-blur-xs tnum">
                    {step.index}
                  </span>
                </div>

                <div className="flex flex-1 flex-col pt-5">
                  <h3 className="text-d4">
                    <Link href={step.href} className="hover:text-accent transition-colors">
                      {pick(step.title, locale)}
                    </Link>
                  </h3>

                  {step.metric ? (
                    <span className="text-accent font-mono text-xs font-semibold mt-1.5 block">
                      {pick(step.metric, locale)}
                    </span>
                  ) : null}

                  <p className="text-ink-muted mt-2 text-sm leading-relaxed">
                    {pick(step.body, locale)}
                  </p>

                  <div className="mt-auto pt-6">
                    <InlineLink href={step.href}>
                      {pick(UI.understand, locale)}
                    </InlineLink>
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
