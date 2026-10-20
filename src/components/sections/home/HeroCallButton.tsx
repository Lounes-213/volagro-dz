'use client';

import { HERO } from '@content/company';
import { pick } from '@content/types';
import { Button } from '@/components/ui/Button';
import { Glyph } from '@/components/icons/Glyph';
import { openCallChoice } from '@/lib/call-choice';
import type { Locale } from '@/lib/i18n/config';

export const HeroCallButton = ({ locale }: { readonly locale: Locale }) => (
  <Button
    id="hero-call-btn"
    size="lg"
    variant="onInk"
    className="border-cream/30 text-cream hover:bg-white/10 hover:border-cream/50"
    icon={<Glyph name="phone" size={18} />}
    onClick={openCallChoice}
  >
    {pick(HERO.ctaSecondary, locale)}
  </Button>
);
