'use client';

import { motion, useReducedMotion } from 'motion/react';

import { TIMELINE } from '@content/timeline';
import { UI } from '@content/ui';
import { pick } from '@content/types';
import { SectionHeading } from '@/components/ui/SectionHeading';
import type { Locale } from '@/lib/i18n/config';

/**
 * The timeline is scroll-linked rather than scroll-jacked: the burgundy axis
 * grows with the section's own progress through the viewport (`scaleY`, driven by
 * `useScroll`), so it never fights the user's scroll and never pins the page.
 *
 * Every offset is logical (`start-*`, `ps-*`), which is what mirrors it in Arabic
 * without a second stylesheet. Under reduced motion the axis simply renders full.
 */
export const Timeline = ({ locale }: { readonly locale: Locale }) => {
  const reduced = useReducedMotion();

  return (
    <section className="shell section" aria-labelledby="timeline-title">
      <SectionHeading
        eyebrow={pick(UI.timelineEyebrow, locale)}
        title={pick(UI.timelineTitle, locale)}
        locale={locale}
        id="timeline-title"
      />

      <div className="relative mt-14 ps-10 md:ps-16">
        <div
          aria-hidden="true"
          className="bg-line absolute start-[0.4375rem] top-2 bottom-2 w-px md:start-[0.6875rem]"
        >
          <motion.div
            className="bg-accent w-px origin-top"
            style={{ height: '100%' }}
            initial={reduced ? undefined : { scaleY: 0 }}
            whileInView={reduced ? undefined : { scaleY: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>

        <ol className="grid gap-14">
          {TIMELINE.map((milestone) => (
            <li key={milestone.id} className="relative group transition-all duration-300">
              {/* Node sits ON the axis: 1px line + marker centred over it. */}
              <span
                aria-hidden="true"
                className="border-accent bg-surface absolute -start-10 top-2 h-4 w-4 rounded-full border-2 md:-start-16 transition-all duration-300 group-hover:scale-125 group-hover:bg-accent group-hover:ring-4 group-hover:ring-accent/20"
              />

              <p className="eyebrow text-accent tnum">{pick(milestone.kicker, locale)}</p>

              <p className="figure-num text-ink mt-3">{milestone.year}</p>

              <h3 className="text-d3 mt-4 max-w-[24ch] text-balance">
                {pick(milestone.title, locale)}
              </h3>

              <p className="text-ink-muted mt-4 max-w-[58ch]">{pick(milestone.body, locale)}</p>

              {milestone.figure ? (
                <p className="text-accent tnum mt-4 text-sm font-semibold">
                  {milestone.figure.value.toLocaleString('fr-FR').replace(/\u202f/g, ' ')}{' '}
                  {pick(milestone.figure.suffix, locale)}
                </p>
              ) : null}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};
