/**
 * ASRG monogram geometry, the single source for the inline React logo and the
 * rasterised icons (scripts/brand.ts). No imports: Node runs this file directly.
 *
 * An "A" built like a structure: two raked columns meeting at the apex, a
 * lintel that bears past both columns, a plinth line, and (detail sizes only)
 * a plumb bob hanging from the lintel.
 */

export const MARK_SIZE = 48;
export const MARK_STROKE = 3;

export const markPaths = {
  columns: "M11 41 L24 9 L37 41",
  lintel: "M13 30 H35",
  plinth: "M5 41 H43",
} as const;

/** Too fine below ~24px, so only drawn on the detail variant. */
export const plumbPaths = {
  line: "M24 31.5 V34.2",
  bob: "M24 34 L26.1 36.1 L24 38.2 L21.9 36.1 Z",
} as const;

interface MarkSvgOptions {
  fg: string;
  bg?: string;
  shape?: "none" | "square" | "circle";
  /** Output pixel size of the square SVG. */
  size?: number;
  /** Space around the mark, as a fraction of the mark box. */
  pad?: number;
  detail?: boolean;
}

/** Standalone SVG markup for rasterising or data URIs. */
export function markSvg({ fg, bg, shape = "none", size = 512, pad = 0.18, detail = true }: MarkSvgOptions) {
  const p = MARK_SIZE * pad;
  const box = MARK_SIZE + p * 2;
  const back =
    bg && shape === "square"
      ? `<rect x="${-p}" y="${-p}" width="${box}" height="${box}" fill="${bg}"/>`
      : bg && shape === "circle"
        ? `<circle cx="${MARK_SIZE / 2}" cy="${MARK_SIZE / 2}" r="${box / 2}" fill="${bg}"/>`
        : "";
  const stroke = `fill="none" stroke="${fg}" stroke-width="${MARK_STROKE}" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4"`;
  const plumb = detail
    ? `<path d="${plumbPaths.line}" fill="none" stroke="${fg}" stroke-width="1.4"/><path d="${plumbPaths.bob}" fill="${fg}"/>`
    : "";

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="${-p} ${-p} ${box} ${box}">${back}<g ${stroke}><path d="${markPaths.columns}"/><path d="${markPaths.lintel}"/><path d="${markPaths.plinth}"/></g>${plumb}</svg>`;
}
