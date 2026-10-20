'use client';

import { useState } from 'react';
import { GALLERY_PHOTOS, type PhotoCategory } from '@content/images.manifest';
import { GALLERY_TEASER } from '@content/home';
import { UI } from '@content/ui';
import { pick } from '@content/types';
import Image from 'next/image';
import { Figure } from '@/components/ui/Figure';
import { InlineLink } from '@/components/ui/Button';
import { Reveal, RevealItem } from '@/components/motion/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Glyph } from '@/components/icons/Glyph';
import { Lightbox } from '@/components/gallery/Lightbox';
import type { Locale } from '@/lib/i18n/config';
import { cn } from '@/lib/utils/cn';

/**
 * The home page's photographic proof.
 *
 * These are the client's REAL photographs, recovered from the legacy gallery (see
 * `scripts/extract-legacy-photos.ts`). Nothing here is generated — the brief is
 * unambiguous that people, facilities and TECHNA moments must never be.
 *
 * The layout is a contact sheet with two oversized frames, so eleven images of
 * three different aspect ratios read as one composition instead of a loose grid.
 * The first frame is `priority`: it is the LCP element of this section.
 */
const FEATURE_IDS = new Set(['photo.legacy.06', 'photo.legacy.02']);

export const GalleryTeaser = ({ locale }: { readonly locale: Locale }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const photos = GALLERY_PHOTOS.slice(0, 7);

  const categoryLabels: Record<PhotoCategory, { fr: string; ar: string; en: string }> = {
    unites: { fr: 'Unités industrielles', ar: 'المنشآت الصناعية', en: 'Industrial Units' },
    salons: { fr: 'Salons & Foires', ar: 'المعارض والصالونات', en: 'Trade Fairs' },
    evenements: { fr: 'Événements & TECHNA', ar: 'الملتقيات وشراكة TECHNA', en: 'Events & TECHNA' },
    equipes: { fr: 'Équipes & Éleveurs', ar: 'الفرق والمربون', en: 'Teams & Farmers' },
  };

  const realBadgeLabel = pick({ fr: 'Photo réelle d’archive', ar: 'صورة أرشيف حقيقية', en: 'Real archive photo' }, locale);

  return (
    <section className="shell section" aria-labelledby="gallery-teaser-title">
      <SectionHeading
        eyebrow={pick(UI.gallery, locale)}
        title={pick(GALLERY_TEASER.title, locale)}
        lead={pick(GALLERY_TEASER.lead, locale)}
        locale={locale}
        id="gallery-teaser-title"
        action={
          <InlineLink href="/galerie">
            {pick(UI.everything, locale)}
          </InlineLink>
        }
      />

      <Reveal
        stagger={0.05}
        className="mt-12 grid auto-rows-[10rem] grid-cols-2 gap-3 md:auto-rows-[11rem] lg:auto-rows-[12rem] lg:grid-cols-4"
      >
        {photos.map((photo, index) => {
          const isFeature = FEATURE_IDS.has(photo.id);
          return (
            <RevealItem
              key={photo.id}
              as="figure"
              onClick={() => setSelectedIndex(index)}
              className={cn(
                'group relative overflow-hidden rounded-card cursor-pointer',
                isFeature && 'row-span-2',
                // The first frame opens the composition and gives the grid its rhythm.
                index === 0 && 'col-span-2',
              )}
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
              <Figure
                slot={photo.id}
                locale={locale}
                mode="fill"
                priority={index === 0}
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                imageClassName="transition-transform duration-700 ease-industrial group-hover:scale-[1.04]"
              />
              
              {/* Hover Overlay with expand hint */}
              <div className="absolute inset-0 bg-charcoal-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-charcoal-950/75 text-cream backdrop-blur-xs shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                  <Glyph name="maximize" size={18} />
                </span>
              </div>

              {/* Scrim + caption: the only way a photograph stays legible under
                  text without washing the image out. */}
              <figcaption className="scrim pointer-events-none absolute inset-x-0 bottom-0 p-4 pt-12">
                <span className="text-cream/90 line-clamp-2 text-xs leading-snug">
                  {pick(photo.caption, locale)}
                </span>
              </figcaption>
            </RevealItem>
          );
        })}

        {/* A tile that explains what the remaining frames are, rather than
            stretching a photograph to fill a hole in the grid. */}
        <RevealItem className="bg-charcoal-800 text-cream relative flex flex-col justify-between rounded-card p-5">
          <div className="relative h-10 w-10 overflow-hidden rounded-lg border border-cream/20 shadow-xs">
            <Image
              src="/images/species/chick.jpg"
              alt="Volagro Galerie"
              fill
              className="object-cover"
              sizes="40px"
            />
          </div>
          <div>
            <p className="font-display text-d4 text-cream">
              {GALLERY_PHOTOS.length}{' '}
              {pick({ fr: 'photos', ar: 'صورة', en: 'photographs' }, locale)}
            </p>
            <InlineLink href="/galerie" className="mt-3 text-cream hover:text-cream/80">
              {pick(UI.everything, locale)}
            </InlineLink>
          </div>
        </RevealItem>
      </Reveal>

      <Lightbox
        photos={photos}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
        locale={locale}
        categoryLabels={categoryLabels}
        realBadgeLabel={realBadgeLabel}
      />
    </section>
  );
};
