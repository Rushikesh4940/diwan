import { Link } from 'react-router-dom'
import { Photo } from './Photo'
import { Clip } from './Clip'
import { services } from '../data/services'

/* Specimens on colour tiles: each service shown as one photograph in the tyre's circle. */
const featured = ['car-tyres', 'alloy-wheels', 'batteries', 'wheel-alignment', 'wheel-balancing', 'puncture-repair']
const fields = ['bg-accent on-accent', 'bg-paper on-accent', 'bg-surface-2']

export function ServiceGrid() {
  const items = featured.map((id) => services.find((s) => s.id === id)!)
  return (
    <section className="frame section" aria-labelledby="fit-title">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-6">
        <div data-reveal className="lg:col-span-3">
          <h2 id="fit-title" className="h-section">
            What we fit and fix
          </h2>
          <p className="mt-5 max-w-[36ch] text-ink lg:max-w-[30ch]">
            New tyres and batteries, and the wheel work that keeps them lasting, done in the branch while you wait.
          </p>
          <Link to="/services" className="link mt-6 inline-block font-semibold">
            All ten services
          </Link>
        </div>

        <ul data-reveal className="grid grid-cols-2 gap-x-2 gap-y-8 md:grid-cols-4 md:gap-x-2.5 lg:col-span-9">
          {items.map((s, i) => {
            // Two wide tiles, one per row on desktop: the grid closes with no empty cell at any width.
            const wide = i === 1 || i === items.length - 1
            return (
              <li key={s.id} className={wide ? `col-span-2 ${i === 1 ? 'max-md:order-first' : ''}` : ''}>
                <Link to={`/services#${s.id}`} className="group block text-ink no-underline">
                  <div
                    className={`${fields[i % 3]} flex items-center justify-center overflow-hidden ${
                      wide ? 'aspect-[8/5]' : 'aspect-[4/5]'
                    }`}
                  >
                    <div className="disc h-[70%] transition-transform duration-500 ease-[var(--ease-out-quart)] group-hover:scale-[1.04]">
                      {s.clip ? (
                        <Clip name={s.clip} />
                      ) : (
                        <Photo name={s.photo} sizes={wide ? '(min-width: 768px) 24vw, 60vw' : '(min-width: 768px) 14vw, 34vw'} />
                      )}
                    </div>
                  </div>
                  <h3 className="mt-3 text-lg font-semibold leading-tight md:text-xl">
                    <span className="transition-colors group-hover:text-accent">{s.name}</span>
                  </h3>
                  <p className="mt-1 text-base leading-snug text-muted">{s.fact}</p>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
