'use client';

import { useReducedMotion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

import { KEY_FIGURES, type KeyFigure } from '@content/company';
import { pick } from '@content/types';
import type { Locale } from '@/lib/i18n/config';
import { formatFigure } from '@/lib/utils/format';

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

const FigureItem = ({
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
    <div className="flex flex-col justify-between p-5 sm:p-6 transition-all duration-300 hover:bg-surface-raised">
      <div>
        <span className="text-xs font-semibold text-green-700 block">
          {pick(figure.label, locale)}
        </span>
      </div>

      <div className="mt-3">
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
          <span className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-ink font-mono">
            {formatFigure(value, locale, figure.kind)}
          </span>
          {figure.suffix ? (
            <span className="text-xs font-semibold uppercase tracking-wider text-ink-subtle">
              {pick(figure.suffix, locale)}
            </span>
          ) : null}
        </div>

        {figure.caption ? (
          <p className="text-xs text-ink-muted mt-1.5 font-medium">
            {pick(figure.caption, locale)}
          </p>
        ) : null}
      </div>
    </div>
  );
};

export const AboutKeyFigures = ({ locale }: { readonly locale: Locale }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setSeen(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const run = reduced === true || seen;

  return (
    <div
      ref={ref}
      className="mt-12 overflow-hidden rounded-none border border-line bg-surface shadow-xs"
    >
      <div className="grid grid-cols-1 divide-y divide-line sm:grid-cols-2 sm:divide-y-0 sm:divide-x lg:grid-cols-4 rtl:sm:divide-x-reverse">
        {KEY_FIGURES.map((fig) => (
          <FigureItem key={fig.id} figure={fig} locale={locale} run={run} />
        ))}
      </div>
    </div>
  );
};
