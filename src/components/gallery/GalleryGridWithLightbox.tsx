'use client';

import { useState } from 'react';
import type { ManifestEntry, PhotoCategory } from '@content/images.manifest';
import { pick } from '@content/types';
import { Figure } from '@/components/ui/Figure';
import { Glyph } from '@/components/icons/Glyph';
import type { Locale } from '@/lib/i18n/config';
import { Lightbox } from './Lightbox';

interface GalleryGridWithLightboxProps {
  readonly photos: readonly ManifestEntry[];
  readonly locale: Locale;
  readonly categoryLabels: Record<PhotoCategory, { fr: string; ar: string; en: string }>;
  readonly realBadgeLabel: string;
}

export const GalleryGridWithLightbox = ({
  photos,
  locale,
  categoryLabels,
  realBadgeLabel,
}: GalleryGridWithLightboxProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <>
      {/* ── Photo Gallery Grid ───────────────────────────────────────────── */}
      <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {photos.map((photo, index) => (
          <article
            key={photo.id}
            onClick={() => setSelectedIndex(index)}
            className="group bg-surface rounded-card border-line overflow-hidden border shadow-xs transition-all hover:-translate-y-1 hover:shadow-md cursor-pointer select-none"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setSelectedIndex(index);
              }
            }}
            aria-label={pick(photo.caption, locale)}
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-charcoal-900">
              <Figure
                slot={photo.id}
                locale={locale}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                imageClassName="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Hover Overlay with expand hint */}
              <div className="absolute inset-0 bg-charcoal-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-charcoal-950/75 text-cream backdrop-blur-xs shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                  <Glyph name="maximize" size={18} />
                </span>
              </div>

              {photo.category ? (
                <span className="absolute top-3 start-3 rounded-full bg-charcoal-950/80 backdrop-blur-sm px-2.5 py-1 text-[11px] font-semibold text-cream border border-white/10 pointer-events-none">
                  {pick(categoryLabels[photo.category], locale)}
                </span>
              ) : null}
            </div>

            <div className="p-5">
              <p className="text-ink text-sm font-medium leading-relaxed group-hover:text-accent transition-colors line-clamp-2">
                {pick(photo.caption, locale)}
              </p>

              <div className="mt-4 flex items-center justify-between border-t border-line/60 pt-3 text-[11px] text-ink-subtle">
                <span className="inline-flex items-center gap-1.5 text-green-700 font-medium">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-600" />
                  {realBadgeLabel}
                </span>
                <span className="font-mono text-ink-subtle">#{photo.id.replace('photo.legacy.', '')}</span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* ── Facebook-style Fullscreen Lightbox Modal ─────────────────────── */}
      <Lightbox
        photos={photos}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
        locale={locale}
        categoryLabels={categoryLabels}
        realBadgeLabel={realBadgeLabel}
      />
    </>
  );
};
