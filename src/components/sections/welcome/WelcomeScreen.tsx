'use client';

import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useCallback, useEffect, useRef, useState } from 'react';

import { IDENTITY, KEY_FIGURES, PRIMARY_PHONE, SITE_ADDRESS } from '@content/company';
import { pick } from '@content/types';
import { WELCOME } from '@content/welcome';
import { Glyph } from '@/components/icons/Glyph';
import { WelcomeSplash } from '@/components/sections/welcome/WelcomeSplash';
import { Button } from '@/components/ui/Button';
import { telHref } from '@/lib/contact-links';
import { LOCALES, LOCALE_META, dir, type Locale } from '@/lib/i18n/config';
import { Link, useRouter } from '@/lib/i18n/navigation';
import { formatFigure } from '@/lib/utils/format';
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

  const enter = useCallback(() => {
    if (leavingRef.current) return;
    leavingRef.current = true;
    setLeaving(true);
    try {
      window.sessionStorage.setItem('vg:entered-site', '1');
    } catch {
      /* private mode — the transition still works without the hint */
    }
    window.setTimeout(() => router.replace('/'), reduced ? 0 : 1050);
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

  const onPointerDown = (event: React.PointerEvent<HTMLElement>): void => {
    const target = event.target as HTMLElement;
    if (target.closest('a, button, input, select, textarea, [role="button"]')) return;
    enter();
  };

  const intro = WELCOME.intro;

  /* The splash holds the first ~0.9s; content starts underneath it and is
   * already moving when the curtain lifts, so nothing pops in fully formed. */
  const appear = (delay: number): number => (reduced ? 0 : delay + 0.8);

  return (
    <section
      onPointerDown={onPointerDown}
      className="relative isolate flex min-h-dvh cursor-pointer flex-col overflow-hidden bg-charcoal-950 text-cream"
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
                  'inline-flex items-center rounded-sm border px-3 text-xs font-semibold tracking-[0.12em] uppercase transition-colors tap',
                  code === locale
                    ? 'border-red-500 bg-red-600 text-white'
                    : 'border-cream/25 text-cream/75 hover:border-cream/60 hover:text-cream',
                )}
              >
                {LOCALE_META[code].abbr}
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
            <motion.p
              initial={reduced ? false : { opacity: 0, x: isRtl ? 32 : -32 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: appear(0.24), ease: EASE }}
              className="flex items-center gap-3 eyebrow text-cream/70"
            >
              <span
                aria-hidden="true"
                className="h-px w-9 bg-gradient-to-r from-transparent via-red-500 to-transparent"
              />
              {pick(IDENTITY.headOffice, locale)}
            </motion.p>

            <motion.h1
              initial={reduced ? false : { opacity: 0, x: isRtl ? 40 : -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: appear(0.32), ease: EASE }}
              className="mt-4 font-display text-[clamp(3.5rem,9vw,7.5rem)] leading-[0.92] tracking-[-0.02em] text-cream"
            >
              {pick(WELCOME.greeting, locale)}
            </motion.h1>

            <motion.p
              initial={reduced ? false : { opacity: 0, x: isRtl ? 36 : -36 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.75, delay: appear(0.4), ease: EASE }}
              className="mt-2 font-display text-lg font-semibold tracking-[0.16em] text-cream/85 uppercase md:text-xl"
            >
              {IDENTITY.legalName}
            </motion.p>

            <motion.div
              initial={reduced ? false : { opacity: 0, x: isRtl ? 28 : -28 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.75, delay: appear(0.5), ease: EASE }}
              className="mt-8 max-w-xl rounded-card bg-cream p-5 text-ink shadow-[0_24px_70px_-32px_rgba(0,0,0,0.75)] md:p-6"
            >
              <p className="text-[0.95rem] leading-relaxed md:text-base">{pick(intro, locale)}</p>

              <dl className="mt-5 grid grid-cols-3 gap-4 border-t border-line pt-4">
                {KEY_FIGURES.slice(0, 3).map((figure) => (
                  <div key={figure.id} className="flex flex-col-reverse gap-1">
                    <dt className="text-[0.65rem] leading-snug font-semibold tracking-[0.1em] text-ink-subtle uppercase">
                      {pick(figure.label, locale)}
                    </dt>
                    <dd className="flex flex-wrap items-baseline gap-x-1.5 font-display text-2xl leading-none font-semibold text-ink md:text-3xl">
                      {formatFigure(figure.value, locale, figure.kind)}
                      {figure.suffix ? (
                        <span className="font-sans text-[0.65rem] font-medium tracking-normal text-ink-subtle">
                          {pick(figure.suffix, locale)}
                        </span>
                      ) : null}
                    </dd>
                  </div>
                ))}
              </dl>
            </motion.div>

            <motion.div
              initial={reduced ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: appear(0.62), ease: EASE }}
              className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center"
            >
              <Button size="lg" onClick={enter} icon={<Glyph name="arrow" size={18} />}>
                {pick(WELCOME.cta, locale)}
              </Button>
              <p className="text-sm text-cream/55">{pick(WELCOME.clickHint, locale)}</p>
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
