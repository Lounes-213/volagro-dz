import { IMAGE_BY_ID, type ManifestEntry } from '@content/images.manifest';
import type { Locale } from './i18n/config';

export type ResolvedImage =
  | {
      readonly status: 'ready';
      readonly src: string;
      readonly webp: string | null;
      readonly alt: string;
      readonly width: number;
      readonly height: number;
      readonly kind: ManifestEntry['kind'];
      readonly entry: ManifestEntry;
    }
  | {
      /** No file yet: render the branded placeholder, never a broken image. */
      readonly status: 'placeholder';
      readonly alt: string;
      readonly ratio: ManifestEntry['ratio'];
      readonly kind: ManifestEntry['kind'];
      readonly entry: ManifestEntry;
    };

/**
 * The single door between components and files.
 *
 * A component asks for a slot by id and gets back either a renderable image or an
 * explicit `placeholder` state — there is no third outcome where a missing file
 * produces a broken `<img>`. Dropping the real file into `public/` and updating
 * the manifest flips the state with no change to any component.
 */
export const resolveImage = (id: string, locale: Locale): ResolvedImage => {
  const entry = IMAGE_BY_ID.get(id);

  if (!entry) {
    // A typo in a slot id is a build-visible mistake, not a silent gap.
    return {
      status: 'placeholder',
      alt: `[image slot inconnu : ${id}]`,
      ratio: '16 / 9',
      kind: 'generated',
      entry: {
        id,
        kind: 'generated',
        file: null,
        webp: null,
        alt: { fr: id, ar: id, en: id },
        caption: { fr: id, ar: id, en: id },
        width: null,
        height: null,
        ratio: '16 / 9',
        confidence: 'high',
      },
    };
  }

  const alt = entry.alt[locale];

  if (entry.file === null || entry.width === null || entry.height === null) {
    return { status: 'placeholder', alt, ratio: entry.ratio, kind: entry.kind, entry };
  }

  return {
    status: 'ready',
    src: entry.file,
    webp: entry.webp,
    alt,
    width: entry.width,
    height: entry.height,
    kind: entry.kind,
    entry,
  };
};

/** How many real photographs are available — used by the home gallery teaser. */
export const hasRealPhotography = (): boolean =>
  Array.from(IMAGE_BY_ID.values()).some((entry) => entry.kind === 'real' && entry.file !== null);
