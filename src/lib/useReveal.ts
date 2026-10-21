import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/*
  Section entrances. Any element with [data-reveal] has its direct children
  staggered in once it scrolls into view. Without JS (or before this runs)
  the content is fully visible, because the hiding styles are scoped to `.js`.
*/
export function useReveal() {
  const { pathname } = useLocation()

  useEffect(() => {
    document.documentElement.classList.add('js')
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-in)'))
    nodes.forEach((node) => {
      Array.from(node.children).forEach((child, i) => (child as HTMLElement).style.setProperty('--i', String(i)))
    })

    if (!('IntersectionObserver' in window)) {
      nodes.forEach((n) => n.classList.add('is-in'))
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in')
            io.unobserve(entry.target)
          }
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.08 },
    )
    nodes.forEach((n) => io.observe(n))
    return () => io.disconnect()
  }, [pathname])
}
