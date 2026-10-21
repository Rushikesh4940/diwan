import { useEffect } from 'react'

const SUFFIX = 'Diwan Auto Care (concept)'

function setMeta(selector: string, attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

/* Per-page title and description, mirrored into Open Graph tags. */
export function useSeo(title: string, description: string) {
  useEffect(() => {
    const full = `${title} | ${SUFFIX}`
    document.title = full
    setMeta('meta[name="description"]', 'name', 'description', description)
    setMeta('meta[property="og:title"]', 'property', 'og:title', full)
    setMeta('meta[property="og:description"]', 'property', 'og:description', description)
  }, [title, description])
}
