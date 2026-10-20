import type { ReactNode } from 'react';

import type { Locale } from '@/lib/i18n/config';
import { cn } from '@/lib/utils/cn';

interface SectionHeadingProps {
  /** Uppercase micro-label that opens the section ("01 — FILIÈRE"). */
  readonly eyebrow?: string;
  /** Burgundy tick before the eyebrow: the section marker. */
  readonly marker?: boolean;
  readonly title: string;
  readonly lead?: string;
  readonly locale: Locale;
  readonly align?: 'start' | 'center';
  /** Rendered opposite the title on wide screens (a CTA, usually). */
  readonly action?: ReactNode;
  readonly className?: string;
  readonly id?: string;
}

export const SectionHeading = ({
  eyebrow,
  marker = true,
  title,
  lead,
  align = 'start',
  action,
  className,
  id,
}: SectionHeadingProps) => (
  <header
    className={cn(
      'flex flex-col gap-6 md:flex-row md:items-end md:justify-between',
      align === 'center' && 'md:flex-col md:items-center md:text-center',
      className,
    )}
  >
    <div className={cn('max-w-[46rem]', align === 'center' && 'mx-auto')}>
      {eyebrow ? (
        <p className={cn('eyebrow', marker && 'marker')}>
          {marker ? <span className="marker-tick" aria-hidden="true" /> : null}
          {eyebrow}
        </p>
      ) : null}
      <h2 id={id} className="text-d2 mt-5 text-balance">
        {title}
      </h2>
      {lead ? <p className="text-lg text-ink-muted mt-5 max-w-[54ch]">{lead}</p> : null}
    </div>
    {action ? <div className="shrink-0">{action}</div> : null}
  </header>
);

/**
 * Renders a `pending()` content slot.
 *
 * This is the visible half of the "no invented figures" guarantee: instead of a
 * fabricated dosage appearing in a table, the visitor (and the client reviewing
 * the site) sees the actual reason it is absent, phrased in their language and
 * attributed to the technical department.
 */
export const PendingSlot = ({
  reason,
  label,
  className,
}: {
  readonly reason: string;
  readonly label?: string;
  readonly className?: string;
}) => (
  <div
    className={cn(
      'border-line bg-surface-sunken rounded-card border border-dashed p-5',
      className,
    )}
    data-state="pending"
  >
    {label ? <p className="eyebrow text-ink-subtle mb-2">{label}</p> : null}
    <p className="text-ink-muted text-sm leading-relaxed">{reason}</p>
  </div>
);
