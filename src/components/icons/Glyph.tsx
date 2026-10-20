/**
 * UI glyphs. Deliberately a separate, tiny set from `SpeciesIcon`: these are
 * interface marks (1.6px stroke on a 16px grid), not illustrations, and mixing
 * the two grids is how an icon set starts to look inconsistent.
 */
export type GlyphName =
  | 'phone'
  | 'whatsapp'
  | 'mail'
  | 'pin'
  | 'menu'
  | 'close'
  | 'arrow'
  | 'chevron'
  | 'plus'
  | 'play'
  | 'pause'
  | 'volume'
  | 'volumeMute'
  | 'maximize';

const PATHS: Record<GlyphName, readonly string[]> = {
  phone: [
    'M6.4 2.4 8.6 6 6.9 8.2c-.9 1.1-.7 2.6.4 3.9l1.6 2c1.1 1.3 2.6 1.7 3.8 1l2.3-1.4 3.3 2.4-.6 4c-.2 1.3-1.4 2-2.7 1.8C8.9 20.4 2.6 13 2.2 6.1c-.1-1.4.7-2.4 2.1-2.7z',
  ],
  whatsapp: [
    'M2.6 13.4a9.9 9.9 0 1 1 18.9-4.2c0 5.5-4.5 10-10 10-1.4 0-2.8-.3-4-1L2.3 21.6l1.4-4.2z',
    'M8.4 7.6c-.7 0-1.2.5-1.4 1.1-.2.8.1 2 1.2 3.4 1.3 1.6 2.7 2.4 3.6 2.6.8.2 1.8-.1 2.2-.8.2-.4 0-1-.3-1.3l-1.2-.8c-.3-.2-.5-.1-.7.1l-.4.6c-.4.3-.9.2-1.5-.3-.6-.5-.8-1-.6-1.4l.4-.5c.2-.3.2-.5 0-.8l-.7-1.2c-.2-.4-.4-.6-.6-.6z',
  ],
  mail: ['M2.4 4.6h19.2v14.8H2.4z', 'M2.4 5.6l9.6 7.2 9.6-7.2'],
  pin: ['M12 2.4c3.6 0 6.5 2.9 6.5 6.5 0 5-6.5 12.7-6.5 12.7S5.5 13.9 5.5 8.9c0-3.6 2.9-6.5 6.5-6.5z', 'M12 6.5a2.4 2.4 0 1 1 0 4.8 2.4 2.4 0 0 1 0-4.8'],
  menu: ['M2.6 6.4h18.8M2.6 12h18.8M2.6 17.6h18.8'],
  close: ['M5 5 19 19M19 5 5 19'],
  arrow: ['M3.4 12h17.2M14 5.4 20.6 12 14 18.6'],
  chevron: ['M6 9.4 12 15.4l6-6'],
  plus: ['M12 5v14M5 12h14'],
  play: ['M6 4l14 8-14 8V4z'],
  pause: ['M6 4h4v16H6z', 'M14 4h4v16h-4z'],
  volume: ['M11 5L6 9H2v6h4l5 4V5z', 'M15.5 8.5a5 5 0 0 1 0 7'],
  volumeMute: ['M11 5L6 9H2v6h4l5 4V5z', 'M22 9l-6 6', 'M16 9l6 6'],
  maximize: ['M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3'],
};

interface GlyphProps {
  readonly name: GlyphName;
  readonly className?: string;
  readonly title?: string;
  /** 16px interface grid by default; the shell uses 20–24px. */
  readonly size?: number;
}

export const Glyph = ({ name, className, title, size = 20 }: GlyphProps) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    strokeWidth={1.6}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    role={title ? 'img' : 'presentation'}
    aria-hidden={title ? undefined : true}
    focusable="false"
  >
    {title ? <title>{title}</title> : null}
    {PATHS[name].map((d) => (
      <path key={d} d={d} />
    ))}
  </svg>
);
