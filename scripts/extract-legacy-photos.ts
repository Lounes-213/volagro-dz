/**
 * EXTRACT THE LEGACY GALLERY PHOTOGRAPHS
 * ============================================================================
 * The client's real photographs currently exist only inside screenshots of the
 * old site (docs/reference/old-site/). Those photos are genuine — TECHNA visits,
 * trade-show stands, teams, buildings — and the brief is explicit that real
 * people and real facilities must never be replaced by generated imagery.
 *
 * So we recover them: the gallery screenshot is segmented geometrically (white
 * page background → content bands → individual photos) and each photo is written
 * to public/images/real/.
 *
 * These are LOW-RESOLUTION RECOVERIES from a compressed screenshot. They are
 * good enough to art-direct with, and they are flagged as such in the asset
 * manifest. The originals must be supplied by the client before launch.
 *
 * Run: npm run images:legacy
 */

import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

import sharp from 'sharp';

const SOURCE = 'docs/reference/old-site/05-galerie-old.png';
const OUT_DIR = 'public/images/real';

/** Page background is white / warm off-white. Everything else is "ink". */
const BACKGROUND_FLOOR = 238;

interface Band {
  readonly top: number;
  readonly bottom: number;
  readonly columns: readonly { readonly left: number; readonly right: number }[];
}

const isBackground = (r: number, g: number, b: number): boolean =>
  r >= BACKGROUND_FLOOR && g >= BACKGROUND_FLOOR && b >= BACKGROUND_FLOOR;

/** A flat burgundy strip: the old site's full-width banners, used as separators. */
const isBannerRow = (row: Uint8Array, width: number): boolean => {
  let red = 0;
  for (let x = 0; x < width; x += 1) {
    const i = x * 3;
    const r = row[i] ?? 0;
    const g = row[i + 1] ?? 0;
    const b = row[i + 2] ?? 0;
    if (r > 110 && g < 70 && b < 70) red += 1;
  }
  return red / width > 0.85;
};

