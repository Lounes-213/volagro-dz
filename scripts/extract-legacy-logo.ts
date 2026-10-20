/**
 * EXTRACT THE LOGO DERIVATIVES
 * ============================================================================
 * The client's identity exists only as a raster crop (271x277) taken from the old
 * site. We must not redraw it, so every derivative below is a CROP of the real
 * artwork — never a reconstruction:
 *
 *   volagro-logo.png     the supplied lockup, unmodified (emblem + wordmark +
 *                        "EXPERTISE TECHNA"), white knocked out to transparent so
 *                        it sits on the warm off-white page without a white box.
 *   volagro-emblem.png   the leaf mark alone — header mark and favicon source.
 *   volagro-lockup.png   a COMPACT HORIZONTAL lockup: the emblem beside the
 *                        wordmark it belongs to, as the brief asks for the header.
 *                        Both halves are original pixels; only the arrangement is
 *                        new.
 *
 * Two traps this script has to survive, both discovered by measuring the source
 * rather than assuming:
 *   1. The leaf mark reaches the top corners, so a plain bounding box is the whole
 *      image — the split must therefore be driven by EMPTY ROWS.
 *   2. A rooster and a hen overlap the crop from the collage. The rooster is
 *      orange and would both enlarge the bounding box and survive into the
 *      knockout, so it is treated as background; the hen is white and disappears
 *      on its own. The brand mark is charcoal/grey/burgundy and never warm, which
 *      is what makes that test safe.
 *
 * The animal collage is deliberately NOT part of any lockup: per the brief it is a
 * hero/illustrative asset only, never a header mark.
 *
 * Run: npm run images:logo
 */

import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

import sharp from 'sharp';

const SOURCE = 'docs/reference/old-site/06-logo-crop-old.png';
const OUT_DIR = 'public/images/logo';

/**
 * Background floor for the CONTENT MASK. Deliberately below pure white: the hen
 * overlapping this crop is white with soft grey feather shading (measured around
 * rgb(216,227,219)), and at a 240 floor that shading reads as logo ink and blows
 * the bounding box out to the full image. The brand's own lightest tone is the
 * sage leaf at rgb(168,180,179), so 214 separates the two cleanly.
 */
const MASK_FLOOR = 214;

/** Alpha ramp: fully transparent at/below ABOVE, fully opaque at/below BELOW. */
const ALPHA_TRANSPARENT = 216;
const ALPHA_OPAQUE = 203;

/** Warm saturated tone = the rooster. Brand artwork is never warm. */
const isRooster = (r: number, g: number, b: number): boolean =>
  r > 110 && r - b > 45 && g > 40 && g < r - 20;

interface Box {
  readonly left: number;
  readonly top: number;
  readonly width: number;
  readonly height: number;
}

