import { Phone, MapPin } from 'lucide-react'
import { Photo } from './Photo'
import { branches, business, mapsHref, telHref } from '../data/business'

type Props = { headingLevel?: 2 | 3; withPhoto?: boolean; id?: string }

/* The four branches, as a directory: name, area, number and a map link. */
export function BranchList({ headingLevel = 2, withPhoto = true, id = 'branches' }: Props) {
  const H = headingLevel === 2 ? 'h2' : 'h3'
  return (
    <section id={id} className="frame section scroll-mt-24" aria-labelledby={`${id}-title`}>
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-6">
        <div data-reveal className="lg:col-span-4">
          <H id={`${id}-title`} className="h-section">
            Four branches
          </H>
          <p className="mt-5 max-w-[34ch]">
            Three in Thane West, with the headquarters at Anand Nagar, and one at Gopal Nagar in Bhiwandi.
          </p>
          <p className="small mt-4 text-muted">Opening hours listed publicly: {business.hours.toLowerCase()}. Call ahead to confirm.</p>
          {withPhoto && (
            <figure className="mt-10 hidden lg:block">
              <div className="disc w-[78%]">
                <Photo name="ghodbunder" sizes="26vw" />
              </div>
              <figcaption className="small mt-3 max-w-[30ch] text-muted">
                Ghodbunder Road, the highway the Anand Nagar headquarters stands on.
              </figcaption>
            </figure>
          )}
        </div>

        <ul data-reveal className="grid gap-x-12 gap-y-4 sm:grid-cols-2 lg:col-span-8">
          {branches.map((b) => (
            <li key={b.id} className="py-6">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="h-item">{b.name}</h3>
                <span className="small shrink-0 text-muted">{b.city}</span>
              </div>
              <p className="mt-1 text-base font-semibold text-accent">{b.area}</p>
              <address className="mt-3 text-base not-italic leading-snug text-ink">{b.address}</address>
              <div className="mt-5 flex flex-wrap gap-2">
                <a href={telHref(b.phone)} className="btn btn-primary !min-h-[44px] !px-4 text-base tabular">
                  <Phone size={16} aria-hidden="true" /> {b.phone}
                </a>
                <a
                  href={mapsHref(b.address)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-quiet !min-h-[44px] !px-4 text-base"
                  aria-label={`Open ${b.name} branch in Google Maps`}
                >
                  <MapPin size={16} aria-hidden="true" /> Map
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
