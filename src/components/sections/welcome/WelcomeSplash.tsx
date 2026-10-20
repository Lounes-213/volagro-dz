'use client';

import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useEffect, useState } from 'react';

/**
 * Quick brand splash shown on top of the welcome screen: logo + three dots,
 * gone in ~1.6s. It is deliberately silent for assistive tech (the dots are
 * decorative) but announces the loading state through visually hidden text.
 */
export const WelcomeSplash = ({ label }: { readonly label: string }) => {
  const [visible, setVisible] = useState(true);
  const reduced = useReducedMotion();

  useEffect(() => {
    const timeout = window.setTimeout(() => setVisible(false), reduced ? 500 : 1600);
    return () => window.clearTimeout(timeout);
  }, [reduced]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="welcome-splash"
          className="fixed inset-0 z-[100] grid place-items-center bg-charcoal-950"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } }}
        >
          <div className="flex flex-col items-center gap-8 px-6">
            <motion.div
              initial={reduced ? false : { opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center gap-4"
            >
              <Image
                src="/images/logo/volagro-emblem-white.svg"
                alt=""
                width={1400}
                height={1520}
                priority
                className="h-16 w-auto md:h-20"
              />
              <span className="font-display text-xl font-semibold tracking-[0.22em] text-cream">
                VOLAGRO
              </span>
            </motion.div>

            <div aria-hidden="true" className="flex items-center gap-2.5">
              {[0, 1, 2].map((index) => (
                <motion.span
                  key={index}
                  className="h-2.5 w-2.5 rounded-full bg-red-500"
                  animate={reduced ? { opacity: 1 } : { opacity: [0.3, 1, 0.3], y: [0, -5, 0] }}
                  transition={
                    reduced
                      ? undefined
                      : {
                          duration: 0.9,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: 'easeInOut',
                          delay: index * 0.15,
                        }
                  }
                />
              ))}
            </div>

            <p className="sr-only" role="status">
              {label}
            </p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};
