import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Loader2, Phone } from 'lucide-react'
import { Field } from '../components/Field'
import { Photo } from '../components/Photo'
import { SentNotice, ErrorNotice, DemoNote } from '../components/FormStatus'
import { useForm } from '../lib/useForm'
import { validators } from '../lib/submit'
import { useSeo } from '../lib/useSeo'
import { stagger } from '../lib/style'
import { services, serviceById } from '../data/services'
import { branches, business, telHref } from '../data/business'

// Slots inside the publicly listed hours (10 am – 8 pm); to be confirmed by the business.
const slots = ['10:00 – 12:00', '12:00 – 14:00', '14:00 – 16:00', '16:00 – 18:00', '18:00 – 20:00']

const isoDate = (d: Date) => new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10)

export function Book() {
  useSeo(
    'Book a visit',
    'Request a visit for tyres, wheel alignment, balancing or a battery at any Diwan Auto Care branch. Independent website concept: requests are not sent.',
  )
  const [params] = useSearchParams()
  const pre = serviceById(params.get('service'))

  const [{ min, max }] = useState(() => {
    const t = new Date()
    const a = new Date(t)
    a.setDate(t.getDate() + 1)
    const b = new Date(t)
    b.setDate(t.getDate() + 60)
    return { min: isoDate(a), max: isoDate(b) }
  })

  const form = useForm(
    'booking',
    { service: pre?.id ?? '', branch: '', date: '', slot: '', vehicle: '', size: params.get('size') ?? '', name: '', phone: '', email: '', notes: '', company: '' },
    {
      service: validators.required('a service'),
      branch: validators.required('a branch'),
      date: (v) => (!v ? 'Please choose a date.' : v < min || v > max ? 'Choose a date from tomorrow up to 60 days ahead.' : ''),
      slot: validators.required('a time'),
      vehicle: (v) => (v.trim().length < 2 ? 'Tell us the vehicle, e.g. “Maruti Swift” or “Honda Activa”.' : ''),
      name: validators.name,
      phone: validators.phone,
      email: validators.email,
    },
  )
  const { values, errors, status } = form
  const branch = branches.find((b) => b.id === values.branch)

  return (
    <>
      <section className="frame grid gap-12 pb-12 pt-12 md:grid-cols-12 md:gap-6 md:pt-20" aria-labelledby="page-title">
        <div className="md:col-span-7">
          <h1 id="page-title" className="display hero-line text-[clamp(3rem,10vw,4rem)] md:text-[clamp(3.5rem,5.6vw,6rem)]" style={stagger(0)}>
            Book a visit
          </h1>
          <p className="hero-line lead mt-6 max-w-[38ch]" style={stagger(1)}>
            Choose the service, branch and a time that suits you. The branch calls back to confirm: a request is not a
            booking until they do.
          </p>
        </div>
        <div className="hero-line hidden md:col-span-4 md:col-start-9 md:block" style={stagger(2)}>
          <div className="disc w-full bg-accent on-accent">
            <Photo name="alignmentBay" priority sizes="30vw" />
          </div>
        </div>
      </section>

      <section className="frame grid gap-10 pb-[calc(var(--section-gap)/2)] lg:grid-cols-12 lg:gap-6" aria-labelledby="next-title">
        <aside data-reveal className="lg:col-span-4">
          <h2 id="next-title" className="h-item">
            What happens next
          </h2>
          <ul className="mt-6 grid gap-8 sm:grid-cols-3 lg:grid-cols-1">
            {[
              { photo: 'alignmentClamp' as const, title: 'The branch calls you', text: 'To confirm the time and check stock for your size. Until then, it is a request.' },
              { photo: 'tread' as const, title: 'Bring the vehicle in', text: 'Arrive at the agreed time at the branch you chose.' },
              { photo: 'balancing' as const, title: 'Pay at the branch', text: 'This site never asks for payment details.' },
            ].map((x) => (
              <li key={x.title} className="flex flex-col gap-4 lg:flex-row lg:gap-5">
                <span className="disc w-36 shrink-0 self-start lg:w-40">
                  <Photo name={x.photo} sizes="160px" alt="" />
                </span>
                <span>
                  <span className="block font-semibold">{x.title}</span>
                  <span className="block text-muted">{x.text}</span>
                </span>
              </li>
            ))}
          </ul>
        </aside>
        <div className="bg-surface p-6 md:p-10 lg:col-span-8">
          {status.state === 'sent' ? (
            <SentNotice demo={status.demo} what="booking request" onReset={form.reset} dark />
          ) : (
            <form noValidate onSubmit={form.onSubmit} className="grid gap-12">
              <DemoNote className="text-muted" />
              <fieldset data-reveal className="grid gap-5 md:grid-cols-12 md:gap-6">
                <legend className="h-item mb-6 md:col-span-12">What and where</legend>
                <Field dark as="select" className="md:col-span-6" label="Service" name="service" required value={values.service} error={errors.service} onChange={form.onChange} onBlur={form.onBlur}>
                  <option value="">Choose a service</option>
                  {services.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </Field>
                <Field dark as="select" className="md:col-span-6" label="Branch" name="branch" required value={values.branch} error={errors.branch} onChange={form.onChange} onBlur={form.onBlur} hint={branch?.address}>
                  <option value="">Choose a branch</option>
                  {branches.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name}, {b.city}
                    </option>
                  ))}
                </Field>
                <Field dark className="md:col-span-6" label="Vehicle" name="vehicle" required placeholder="Make and model" value={values.vehicle} error={errors.vehicle} onChange={form.onChange} onBlur={form.onBlur} />
                <Field dark className="md:col-span-6" label="Tyre size" name="size" placeholder="e.g. 185/65 R15 88H" value={values.size} onChange={form.onChange} hint="Printed on the tyre’s sidewall. Leave blank if unsure." />
              </fieldset>

              <fieldset data-reveal className="grid gap-5 md:grid-cols-12 md:gap-6">
                <legend className="h-item mb-6 md:col-span-12">When</legend>
                <Field dark className="md:col-span-4" type="date" label="Preferred date" name="date" required min={min} max={max} value={values.date} error={errors.date} onChange={form.onChange} onBlur={form.onBlur} />
                <div className="md:col-span-8">
                  <p id="slot-label" className="field-label">
                    Preferred time
                  </p>
                  <div role="radiogroup" aria-labelledby="slot-label" aria-describedby={errors.slot ? 'slot-error' : undefined} className="flex flex-wrap gap-2">
                    {slots.map((s) => (
                      <label key={s} className={`btn !min-h-[48px] !px-4 text-base tabular has-[:focus-visible]:outline has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-accent ${values.slot === s ? 'btn-primary' : 'btn-quiet'}`}>
                        <input type="radio" name="slot" value={s} checked={values.slot === s} onChange={() => form.onChange('slot', s)} className="sr-only" />
                        {s}
                      </label>
                    ))}
                  </div>
                  {errors.slot && (
                    <p id="slot-error" className="field-error text-danger">
                      {errors.slot}
                    </p>
                  )}
                </div>
              </fieldset>

              <fieldset data-reveal className="grid gap-5 md:grid-cols-12 md:gap-6">
                <legend className="h-item mb-6 md:col-span-12">Your details</legend>
                <Field dark className="md:col-span-4" label="Name" name="name" required autoComplete="name" value={values.name} error={errors.name} onChange={form.onChange} onBlur={form.onBlur} />
                <Field dark className="md:col-span-4" label="Mobile number" name="phone" required type="tel" inputMode="tel" autoComplete="tel" value={values.phone} error={errors.phone} onChange={form.onChange} onBlur={form.onBlur} />
                <Field dark className="md:col-span-4" label="Email" name="email" type="email" inputMode="email" autoComplete="email" value={values.email} error={errors.email} onChange={form.onChange} onBlur={form.onBlur} />
                <Field dark as="textarea" className="md:col-span-12" label="Anything we should know" name="notes" placeholder="Noises, vibration, warning lights…" value={values.notes} onChange={form.onChange} />
              </fieldset>

              <div aria-hidden="true" className="absolute -left-[9999px]">
                <label>
                  Company <input tabIndex={-1} autoComplete="off" name="company" value={values.company} onChange={(e) => form.onChange('company', e.target.value)} />
                </label>
              </div>

              <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                <p className="max-w-[56ch] text-base text-muted">
                  Your details would be used only to arrange this visit.{' '}
                  <Link to="/contact#privacy" className="link text-ink">
                    Privacy notice
                  </Link>
                </p>
                <div className="flex flex-col gap-3 sm:flex-row">
                  {status.state === 'error' && <ErrorNotice message={status.message} />}
                  <button type="submit" className="btn btn-primary !min-h-[56px] min-w-[240px]" disabled={status.state === 'sending'}>
                    {status.state === 'sending' ? (
                      <>
                        <Loader2 size={18} className="animate-spin" aria-hidden="true" /> Checking…
                      </>
                    ) : (
                      'Request this visit'
                    )}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
        <p className="flex flex-wrap items-center gap-x-3 gap-y-2 text-muted lg:col-span-8 lg:col-start-5">
          Prefer to talk?
          <a href={telHref((branch ?? branches[0]).phone)} className="link inline-flex items-center gap-1.5 text-ink tabular">
            <Phone size={16} aria-hidden="true" /> Call {(branch ?? branches[0]).name}: {(branch ?? branches[0]).phone}
          </a>
          <span>· {business.hours} (to be confirmed)</span>
        </p>
      </section>
    </>
  )
}
