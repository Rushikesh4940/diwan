import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Photo } from './Photo'

/* The business's own advice, set as a full-width yellow band. */
export function InspectionBand() {
  return (
  <section className="bg-accent text-paper-ink" aria-labelledby="check-title">
    <div className="frame section grid items-center gap-10 md:grid-cols-12 md:gap-6">
      <div data-reveal className="md:col-span-7">
        <h2 id="check-title" className="h-section">
          Check your tyres every three months
        </h2>
        <p className="lead mt-6 max-w-[42ch]">
          That is the interval Diwan Auto Care recommends: tread depth, pressure, cuts on the sidewall, and the wear
          pattern that shows when alignment is off.
        </p>
        <Link to="/book?service=wheel-alignment" className="btn btn-dark mt-9">
          Book a tyre check <ArrowRight size={18} className="arrow" aria-hidden="true" />
        </Link>
      </div>
      <div className="on-accent md:col-span-4 md:col-start-9">
        <div className="disc mx-auto w-[70vw] max-w-[420px] md:w-full">
          <Photo name="wornTread" sizes="(min-width: 768px) 30vw, 70vw" />
        </div>
      </div>
    </div>
  </section>
  )
}
