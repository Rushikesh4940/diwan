import { useEffect, useRef } from 'react'
import { clips } from '../data/clips'

/*
  A silent loop, treated like the photographs (monochrome). It only plays while
  on screen, and never plays for visitors who prefer reduced motion: they see
  the poster frame.
*/
export function Clip({ name, className = '' }: { name: keyof typeof clips; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  const c = clips[name]

  useEffect(() => {
    const v = ref.current
    if (!v || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) v.play().catch(() => {})
      else v.pause()
    })
    io.observe(v)
    return () => io.disconnect()
  }, [])

  return (
    <video
      ref={ref}
      muted
      loop
      playsInline
      preload="none"
      poster={c.poster}
      width={c.width}
      height={c.height}
      aria-hidden="true"
      className={`h-full w-full object-cover grayscale contrast-[1.1] ${className}`}
    >
      <source src={c.src} type="video/webm" />
    </video>
  )
}
