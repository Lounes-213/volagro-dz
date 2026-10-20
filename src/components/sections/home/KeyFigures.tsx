'use client';

import { useReducedMotion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

import { IDENTITY, KEY_FIGURES, type KeyFigure } from '@content/company';
import { UI } from '@content/ui';
import { pick } from '@content/types';
import type { Locale } from '@/lib/i18n/config';
import { formatFigure } from '@/lib/utils/format';

/**
 * KEY FIGURES
 *
 * Three decisions worth stating, because this band is where sites usually go
 * wrong:
 *
 *  1. THE YEAR DOES NOT COUNT UP. Animating 0 → 1998 through 1997 numbers is a
 *     cliché, and it reads as a quantity rather than a date. Only capacities
 *     animate, because only they are quantities.
 *  2. REDUCED MOTION RENDERS THE FINAL VALUE — `run` is simply true, no effect
 *     and no observer involved.
 *  3. NO `setState` IN AN EFFECT BODY. Doing so causes a cascading render on
 *     first paint (flagged by react-hooks), so the running value is DERIVED: the
 *     rAF loop writes animation frames only, and when the animation is not
 *     running the target is returned directly.
 *
 * One rAF loop per figure, one integer format per frame, nothing else — which is
 * what keeps this section cheap on a mid-range phone.
 */
const easeOutExpo = (t: number): number => (t >= 1 ? 1 : 1 - 2 ** (-10 * t));

const useCountUp = (target: number, shouldRun: boolean, duration: number): number => {
  const [animated, setAnimated] = useState(0);

  useEffect(() => {
    if (!shouldRun || duration <= 0) return;
    let frame = 0;
    const start = performance.now();

    const tick = (now: number): void => {
      const progress = Math.min((now - start) / duration, 1);
      setAnimated(Math.round(target * easeOutExpo(progress)));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, shouldRun, duration]);

  return shouldRun && duration > 0 ? animated : target;
};

const Figure = ({
  figure,
  locale,
  run,
}: {
  readonly figure: KeyFigure;
  readonly locale: Locale;
  readonly run: boolean;
}) => {
  const isYear = figure.kind === 'year';
  const value = useCountUp(figure.value, run && !isYear, isYear ? 0 : 1500);

  return (
    <div className="figure-cell bg-surface group relative flex flex-col-reverse p-5 md:p-7 transition-all duration-300 hover:bg-surface-raised hover:-translate-y-0.5 hover:shadow-sm">
      <div className="absolute top-0 start-0 end-0 h-[2px] bg-transparent transition-colors duration-300 group-hover:bg-accent" />
      <dt className="hairline mt-5 pt-4">
        <span className="font-display text-d4 text-ink block transition-colors group-hover:text-accent">{pick(figure.label, locale)}</span>
        {figure.caption ? (
          <span className="text-ink-muted mt-2 block text-sm">{pick(figure.caption, locale)}</span>
        ) : null}
      </dt>

      <dd className="figure-num text-ink flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="transition-transform duration-300 group-hover:scale-[1.02] inline-block">{formatFigure(value, locale, figure.kind)}</span>
        {figure.suffix ? (
          <span className="text-ink-subtle font-sans text-sm font-medium tracking-normal">
            {pick(figure.suffix, locale)}
          </span>
        ) : null}
      </dd>
    </div>
  );
};

export const KeyFigures = ({ locale }: { readonly locale: Locale }) => {
  const ref = useRef<HTMLDListElement>(null);
  const [seen, setSeen] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setSeen(true); // inside a callback, not an effect body
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  /* Reduced motion never even attaches the run: the final values are what render. */
  const run = reduced === true || seen;

  return (
    <section className="shell section-tight" aria-labelledby="key-figures-title">
      <h2 id="key-figures-title" className="eyebrow marker">
        <span className="marker-tick" aria-hidden="true" />
        {pick(UI.keyFiguresTitle, locale)}
      </h2>

      {/* `gap-px` over a token border colour draws the rules as gaps rather than
          borders, so they stay continuous and mirror in RTL for free. */}
      <dl
        ref={ref}
        className="bg-line rounded-card mt-8 grid grid-cols-2 gap-px overflow-hidden lg:grid-cols-4"
      >
        {KEY_FIGURES.map((figure) => (
          <Figure key={figure.id} figure={figure} locale={locale} run={run} />
        ))}
      </dl>

      <p className="text-ink-subtle mt-5 text-xs">
        {IDENTITY.wordmark} · {pick(IDENTITY.ownership, locale)} · {IDENTITY.foundedYear}
      </p>
    </section>
  );
};
