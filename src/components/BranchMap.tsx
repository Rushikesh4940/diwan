import { useState } from 'react'
import { Phone, Navigation } from 'lucide-react'
import { branches, mapsHref, telHref } from '../data/business'

const embedSrc = (address: string) =>
  `https://maps.google.com/maps?q=${encodeURIComponent(`Diwan Auto Care, ${address}`)}&z=16&output=embed`

/*
  Branch finder: pick a branch, see it on a real map, then call or get directions.
  The map is Google's keyless embed, located by the branch's published address.
*/
export function BranchMap() {
  const [id, setId] = useState(branches[0].id)
  const b = branches.find((x) => x.id === id)!

  return (
    <div className="w-full">
      <div role="tablist" aria-label="Choose a branch" className="flex flex-wrap gap-2">
        {branches.map((x) => (
          <button
            key={x.id}
            type="button"
            role="tab"
            aria-selected={x.id === id}
            aria-controls="branch-map-panel"
            onClick={() => setId(x.id)}
            className={`btn !min-h-[40px] !px-4 text-[0.9375rem] ${x.id === id ? 'btn-primary' : 'btn-quiet'}`}
          >
            {x.name}
          </button>
        ))}
      </div>

      <div id="branch-map-panel" role="tabpanel" className="mt-4 bg-surface">
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface-2 lg:aspect-[16/10]">
          <iframe
            key={b.id}
            title={`Map showing the ${b.name} branch`}
            src={embedSrc(b.address)}
            className="absolute inset-0 h-full w-full border-0 [filter:grayscale(1)_invert(0.9)_contrast(0.9)]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            style={{ animation: 'fade-in 400ms ease-out both' }}
          />
        </div>
        <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0">
            <p className="h-item">
              {b.name} <span className="text-base font-semibold text-accent">· {b.city}</span>
            </p>
            <p className="mt-1 max-w-[46ch] text-base leading-snug text-muted">{b.address}</p>
          </div>
          <div className="flex shrink-0 gap-2">
            <a href={telHref(b.phone)} className="btn btn-primary !min-h-[44px] !px-4 text-[0.9375rem]" aria-label={`Call ${b.name}: ${b.phone}`}>
              <Phone size={16} aria-hidden="true" /> Call
            </a>
            <a href={mapsHref(b.address)} target="_blank" rel="noopener noreferrer" className="btn btn-quiet !min-h-[44px] !px-4 text-[0.9375rem]">
              <Navigation size={16} aria-hidden="true" /> Directions
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
