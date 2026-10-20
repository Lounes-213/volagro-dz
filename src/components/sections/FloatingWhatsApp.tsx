'use client';

import { useEffect, useState } from 'react';

import { pick } from '@content/types';
import { Glyph } from '@/components/icons/Glyph';
import { openCallChoice } from '@/lib/call-choice';
import type { Locale } from '@/lib/i18n/config';

export const FloatingWhatsApp = ({ locale }: { readonly locale: Locale }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const heroBtn = document.getElementById('hero-call-btn');

    // On pages with the Hero call button, observe its presence in the viewport
    if (heroBtn) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry) {
            // When hero call button is on screen: hide floating button.
            // When scrolled down and hero button leaves screen: show floating button!
            setVisible(!entry.isIntersecting);
          }
        },
        { threshold: 0 }
      );

      observer.observe(heroBtn);
      return () => observer.disconnect();
    }

    // On pages without a hero call button, display once user scrolls past header
    const onScroll = () => {
      setVisible(window.scrollY > 160);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  const label = pick(
    {
      fr: 'Appeler ou WhatsApp',
      ar: 'اتصال أو واتساب',
      en: 'Call or WhatsApp',
    },
    locale,
  );

  return (
    <aside
      aria-label={label}
      className="fixed bottom-5 right-5 z-60 pointer-events-auto sm:bottom-6 sm:right-6 animate-whatsapp-float"
      style={{ bottom: 'max(1.25rem, calc(0.75rem + env(safe-area-inset-bottom)))' }}
    >
      <div className="relative group">
        {/* Breathing glowing aura ring */}
        <div className="absolute inset-0 rounded-full animate-whatsapp-glow pointer-events-none" />

        <button
          type="button"
          onClick={openCallChoice}
          aria-label={label}
          className="relative tap flex h-14 w-14 md:h-15 md:w-15 items-center justify-center rounded-full bg-green-700 hover:bg-green-800 active:bg-green-900 border border-green-800/40 text-white shadow-xl active:scale-95 transition-all duration-300 overflow-hidden focus:outline-hidden"
        >
          {/* Subtle light sweep animation */}
          <span className="absolute top-0 bottom-0 w-8 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-20deg] pointer-events-none animate-light-sweep" />

          <Glyph name="whatsapp" size={30} className="relative z-10 drop-shadow-sm" />

          {/* Active status pulse beacon */}
          <span className="absolute top-1.5 right-1.5 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-white border border-green-700" />
          </span>
        </button>
      </div>
    </aside>
  );
};
