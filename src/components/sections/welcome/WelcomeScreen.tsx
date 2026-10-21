'use client';

import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useCallback, useEffect, useRef, useState } from 'react';

import { IDENTITY, PRIMARY_PHONE, SITE_ADDRESS } from '@content/company';
import { pick } from '@content/types';
import { WELCOME, WELCOME_MESSAGE } from '@content/welcome';
import { Glyph } from '@/components/icons/Glyph';
import { WelcomeSplash } from '@/components/sections/welcome/WelcomeSplash';
import { telHref } from '@/lib/contact-links';
import { LOCALES, LOCALE_META, dir, type Locale } from '@/lib/i18n/config';
import { Link, useRouter } from '@/lib/i18n/navigation';
import { cn } from '@/lib/utils/cn';

const EASE = [0.22, 1, 0.36, 1] as const;
const AUTO_ENTER_SECONDS = 60;

/**
 * WELCOME SCREEN
 *
 * A single full-viewport introduction shown before the home page. It borrows the
 * home hero's background (same video, same grading, same animal collage) so the
 * hand-off feels like one continuous site rather than two designs.
 *
 * Entry: copy slides in from the start edge, imagery from the end edge.
 * Exit: a soft fade to charcoal, then the localized home route replaces this one
 * — no back-button trap, since the welcome URL never enters history.
 */
