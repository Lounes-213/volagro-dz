'use client';

import { motion } from 'motion/react';
import type { Locale } from '@/lib/i18n/config';

interface AboutHeroHeaderProps {
  readonly eyebrow: string;
  readonly title: string;
  readonly lead: string;
  readonly locale: Locale;
}

export const AboutHeroHeader = ({ eyebrow, title, lead, locale: _locale }: AboutHeroHeaderProps) => {
  return (
    <div className="shell">
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-[75rem]"
      >
        {/* Eyebrow avec animation d'entrée */}
        <div className="inline-block border-s-2 border-red-500 ps-3 py-0.5">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-red-400">
            {eyebrow}
          </span>
        </div>

        {/* Titre avec animation stagger d'apparition comme dans Vue d'ensemble */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-d1 text-cream mt-4 max-w-[22ch]"
        >
          {title}
        </motion.h1>

        {/* Lead texte avec animation d'apparition douce */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 max-w-[65ch] text-base leading-relaxed text-cream/80 md:text-lg"
        >
          {lead}
        </motion.p>
      </motion.div>
    </div>
  );
};
