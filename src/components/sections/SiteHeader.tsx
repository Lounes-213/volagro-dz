'use client';

import Image from 'next/image';
import { useAnimate, useReducedMotion } from 'motion/react';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

import { PRIMARY_PHONE } from '@content/company';
import { NAV_PRIMARY, NAV_SECONDARY, type NavItem } from '@content/navigation';
import { UI } from '@content/ui';
import { pick } from '@content/types';
import { Glyph } from '@/components/icons/Glyph';
import { LanguageSwitcher } from '@/components/sections/LanguageSwitcher';
import { telHref } from '@/lib/contact-links';
import type { Locale } from '@/lib/i18n/config';
import { Link, usePathname } from '@/lib/i18n/navigation';
import { cn } from '@/lib/utils/cn';

const MENU_PANEL_ID = 'header-mega-panel';

const useIsoLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

/** next-intl strips the locale prefix; trailing slashes are normalised here. */
const normalizePath = (value: string): string => {
  const trimmed = value.replace(/\/+$/, '');
  return trimmed === '' ? '/' : trimmed;
};

const isItemActive = (href: string, pathname: string): boolean => {
  const current = normalizePath(pathname);
  const target = normalizePath(href);
  return target === '/' ? current === '/' : current === target || current.startsWith(`${target}/`);
};

