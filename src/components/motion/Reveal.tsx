'use client';

import { motion, useReducedMotion, type Variants } from 'motion/react';
import type { ReactNode } from 'react';

/**
 * Scroll reveal primitive.
 *
 * Three constraints shape this component, all of them non-negotiable for a site
 * whose audience is on mid-range phones:
 *
 *  1. `prefers-reduced-motion` is honoured by rendering the FINAL state
 *     immediately — no fade, no travel. We never animate on someone's behalf
 *     after they have asked us not to.
 *  2. The element is marked `data-reveal`, and the layout ships a `<noscript>`
 *     style that forces `opacity:1; transform:none`. Without it, a JS failure
 *     would leave the whole page invisible — an SEO and accessibility failure
 *     that no amount of graceful animation would excuse.
 *  3. Only `opacity` and `transform` animate, both compositor-only, so a reveal
 *     can never trigger layout or paint work mid-scroll.
 */
const EASE_INDUSTRIAL = [0.22, 1, 0.36, 1] as const;

interface RevealProps {
  readonly children: ReactNode;
  readonly delay?: number;
  readonly y?: number;
  /** Stagger direct children instead of animating the wrapper as one block. */
  readonly stagger?: number;
  readonly as?: 'div' | 'section' | 'li' | 'article' | 'figure';
  readonly className?: string;
  /** `once` is deliberate: re-animating on scroll-back reads as a glitch. */
  readonly amount?: number;
}

export const Reveal = ({
  children,
  delay = 0,
  y = 18,
  stagger,
  as = 'div',
  className,
  amount = 0.25,
}: RevealProps) => {
  const reduced = useReducedMotion();
  const Component = motion[as];

  if (reduced) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  const variants: Variants =
    stagger === undefined
      ? {
          hidden: { opacity: 0, y },
          shown: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_INDUSTRIAL, delay } },
        }
      : {
          hidden: {},
          shown: { transition: { staggerChildren: stagger, delayChildren: delay } },
        };

  return (
    <Component
      className={className}
      data-reveal=""
      variants={variants}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount }}
    >
      {children}
    </Component>
  );
};

import type { ComponentPropsWithoutRef } from 'react';

/** Child of a staggered `<Reveal stagger={…}>`. */
export const RevealItem = ({
  children,
  className,
  y = 16,
  as = 'div',
  ...props
}: {
  readonly children: ReactNode;
  readonly className?: string;
  readonly y?: number;
  readonly as?: 'div' | 'li' | 'article' | 'figure';
} & ComponentPropsWithoutRef<'div'>) => {
  const reduced = useReducedMotion();
  const Component = motion[as];

  if (reduced) {
    const Tag = as;
    return <Tag className={className} {...(props as any)}>{children}</Tag>;
  }

  return (
    <Component
      className={className}
      data-reveal=""
      variants={{
        hidden: { opacity: 0, y },
        shown: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_INDUSTRIAL } },
      }}
      {...(props as any)}
    >
      {children}
    </Component>
  );
};
