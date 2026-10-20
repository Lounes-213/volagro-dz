import Image from 'next/image';

import { resolveImage } from '@/lib/images';
import type { Locale } from '@/lib/i18n/config';
import { cn } from '@/lib/utils/cn';

interface FigureProps {
  /** Manifest slot id, e.g. `photo.legacy.03`. */
  readonly slot: string;
  readonly locale: Locale;
  /**
   * `fill` stretches to the parent (parent MUST be positioned and sized, and the
   * aspect ratio comes from the wrapper). `intrinsic` keeps the file's own ratio.
   */
  readonly mode?: 'fill' | 'intrinsic';
  readonly sizes?: string;
  /** Above-the-fold images must opt out of lazy loading, or they lose the LCP. */
  readonly priority?: boolean;
  readonly className?: string;
  readonly imageClassName?: string;
  readonly grade?: boolean;
}

/**
 * Every image in the product goes through here. Two reasons that matters:
 *
 *  1. THE PLACEHOLDER SYSTEM. A slot with no file renders a branded hatch panel
 *     carrying the slot's own alt text — so a missing photo is visibly a missing
 *     photo (and is announced as such to a screen reader), never a broken icon.
 *  2. ONE GRADE. `filter: saturate/sepia/hue-rotate` from the token file gives
 *     imports from phones and DSLRs a single commissioned treatment. When the
 *     client's originals arrive they will not look like a folder of mixed files.
 */
export const Figure = ({
  slot,
  locale,
  mode = 'intrinsic',
  sizes,
  priority = false,
  className,
  imageClassName,
  grade = true,
}: FigureProps) => {
  const image = resolveImage(slot, locale);

  if (image.status === 'placeholder') {
    return (
      <div
        className={cn(
          'hatch relative flex items-end overflow-hidden rounded-card',
          mode === 'fill' && 'absolute inset-0',
          className,
        )}
        style={mode === 'intrinsic' ? { aspectRatio: image.ratio } : undefined}
        role="img"
        aria-label={image.alt}
        data-slot={slot}
        data-state="placeholder"
      >
        <p className="text-cream/55 p-4 text-xs leading-relaxed">{image.alt}</p>
      </div>
    );
  }

  if (mode === 'fill') {
    return (
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes ?? '100vw'}
        priority={priority}
        loading={priority ? 'eager' : 'lazy'}
        className={cn('object-cover', grade && 'grade', imageClassName, className)}
      />
    );
  }

  return (
    <Image
      src={image.src}
      alt={image.alt}
      width={image.width}
      height={image.height}
      sizes={sizes}
      priority={priority}
      loading={priority ? 'eager' : 'lazy'}
      className={cn('h-auto w-full rounded-card', grade && 'grade', imageClassName, className)}
    />
  );
};
