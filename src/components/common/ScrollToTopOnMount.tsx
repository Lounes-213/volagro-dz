'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Intelligent scroll manager:
 * 1. When entering fresh or navigating forward to a new page, lands instantly at top (0, 0)
 *    without visible smooth-scrolling lag.
 * 2. When pressing the browser Back or Forward button ("nweli luur"), immediately restores
 *    the exact previous scroll position without any scroll animation.
 */
export const ScrollToTopOnMount = () => {
  const pathname = usePathname();
  const isPopStateRef = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    const handlePopState = () => {
      isPopStateRef.current = true;
    };

    let scrollTimeout: ReturnType<typeof setTimeout> | null = null;
    const handleScroll = () => {
      if (scrollTimeout) return;
      scrollTimeout = setTimeout(() => {
        scrollTimeout = null;
        try {
          sessionStorage.setItem(
            `vg_scroll_${window.location.pathname}`,
            window.scrollY.toString(),
          );
        } catch {
          /* private browsing / quota exceeded */
        }
      }, 80);
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (isPopStateRef.current) {
      // User navigated via BACK or FORWARD button
      isPopStateRef.current = false;

      let savedY: number | null = null;
      try {
        const item = sessionStorage.getItem(`vg_scroll_${pathname}`);
        if (item !== null) {
          savedY = parseInt(item, 10);
        }
      } catch {
        /* storage access denied */
      }

      if (savedY !== null && !Number.isNaN(savedY)) {
        const targetY = savedY;
        // Instant restore without smooth scroll animation
        window.scrollTo({ top: targetY, left: 0, behavior: 'instant' });

        // Double check on next frame & after brief render tick in case images/hydration shift height
        requestAnimationFrame(() => {
          window.scrollTo({ top: targetY, left: 0, behavior: 'instant' });
        });

        const timer = setTimeout(() => {
          window.scrollTo({ top: targetY, left: 0, behavior: 'instant' });
        }, 60);

        return () => clearTimeout(timer);
      }
    } else {
      // Fresh entry or forward link click
      if (!window.location.hash) {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      }
    }
  }, [pathname]);

  return null;
};
