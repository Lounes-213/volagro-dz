import type { IconKey } from '@content/products';

/**
 * The species / process icon set.
 *
 * Hand-drawn as SVG primitives rather than an icon library, for three reasons the
 * brief is explicit about: one consistent stroke (1.5px on a 32px grid), correct
 * animal anatomy, and NO emoji. A generic "paw print" or a stock chicken glyph
 * would read as template filler next to the real photography.
 *
 * Stroke-only and `currentColor`, so an icon inherits the text colour of its
 * context and flips with `.theme-ink` for free.
 */
const PATHS: Record<IconKey, readonly string[]> = {
  /* Standing broiler: plump body, low carriage — the shape that actually leaves
   * a broiler house, not the upright hen of a farmyard logo. */
  broiler: [
    'M23.5 12.6c0 4-4 7.3-8.9 7.3S5.7 16.6 5.7 12.6',
    'M24 9.4a3.6 3.6 0 1 1 0 7.2 3.6 3.6 0 0 1 0-7.2',
    'M27.4 12.2 31 13l-3.6.9',
    'M23.8 8.3l1-2.4 1.5 2',
    'M7.6 12.2 3.4 8.6l1 5.6',
    'M10.4 19.8v6M15.8 20.2v6',
    'M8.6 25.9h3.4M14 26.3h3.4',
  ],
  /* Layer: the same bird, smaller, with the egg it is kept for. */
  layer: [
    'M21.6 12.2c0 3.4-3.4 6.2-7.6 6.2S6.4 15.6 6.4 12.2',
    'M21.8 9.2a3.2 3.2 0 1 1 0 6.4 3.2 3.2 0 0 1 0-6.4',
    'M25 12.2l3.2.8-3.2.8',
    'M21.6 8.2l.9-2.1 1.3 1.8',
    'M8 11.9 4.3 8.7l.9 5',
    'M10.7 18.2v5.4M15.5 18.5v5.4',
    'M26 20.4a3.1 3.9 0 1 1 0 7.8 3.1 3.9 0 0 1 0-7.8',
  ],
  /* Breeder: bird + a clutch, because the product is judged on hatchability. */
  breeder: [
    'M20 11.6c0 3.3-3.2 6-7.3 6s-7.3-2.7-7.3-6',
    'M20.2 8.6a3.1 3.1 0 1 1 0 6.2 3.1 3.1 0 0 1 0-6.2',
    'M23.3 11.5l3.1.8-3.1.8',
    'M20 7.7l.9-2.1 1.3 1.8',
    'M7.9 11.4 4.4 8.4l.9 4.9',
    'M9.6 17.4v5.2M14.1 17.7v5.2',
    'M24.4 18.6a2.7 3.4 0 1 1 0 6.8 2.7 3.4 0 0 1 0-6.8',
    'M28.6 21.4a2.2 2.8 0 1 1 0 5.6 2.2 2.8 0 0 1 0-5.6',
  ],
  /* Turkey: heavier body, fanned tail, and the snood that separates the species
   * at a glance. */
  turkey: [
    'M24.4 15.4c0 4.6-4.3 8.3-9.5 8.3S5.4 20 5.4 15.4',
    'M24.8 12.2a3 3 0 1 1 0 6 3 3 0 0 1 0-6',
    'M27.6 15 31 15.8l-3.4.8',
    'M27.2 18.4c.6 1.4.4 2.8-.6 3.6',
    'M5.8 14.6 1.8 6.4M7.4 16.7 2.2 12.9M9.6 18.2l-3.4 3',
    'M10.6 23.4v4.8M16.4 23.8v4.8',
  ],
  /* Cattle / sheep: head with horns, wide forehead, narrow muzzle. */
  ruminant: [
    'M11.4 8.6h9.2l1.3 5.4c0 4.8-2.6 8.6-5.9 8.6s-5.9-3.8-5.9-8.6z',
    'M11.4 8.6c-1.4-2.9-3.8-3.4-5.3-1.9M20.6 8.6c1.4-2.9 3.8-3.4 5.3-1.9',
    'M11.6 10.4 8 9.2l1 2.6M20.4 10.4l3.6-1.2-1 2.6',
    'M13.4 15.2h5.2M14.6 18.8h2.8',
    'M13.4 22.6v4.2M19.2 22.6v4.2',
  ],
  /* Dairy cow: the ruminant head plus the milk drop the CMV is formulated for. */
  dairy: [
    'M10.8 9.4h8.4l1.2 5c0 4.4-2.4 7.9-5.4 7.9s-5.4-3.5-5.4-7.9z',
    'M10.8 9.4c-1.3-2.7-3.5-3.1-4.9-1.7M19.2 9.4c1.3-2.7 3.5-3.1 4.9-1.7',
    'M12.6 16.4h4.8M13.6 19.8h2.8',
    'M25.6 18.6c1.5 2.4 2.4 3.9 2.4 5.2a2.4 2.4 0 0 1-4.8 0c0-1.3.9-2.8 2.4-5.2z',
    'M12.2 22.3v4.4M17 22.3v4.4',
  ],
  /* Day-old chick: round, downy, with the shell it just left. */
  chick: [
    'M16.6 8.6a8 8 0 1 1 0 16 8 8 0 0 1 0-16',
    'M23.6 12.8l3.6 1.2-3.6 1.2',
    'M14.6 14.4h.1M18.8 14.4h.1',
    'M13.4 22.6v3.6M19.8 22.6v3.6',
    'M9.8 27.4q6.8 3 13.4 0',
  ],
  /* Feed: the sack, with the pellet form visible through it. */
  pellet: [
    'M10.4 12.4 12.6 8.2h6.8l2.2 4.2v12.6a2.4 2.4 0 0 1-2.4 2.4h-6.4a2.4 2.4 0 0 1-2.4-2.4z',
    'M10.4 12.4h11.2M12.6 8.2h6.8',
    'M13.8 17.2h.1M16.6 19.4h.1M18.2 15.8h.1',
    'M13.4 22.4h5.2',
  ],
  /* Processing: rail, hooks, and a bird on the line — the industrial truth of a
   * 3,000/hour slaughter line rather than a knife glyph. */
  processing: [
    'M2.6 8.2h26.8',
    'M8.6 8.2v3.4a2.6 2.6 0 0 0 2.6 2.6M23.4 8.2v3.4a2.6 2.6 0 0 1-2.6 2.6',
    'M16 8.2v2.2M13.6 10.4h4.8l1.2 3.2c0 3.6-1.6 6.4-3.6 6.4s-3.6-2.8-3.6-6.4z',
    'M2.6 24.4h26.8M6.4 27.2h19.2',
  ],
};

interface SpeciesIconProps {
  readonly name: IconKey;
  readonly className?: string;
  /** Icons next to text are decorative; a standalone icon needs a title. */
  readonly title?: string;
}

export const SpeciesIcon = ({ name, className, title }: SpeciesIconProps) => (
  <svg
    viewBox="0 0 32 32"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
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
