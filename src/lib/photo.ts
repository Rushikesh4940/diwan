import type { Photo as PhotoData } from '../data/images'

/* URLs of the responsive WebP files written by the image pipeline: /images/<slug>-<width>.webp */
export const photoSrc = (p: PhotoData, w: number) => `/images/${p.slug}-${Math.min(w, p.width)}.webp`

export const srcSet = (p: PhotoData) => p.sizes.map((w) => `${photoSrc(p, w)} ${w}w`).join(', ')
