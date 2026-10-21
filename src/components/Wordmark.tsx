import { Link } from 'react-router-dom'

/*
  A text wordmark drawn for this concept. It deliberately does not reproduce
  Diwan Auto Care's registered logo; swap in the official mark with permission.
  The ring is the site's one motif: a tyre seen side-on.
*/
export function Ring({ size = 30, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true" className={className}>
      <circle cx="16" cy="16" r="11.5" fill="none" stroke="currentColor" strokeWidth="6" />
      <circle cx="16" cy="16" r="3.2" fill="currentColor" />
    </svg>
  )
}

export function Wordmark({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      to="/"
      onClick={onClick}
      className="group inline-flex items-center gap-2.5 text-ink no-underline"
      aria-label="Diwan Auto Care concept, home"
    >
      <Ring className="text-accent transition-transform duration-500 ease-out group-hover:rotate-90" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.45rem] font-bold tracking-[-0.04em]">DIWAN</span>
        <span className="mt-0.5 text-[0.8125rem] font-semibold text-muted">Auto Care</span>
      </span>
    </Link>
  )
}
