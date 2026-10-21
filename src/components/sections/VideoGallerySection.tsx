'use client';

import { useState } from 'react';
import type { Locale } from '@/lib/i18n/config';

interface VideoItem {
  id: string;
  src: string;
  title: { fr: string; ar: string; en: string };
  category: { fr: string; ar: string; en: string };
  duration?: string;
}

const VIDEOS: readonly VideoItem[] = [
  {
    id: 'v0',
    src: '/videos/video_volagro_6.mp4',
    title: {
      fr: "Introduction institutionnelle : Histoire, capacité de 20M de poussins et filiales",
      ar: 'العرض التعريفي الشامل: التأسيس، طاقة 20 مليون كتكوت والتجهيزات',
      en: 'Corporate Introduction: History, 20M chick capacity, and subsidiaries',
    },
    category: {
      fr: 'Présentation officielle',
      ar: 'التقديم الرسمي',
      en: 'Official Presentation',
    },
  },
  {
    id: 'v1',
    src: '/videos/video_volagro_1.mp4',
    title: {
      fr: 'Visite immersive des unités et élevages SARL VOLAGRO',
      ar: 'جولة ميدانية استكشافية داخل منشآت ومزارع فولاغرو',
      en: 'Immersive tour of SARL VOLAGRO facilities and farms',
    },
    category: {
      fr: 'Unités industrielles',
      ar: 'المنشآت الصناعية',
      en: 'Industrial Facilities',
    },
  },
  {
    id: 'v2',
    src: '/videos/video_volagro_2.mp4',
    title: {
      fr: 'Production et ensachage automatisé des CMV',
      ar: 'إنتاج وتعبئة مكملات الـ CMV آلياً',
      en: 'Automated production and bagging of CMV premixes',
    },
    category: {
      fr: 'Technologie & CMV',
      ar: 'التكنولوجيا والـ CMV',
      en: 'Technology & CMV',
    },
  },
  {
    id: 'v3',
    src: '/videos/video_volagro_3.mp4',
    title: {
      fr: 'Couvoir moderne et poussins chair d’un jour biosécurisés',
      ar: 'مفقس عصري وكتاكيت تسمين مطابقة لمعايير الأمن الحيوي',
      en: 'Modern hatchery and biosecure day-old broiler chicks',
    },
    category: {
      fr: 'Couvoir & Poussins',
      ar: 'المفقس والكتاكيت',
      en: 'Hatchery & Chicks',
    },
  },
  {
    id: 'v4',
    src: '/videos/video_volagro_4.mp4',
    title: {
      fr: 'Partenariat d’expertise technique avec TECHNA France',
      ar: 'الشراكة والخبرة التقنية المتقدمة مع TECHNA فرنسا',
      en: 'Technical expertise partnership with TECHNA France',
    },
    category: {
      fr: 'Partenariat TECHNA',
      ar: 'شراكة TECHNA',
      en: 'TECHNA Partnership',
    },
  },
  {
    id: 'v5',
    src: '/videos/video_volagro_5.mp4',
    title: {
      fr: 'Assistance technique & suivi des performances en élevage',
      ar: 'المرافقة الميدانية ومتابعة أداء المربين في الميدان',
      en: 'Technical support & performance monitoring in farms',
    },
    category: {
      fr: 'Suivi de terrain',
      ar: 'المتابعة الميدانية',
      en: 'Field Support',
    },
  },
];

export const VideoGallerySection = ({
  locale,
  title,
  subtitle,
}: {
  readonly locale: Locale;
  readonly title?: string;
  readonly subtitle?: string;
}) => {
  const [activeVideo, setActiveVideo] = useState<VideoItem>(VIDEOS[0]!);

  const defaultTitle = {
    fr: 'Vidéos & Reportages de terrain',
    ar: 'فيديوهات وتقارير ميدانية حصرية',
    en: 'Videos & Field Reports',
  };

  const defaultSubtitle = {
    fr: 'Découvrez nos processus de fabrication, la rigueur de notre couvoir et le quotidien de nos équipes en vidéo.',
    ar: 'شاهد بالفيديو تقنيات الإنتاج الحديثة، صرامة معايير المفقس وحركية فرقنا الميدانية.',
    en: 'Discover our production processes, hatchery bio-standards, and daily fieldwork in video.',
  };

  return (
    <section className="mt-16 overflow-hidden rounded-2xl border border-line bg-surface p-6 shadow-sm md:p-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-line pb-6">
        <div>
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-600">
            <span className="h-2 w-2 rounded-full bg-red-600 animate-pulse" />
            {locale === 'ar' ? 'أرشيف الفيديو' : 'Médiathèque Vidéo'}
          </span>
          <h3 className="font-display text-d3 text-ink mt-2">
            {title || defaultTitle[locale]}
          </h3>
          <p className="text-ink-muted text-sm mt-1 max-w-[65ch]">
            {subtitle || defaultSubtitle[locale]}
          </p>
        </div>
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-red-50 text-red-700 border border-red-200 w-fit">
          6 {locale === 'ar' ? 'تسجيلات حصرية' : 'reportages officiels'}
        </span>
      </div>

      {/* Main player + Video list */}
      <div className="mt-8 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        {/* Main active video */}
        <div className="flex flex-col">
          <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-charcoal-950 shadow-md">
            <video
              key={activeVideo.src}
              controls
              playsInline
              preload="metadata"
              className="h-full w-full object-cover"
            >
              <source src={activeVideo.src} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="mt-3">
            <span className="text-[0.7rem] font-bold uppercase tracking-wider text-red-600">
              {activeVideo.category[locale]}
            </span>
            <h4 className="font-display text-lg font-bold text-ink mt-0.5">
              {activeVideo.title[locale]}
            </h4>
          </div>
        </div>

        {/* Video selector playlist */}
        <div className="flex flex-col gap-2.5 overflow-y-auto max-h-[380px] pe-1">
          {VIDEOS.map((vid, idx) => {
            const isCurrent = vid.id === activeVideo.id;
            return (
              <button
                key={vid.id}
                type="button"
                onClick={() => setActiveVideo(vid)}
                className={`flex items-start gap-3.5 rounded-xl border p-3.5 text-start transition-all tap ${
                  isCurrent
                    ? 'border-red-500 bg-red-50/70 shadow-xs'
                    : 'border-line bg-surface hover:border-red-300 hover:bg-surface-sunken'
                }`}
              >
                <div className="relative aspect-video w-24 shrink-0 overflow-hidden rounded-lg bg-charcoal-900 grid place-items-center">
                  <span className="font-display text-xs font-bold text-white/90">
                    0{idx + 1}
                  </span>
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <svg
                      className={`h-6 w-6 ${isCurrent ? 'text-red-500' : 'text-white/80'}`}
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[0.65rem] font-bold uppercase tracking-wider text-red-600 block">
                    {vid.category[locale]}
                  </span>
                  <p className="font-medium text-xs leading-snug text-ink line-clamp-2 mt-0.5">
                    {vid.title[locale]}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
