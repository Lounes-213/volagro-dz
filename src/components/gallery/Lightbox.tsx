'use client';

import { useEffect, useCallback } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import type { ManifestEntry, PhotoCategory } from '@content/images.manifest';
import { pick } from '@content/types';
import { Glyph } from '@/components/icons/Glyph';
import { resolveImage } from '@/lib/images';
import type { Locale } from '@/lib/i18n/config';

export interface LightboxProps {
  readonly photos: readonly ManifestEntry[];
  readonly selectedIndex: number | null;
  readonly setSelectedIndex: Dispatch<SetStateAction<number | null>>;
  readonly locale: Locale;
  readonly categoryLabels: Record<PhotoCategory, { fr: string; ar: string; en: string }>;
  readonly realBadgeLabel: string;
}

export const Lightbox = ({
  photos,
  selectedIndex,
  setSelectedIndex,
  locale,
  categoryLabels,
  realBadgeLabel,
}: LightboxProps) => {
  const isRtl = locale === 'ar';

  const closeLightbox = useCallback(() => {
    setSelectedIndex(null);
  }, [setSelectedIndex]);

  const showNext = useCallback(() => {
    setSelectedIndex((prev) => (prev !== null ? (prev + 1) % photos.length : null));
  }, [photos.length, setSelectedIndex]);

  const showPrev = useCallback(() => {
    setSelectedIndex((prev) =>
      prev !== null ? (prev - 1 + photos.length) % photos.length : null,
    );
  }, [photos.length, setSelectedIndex]);

  useEffect(() => {
    if (selectedIndex === null) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') isRtl ? showPrev() : showNext();
      if (e.key === 'ArrowLeft') isRtl ? showNext() : showPrev();
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [selectedIndex, isRtl, closeLightbox, showNext, showPrev]);

  if (selectedIndex === null) return null;

  const activePhoto = photos[selectedIndex];
  if (!activePhoto) return null;

  const activeImage = resolveImage(activePhoto.id, locale);

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-100 flex flex-col items-center justify-between bg-black/95 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
      onClick={closeLightbox}
    >
      {/* Top Bar: Counter & Close button */}
      <div
        className="w-full flex items-center justify-between p-4 sm:p-5 text-white z-50 pointer-events-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3">
          <span className="text-xs sm:text-sm font-mono text-white/70">
            {selectedIndex + 1} / {photos.length}
          </span>
          {activePhoto.category && (
            <span className="hidden sm:inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white/90">
              {pick(categoryLabels[activePhoto.category], locale)}
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={closeLightbox}
          className="tap flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white hover:bg-accent hover:text-white transition-colors"
          aria-label="Fermer"
        >
          <Glyph name="close" size={20} />
        </button>
      </div>

      {/* Center Stage: Image + Navigation Arrows */}
      <div
        className="relative flex-1 w-full max-w-6xl flex items-center justify-center px-4 sm:px-16 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Prev Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            showPrev();
          }}
          className="tap absolute start-3 sm:start-6 z-40 flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-charcoal-900/80 hover:bg-accent text-white backdrop-blur-xs border border-white/10 shadow-xl transition-all hover:scale-105 active:scale-95"
          aria-label="Photo précédente"
        >
          <Glyph name="chevron" size={22} className="rotate-90 flip-rtl" />
        </button>

        {/* Centered Image */}
        <div className="relative flex items-center justify-center max-h-[72vh] max-w-full">
          {activeImage.status === 'ready' ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={activeImage.src}
              alt={activeImage.alt}
              className="max-h-[68vh] sm:max-h-[72vh] max-w-[90vw] sm:max-w-4xl w-auto h-auto object-contain rounded-xs shadow-2xl select-none"
            />
          ) : (
            <div className="aspect-[4/3] w-96 rounded-card bg-charcoal-800 flex items-center justify-center text-white/60 p-6 text-center">
              {activeImage.alt}
            </div>
          )}
        </div>

        {/* Next Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            showNext();
          }}
          className="tap absolute end-3 sm:end-6 z-40 flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-charcoal-900/80 hover:bg-accent text-white backdrop-blur-xs border border-white/10 shadow-xl transition-all hover:scale-105 active:scale-95"
          aria-label="Photo suivante"
        >
          <Glyph name="chevron" size={22} className="-rotate-90 flip-rtl" />
        </button>
      </div>

      {/* Bottom Caption Bar ("txt ththa kima facebook") */}
      <div
        className="w-full max-w-3xl px-6 py-4 sm:pb-6 text-center z-50 pointer-events-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-white text-sm sm:text-base font-medium leading-relaxed drop-shadow-md">
          {pick(activePhoto.caption, locale)}
        </p>
        <div className="mt-2 flex items-center justify-center gap-3 text-xs text-white/65">
          <span className="inline-flex items-center gap-1.5 text-green-400 font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
            {realBadgeLabel}
          </span>
          <span>·</span>
          <span className="font-mono">#{activePhoto.id.replace('photo.legacy.', '')}</span>
        </div>
      </div>
    </div>
  );
};