export const SiteHeader = ({ locale }: { readonly locale: Locale }) => {
  const pathname = usePathname();
  const reduced = useReducedMotion() === true;
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  /*
   * The welcome screen leaves a one-shot hint before handing over. Reading it in
   * a lazy initializer lets the header play its entrance on the first frame
   * after hydration, so the hand-off reads as one continuous motion.
   */
  const [arriving] = useState(() => {
    if (typeof window === 'undefined') return false;
    try {
      const flag = window.sessionStorage.getItem('vg:entered-site') === '1';
      if (flag) window.sessionStorage.removeItem('vg:entered-site');
      return flag;
    } catch {
      return false;
    }
  });
  const [headerScope, animateHeader] = useAnimate<HTMLElement>();

  useIsoLayoutEffect(() => {
    if (!arriving || reduced || !headerScope.current) return;
    animateHeader(
      headerScope.current,
      { y: [-72, 0], opacity: [0, 1] },
      { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    );
  }, [arriving, reduced, animateHeader, headerScope]);

  /*
   * Menu state is STAMPED WITH THE PATHNAME it was opened on, and read through a
   * derivation. Changing route therefore closes both the mega-menu and the sheet
   * without an effect that calls setState on navigation — which is both a
   * cascading render and the classic source of a panel floating over the next
   * page for one frame.
   */
  const [menu, setMenu] = useState<{ id: string | null; at: string }>({ id: null, at: pathname });
  const [sheet, setSheet] = useState<{ open: boolean; at: string }>({
    open: false,
    at: pathname,
  });

  const openMenu = menu.at === pathname ? menu.id : null;
  const sheetOpen = sheet.at === pathname && sheet.open;
  const setOpenMenu = (id: string | null): void => setMenu({ id, at: pathname });
  const setSheetOpen = (open: boolean): void => setSheet({ open, at: pathname });

  useEffect(() => {
    const onScroll = (): void => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Escape closes the mega-menu and the sheet; the sheet also locks scroll. */
  useEffect(() => {
    const onKey = (event: KeyboardEvent): void => {
      if (event.key !== 'Escape') return;
      setOpenMenu(null);
      setSheetOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (!sheetOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [sheetOpen]);

  const scheduleClose = (): void => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 160);
  };
  const cancelClose = (): void => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  const phone = PRIMARY_PHONE;
  const activeItem = NAV_PRIMARY.find((item) => item.id === openMenu && item.groups);

  return (
    <>
      <header
        ref={headerScope}
        className={cn(
          'sticky top-0 z-60 bg-surface/92 backdrop-blur-md transition-shadow duration-200',
          scrolled ? 'border-b border-line shadow-sm' : 'border-b border-transparent',
        )}
      >
        <div className="h-[3px] w-full bg-red-600" />
        <div className="shell-wide flex h-16 items-center justify-between gap-4 lg:h-[76px]">
          <Link
            href="/"
            className="-ms-2 flex items-center pe-2 tap"
            aria-label={`${pick(UI.menu, locale)} — VOLAGRO`}
          >
            <Image
              src="/images/logo/volagro-lockup.png"
              alt="VOLAGRO"
              width={197}
              height={40}
              priority
              className="h-8 w-auto md:h-9"
            />
          </Link>

          {/* ── Desktop navigation ─────────────────────────────────────────── */}
          <nav aria-label={pick(UI.menu, locale)} className="hidden items-center gap-0.5 lg:flex">
            {NAV_PRIMARY.map((item) => (
              <DesktopNavItem
                key={item.id}
                item={item}
                locale={locale}
                active={isItemActive(item.href, pathname)}
                isOpen={openMenu === item.id}
                onOpen={() => {
                  cancelClose();
                  setOpenMenu(item.groups ? item.id : null);
                }}
                onScheduleClose={scheduleClose}
                onToggle={() => setOpenMenu(openMenu === item.id ? null : item.id)}
              />
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <LanguageSwitcher className="hidden lg:flex" />

            <a
              href={telHref(phone)}
              aria-label={`${pick(UI.callNow, locale)} — ${phone.display}`}
              title={phone.display}
              className="hidden h-11 w-11 items-center justify-center rounded-sm border border-line-strong transition-colors hover:border-accent hover:text-accent lg:inline-flex"
            >
              <Glyph name="phone" size={17} />
            </a>

            {NAV_SECONDARY.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="hidden h-11 items-center rounded-sm bg-red-600 px-5 text-sm font-medium text-white shadow-sm shadow-red-950/20 transition-colors hover:bg-red-700 active:bg-red-800 lg:inline-flex"
              >
                {pick(item.label, locale)}
              </Link>
            ))}

            <button
              type="button"
              onClick={() => setSheetOpen(true)}
              aria-expanded={sheetOpen}
              aria-controls="mobile-nav-sheet"
              className="inline-flex h-11 w-11 items-center justify-center rounded-sm border border-line-strong lg:hidden"
              aria-label={pick(UI.openMenu, locale)}
            >
              <Glyph name="menu" size={22} />
            </button>
          </div>
        </div>

        {/* ── Mega-menu panel ─────────────────────────────────────────────── */}
        {activeItem?.groups ? (
          <div
            id={MENU_PANEL_ID}
            onMouseEnter={cancelClose}
            onMouseLeave={scheduleClose}
            className="absolute inset-x-0 top-full hidden border-y border-line bg-surface lg:block"
          >
            <div className="shell-wide grid grid-cols-[1fr_1fr_auto] gap-10 py-9">
              {activeItem.groups.map((group) => (
                <div key={group.id}>
                  <p className="eyebrow text-ink-subtle">{pick(group.label, locale)}</p>
                  <ul className="mt-4 grid gap-0.5">
                    {group.children.map((child) => (
                      <li key={child.id}>
                        <Link
                          href={child.href}
                          className="group -mx-3 block rounded-xs px-3 py-2.5 hover:bg-surface-sunken"
                        >
                          <span className="block text-[0.9375rem] font-medium transition-colors group-hover:text-accent">
                            {pick(child.label, locale)}
                          </span>
                          {child.description ? (
                            <span className="mt-0.5 block text-xs text-ink-muted">
                              {pick(child.description, locale)}
                            </span>
                          ) : null}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              <div className="w-[15rem] border-s border-line ps-8">
                <p className="text-d4">{pick(UI.requestQuote, locale)}</p>
                <p className="mt-2 text-sm text-ink-muted">{pick(activeItem.label, locale)}</p>
                <Link
                  href="/contact"
                  className="mt-5 inline-flex h-11 items-center rounded-sm bg-red-600 px-5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-red-700 active:bg-red-800"
                >
                  {pick(UI.contact, locale)}
                </Link>
              </div>
            </div>
          </div>
        ) : null}
      </header>

      {/* ── Mobile bottom sheet ───────────────────────────────────────────── */}
      {sheetOpen ? (
        <div className="fixed inset-0 z-70 lg:hidden">
          <button
            type="button"
            aria-label={pick(UI.close, locale)}
            onClick={() => setSheetOpen(false)}
            className="absolute inset-0 h-full w-full bg-charcoal-950/45"
          />
          <div
            id="mobile-nav-sheet"
            role="dialog"
            aria-modal="true"
            aria-label={pick(UI.menu, locale)}
            className="absolute inset-x-0 bottom-0 max-h-[88dvh] overflow-y-auto rounded-t-xl bg-surface pb-8 shadow-lg"
          >
            <div className="sticky top-0 flex items-center justify-between border-b border-line bg-surface px-5 py-4">
              <span className="eyebrow">{pick(UI.menu, locale)}</span>
              <button
                type="button"
                onClick={() => setSheetOpen(false)}
                className="flex h-11 w-11 items-center justify-center rounded-sm border border-line tap"
                aria-label={pick(UI.close, locale)}
              >
                <Glyph name="close" size={20} />
              </button>
            </div>

            <nav className="px-5 py-4" aria-label={pick(UI.menu, locale)}>
              <ul>
                {NAV_PRIMARY.map((item) => (
                  <li key={item.id} className="border-b border-line last:border-0">
                    {item.groups ? (
                      <details className="group">
                        <summary
                          className={cn(
                            'flex min-h-14 cursor-pointer list-none items-center justify-between py-3 text-lg font-medium',
                            isItemActive(item.href, pathname) && 'text-accent',
                          )}
                        >
                          {pick(item.label, locale)}
                          <Glyph
                            name="chevron"
                            size={20}
                            className="text-ink-subtle transition-transform group-open:rotate-180"
                          />
                        </summary>
                        <div className="pb-3">
                          <Link
                            href={item.href}
                            className="block min-h-11 py-2 text-sm font-medium text-accent"
                          >
                            {pick(UI.seeAllProducts, locale)}
                          </Link>
                          {item.groups.map((group) => (
                            <div key={group.id} className="mt-3">
                              <p className="eyebrow text-ink-subtle">{pick(group.label, locale)}</p>
                              <ul className="mt-1">
                                {group.children.map((child) => (
                                  <li key={child.id}>
                                    <Link
                                      href={child.href}
                                      aria-current={
                                        isItemActive(child.href, pathname) ? 'page' : undefined
                                      }
                                      className={cn(
                                        'flex min-h-11 items-center py-2 text-[0.9375rem]',
                                        isItemActive(child.href, pathname) && 'text-accent',
                                      )}
                                    >
                                      {pick(child.label, locale)}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </details>
                    ) : (
                      <Link
                        href={item.href}
                        aria-current={isItemActive(item.href, pathname) ? 'page' : undefined}
                        className={cn(
                          'flex min-h-14 items-center py-3 text-lg font-medium',
                          isItemActive(item.href, pathname) && 'text-accent',
                        )}
                      >
                        {pick(item.label, locale)}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex items-center justify-between">
                <span className="eyebrow">{pick(UI.language, locale)}</span>
                <LanguageSwitcher />
              </div>

              <div className="mt-6 grid gap-3">
                <a
                  href={telHref(phone)}
                  className="flex h-12 items-center justify-center gap-2 rounded-sm border border-line-strong font-medium"
                >
                  <Glyph name="phone" size={18} />
                  <span className="tnum">{phone.display}</span>
                </a>
                <Link
                  href="/contact"
                  className="flex h-12 items-center justify-center rounded-sm bg-red-600 font-medium text-white shadow-sm transition-colors hover:bg-red-700 active:bg-red-800"
                >
                  {pick(UI.requestQuote, locale)}
                </Link>
              </div>
            </nav>
          </div>
        </div>
      ) : null}
    </>
  );
};

/* ── Desktop nav item ─────────────────────────────────────────────────────── */

interface DesktopNavItemProps {
  readonly item: NavItem;
  readonly locale: Locale;
  readonly active: boolean;
  readonly isOpen: boolean;
  readonly onOpen: () => void;
  readonly onScheduleClose: () => void;
  readonly onToggle: () => void;
}

const DesktopNavItem = ({
  item,
  locale,
  active,
  isOpen,
  onOpen,
  onScheduleClose,
  onToggle,
}: DesktopNavItemProps) => {
  const label = pick(item.label, locale);
  const shared =
    'inline-flex h-11 items-center rounded-xs px-3 text-[0.9375rem] font-medium transition-colors';

  if (!item.groups) {
    return (
      <Link
        href={item.href}
        aria-current={active ? 'page' : undefined}
        className={cn(shared, 'hover:text-accent', active && 'text-accent')}
      >
        {label}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onMouseEnter={onOpen}
      onMouseLeave={onScheduleClose}
      onFocus={onOpen}
      onClick={onToggle}
      aria-expanded={isOpen}
      aria-controls={MENU_PANEL_ID}
      aria-current={active ? 'page' : undefined}
      className={cn(shared, 'gap-1.5 hover:text-accent', (isOpen || active) && 'text-accent')}
    >
      {label}
      <Glyph
        name="chevron"
        size={16}
        className={cn('transition-transform duration-200', isOpen && 'rotate-180')}
      />
    </button>
  );
};
