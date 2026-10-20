import type { ReactNode } from 'react';

import { Link } from '@/lib/i18n/navigation';
import { cn } from '@/lib/utils/cn';

export type ButtonVariant = 'primary' | 'outline' | 'ghost' | 'onInk' | 'call' | 'nature';
export type ButtonSize = 'md' | 'lg';

const VARIANTS: Record<ButtonVariant, string> = {
  /* Brand red CTA button per user request */
  primary:
    'bg-red-600 hover:bg-red-700 active:bg-red-800 text-white shadow-sm shadow-red-950/20 border border-red-700/40',
  /* Outline carries the second action: present, never competing. */
  outline:
    'border border-line-strong text-ink hover:border-accent hover:text-accent bg-transparent',
  ghost: 'text-ink hover:text-accent',
  /* Used inside `.theme-ink` scopes, where the accent already flips. */
  onInk: 'border border-line text-ink hover:bg-charcoal-800',
  /* Direct call / WhatsApp actions: nature green matching the brand logo leaf */
  call: 'bg-green-700 hover:bg-green-800 active:bg-green-900 text-white border border-green-800/40 shadow-sm',
  nature: 'bg-green-700 hover:bg-green-800 active:bg-green-900 text-white border border-green-800/40 shadow-sm',
};

const SIZES: Record<ButtonSize, string> = {
  md: 'h-11 px-5 text-sm',
  lg: 'h-13 px-6 text-base md:h-14 md:px-7',
};

interface BaseProps {
  readonly id?: string;
  readonly variant?: ButtonVariant;
  readonly size?: ButtonSize;
  readonly className?: string;
  readonly children: ReactNode;
  /** Leading glyph (an icon component instance). */
  readonly icon?: ReactNode;
  readonly block?: boolean;
}

const base =
  'tap inline-flex items-center justify-center gap-2.5 rounded-sm font-medium tracking-tight ' +
  'transition-[background-color,color,border-color,transform] duration-150 ease-swift ' +
  'active:translate-y-px disabled:pointer-events-none disabled:opacity-45 select-none';

const classes = ({ variant = 'primary', size = 'md', block, className }: BaseProps): string =>
  cn(base, VARIANTS[variant], SIZES[size], block && 'w-full', className);

/** Internal navigation. Locale-prefixed by construction. */
export const ButtonLink = ({
  id,
  href,
  children,
  icon,
  ...rest
}: BaseProps & { readonly href: string }) => (
  <Link id={id} href={href} className={classes({ ...rest, children, icon })}>
    {icon}
    <span>{children}</span>
  </Link>
);

/** External / protocol links (`tel:`, `wa.me`, `mailto:`, maps). */
export const ButtonAnchor = ({
  id,
  href,
  children,
  icon,
  external,
  rel,
  ...rest
}: BaseProps & {
  readonly href: string;
  readonly external?: boolean;
  readonly rel?: string;
}) => (
  <a
    id={id}
    href={href}
    className={classes({ ...rest, children, icon })}
    {...(external ? { target: '_blank', rel: rel ?? 'noopener noreferrer' } : {})}
  >
    {icon}
    <span>{children}</span>
  </a>
);

export const Button = ({
  id,
  onClick,
  type = 'button',
  disabled,
  children,
  icon,
  ...rest
}: BaseProps & {
  readonly onClick?: () => void;
  readonly type?: 'button' | 'submit';
  readonly disabled?: boolean;
}) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={classes({ ...rest, children, icon })}
  >
    {icon}
    <span>{children}</span>
  </button>
);

/** Compact inline text action used inside cards and section headers. */
export const InlineLink = ({
  href,
  children,
  className,
}: {
  readonly href: string;
  readonly children: ReactNode;
  readonly className?: string;
}) => (
  <Link
    href={href}
    className={cn(
      'text-accent hover:text-accent-hover group inline-flex items-center gap-1.5 text-sm font-medium',
      className,
    )}
  >
    <span className="border-accent/30 group-hover:border-accent-hover border-b pb-0.5 transition-colors">
      {children}
    </span>
    <span aria-hidden="true" className="flip-rtl transition-transform group-hover:ms-0.5">
      →
    </span>
  </Link>
);
