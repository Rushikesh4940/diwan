import { Link } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'
import { PageHeader } from '../components/PageHeader'
import { Photo } from '../components/Photo'
import { Clip } from '../components/Clip'
import { TyreDecoder } from '../components/TyreDecoder'
import { categories, services, type Service } from '../data/services'
import { oshiwaraStore } from '../data/business'
import { useSeo } from '../lib/useSeo'

/* Overview: a two-column menu with photo bullets, one block per category. */
function ServiceMenu() {
  return (
    <section className="frame section" aria-labelledby="menu-title">
      <h2 id="menu-title" className="h-section">
        Everything on the menu
      </h2>
      {categories.map((c) => {
        const items = services.filter((s) => s.category === c.id)
        return (
          <div key={c.id} id={c.id} className="scroll-mt-24 pt-16 md:pt-24">
            <div className="flex items-baseline justify-between gap-6">
              <h3 className="font-display text-[clamp(1.75rem,3.4vw,3rem)] font-bold leading-none tracking-[-0.03em]">{c.name}</h3>
              <span className="shrink-0 text-muted tabular">{items.length} services</span>
            </div>
            <p className="mt-3 max-w-[60ch] text-muted">{c.intro}</p>
            <ul data-reveal className="mt-10 grid gap-x-16 gap-y-9 md:grid-cols-2">
              {items.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="group flex gap-5 text-ink no-underline">
                    <span className="disc w-[52px] shrink-0 self-start md:w-16">
                      <Photo name={s.photo} sizes="64px" alt="" />
                    </span>
                    <span className="min-w-0">
                      <span className="flex items-baseline justify-between gap-4">
                        <span className="text-[1.125rem] font-bold transition-colors group-hover:text-accent">{s.name}</span>
                        <span className="shrink-0 text-base text-muted">Details</span>
                      </span>
                      <span className="mt-1 block max-w-[44ch] text-base leading-snug text-muted">{s.summary}</span>
                      <span className="mt-1.5 block text-base font-semibold text-accent">{s.fact}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )
      })}
    </section>
  )
}

/* One service in full: what it is, what's included, why it matters, and how to ask. */
function ServiceDetail({ s, flip }: { s: Service; flip: boolean }) {
  return (
    <article id={s.id} className="scroll-mt-24 py-14 md:py-20" aria-labelledby={`${s.id}-title`}>
      <div className="grid items-center gap-10 md:grid-cols-12 md:gap-6">
        <div className={`md:col-span-5 ${flip ? 'md:order-2 md:col-start-8' : ''}`}>
          <div className={`disc mx-auto w-[72vw] max-w-[460px] md:w-[88%] ${flip ? 'md:ml-auto md:mr-0' : 'md:ml-0'}`}>
            {s.clip ? <Clip name={s.clip} /> : <Photo name={s.photo} sizes="(min-width: 768px) 36vw, 72vw" />}
          </div>
        </div>
        <div data-reveal className={`md:col-span-6 ${flip ? 'md:order-1' : 'md:col-start-7'}`}>
          <h3 id={`${s.id}-title`} className="h-section">
            {s.name}
          </h3>
          <p className="lead mt-5 max-w-[40ch]">{s.summary}</p>
          <div className="mt-8 grid gap-8 sm:grid-cols-2">
            <div>
              <h4 className="font-semibold text-muted">What’s included</h4>
              <ul className="mt-3 space-y-2">
                {s.includes.map((x) => (
                  <li key={x} className="flex gap-2.5 leading-snug">
                    <Check size={18} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
                    {x}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-muted">Why it matters</h4>
              <ul className="mt-3 space-y-2">
                {s.benefits.map((x) => (
                  <li key={x} className="flex gap-2.5 leading-snug">
                    <span className="mt-[0.45em] h-2.5 w-2.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link to={`/contact?service=${s.id}#enquiry`} className="btn btn-primary">
              Enquire about {s.name.toLowerCase()} <ArrowRight size={18} className="arrow" aria-hidden="true" />
            </Link>
            <Link to={`/book?service=${s.id}`} className="btn btn-quiet">
              Book a visit
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}

export function Services() {
  useSeo(
    'Services: tyres, alignment, balancing, batteries',
    'Car and bike tyres, alloy wheels, wheel alignment, wheel balancing, puncture repair, batteries, brakes, accessories and roadside assistance from Diwan Auto Care.',
  )
  return (
    <>
      <PageHeader
        title="Services"
        photo="alignmentClamp"
        intro={
          <>
            Ten services across tyres, wheels and batteries, with {oshiwaraStore.equipment[0]} and{' '}
            {oshiwaraStore.equipment[1]} at the Oshiwara store.
          </>
        }
      >
        <div className="flex flex-wrap gap-3">
          <a href="#tyres-wheels" className="btn btn-quiet">
            Tyres and wheels
          </a>
          <a href="#batteries-more" className="btn btn-quiet">
            Batteries and more
          </a>
        </div>
      </PageHeader>

      <ServiceMenu />

      <section className="bg-surface" aria-labelledby="detail-title">
        <div className="frame section">
          <h2 id="detail-title" className="sr-only">
            Service details
          </h2>
          {services.map((s, i) => (
            <ServiceDetail key={s.id} s={s} flip={i % 2 === 1} />
          ))}
        </div>
      </section>

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

      <TyreDecoder />
    </>
  )
}
