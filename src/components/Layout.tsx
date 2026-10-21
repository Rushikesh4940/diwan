import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { ConceptBar } from './ConceptBar'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { useReveal } from '../lib/useReveal'

/* Scroll to the top on a new page, or to the #hash target when there is one. */
function useScrollRestore() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      // Wait a frame so the new page has rendered its anchors.
      requestAnimationFrame(() => document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView())
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, hash])
}

export function Layout() {
  useScrollRestore()
  useReveal()
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <ConceptBar />
      <Navbar />
      <main id="main" tabIndex={-1} className="outline-none">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