const main = async (): Promise<void> => {
  const image = sharp(SOURCE);
  const meta = await image.metadata();
  const width = meta.width ?? 0;
  const height = meta.height ?? 0;
  if (width === 0 || height === 0) throw new Error(`[legacy] unreadable source: ${SOURCE}`);

  const { data } = await image.raw().toBuffer({ resolveWithObject: true });

  const rowOf = (y: number): Uint8Array => data.subarray(y * width * 3, (y + 1) * width * 3);

  /* ── 1. Row profile ─────────────────────────────────────────────────────── */
  const inkRatio = new Float32Array(height);
  const banner = new Uint8Array(height);
  for (let y = 0; y < height; y += 1) {
    const row = rowOf(y);
    let ink = 0;
    for (let x = 0; x < width; x += 1) {
      const i = x * 3;
      if (!isBackground(row[i] ?? 0, row[i + 1] ?? 0, row[i + 2] ?? 0)) ink += 1;
    }
    inkRatio[y] = ink / width;
    banner[y] = isBannerRow(row, width) ? 1 : 0;
  }

  /* ── 2. Ignore everything above the first flat burgundy banner ───────────── */
  let scanStart = 0;
  for (let y = 0; y < height; y += 1) {
    if (banner[y] === 1) {
      scanStart = y + 1;
      break;
    }
  }

  /* ── 3. Group content rows into bands ───────────────────────────────────── */
  const CONTENT = 0.05;
  const BRIDGE_ROWS = 5;
  const bands: { top: number; bottom: number }[] = [];
  let runStart = -1;
  let gap = 0;

  for (let y = scanStart; y < height; y += 1) {
    const ratio = inkRatio[y] ?? 0;
    const isContent = banner[y] === 0 && ratio > CONTENT;
    if (isContent) {
      if (runStart === -1) runStart = y;
      gap = 0;
    } else if (runStart !== -1) {
      gap += 1;
      if (gap > BRIDGE_ROWS) {
        bands.push({ top: runStart, bottom: y - gap });
        runStart = -1;
        gap = 0;
      }
    }
  }
  if (runStart !== -1) bands.push({ top: runStart, bottom: height - 1 });

  /* ── 4. Split each band into photo columns ──────────────────────────────── */
  const COLUMN_CONTENT = 0.05;
  const BRIDGE_COLUMNS = 6;
  const resolved: Band[] = [];

  for (const band of bands) {
    const bandHeight = band.bottom - band.top + 1;
    if (bandHeight < 90) continue; // headings, rules, thin text

    const columnInk = new Float32Array(width);
    for (let x = 0; x < width; x += 1) {
      let ink = 0;
      for (let y = band.top; y <= band.bottom; y += 1) {
        const i = (y * width + x) * 3;
        if (!isBackground(data[i] ?? 0, data[i + 1] ?? 0, data[i + 2] ?? 0)) ink += 1;
      }
      columnInk[x] = ink / bandHeight;
    }

    const columns: { left: number; right: number }[] = [];
    let colStart = -1;
    let colGap = 0;
    for (let x = 0; x < width; x += 1) {
      const isContent = (columnInk[x] ?? 0) > COLUMN_CONTENT;
      if (isContent) {
        if (colStart === -1) colStart = x;
        colGap = 0;
      } else if (colStart !== -1) {
        colGap += 1;
        if (colGap > BRIDGE_COLUMNS) {
          columns.push({ left: colStart, right: x - colGap });
          colStart = -1;
          colGap = 0;
        }
      }
    }
    if (colStart !== -1) columns.push({ left: colStart, right: width - 1 });

    const wide = columns.filter((column) => column.right - column.left >= 150);
    if (wide.length > 0) resolved.push({ top: band.top, bottom: band.bottom, columns: wide });
  }

  /* ── 5. Report what we found, then extract ──────────────────────────────── */
  console.log(`[legacy] source ${width}x${height}, scan from y=${scanStart}`);
  console.log(`[legacy] ${resolved.length} photo row(s):`);
  for (const band of resolved) {
    console.log(
      `  y ${band.top}-${band.bottom} (h=${band.bottom - band.top + 1}) -> ${band.columns.length} photo(s): ` +
        band.columns.map((c) => `${c.left}-${c.right} (w=${c.right - c.left + 1})`).join(', '),
    );
  }

  await mkdir(OUT_DIR, { recursive: true });

  /**
   * Refine a candidate rectangle down to its actual content.
   *
   * A row band is only as tall as its TALLEST photo, so shorter neighbours pick
   * up a strip of page background underneath (and the legacy grid's rounded
   * corners bleed white at the edges). Measuring "is this line still background?"
   * and trimming inward fixes both, and is why the recovered crops come out clean
   * instead of carrying a white band.
   */
  const refine = (
    box: { left: number; top: number; width: number; height: number },
  ): { left: number; top: number; width: number; height: number } => {
    const INK_FLOOR = 0.02;
    const isContentRow = (y: number): boolean => {
      let ink = 0;
      for (let x = box.left; x < box.left + box.width; x += 1) {
        const i = (y * width + x) * 3;
        if (!isBackground(data[i] ?? 0, data[i + 1] ?? 0, data[i + 2] ?? 0)) ink += 1;
      }
      return ink / box.width > INK_FLOOR;
    };
    const isContentColumn = (x: number): boolean => {
      let ink = 0;
      for (let y = box.top; y < box.top + box.height; y += 1) {
        const i = (y * width + x) * 3;
        if (!isBackground(data[i] ?? 0, data[i + 1] ?? 0, data[i + 2] ?? 0)) ink += 1;
      }
      return ink / box.height > INK_FLOOR;
    };

    let top = box.top;
    let bottom = box.top + box.height - 1;
    while (top < bottom && !isContentRow(top)) top += 1;
    while (bottom > top && !isContentRow(bottom)) bottom -= 1;

    let left = box.left;
    let right = box.left + box.width - 1;
    while (left < right && !isContentColumn(left)) left += 1;
    while (right > left && !isContentColumn(right)) right -= 1;

    return { left, top, width: right - left + 1, height: bottom - top + 1 };
  };

  let index = 0;
  const written: string[] = [];

  for (const band of resolved) {
    for (const column of band.columns) {
      const rough = {
        left: Math.max(column.left, 0),
        top: Math.max(band.top, 0),
        width: Math.min(column.right - column.left + 1, width - Math.max(column.left, 0)),
        height: Math.min(band.bottom - band.top + 1, height - Math.max(band.top, 0)),
      };
      if (rough.width < 140 || rough.height < 90) continue;

      const box = refine(rough);
      if (box.width < 140 || box.height < 90) continue;

      index += 1;
      const name = `legacy-${String(index).padStart(2, '0')}`;
      const jpegPath = join(OUT_DIR, `${name}.jpg`);
      const webpPath = join(OUT_DIR, `${name}.webp`);

      const cropped = sharp(SOURCE).extract(box);

      const jpeg = await cropped.clone().jpeg({ quality: 84, mozjpeg: true }).toBuffer();
      const webp = await cropped.clone().webp({ quality: 80, effort: 5 }).toBuffer();

      await writeFile(jpegPath, jpeg);
      await writeFile(webpPath, webp);
      written.push(`${name} ${box.width}x${box.height}`);
    }
  }

  console.log(`[legacy] wrote ${written.length} photo(s) to ${OUT_DIR}/`);
  for (const line of written) console.log(`  ${line}`);
};

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
