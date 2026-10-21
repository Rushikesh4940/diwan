import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { PageHeader } from '../components/PageHeader'
import { Photo } from '../components/Photo'
import { branches, business, oshiwaraStore } from '../data/business'
import { useSeo } from '../lib/useSeo'

const milestones = [
  {
    photo: 'tread' as const,
    when: String(business.founded),
    what: 'The business begins',
    text: 'The year the business was founded, according to Michelin India’s 2025 announcement.',
  },
  {
    photo: 'battery' as const,
    when: 'Before 2019',
    what: 'Three names on three counters',
    text: `${business.formerNames.join(', ').replace(/, ([^,]*)$/, ' and $1')} serve customers across Thane and Bhiwandi.`,
  },
  {
    photo: 'alignmentClamp' as const,
    when: business.mergedIn,
    what: 'One firm: Diwan Auto Care LLP',
    text: 'The three businesses merge, so tyres, batteries and wheel service sit under one name and one roof.',
  },
  {
    photo: 'alignmentBay' as const,
    when: oshiwaraStore.launched,
    what: 'Michelin Tyre & Service, Oshiwara',
    text: `Michelin India opens its largest MTS store in Mumbai with Diwan Auto Care: ${oshiwaraStore.bays} bays, ${oshiwaraStore.lifts} lifts and a pit.`,
  },
]

const values = [
  { name: 'Honesty', text: 'Clear prices and a straight answer on whether a tyre can be repaired or must be replaced.' },
  { name: 'Expertise', text: 'Trained technicians and alignment and balancing machinery that measure rather than guess.' },
  { name: 'Quality', text: 'Tyres and batteries from the established brands, fitted to the specification of your vehicle.' },
]

export function About() {
  useSeo(
    'About: a family business since 1978',
    'Diwan Auto Care LLP is a family-owned tyre, battery and wheel-service business formed in 2019 from Tyre Best, Battery Best and Auto Care Centre, with six branches.',
  )
  return (
    <>
      <PageHeader
        title="A family trade"
        photo="thane"
        intro={
          <>
            Diwan Auto Care is a family-owned business that has looked after cars and bikes in Thane for generations. Today
            it has {business.teamSize} people across {branches.length} branches.
          </>
        }
      />

      <section className="frame section" aria-labelledby="story-title">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-6">
          <div data-reveal className="lg:col-span-4">
            <h2 id="story-title" className="h-section">
              How it came together
            </h2>
            <p className="mt-5 max-w-[34ch]">
              Three family businesses with their own names became one firm in 2019.
            </p>
          </div>
          <ol data-reveal className="grid gap-x-12 gap-y-14 sm:grid-cols-2 lg:col-span-8">
            {milestones.map((m) => (
              <li key={m.what}>
                <div className="disc mb-6 w-36 md:w-40">
                  <Photo name={m.photo} sizes="160px" alt="" />
                </div>
                <p className="display text-[clamp(2.25rem,4vw,3.5rem)] text-accent">{m.when}</p>
                <h3 className="mt-3 text-[1.25rem] font-bold leading-tight">{m.what}</h3>
                <p className="mt-2 max-w-[40ch] text-ink">{m.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-accent text-paper-ink" aria-labelledby="values-title">
        <div className="frame section">
          <h2 id="values-title" className="h-section max-w-[16ch]">
            Honesty, expertise and quality
          </h2>
          <p className="lead mt-5 max-w-[48ch]">
            The three traditions the business names itself. Here is what each one means at the counter.
          </p>
          <div data-reveal className="mt-14 grid gap-10 md:grid-cols-3 md:gap-6">
            {values.map((v) => (
              <div key={v.name} className="flex gap-5">
                <span className="mt-1 h-10 w-10 shrink-0 rounded-full border-[7px] border-paper-ink" aria-hidden="true" />
                <div>
                  <h3 className="h-item">{v.name}</h3>
                  <p className="mt-2 max-w-[34ch]">{v.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="frame section" aria-labelledby="brands-title">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-6">
          <div data-reveal className="lg:col-span-4">
            <h2 id="brands-title" className="h-section">
              Brands on the rack
            </h2>
            <p className="mt-5 max-w-[34ch]">
              Tyres and batteries from {business.brands.length} makers, so the choice is between products, not between
              shops.
            </p>
            <figure className="mt-10">
              <div className="disc w-[64%]">
                <Photo name="tyreStack" sizes="(min-width: 768px) 22vw, 60vw" />
              </div>
            </figure>
          </div>
          <ul data-reveal className="flex flex-wrap content-start gap-x-6 gap-y-1 lg:col-span-8" aria-label="Brands stocked">
            {business.brands.map((b, i) => (
              <li
                key={b}
                className={`font-display text-[clamp(2rem,4.6vw,4.25rem)] font-bold leading-[1.05] tracking-[-0.035em] ${
                  i % 3 === 0 ? 'text-accent' : 'text-ink'
                }`}
              >
                {b}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-surface" aria-labelledby="about-cta">
        <div data-reveal className="frame section flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 id="about-cta" className="h-section max-w-[18ch]">
              Visit the branch nearest you
            </h2>
            <p className="lead mt-5 max-w-[40ch]">Four in Thane West, one in Bhiwandi and one in Jogeshwari West.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/contact#branches" className="btn btn-primary">
              Find a branch <ArrowRight size={18} className="arrow" aria-hidden="true" />
            </Link>
            <Link to="/book" className="btn btn-quiet">
              Book a visit
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