export const WelcomeScreen = ({ locale }: { readonly locale: Locale }) => {
  const router = useRouter();
  const reduced = useReducedMotion() === true;
  const isRtl = dir(locale) === 'rtl';

  const [leaving, setLeaving] = useState(false);
  const [seconds, setSeconds] = useState(AUTO_ENTER_SECONDS);
  const leavingRef = useRef(false);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  /* Auto-scroll ultra doux et lent du texte */
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || reduced) return;

    let animationFrameId: number;
    let isUserInteracting = false;
    let pauseTimer: ReturnType<typeof setTimeout>;

    const onTouchOrWheel = () => {
      isUserInteracting = true;
      clearTimeout(pauseTimer);
      pauseTimer = setTimeout(() => {
        isUserInteracting = false;
      }, 6000);
    };

    container.addEventListener('wheel', onTouchOrWheel, { passive: true });
    container.addEventListener('touchstart', onTouchOrWheel, { passive: true });

    const scrollStep = () => {
      if (!isUserInteracting && container) {
        if (container.scrollTop + container.clientHeight < container.scrollHeight - 1) {
          container.scrollTop += 0.2; // Vitesse très lente et fluide
        }
      }
      animationFrameId = requestAnimationFrame(scrollStep);
    };

    const initialDelay = setTimeout(() => {
      animationFrameId = requestAnimationFrame(scrollStep);
    }, 4000); // 4 secondes de contemplation avant de défiler

    return () => {
      clearTimeout(initialDelay);
      clearTimeout(pauseTimer);
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('wheel', onTouchOrWheel);
      container.removeEventListener('touchstart', onTouchOrWheel);
    };
  }, [reduced]);

  const enter = useCallback(() => {
    if (leavingRef.current) return;
    leavingRef.current = true;
    setLeaving(true);
    try {
      window.sessionStorage.setItem('vg:entered-site', '1');
    } catch {
      /* private mode — the transition still works without the hint */
    }
    window.setTimeout(() => router.replace('/a-propos'), reduced ? 0 : 1050);
  }, [reduced, router]);

  useEffect(() => {
    if (leaving) return;
    if (seconds <= 0) {
      enter();
      return;
    }
    const timer = window.setTimeout(() => setSeconds((value) => Math.max(0, value - 1)), 1000);
    return () => window.clearTimeout(timer);
  }, [enter, leaving, seconds]);

  /* The splash holds the first ~0.9s; content starts underneath it and is
   * already moving when the curtain lifts, so nothing pops in fully formed. */
  const appear = (delay: number): number => (reduced ? 0 : delay + 0.8);

  return (
    <section
      className="relative isolate flex min-h-dvh flex-col overflow-hidden bg-charcoal-950 text-cream"
    >
      {/* ── Background: the home hero, unchanged ─────────────────────────── */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/images/real/legacy-01.jpg"
          className="pointer-events-none absolute inset-0 h-full w-full scale-[1.03] object-cover object-center brightness-[0.7] contrast-[1.08] saturate-[1.12]"
        >
          <source src="/videos/ved_bg.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-gradient-to-r from-charcoal-950/92 via-charcoal-950/72 to-charcoal-950/55 rtl:from-charcoal-950/55 rtl:via-charcoal-950/72 rtl:to-charcoal-950/92" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_25%,rgba(220,38,38,0.20)_0%,rgba(185,28,28,0.08)_42%,transparent_72%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_70%,rgba(33,90,64,0.20)_0%,transparent_68%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-950/55 via-transparent to-charcoal-950/95" />
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-75 shadow-[0_0_12px_rgba(220,38,38,0.8)]" />

        <svg className="absolute inset-0 h-full w-full opacity-[0.045] mix-blend-overlay">
          <filter id="welcome-grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" />
          </filter>
          <rect width="100%" height="100%" filter="url(#welcome-grain)" />
        </svg>
      </div>

      <motion.div
        animate={leaving ? { opacity: [1, 1, 0], y: [0, -18, -56] } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.85, ease: EASE, times: [0, 0.35, 1] }}
        className="relative flex flex-1 flex-col"
      >
        {/* ── Top bar: logo + language ─────────────────────────────────────── */}
        <header className="relative z-10 shell flex items-center justify-between gap-4 pt-6">
          <motion.div
            initial={reduced ? false : { opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: appear(0), ease: EASE }}
            className="inline-flex items-center rounded-sm bg-paper px-3 py-2 shadow-sm ring-1 ring-black/5"
          >
            <Image
              src="/images/logo/volagro-lockup.png"
              alt={IDENTITY.wordmark}
              width={1330}
              height={448}
              priority
              className="h-7 w-auto md:h-9"
            />
          </motion.div>

          <motion.nav
            aria-label={pick(WELCOME.language, locale)}
            initial={reduced ? false : { opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: appear(0.1), ease: EASE }}
            className="flex items-center gap-1.5"
          >
            {LOCALES.map((code) => (
              <Link
                key={code}
                href="/bienvenue"
                locale={code}
                hrefLang={LOCALE_META[code].hreflang}
                className={cn(
                  'inline-flex h-8 min-w-[2.25rem] items-center justify-center text-center rounded-sm border px-2.5 text-xs font-semibold tracking-wider uppercase transition-colors tap',
                  code === locale
                    ? 'border-red-500 bg-red-600 text-white shadow-xs'
                    : 'border-cream/25 text-cream/75 hover:border-cream/60 hover:text-cream',
                )}
              >
                <span className="flex items-center justify-center leading-none">
                  {LOCALE_META[code].abbr}
                </span>
              </Link>
            ))}
          </motion.nav>
        </header>

        {/* ── Main content ─────────────────────────────────────────────────── */}
        <div className="relative z-10 shell grid flex-1 items-center gap-10 py-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <motion.div
            initial={reduced ? false : { opacity: 0, x: isRtl ? 56 : -56 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.85, delay: appear(0.12), ease: EASE }}
            className="max-w-2xl"
          >
            {/* En-tête Bienvenue et Présentation de la Société en grand */}
            <div className="space-y-3">
              <span className="inline-block text-xs font-mono font-bold uppercase tracking-[0.22em] text-red-500">
                SARL VOLAGRO • NUTRITION ANIMALE & AVICULTURE
              </span>
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-cream drop-shadow-md">
                {pick(WELCOME.greeting, locale)}
              </h1>
              <div className="border-s-4 border-red-600 ps-4 py-1">
                <p className="font-display text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white leading-snug drop-shadow-sm">
                  {pick(WELCOME_MESSAGE.header, locale)}
                </p>
                <p className="mt-1 font-sans text-sm sm:text-base font-medium text-cream/90 leading-relaxed max-w-2xl">
                  {pick(WELCOME_MESSAGE.p1, locale)}
                </p>
              </div>
            </div>

            {/* Message déroulant sans fond opaque (transparent, aérien et lisible) */}
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: appear(0.4), ease: EASE }}
              className="mt-6 max-w-2xl border-t border-b border-white/15 py-4 backdrop-blur-[2px]"
            >
              {/* Message scrollable container avec défilement ultra-doux */}
              <div
                ref={scrollContainerRef}
                className="custom-scrollbar max-h-[38vh] space-y-5 overflow-y-auto pe-3 text-sm leading-relaxed text-cream/90 md:max-h-[42vh] md:text-[0.9375rem]"
              >
                <p className="font-display text-lg font-bold text-red-400">
                  {pick(WELCOME_MESSAGE.salutation, locale)}
                </p>

                <p className="font-sans leading-relaxed text-cream/95">
                  {pick(WELCOME_MESSAGE.p2, locale)}
                </p>

                <p className="font-sans leading-relaxed text-cream/90">
                  {pick(WELCOME_MESSAGE.p3, locale)}
                </p>

                {/* 3 Volets : Clients, Partenaires, Prospects sans arrondi ni fond blanc */}
                <div className="grid gap-3 pt-2">
                  <div className="border-s-2 border-red-500 bg-black/40 p-4 border-t border-e border-b border-white/10">
                    <p className="text-xs font-bold uppercase tracking-wider text-red-400 font-display">
                      {pick(WELCOME_MESSAGE.clientsTitle, locale)}
                    </p>
                    <p className="mt-1.5 text-xs leading-relaxed text-cream/85 font-sans">
                      {pick(WELCOME_MESSAGE.clientsBody, locale)}
                    </p>
                  </div>

                  <div className="border-s-2 border-emerald-500 bg-black/40 p-4 border-t border-e border-b border-white/10">
                    <p className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-display">
                      {pick(WELCOME_MESSAGE.partnersTitle, locale)}
                    </p>
                    <p className="mt-1.5 text-xs leading-relaxed text-cream/85 font-sans">
                      {pick(WELCOME_MESSAGE.partnersBody, locale)}
                    </p>
                  </div>

                  <div className="border-s-2 border-amber-500 bg-black/40 p-4 border-t border-e border-b border-white/10">
                    <p className="text-xs font-bold uppercase tracking-wider text-amber-400 font-display">
                      {pick(WELCOME_MESSAGE.prospectsTitle, locale)}
                    </p>
                    <p className="mt-1.5 text-xs leading-relaxed text-cream/85 font-sans">
                      {pick(WELCOME_MESSAGE.prospectsBody, locale)}
                    </p>
                  </div>
                </div>

                <p className="font-serif italic text-cream/70 pt-2 text-sm border-t border-white/10">
                  {pick(WELCOME_MESSAGE.closing, locale)}
                </p>

                {/* Signataire */}
                <div className="flex items-center justify-between pt-3 border-t border-white/15">
                  <div>
                    <p className="font-display text-base font-bold tracking-wide text-white">
                      {WELCOME_MESSAGE.signatory.name}
                    </p>
                    <p className="text-xs font-bold text-red-400 uppercase tracking-wider">
                      {pick(WELCOME_MESSAGE.signatory.role, locale)}
                    </p>
                  </div>
                  <div className="h-[2px] w-16 bg-red-600" />
                </div>
              </div>
            </motion.div>

            {/* Bouton d'entrée explicite */}
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: appear(0.65), ease: EASE }}
              className="mt-6 flex items-center gap-4"
            >
              <button
                type="button"
                onClick={enter}
                className="group relative inline-flex items-center justify-center overflow-hidden rounded-sm bg-red-600 px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-white shadow-lg shadow-red-600/30 transition-all duration-300 hover:bg-red-700 hover:shadow-red-600/50 hover:scale-[1.02] active:scale-[0.98] tap cursor-pointer"
              >
                <span>{pick(WELCOME.cta, locale)}</span>
              </button>
            </motion.div>
          </motion.div>

          {/* ── Animal collage: same asset and treatment as the home hero ──── */}
          <motion.div
            initial={reduced ? false : { opacity: 0, x: isRtl ? -64 : 64, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.95, delay: appear(0.25), ease: EASE }}
            className="relative mx-auto -mt-2 w-full max-w-[17rem] sm:max-w-[22rem] lg:mt-0 lg:max-w-none"
          >
            <div className="animate-glow-pulse absolute inset-[-6%] rounded-full bg-[radial-gradient(circle,rgba(220,38,38,0.32)_0%,rgba(41,114,80,0.22)_45%,transparent_70%)]" />
            <div className="animate-float">
              <Image
                src="/images/logo/volagro-animaux.png"
                alt={pick(WELCOME.backgroundAlt, locale)}
                width={562}
                height={448}
                priority
                sizes="(min-width: 1024px) 40vw, 75vw"
                className="relative h-auto w-full drop-shadow-[0_30px_60px_rgba(0,0,0,0.5)]"
              />
            </div>
          </motion.div>
        </div>

        {/* ── Bottom bar: address, phone, auto-entry progress ───────────────── */}
        <motion.footer
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: appear(0.7) }}
          className="relative z-10 shell flex flex-col gap-4 pb-6 text-xs text-cream/60 md:flex-row md:items-center md:justify-between"
        >
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span className="inline-flex items-center gap-2">
              <Glyph name="pin" size={14} />
              {pick(SITE_ADDRESS.full, locale)}
            </span>
            <a
              href={telHref(PRIMARY_PHONE)}
              className="inline-flex items-center gap-2 transition-colors hover:text-cream"
            >
              <Glyph name="phone" size={14} />
              {PRIMARY_PHONE.display}
            </a>
          </div>

          <div className="flex items-center gap-3">
            <span className="tracking-wide">
              {pick(WELCOME.autoPrefix, locale)} {seconds}s
            </span>
            <span aria-hidden="true" className="relative h-[2px] w-24 overflow-hidden bg-cream/20">
              <motion.span
                className="absolute inset-y-0 start-0 w-full bg-red-500"
                style={{ transformOrigin: isRtl ? 'right' : 'left' }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: AUTO_ENTER_SECONDS, ease: 'linear' }}
              />
            </span>
          </div>
        </motion.footer>
      </motion.div>

      <WelcomeSplash label={pick(WELCOME.splashLabel, locale)} />

      {/* Soft exit fade: the overlay reaches full charcoal, then home replaces it. */}
      <AnimatePresence>
        {leaving ? (
          <motion.div
            key="welcome-exit"
            aria-hidden="true"
            className="fixed inset-0 z-[90] bg-charcoal-950"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4, ease: EASE }}
          />
        ) : null}
      </AnimatePresence>
    </section>
  );
};
