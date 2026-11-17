// Deterministic pseudo-random so sketchy paths don't re-randomize between renders.

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export type Rng = () => number;

export function makeRng(seed: number): Rng {
  return mulberry32(seed);
}

function wob(mag: number, rng: Rng) {
  return (rng() - 0.5) * mag;
}

/**
 * Build a slightly wobbly rounded-rectangle path so the bubble outline
 * feels hand-drawn rather than perfectly geometric.
 */
export function wobblyRect(
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
  rng: Rng
): string {
  const tl = `M ${x + r + wob(1.5, rng)} ${y + wob(1.2, rng)}`;
  const tr = `L ${x + w - r + wob(1.5, rng)} ${y + wob(1.2, rng)}`;
  const trc = `Q ${x + w + wob(1.5, rng)} ${y} ${x + w + wob(1.2, rng)} ${y + r + wob(1.5, rng)}`;
  const br = `L ${x + w + wob(1.2, rng)} ${y + h - r + wob(1.5, rng)}`;
  const brc = `Q ${x + w + wob(1.2, rng)} ${y + h + wob(1.5, rng)} ${x + w - r + wob(1.5, rng)} ${y + h + wob(1.2, rng)}`;
  const bl = `L ${x + r + wob(1.5, rng)} ${y + h + wob(1.2, rng)}`;
  const blc = `Q ${x + wob(1.2, rng)} ${y + h + wob(1.5, rng)} ${x + wob(1.2, rng)} ${y + h - r + wob(1.5, rng)}`;
  const tl2 = `L ${x + wob(1.2, rng)} ${y + r + wob(1.5, rng)}`;
  const tlc = `Q ${x + wob(1.2, rng)} ${y + wob(1.5, rng)} ${x + r + wob(1.5, rng)} ${y + wob(1.2, rng)}`;
  return `${tl} ${tr} ${trc} ${br} ${brc} ${bl} ${blc} ${tl2} ${tlc} Z`;
}

/**
 * A hand-drawn arrow: a gently curved stem plus a sketchy two-line arrowhead.
 * Returns { stem, headA, headB } path strings.
 */
export function sketchArrow(
  fromX: number,
  fromY: number,
  toX: number,
  toY: number,
  rng: Rng
): { stem: string; headA: string; headB: string } {
  const dx = toX - fromX;
  const dy = toY - fromY;
  const len = Math.hypot(dx, dy) || 1;
  const ux = dx / len;
  const uy = dy / len;
  // perpendicular for the curve control offset
  const px = -uy;
  const py = ux;
  const bow = (rng() - 0.4) * Math.min(26, len * 0.18);
  const cx = (fromX + toX) / 2 + px * bow;
  const cy = (fromY + toY) / 2 + py * bow;

  const stem = `M ${fromX + wob(1.2, rng)} ${fromY + wob(1.2, rng)} Q ${cx} ${cy} ${toX + wob(1, rng)} ${toY + wob(1, rng)}`;

  // arrowhead: two short strokes back from the tip
  const ah = 12;
  const spread = 0.45;
  const h1x = toX - ux * ah + px * ah * spread;
  const h1y = toY - uy * ah + py * ah * spread;
  const h2x = toX - ux * ah - px * ah * spread;
  const h2y = toY - uy * ah - py * ah * spread;

  const headA = `M ${toX + wob(0.8, rng)} ${toY + wob(0.8, rng)} L ${h1x + wob(1, rng)} ${h1y + wob(1, rng)}`;
  const headB = `M ${toX + wob(0.8, rng)} ${toY + wob(0.8, rng)} L ${h2x + wob(1, rng)} ${h2y + wob(1, rng)}`;

  return { stem, headA, headB };
}