const main = async (): Promise<void> => {
  const { data, info } = await sharp(SOURCE).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const W = info.width;
  const H = info.height;
  const C = info.channels;

  const pixel = (x: number, y: number): [number, number, number] => {
    const i = (y * W + x) * C;
    return [data[i] ?? 0, data[i + 1] ?? 0, data[i + 2] ?? 0];
  };
  const isBackground = (x: number, y: number): boolean => {
    const [r, g, b] = pixel(x, y);
    return Math.min(r, g, b) >= MASK_FLOOR || isRooster(r, g, b);
  };
  const isBrand = (x: number, y: number): boolean => !isBackground(x, y);

  /* ── Stacked blocks, measured through the CENTRE band ───────────────────────
   * The side animals paint ink into rows that are empty in the middle, so
   * splitting on full-width emptiness would find a single block. The middle 44%
   * contains the mark, the wordmark and the tag — and nothing else. */
  const centreLeft = Math.round(W * 0.28);
  const centreRight = Math.round(W * 0.72);

  const rowHasBrand = (y: number): boolean => {
    let count = 0;
    for (let x = centreLeft; x <= centreRight; x += 1) if (isBrand(x, y)) count += 1;
    return count > 1;
  };

  const blocks: { top: number; bottom: number }[] = [];
  let start = -1;
  for (let y = 0; y < H; y += 1) {
    if (rowHasBrand(y)) {
      if (start === -1) start = y;
    } else if (start !== -1) {
      blocks.push({ top: start, bottom: y - 1 });
      start = -1;
    }
  }
  if (start !== -1) blocks.push({ top: start, bottom: H - 1 });

  /**
   * Density-based measurement, not "first inked pixel".
   *
   * A handful of stray dark pixels at the crop's edge (the screenshot's own
   * border, the animals' contact shadows) is enough for a naive min/max scan to
   * report the full image width — which it did, twice. Requiring a column to be
   * inked over a real share of the block's height ignores that noise while still
   * finding the faint outer edges of the sage leaf.
   */
  const measure = (block: { top: number; bottom: number }): Box => {
    const height = block.bottom - block.top + 1;
    const columnInk = new Float32Array(W);
    const rowInk = new Float32Array(height);

    for (let y = block.top; y <= block.bottom; y += 1) {
      let rowCount = 0;
      for (let x = 0; x < W; x += 1) {
        if (isBrand(x, y)) {
          columnInk[x] = (columnInk[x] ?? 0) + 1;
          rowCount += 1;
        }
      }
      rowInk[y - block.top] = rowCount / W;
    }

    // Tight enough to ignore the animals' sparse contact shadows at the crop
    // edges, loose enough to still catch the sage leaf's soft outer edge.
    const COLUMN_DENSITY = 0.15;
    const ROW_DENSITY = 0.02;

    let left = 0;
    let right = W - 1;
    while (left < right && (columnInk[left] ?? 0) / height < COLUMN_DENSITY) left += 1;
    while (right > left && (columnInk[right] ?? 0) / height < COLUMN_DENSITY) right -= 1;

    let top = 0;
    let bottom = height - 1;
    while (top < bottom && (rowInk[top] ?? 0) < ROW_DENSITY) top += 1;
    while (bottom > top && (rowInk[bottom] ?? 0) < ROW_DENSITY) bottom -= 1;

    return {
      left,
      top: block.top + top,
      width: right - left + 1,
      height: bottom - top + 1,
    };
  };

  console.log(`[logo] source ${W}x${H} — ${blocks.length} stacked block(s) via centre band:`);
  const measured = blocks.map((block) => ({ block, box: measure(block) }));
  for (const { block, box } of measured) {
    console.log(
      `  rows ${block.top}-${block.bottom} -> box ${box.width}x${box.height} at (${box.left},${box.top})`,
    );
  }

  if (measured.length < 2) {
    throw new Error('[logo] expected at least an emblem and a wordmark block');
  }

  const emblem = measured[0];
  const wordmark = measured[1];
  if (!emblem || !wordmark) throw new Error('[logo] block split failed');

  /* ── White/rooster knockout ──────────────────────────────────────────────── */
  const knockoutPng = async (box: Box): Promise<Buffer> => {
    const { data: raw, info: rawInfo } = await sharp(SOURCE)
      .extract(box)
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    for (let i = 0; i < raw.length; i += 4) {
      const r = raw[i] ?? 0;
      const g = raw[i + 1] ?? 0;
      const b = raw[i + 2] ?? 0;
      if (isRooster(r, g, b)) {
        raw[i + 3] = 0;
        continue;
      }
      // A short linear ramp across the feather edges keeps them smooth instead of
      // producing the hard, jagged cut a binary threshold would give.
      const min = Math.min(r, g, b);
      const alpha =
        min >= ALPHA_TRANSPARENT
          ? 0
          : min <= ALPHA_OPAQUE
            ? 255
            : Math.round(((ALPHA_TRANSPARENT - min) / (ALPHA_TRANSPARENT - ALPHA_OPAQUE)) * 255);
      raw[i + 3] = alpha;
    }

    return sharp(raw, {
      raw: { width: rawInfo.width, height: rawInfo.height, channels: 4 },
    })
      .png({ compressionLevel: 9 })
      .toBuffer();
  };

  await mkdir(OUT_DIR, { recursive: true });

  /* Full supplied lockup, unmodified. */
  const fullBox: Box = { left: 0, top: 0, width: W, height: H };
  await writeFile(join(OUT_DIR, 'volagro-logo.png'), await knockoutPng(fullBox));

  const emblemPng = await knockoutPng(emblem.box);
  await writeFile(join(OUT_DIR, 'volagro-emblem.png'), emblemPng);

  /* ── Compact horizontal lockup: emblem | wordmark ───────────────────────── */
  /* Proportions: the mark reads at roughly 1.5x the wordmark's cap height, which
   * is what makes a mark + wordmark lockup look like one object rather than two
   * images placed next to each other. */
  const WORDMARK_HEIGHT = 26;
  const EMBLEM_HEIGHT = 40;
  const GAP = 10;

  const wordmarkPng = await knockoutPng(wordmark.box);

  const emblemScaled = await sharp(emblemPng)
    .resize({ height: EMBLEM_HEIGHT, fit: 'inside', withoutEnlargement: false })
    .toBuffer({ resolveWithObject: true });
  const wordmarkScaled = await sharp(wordmarkPng)
    .resize({ height: WORDMARK_HEIGHT, fit: 'inside', withoutEnlargement: false })
    .toBuffer({ resolveWithObject: true });

  const canvasHeight = Math.max(EMBLEM_HEIGHT, WORDMARK_HEIGHT);
  const canvasWidth = emblemScaled.info.width + GAP + wordmarkScaled.info.width;

  const lockup = await sharp({
    create: {
      width: canvasWidth,
      height: canvasHeight,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([
      {
        input: emblemScaled.data,
        left: 0,
        top: Math.round((canvasHeight - emblemScaled.info.height) / 2),
      },
      {
        input: wordmarkScaled.data,
        left: emblemScaled.info.width + GAP,
        top: Math.round((canvasHeight - wordmarkScaled.info.height) / 2),
      },
    ])
    .png({ compressionLevel: 9 })
    .toBuffer();

  await writeFile(join(OUT_DIR, 'volagro-lockup.png'), lockup);

  console.log(
    `[logo] lockup ${canvasWidth}x${canvasHeight} (emblem ${emblemScaled.info.width}x${emblemScaled.info.height}, wordmark ${wordmarkScaled.info.width}x${wordmarkScaled.info.height})`,
  );

  /* ── The animal collage, hero/illustrative use only ─────────────────────────
   * Lifted from the home-page screenshot. Per the brief it is NEVER a header
   * mark: it appears once, large, on the hero — the one place where the
   * multi-species story is the point. */
  await extractCollage();

  console.log(`[logo] wrote 4 derivatives to ${OUT_DIR}/`);
};

/**
 * The collage sits in the top band of the legacy home page, above the address
 * block and the navigation, on a flat white ground. Restricting the scan to that
 * band is what stops the address text and the nav from joining the crop.
 */
const extractCollage = async (): Promise<void> => {
  const HOME = 'docs/reference/old-site/01-home-old.png';
  const BAND_TOP = 0;
  const BAND_BOTTOM = 520;

  const { data, info } = await sharp(HOME).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const W = info.width;
  const C = info.channels;

  const isInk = (x: number, y: number): boolean => {
    const i = (y * W + x) * C;
    return Math.min(data[i] ?? 0, data[i + 1] ?? 0, data[i + 2] ?? 0) < 246;
  };

  const height = BAND_BOTTOM - BAND_TOP;
  let left = W;
  let right = -1;
  for (let x = 0; x < W; x += 1) {
    let count = 0;
    for (let y = BAND_TOP; y < BAND_BOTTOM; y += 1) if (isInk(x, y)) count += 1;
    // 2% of the band: the collage is dense, the stray JPEG noise is not.
    if (count / height < 0.02) continue;
    if (x < left) left = x;
    if (x > right) right = x;
  }
  if (right < 0) throw new Error('[logo] collage band is empty');

  let top = BAND_TOP;
  let bottom = BAND_BOTTOM - 1;
  const isDenseRow = (y: number): boolean => {
    let count = 0;
    for (let x = left; x <= right; x += 1) if (isInk(x, y)) count += 1;
    return count / (right - left + 1) > 0.01;
  };
  while (top < bottom && !isDenseRow(top)) top += 1;
  while (bottom > top && !isDenseRow(bottom)) bottom -= 1;

  const box = { left, top, width: right - left + 1, height: bottom - top + 1 };
  const { data: raw, info: rawInfo } = await sharp(HOME)
    .extract(box)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  // Soft white knockout: the collage was cut out with soft contact shadows on a
  // white ground, so a light ramp removes the ground and keeps the shadow.
  for (let i = 0; i < raw.length; i += 4) {
    const min = Math.min(raw[i] ?? 0, raw[i + 1] ?? 0, raw[i + 2] ?? 0);
    raw[i + 3] = min <= 236 ? 255 : Math.max(0, Math.round(((250 - min) / 14) * 255));
  }

  const png = await sharp(raw, {
    raw: { width: rawInfo.width, height: rawInfo.height, channels: 4 },
  })
    .png({ compressionLevel: 9 })
    .toBuffer();

  await writeFile(join(OUT_DIR, 'volagro-animaux.png'), png);
  console.log(`[logo] animal collage ${box.width}x${box.height} at (${box.left},${box.top})`);
};

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
