'use client';

import { motion } from 'motion/react';

import { HERO, TAGLINE } from '@content/company';
import { pick } from '@content/types';
import type { Locale } from '@/lib/i18n/config';

/**
 * HOME HERO
 *
 * Drawn horizon with animated motion layers, glowing ambient gradient,
 * and the client's animal asset with gentle floating micro-interaction.
 */
export const Hero = ({ locale }: { readonly locale: Locale }) => {
  return (
    <section className="relative isolate overflow-hidden bg-charcoal-950 text-cream">
      {/* ── Background Video & Cinematic Red Grading ────────────────────── */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
        {/* Background video: muted, autoplay, loop, playsinline - no audio */}
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover object-center pointer-events-none scale-[1.03] filter brightness-[0.86] contrast-[1.08] saturate-[1.12]"
        >
          <source src="/videos/ved_bg.mp4" type="video/mp4" />
        </video>

        {/* Brand Red & Charcoal Cinematic Multi-Layer Overlay - softened so video is clearly visible */}
        {/* Layer 1: Dark base gradient for maximum text contrast and legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal-950/85 via-charcoal-950/60 to-charcoal-950/30 rtl:from-charcoal-950/30 rtl:via-charcoal-950/60 rtl:to-charcoal-950/85" />

        {/* Layer 2: Subtle Brand Red atmospheric ambient glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_30%,rgba(220,38,38,0.18)_0%,rgba(185,28,28,0.08)_42%,transparent_72%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_78%_65%,rgba(220,38,38,0.12)_0%,rgba(33,90,64,0.10)_40%,transparent_68%)]" />

        {/* Layer 3: Vertical darkening for header readability & smooth bottom section transition */}
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-950/60 via-transparent to-charcoal-950/90" />

        {/* Glowing brand red top laser accent line */}
        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent shadow-[0_0_12px_rgba(220,38,38,0.8)] opacity-75" />

        {/* Subtle wheat silhouettes at bottom edge for agricultural grounding and smooth transition */}
        <svg
          className="absolute inset-x-0 bottom-0 h-[26%] w-full opacity-60"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          fill="none"
        >
          <path
            d="M0 240c132-18 246 10 360 20s238 8 352-10 244-30 356-18 224 36 332 44v44H0z"
            fill="#0b1112"
            opacity="0.9"
          />
        </svg>

        {/* Subtle film grain overlay */}
        <svg className="absolute inset-0 h-full w-full opacity-[0.045] mix-blend-overlay pointer-events-none">
          <filter id="hero-grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" />
          </filter>
          <rect width="100%" height="100%" filter="url(#hero-grain)" />
        </svg>
      </div>

      <div className="shell py-16 md:py-20 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-[75rem]"
        >
          {/* Eyebrow identique à Présentation de l'entreprise */}
          <div className="inline-block border-s-2 border-red-500 ps-3 py-0.5">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-red-400">
              SARL VOLAGRO • {locale === 'ar' ? 'نظرة عامة' : locale === 'en' ? 'Overview' : "Vue d'ensemble"}
            </span>
          </div>

          {/* Titre majestueux qui s'étale parfaitement sur 2 lignes complètes */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-d1 text-cream mt-4 max-w-[24ch]"
          >
            {locale === 'fr' ? (
              <>
                Au niveau des élevages,
                <br />
                des performances maîtrisées.
              </>
            ) : (
              pick(HERO.headline, locale)
            )}
          </motion.h1>

          {/* Lead texte identique à Présentation de l'entreprise */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 max-w-[65ch] text-base leading-relaxed text-cream/80 md:text-lg"
          >
            {pick(TAGLINE, locale)}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};
