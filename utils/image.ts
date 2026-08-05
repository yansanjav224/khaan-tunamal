/**
 * Cloudinary delivery transforms.
 *
 * Originals are stored untouched (unsigned uploads reject a `transformation`
 * param), so every render site has to ask for the size it actually needs.
 * `f_auto` serves WebP/AVIF where supported and `q_auto` picks the quality —
 * both are free-tier features and cut typical product images from ~200 kB to
 * ~30 kB. Non-Cloudinary URLs pass through unchanged.
 */
export function imgUrl(url: string | undefined | null, width = 800): string {
  if (!url) return ''
  if (!url.includes('res.cloudinary.com') || !url.includes('/upload/')) return url
  // Already transformed — don't stack transforms.
  if (/\/upload\/[a-z]_[^/]*\//.test(url)) return url
  return url.replace('/upload/', `/upload/c_limit,w_${width},q_auto,f_auto/`)
}

/** Widths used across the site, so call sites stay consistent. */
export const IMG = {
  thumb: 200,
  card: 600,
  hero: 1200,
  full: 1600,
} as const
