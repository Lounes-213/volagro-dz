'use client';

import { useState } from 'react';
import type { ManifestEntry, PhotoCategory } from '@content/images.manifest';
import { pick } from '@content/types';
import { Figure } from '@/components/ui/Figure';
import { Glyph } from '@/components/icons/Glyph';
import type { Locale } from '@/lib/i18n/config';
import { Lightbox } from './Lightbox';
import { VOLAGRO_VIDEOS, type MediaVideoItem } from '@/components/sections/VideoCardsGrid';

interface MediaExplorerProps {
  readonly photos: readonly ManifestEntry[];
  readonly locale: Locale;
  readonly categoryLabels: Record<PhotoCategory, { fr: string; ar: string; en: string }>;
  readonly realBadgeLabel: string;
}

type ViewMode = 'split' | 'photos' | 'videos';

export const MediaExplorer = ({
  photos,
  locale,
  categoryLabels,
  realBadgeLabel,
}: MediaExplorerProps) => {
  const [viewMode, setViewMode] = useState<ViewMode>('split');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [fullscreenVideo, setFullscreenVideo] = useState<MediaVideoItem | null>(null);

  return (
    <div className="mt-8">
      {/* ── Mode selector bar ────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-4">
        <div className="inline-flex rounded-none border border-line bg-surface p-1 shadow-xs">
          <button
            type="button"
            onClick={() => setViewMode('split')}
            className={`inline-flex items-center gap-2 rounded-none px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider transition-all tap ${
              viewMode === 'split'
                ? 'bg-red-600 text-white shadow-xs'
                : 'text-ink-muted hover:text-ink'
            }`}
          >
            {locale === 'ar' ? 'عرض متزامن (صور + فيديو)' : 'Vue combinée (Photos & Vidéos)'}
          </button>

          <button
            type="button"
            onClick={() => setViewMode('photos')}
            className={`inline-flex items-center gap-2 rounded-none px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider transition-all tap ${
              viewMode === 'photos'
                ? 'bg-green-700 text-white shadow-xs'
                : 'text-ink-muted hover:text-ink'
            }`}
          >
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {locale === 'ar' ? `كل الصور (${photos.length})` : `Photos seules (${photos.length})`}
          </button>

          <button
            type="button"
            onClick={() => setViewMode('videos')}
            className={`inline-flex items-center gap-2 rounded-none px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider transition-all tap ${
              viewMode === 'videos'
                ? 'bg-red-600 text-white shadow-xs'
                : 'text-ink-muted hover:text-ink'
            }`}
          >
            <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
            {locale === 'ar' ? `كل الفيديوهات (${VOLAGRO_VIDEOS.length})` : `Vidéos seules (${VOLAGRO_VIDEOS.length})`}
          </button>
        </div>

        <span className="text-xs text-ink-subtle hidden sm:inline-block">
          {locale === 'ar'
            ? 'انقر على أي صورة أو فيديو للمشاهدة بملء الشاشة'
            : 'Cliquez sur un élément pour agrandir en plein écran'}
        </span>
      </div>

      {/* ── Main display according to viewMode ──────────────────────── */}
      {viewMode === 'split' ? (
        <div className="mt-8 grid gap-10 lg:grid-cols-2 items-start">
          {/* Colonne Gauche : Photos réelles */}
          <section className="flex flex-col">
            <div className="flex items-center justify-between border-b border-line pb-3">
              <div className="flex items-center gap-2 border-s-2 border-green-700 ps-2.5">
                <svg className="h-4 w-4 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <h3 className="font-display text-lg font-bold text-ink">
                  {locale === 'ar' ? 'معرض الصور الأرشيفية' : 'Photographies d’Archives'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setViewMode('photos')}
                className="text-xs font-semibold text-green-700 hover:underline"
              >
                {locale === 'ar' ? 'فتح الصور كاملة' : 'Ouvrir en grand'} &rarr;
              </button>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {photos.slice(0, 6).map((photo, index) => (
                <article
                  key={photo.id}
                  onClick={() => setSelectedPhotoIndex(index)}
                  className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-none border border-line bg-charcoal-900 shadow-xs transition-transform hover:-translate-y-1"
                >
                  <Figure
                    slot={photo.id}
                    locale={locale}
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    imageClassName="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-charcoal-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="flex h-9 w-9 items-center justify-center rounded-none bg-black/75 text-white">
                      <Glyph name="maximize" size={14} />
                    </span>
                  </div>
                  <div className="absolute bottom-2 start-2 end-2">
                    <span className="inline-block rounded-none bg-charcoal-950/80 px-2 py-0.5 text-[0.625rem] text-cream backdrop-blur-xs truncate max-w-full">
                      {pick(photo.caption, locale)}
                    </span>
                  </div>
                </article>
              ))}
            </div>

            {photos.length > 6 ? (
              <button
                type="button"
                onClick={() => setViewMode('photos')}
                className="mt-4 rounded-none border border-line bg-surface py-2.5 text-center text-xs font-semibold text-ink transition-colors hover:border-green-600 hover:text-green-700"
              >
                {locale === 'ar'
                  ? `عرض باقي الصور (${photos.length - 6} صورة أخرى)`
                  : `Explorer les ${photos.length - 6} autres photos`} &darr;
              </button>
            ) : null}
          </section>

          {/* Colonne Droite : Vidéos avec description réelle */}
          <section className="flex flex-col">
            <div className="flex items-center justify-between border-b border-line pb-3">
              <div className="flex items-center gap-2 text-red-600">
                <h3 className="font-display text-lg font-bold text-ink">
                  {locale === 'ar' ? 'الفيديوهات والتقارير' : 'Vidéos & Dossiers Thématiques'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setViewMode('videos')}
                className="text-xs font-semibold text-red-600 hover:underline"
              >
                {locale === 'ar' ? 'فتح الفيديوهات كاملة' : 'Ouvrir en grand'} &rarr;
              </button>
            </div>

            <div className="mt-5 grid gap-4">
              {VOLAGRO_VIDEOS.map((vid) => (
                <article
                  key={vid.id}
                  className="group flex flex-col sm:flex-row gap-3.5 rounded-none border border-line bg-surface p-4 shadow-xs transition-all hover:border-red-500 hover:shadow-md"
                >
                  <div className="relative aspect-video w-full sm:w-48 shrink-0 overflow-hidden rounded-none bg-charcoal-950">
                    <video
                      controls
                      playsInline
                      preload="metadata"
                      className="h-full w-full object-cover"
                    >
                      <source src={vid.src} type="video/mp4" />
                    </video>
                  </div>
                  <div className="min-w-0 flex-1 flex flex-col justify-between">
                    <div>
                      <span className={`inline-block rounded-none border px-2 py-0.5 text-[0.625rem] font-bold uppercase tracking-wider ${vid.tagColor}`}>
                        {vid.badge[locale]}
                      </span>
                      <h4 className="font-display text-base font-bold text-ink mt-1.5 line-clamp-2 group-hover:text-red-700 transition-colors">
                        {vid.title[locale]}
                      </h4>
                      <p className="mt-1.5 text-xs text-ink-muted line-clamp-2">
                        {vid.description[locale]}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setFullscreenVideo(vid)}
                      className="mt-2 text-start text-xs font-bold text-red-600 hover:underline"
                    >
                      {locale === 'ar' ? 'تكبير الفيديو' : 'Plein écran'} &rarr;
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      ) : viewMode === 'photos' ? (
        /* Full Photos Mode */
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {photos.map((photo, index) => (
            <article
              key={photo.id}
              onClick={() => setSelectedPhotoIndex(index)}
              className="group bg-surface rounded-none border-line overflow-hidden border shadow-xs transition-all hover:-translate-y-1 hover:shadow-md cursor-pointer select-none"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-charcoal-900 rounded-none">
                <Figure
                  slot={photo.id}
                  locale={locale}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  imageClassName="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-charcoal-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="flex h-11 w-11 items-center justify-center rounded-none bg-charcoal-950/75 text-cream backdrop-blur-xs shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                    <Glyph name="maximize" size={18} />
                  </span>
                </div>
              </div>
              <div className="p-4">
                <p className="text-xs font-semibold text-ink">{pick(photo.caption, locale)}</p>
              </div>
            </article>
          ))}
        </div>
      ) : (
        /* Full Videos Mode */
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          {VOLAGRO_VIDEOS.map((vid) => (
            <article
              key={vid.id}
              className="group flex flex-col justify-between overflow-hidden rounded-none border border-line bg-surface p-6 shadow-sm transition-all duration-300 hover:border-red-500 hover:shadow-xl"
            >
              <div>
                <div className="relative aspect-video w-full overflow-hidden rounded-none bg-charcoal-950 shadow-inner">
                  <video
                    controls
                    playsInline
                    preload="metadata"
                    className="h-full w-full object-cover"
                  >
                    <source src={vid.src} type="video/mp4" />
                  </video>
                  <button
                    type="button"
                    onClick={() => setFullscreenVideo(vid)}
                    className="absolute end-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-none bg-charcoal-950/75 text-white backdrop-blur-xs transition-transform hover:scale-110"
                    title={locale === 'ar' ? 'تكبير الشاشة' : 'Plein écran'}
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                    </svg>
                  </button>
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <span className={`inline-flex items-center rounded-none border px-2.5 py-0.5 text-[0.6875rem] font-bold uppercase tracking-wider ${vid.tagColor}`}>
                    {vid.badge[locale]}
                  </span>
                  <span className="text-xs font-semibold text-ink-subtle">
                    {vid.targetAnimal[locale]}
                  </span>
                </div>
                <h4 className="font-display text-lg font-bold text-ink transition-colors group-hover:text-red-700 mt-2.5 leading-snug">
                  {vid.title[locale]}
                </h4>
                <p className="mt-2 text-xs leading-relaxed text-ink-muted line-clamp-3">
                  {vid.description[locale]}
                </p>
              </div>
              <div className="mt-5 border-t border-line/60 pt-3 flex items-center justify-between">
                <span className="font-mono text-[0.65rem] font-semibold text-ink-subtle uppercase tracking-widest">
                  SARL VOLAGRO • ALGERIE
                </span>
                <button
                  type="button"
                  onClick={() => setFullscreenVideo(vid)}
                  className="text-xs font-bold text-red-600 transition-colors hover:text-red-700 hover:underline inline-flex items-center gap-1"
                >
                  {locale === 'ar' ? 'مشاهدة بالحجم الكامل' : 'Visionner en grand'} &rarr;
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* ── Photo Lightbox ─────────────────────────────────────────────── */}
      <Lightbox
        photos={photos}
        selectedIndex={selectedPhotoIndex}
        setSelectedIndex={setSelectedPhotoIndex}
        locale={locale}
        categoryLabels={categoryLabels}
        realBadgeLabel={realBadgeLabel}
      />

      {/* ── Video Modal Fullscreen ───────────────────────────────────────── */}
      {fullscreenVideo ? (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[120] flex items-center justify-center bg-charcoal-950/90 p-4 backdrop-blur-md"
        >
          <div className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-white/20 bg-charcoal-900 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-3 text-cream">
              <span className="font-display text-sm font-bold text-red-400">
                {fullscreenVideo.badge[locale]}
              </span>
              <button
                type="button"
                onClick={() => setFullscreenVideo(null)}
                className="rounded-lg p-1 text-cream/70 hover:bg-white/10 hover:text-white"
                aria-label="Fermer"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="aspect-video w-full bg-black">
              <video
                autoPlay
                controls
                playsInline
                className="h-full w-full object-contain"
                src={fullscreenVideo.src}
              />
            </div>

            <div className="p-5 text-cream">
              <h3 className="font-display text-lg font-bold text-white">
                {fullscreenVideo.title[locale]}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-cream/80">
                {fullscreenVideo.description[locale]}
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
