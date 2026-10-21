import { Photo } from './Photo'
import { oshiwaraStore, SOURCES } from '../data/business'

/* Verified figures for the Oshiwara store, from Michelin India's launch release. */
export function StoreProof() {
  const figures = [
    { n: oshiwaraStore.bays, label: 'service bays' },
    { n: oshiwaraStore.lifts, label: 'lifts, plus a pit' },
    { n: oshiwaraStore.serviceAreaSqFt.toLocaleString('en-IN'), label: 'sq ft of service floor' },
  ]
  return (
    <section className="bg-accent text-paper-ink" aria-labelledby="store-title">
      <div className="frame section grid items-center gap-12 lg:grid-cols-12 lg:gap-6">
        <div className="on-accent lg:col-span-5">
          <div className="disc mx-auto w-[78vw] max-w-[560px] lg:w-full">
            <Photo name="alignmentBay" sizes="(min-width: 768px) 40vw, 78vw" className="drift" />
          </div>
        </div>
        <div data-reveal className="lg:col-span-6 lg:col-start-7">
          <h2 id="store-title" className="h-section">
            The largest MTS store in Mumbai
          </h2>
          <p className="lead mt-6 max-w-[38ch]">
            In {oshiwaraStore.launched}, Michelin India opened its largest Michelin Tyre &amp; Service store in Mumbai with
            Diwan Auto Care, at Oshiwara in Jogeshwari West.
          </p>
          <dl className="mt-10 grid grid-cols-3 gap-4">
            {figures.map((f) => (
              <div key={f.label}>
                <dt className="sr-only">{f.label}</dt>
                <dd>
                  <span className="display tabular block text-[clamp(2.5rem,6vw,5rem)]">{f.n}</span>
                  <span className="mt-2 block text-base font-semibold leading-snug lg:text-base">{f.label}</span>
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-10 max-w-[44ch]">
            The bays run {oshiwaraStore.equipment.join(' and ')} equipment.{' '}
            <a href={SOURCES.michelin} target="_blank" rel="noopener noreferrer" className="font-semibold underline underline-offset-4">
              Michelin India’s announcement
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
