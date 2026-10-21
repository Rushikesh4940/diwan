import { useEffect, useRef, useState } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { Menu, X, Phone, ArrowRight } from 'lucide-react'
import { Wordmark } from './Wordmark'
import { primaryPhone, telHref } from '../data/business'

const links = [
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/workshop', label: 'Workshop' },
  { to: '/contact', label: 'Contact' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const toggleRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLElement>(null)
  const [panelTop, setPanelTop] = useState(72)

  // Close the menu when the route changes (adjusting state during render, not in an effect).
  const [lastPath, setLastPath] = useState(pathname)
  if (lastPath !== pathname) {
    setLastPath(pathname)
    setOpen(false)
  }

  // Lock scroll, close on Escape, and keep focus inside the open menu.
  useEffect(() => {
    if (!open) return
    setPanelTop(headerRef.current?.getBoundingClientRect().bottom ?? 72)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const first = panelRef.current?.querySelector<HTMLElement>('a, button')
    first?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
      if (e.key === 'Tab' && panelRef.current) {
        const items = Array.from(panelRef.current.querySelectorAll<HTMLElement>('a, button'))
        const [a, z] = [items[0], items[items.length - 1]]
        if (e.shiftKey && document.activeElement === a) {
          e.preventDefault()
          z.focus()
        } else if (!e.shiftKey && document.activeElement === z) {
          e.preventDefault()
          a.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <header ref={headerRef} className="sticky top-0 z-50 bg-ground">
      <nav className="frame flex h-[72px] items-center justify-between gap-6" aria-label="Main">
        <Wordmark />

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                className={({ isActive }) =>
                  `relative py-2 font-semibold no-underline transition-colors duration-200 ${
                    isActive ? 'text-accent' : 'text-ink hover:text-accent'
                  }`
                }
              >
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <a href={telHref(primaryPhone)} className="btn btn-quiet !min-h-[44px] !px-4" aria-label={`Call ${primaryPhone}`}>
            <Phone size={17} aria-hidden="true" />
            <span className="hidden lg:inline tabular">{primaryPhone}</span>
          </a>
          <Link to="/book" className="btn btn-primary !min-h-[44px]">
            Book a visit
          </Link>
        </div>

        <button
          ref={toggleRef}
          type="button"
          className="btn btn-quiet !min-h-[44px] !px-4 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          <span>{open ? 'Close' : 'Menu'}</span>
        </button>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          ref={panelRef}
          className="fixed inset-x-0 bottom-0 z-40 flex flex-col overflow-y-auto bg-ground md:hidden"
          style={{ top: panelTop, animation: 'fade-in 200ms ease-out both' }}
        >
          <ul className="frame flex flex-col gap-1 pt-6">
            {[{ to: '/', label: 'Home' }, ...links].map((l, i) => (
              <li key={l.to} style={{ animation: `rise-in 420ms var(--ease-out-expo) ${i * 45}ms both` }}>
                <NavLink
                  to={l.to}
                  end={l.to === '/'}
                  className={({ isActive }) =>
                    `display block py-3 text-[2.75rem] no-underline ${isActive ? 'text-accent' : 'text-ink'}`
                  }
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="frame mt-auto flex flex-col gap-3 pb-[max(24px,env(safe-area-inset-bottom))] pt-10">
            <Link to="/book" className="btn btn-primary w-full">
              Book a visit <ArrowRight size={18} className="arrow" aria-hidden="true" />
            </Link>
            <a href={telHref(primaryPhone)} className="btn btn-quiet w-full tabular">
              <Phone size={18} aria-hidden="true" /> Call {primaryPhone}
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
