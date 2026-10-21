import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { Photo } from './Photo'
import { photoSrc } from '../lib/photo'
import { allPhotos, type Photo as PhotoData } from '../data/images'

const filters = ['All', 'Tyres', 'Wheels', 'Batteries & brakes', 'Thane'] as const
type Filter = (typeof filters)[number]

/* Full-size view in a native modal dialog: focus is trapped and restored by the browser. */
function Lightbox({ items, index, onClose, onMove }: { items: PhotoData[]; index: number; onClose: () => void; onMove: (d: number) => void }) {
  const ref = useRef<HTMLDialogElement>(null)
  const p = items[index]

  useEffect(() => {
    const d = ref.current
    if (d && !d.open) d.showModal()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') onMove(1)
      if (e.key === 'ArrowLeft') onMove(-1)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onMove])

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && ref.current?.close()}
      aria-label={p.alt}
      className="m-0 h-[100dvh] max-h-none w-screen max-w-none bg-ground/95 p-0 text-ink backdrop:bg-ground/80"
    >
      <div className="flex h-full flex-col">
        <div className="frame flex items-center justify-between py-4">
          <p className="small text-muted tabular">
            {index + 1} / {items.length}
          </p>
          <button type="button" className="btn btn-quiet !min-h-[44px]" onClick={() => ref.current?.close()} autoFocus>
            <X size={18} aria-hidden="true" /> Close
          </button>
        </div>
        <figure className="frame flex min-h-0 flex-1 flex-col items-center justify-center gap-4 pb-6">
          <img
            key={p.slug}
            src={photoSrc(p, 1920)}
            srcSet={p.sizes.map((w) => `${photoSrc(p, w)} ${w}w`).join(', ')}
            sizes="92vw"
            alt={p.alt}
            className="min-h-0 max-w-full flex-1 object-contain"
            style={{ animation: 'fade-in 260ms ease-out both' }}
          />
          <figcaption className="max-w-[70ch] text-center">
            <span className="block">{p.alt}.</span>
            <span className="small mt-1 block text-muted">
              Illustrative photo, not Diwan Auto Care’s work. “{p.title}” by {p.creator},{' '}
              <a className="link" href={p.licenceUrl} target="_blank" rel="noopener noreferrer">
                {p.licence}
              </a>
              , via{' '}
              <a className="link" href={p.page} target="_blank" rel="noopener noreferrer">
                Wikimedia Commons
              </a>
              .
            </span>
          </figcaption>
        </figure>
        <div className="frame flex justify-center gap-3 pb-[max(20px,env(safe-area-inset-bottom))]">
          <button type="button" className="btn btn-quiet" onClick={() => onMove(-1)} aria-label="Previous photo">
            <ChevronLeft size={20} aria-hidden="true" /> Previous
          </button>
          <button type="button" className="btn btn-quiet" onClick={() => onMove(1)} aria-label="Next photo">
            Next <ChevronRight size={20} aria-hidden="true" />
          </button>
        </div>
      </div>
    </dialog>
  )
}

export function Gallery() {
  const [filter, setFilter] = useState<Filter>('All')
  const [open, setOpen] = useState<number | null>(null)
  const items = filter === 'All' ? allPhotos : allPhotos.filter((p) => p.category === filter)

  return (
    <section className="frame section" aria-labelledby="gallery-title">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 id="gallery-title" className="h-section">
            Pictures of the trade
          </h2>
          <p className="mt-4 max-w-[52ch]">
            Illustrative photographs of tyre and wheel work and of the roads the branches serve. They are not Diwan Auto
            Care’s own work; the business’s photographs would replace them before launch.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 md:justify-end" role="group" aria-label="Filter photos">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
              className={`btn shrink-0 !min-h-[44px] !px-4 text-base ${filter === f ? 'btn-primary' : 'btn-quiet'}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <ul className="mt-12 grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-3 md:gap-x-6 lg:grid-cols-4" aria-live="polite">
        {items.map((p, i) => (
          <li key={p.slug} style={{ animation: `rise-in 500ms var(--ease-out-expo) ${i * 40}ms both` }}>
            <button
              type="button"
              onClick={() => setOpen(i)}
              className="group block w-full text-left"
              aria-label={`View larger: ${p.alt}`}
            >
              <span className={`disc block ${i % 4 === 0 ? 'bg-accent on-accent' : ''}`}>
                <Photo
                  name={p}
                  sizes="(min-width: 1024px) 22vw, (min-width: 640px) 30vw, 46vw"
                  className="transition-transform duration-500 ease-[var(--ease-out-quart)] group-hover:scale-[1.06]"
                />
              </span>
              <span className="mt-3 block text-base font-semibold leading-snug transition-colors group-hover:text-accent">
                {p.title}
              </span>
              <span className="block text-base text-muted">{p.category}</span>
            </button>
          </li>
        ))}
      </ul>

      {open !== null && (
        <Lightbox
          items={items}
          index={open}
          onClose={() => setOpen(null)}
          onMove={(d) => setOpen((o) => (o === null ? o : (o + d + items.length) % items.length))}
        />
      )}
    </section>
  )
}
