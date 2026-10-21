import { Photo } from './Photo'
import type { PhotoKey } from '../data/images'
import { business } from '../data/business'

/* A circular thumbnail that sits inside the line of text, the size of a capital. */
function Thumb({ name }: { name: PhotoKey }) {
  return (
    <span className="mx-[0.12em] inline-block h-[0.85em] w-[0.85em] overflow-hidden rounded-full align-[-0.1em]">
      <Photo name={name} sizes="64px" alt="" className="h-full w-full object-cover" />
    </span>
  )
}

export function IntroStatement() {
  return (
    <section className="frame section" aria-labelledby="intro-title">
      <div data-reveal className="grid gap-6 lg:grid-cols-12 lg:gap-8">
        <h2 id="intro-title" className="h-item text-accent lg:col-span-3">
          Three shops, one name
        </h2>
        <p className="font-display text-[clamp(1.5rem,1rem+2vw,2.25rem)] font-bold leading-[1.15] tracking-[-0.02em] max-w-[40ch] lg:col-span-9">
          {business.formerNames[0]} <Thumb name="tread" />, Battery Best <Thumb name="battery" /> and{' '}
          {business.formerNames[2]} <Thumb name="alignmentClamp" /> became one family firm in 2019: tyres, batteries and
          wheel service under one roof.
        </p>
      </div>
    </section>
  )
}
