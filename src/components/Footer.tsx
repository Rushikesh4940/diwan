import { Link } from 'react-router-dom'
import { ArrowUp } from 'lucide-react'
import { branches, business, telHref } from '../data/business'

/* The name closes the page, built from blocks like a row of tyres on a rack. */
const blocks = [
  { ch: 'D', h: 100, bg: 'bg-accent' },
  { ch: 'I', h: 78, bg: 'bg-paper' },
  { ch: 'W', h: 92, bg: 'bg-accent' },
  { ch: 'A', h: 66, bg: 'bg-surface-2 text-ink' },
  { ch: 'N', h: 86, bg: 'bg-paper' },
]

const columns = [
  {
    title: 'Services',
    links: [
      { to: '/services#car-tyres', label: 'Car tyres' },
      { to: '/services#wheel-alignment', label: 'Wheel alignment' },
      { to: '/services#wheel-balancing', label: 'Wheel balancing' },
      { to: '/services#batteries', label: 'Batteries' },
    ],
  },
  {
    title: 'Company',
    links: [
      { to: '/about', label: 'About' },
      { to: '/workshop', label: 'Workshop' },
      { to: '/contact#branches', label: 'Branches' },
      { to: '/contact#privacy', label: 'Privacy' },
    ],
  },
]

export function Footer() {
  const thane = branches.filter((b) => b.city === 'Thane').slice(0, 2)
  return (
    <footer className="bg-ground pt-[var(--section-gap)]">
      <div className="frame">
        <div className="flex h-[22svh] min-h-[150px] items-end gap-1 md:h-[34svh] md:min-h-[220px]" aria-hidden="true">
          {blocks.map((b) => (
            <div
              key={b.ch}
              className={`${b.bg} flex flex-1 items-end justify-center overflow-hidden text-ground`}
              style={{ height: `${b.h}%` }}
            >
              <span className="display translate-y-[0.1em] text-[clamp(4rem,17vw,16rem)] leading-[0.8]">{b.ch}</span>
            </div>
          ))}
        </div>
        <p className="sr-only">Diwan Auto Care</p>

        <div className="mt-14 grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-12">
          {columns.map((c) => (
            <nav key={c.title} aria-label={c.title} className="md:col-span-2">
              <h2 className="mb-3 font-semibold text-muted small">{c.title}</h2>
              <ul className="flex flex-col gap-2">
                {c.links.map((l) => (
                  <li key={l.to}>
                    <Link to={l.to} className="text-base text-ink no-underline hover:text-accent">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
          <div className="col-span-2 md:col-span-4">
            <h2 className="mb-3 font-semibold text-muted small">Follow</h2>
            <ul className="flex flex-col gap-2 text-base">
              <li>
                <a className="text-ink no-underline hover:text-accent" href={business.social.instagram} target="_blank" rel="noopener noreferrer">
                  Instagram
                </a>
              </li>
              <li>
                <a className="text-ink no-underline hover:text-accent" href={business.social.facebook} target="_blank" rel="noopener noreferrer">
                  Facebook
                </a>
              </li>
              <li>
                <a className="text-ink no-underline hover:text-accent" href={`mailto:${business.email}`}>
                  {business.email}
                </a>
              </li>
            </ul>
          </div>
          <div className="col-span-2 grid gap-6 sm:grid-cols-2 md:col-span-4 md:grid-cols-1">
            {thane.map((b) => (
              <address key={b.id} className="not-italic text-base">
                <span className="font-semibold">{b.name}, Thane</span>
                <br />
                <a href={telHref(b.phone)} className="tabular text-ink no-underline hover:text-accent">
                  {b.phone}
                </a>
              </address>
            ))}
            <Link to="/contact#branches" className="link text-base">
              All four branches
            </Link>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-6 bg-surface p-6 md:flex-row md:items-end md:justify-between md:p-8">
          <div className="max-w-[68ch] text-base text-muted">
            <p className="text-ink">
              Independent website concept. Not the official website of {business.legalName}, and not commissioned or
              endorsed by it.
            </p>
            <p className="mt-2">
              Business details are taken from public sources and may be out of date. Photographs are illustrative; none
              of them shows Diwan Auto Care’s own branches or work.
            </p>
          </div>
          <button
            type="button"
            className="btn btn-quiet shrink-0 self-start md:self-auto"
            onClick={() => window.scrollTo({ top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })}
          >
            <ArrowUp size={18} aria-hidden="true" /> Back to top
          </button>
        </div>
        <div className="h-[max(24px,env(safe-area-inset-bottom))]" />
      </div>
    </footer>
  )
}
