import { Link, useSearchParams } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { Field } from './Field'
import { Photo } from './Photo'
import { SentNotice, ErrorNotice, DemoNote } from './FormStatus'
import { useForm } from '../lib/useForm'
import { validators } from '../lib/submit'
import { services, serviceById } from '../data/services'
import { branches } from '../data/business'

/*
  The enquiry form, cut like a service coupon: a yellow card with notches and a
  perforation. Prefills from ?service= and ?size= (sent by the tyre-size reader).
*/
export function EnquiryForm({ headingLevel = 2 }: { headingLevel?: 2 | 3 }) {
  const [params] = useSearchParams()
  const pre = serviceById(params.get('service'))
  const size = params.get('size')
  const H = headingLevel === 2 ? 'h2' : 'h3'

  const form = useForm(
    'enquiry',
    {
      name: '',
      phone: '',
      email: '',
      service: pre?.id ?? '',
      branch: '',
      message: size ? `I'm looking for tyres in size ${size}.` : '',
      company: '',
    },
    {
      name: validators.name,
      phone: validators.phone,
      email: validators.email,
      service: validators.required('a service'),
      message: validators.message,
    },
  )
  const { values, errors, status } = form

  return (
    <section id="enquiry" className="frame section scroll-mt-24" aria-labelledby="enquiry-title">
      <div className="relative mx-auto bg-accent text-paper-ink lg:w-[83.33%]">
        {/* Desktop notches and vertical perforation */}
        <span aria-hidden="true" className="absolute left-[44%] top-0 hidden h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ground lg:block" />
        <span aria-hidden="true" className="absolute bottom-0 left-[44%] hidden h-8 w-8 -translate-x-1/2 translate-y-1/2 rounded-full bg-ground lg:block" />
        <span aria-hidden="true" className="absolute bottom-6 left-[44%] top-6 hidden -translate-x-1/2 border-l-[5px] border-dotted border-ground lg:block" />

        <div className="grid lg:grid-cols-[44%_56%]">
          <div className="flex flex-col justify-between gap-8 p-6 md:p-10 lg:p-12">
            <H id="enquiry-title" className="display text-[clamp(2rem,3.4vw,3rem)] uppercase">
              Tell us what you need
            </H>
            <div className="on-accent hidden lg:block">
              <div className="disc w-[62%]">
                <Photo name="tread" sizes="22vw" />
              </div>
            </div>
            <div className="space-y-3">
              <p>Leave a number and the nearest branch can call you back with prices and availability.</p>
              <DemoNote />
            </div>
          </div>

          {/* Phone notches and horizontal perforation */}
          <div aria-hidden="true" className="relative h-8 lg:hidden">
            <span className="absolute -left-4 top-0 h-8 w-8 rounded-full bg-ground" />
            <span className="absolute -right-4 top-0 h-8 w-8 rounded-full bg-ground" />
            <span className="absolute left-6 right-6 top-1/2 -translate-y-1/2 border-t-[5px] border-dotted border-ground" />
          </div>

          <div className="p-6 md:p-10 lg:p-12">
            {status.state === 'sent' ? (
              <SentNotice demo={status.demo} what="enquiry" onReset={form.reset} />
            ) : (
              <form noValidate onSubmit={form.onSubmit} className="grid gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Name" name="name" required autoComplete="name" value={values.name} error={errors.name} onChange={form.onChange} onBlur={form.onBlur} />
                  <Field label="Mobile number" name="phone" required type="tel" inputMode="tel" autoComplete="tel" placeholder="98xxx xxxxx" value={values.phone} error={errors.phone} onChange={form.onChange} onBlur={form.onBlur} />
                </div>
                <Field label="Email" name="email" type="email" inputMode="email" autoComplete="email" value={values.email} error={errors.email} onChange={form.onChange} onBlur={form.onBlur} />
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field as="select" label="Service" name="service" required value={values.service} error={errors.service} onChange={form.onChange} onBlur={form.onBlur}>
                    <option value="">Choose a service</option>
                    {services.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                    <option value="other">Something else</option>
                  </Field>
                  <Field as="select" label="Nearest branch" name="branch" value={values.branch} onChange={form.onChange}>
                    <option value="">Any branch</option>
                    {branches.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.name}, {b.city}
                      </option>
                    ))}
                  </Field>
                </div>
                <Field as="textarea" label="Your enquiry" name="message" required placeholder="Car, tyre size, what you've noticed…" value={values.message} error={errors.message} onChange={form.onChange} onBlur={form.onBlur} />
                {/* Honeypot for bots; hidden from people and assistive tech */}
                <div aria-hidden="true" className="absolute -left-[9999px]">
                  <label>
                    Company <input tabIndex={-1} autoComplete="off" name="company" value={values.company} onChange={(e) => form.onChange('company', e.target.value)} />
                  </label>
                </div>
                {status.state === 'error' && <ErrorNotice message={status.message} />}
                <button type="submit" className="btn btn-dark w-full !min-h-[56px] !rounded-full" disabled={status.state === 'sending'}>
                  {status.state === 'sending' ? (
                    <>
                      <Loader2 size={18} className="animate-spin" aria-hidden="true" /> Checking…
                    </>
                  ) : (
                    'Send enquiry'
                  )}
                </button>
                <p className="text-sm">
                  Your details would only be used to answer this enquiry.{' '}
                  <Link to="/contact#privacy" className="font-semibold underline underline-offset-2">
                    Privacy notice
                  </Link>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
