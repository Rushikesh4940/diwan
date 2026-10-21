import type { CSSProperties } from 'react'
import { photos, type Photo as PhotoData, type PhotoKey } from '../data/images'
import { photoSrc, srcSet } from '../lib/photo'

type Props = {
  name: PhotoKey | PhotoData
  /* The rendered width hint for the browser, e.g. "(min-width: 900px) 40vw, 90vw" */
  sizes?: string
  className?: string
  priority?: boolean
  alt?: string
  style?: CSSProperties
}

/* Responsive, lazily loaded photograph. Pass `priority` for the one above-the-fold image. */
export function Photo({ name, sizes = '100vw', className, priority, alt, style }: Props) {
  const p = typeof name === 'string' ? photos[name] : name
  const mid = p.sizes[Math.min(1, p.sizes.length - 1)]
  return (
    <img
      src={photoSrc(p, mid)}
      srcSet={srcSet(p)}
      sizes={sizes}
      width={p.width}
      height={p.height}
      alt={alt ?? p.alt}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
      className={className}
      style={style}
    />
  )
}
