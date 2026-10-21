import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react'
import { Photo } from '../components/Photo'
import { BranchMap } from '../components/BranchMap'
import { EnquiryForm } from '../components/EnquiryForm'
import { branches, business, mapsHref, primaryPhone, telHref } from '../data/business'
import { useSeo } from '../lib/useSeo'
import { stagger } from '../lib/style'
import { LIVE } from '../lib/submit'

export function Contact() {
  useSeo(
    'Contact and branches',
    'Phone numbers, addresses and map links for all six Diwan Auto Care branches in Thane, Bhiwandi and Jogeshwari West, plus an enquiry form.',
  )
  return (
    <>
      <section className="frame grid items-center gap-12 pb-16 pt-12 lg:grid-cols-12 lg:gap-6 lg:py-20" aria-labelledby="page-title">
        <div className="lg:col-span-5">
          <h1 id="page-title" className="display hero-line text-[clamp(3rem,10vw,4rem)] md:text-[clamp(3.5rem,5.6vw,6rem)]" style={stagger(0)}>
            Call, visit or write
          </h1>
          <p className="hero-line lead mt-6 max-w-[36ch]" style={stagger(1)}>
            Six branches, each with its own number. Calling the branch nearest you is the quickest way to check stock and
            prices.
          </p>
          <ul className="hero-line mt-9 grid gap-3 sm:max-w-[440px]" style={stagger(2)}>
            <li>
              <a href={telHref(primaryPhone)} className="btn btn-primary w-full justify-start whitespace-nowrap tabular">
                <Phone size={18} aria-hidden="true" /> {primaryPhone}
              </a>
              <p className="small mt-2 text-muted">Anand Nagar, Chandanwadi and Jogeshwari West share this number.</p>
            </li>
            <li>
              <a href={`mailto:${business.email}`} className="btn btn-quiet w-full justify-start">
                <Mail size={18} aria-hidden="true" /> {business.email}
              </a>
            </li>
            <li>
              {business.whatsapp ? (
                <a href={`https://wa.me/${business.whatsapp}`} className="btn btn-quiet w-full justify-start" target="_blank" rel="noopener noreferrer">
                  <MessageCircle size={18} aria-hidden="true" /> WhatsApp
                </a>
              ) : (
                <p className="flex min-h-[52px] items-center gap-2.5 bg-surface px-[1.6em] text-base text-muted">
                  <MessageCircle size={18} aria-hidden="true" /> WhatsApp enquiries: number to be confirmed by the business
                </p>
              )}
            </li>
          </ul>
        </div>
        <div className="hero-line lg:col-span-7" style={stagger(3)}>
          <BranchMap />
        </div>
      </section>

      <section id="branches" className="bg-surface scroll-mt-24" aria-labelledby="branches-title">
        <div className="frame section">
          <div data-reveal className="grid items-end gap-8 md:grid-cols-12 md:gap-6">
            <div className="md:col-span-6">
              <h2 id="branches-title" className="h-section">
                All six branches
              </h2>
              <p className="mt-5 max-w-[44ch]">
                Opening hours listed publicly: {business.hours.toLowerCase()}. Please call ahead to confirm, especially
                on public holidays.
              </p>
            </div>
            <div className="flex gap-4 md:col-span-6 md:justify-end">
              <figure className="w-1/2 max-w-[220px]">
                <div className="disc">
                  <Photo name="ghodbunder" sizes="220px" />
                </div>
                <figcaption className="small mt-2 text-muted">Ghodbunder Road, home of the Anand Nagar branch</figcaption>
              </figure>
              <figure className="w-1/2 max-w-[220px]">
                <div className="disc">
                  <Photo name="thane" sizes="220px" />
                </div>
                <figcaption className="small mt-2 text-muted">Thane West, seen from the Yeoor Hills</figcaption>
              </figure>
            </div>
          </div>
          <ul data-reveal className="mt-14 grid gap-x-12 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {branches.map((b) => (
              <li key={b.id} id={`branch-${b.id}`} className="scroll-mt-28">
                <p className="small font-semibold text-accent">{b.city}</p>
                <h3 className="h-item mt-1">{b.name}</h3>
                <address className="mt-3 max-w-[40ch] text-base not-italic leading-snug">{b.address}</address>
                {b.note && <p className="mt-2 text-base text-muted">{b.note}</p>}
                <div className="mt-5 flex flex-wrap gap-2">
                  <a href={telHref(b.phone)} className="btn btn-primary !min-h-[44px] !px-4 text-base tabular">
                    <Phone size={16} aria-hidden="true" /> {b.phone}
                  </a>
                  <a
                    href={mapsHref(b.address)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-quiet !min-h-[44px] !px-4 text-base"
                    aria-label={`Directions to the ${b.name} branch (opens Google Maps)`}
                  >
                    <MapPin size={16} aria-hidden="true" /> Directions
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <EnquiryForm />

      <section id="privacy" className="frame section scroll-mt-24" aria-labelledby="privacy-title">
        <div className="grid gap-8 md:grid-cols-12 md:gap-6">
          <div data-reveal className="md:col-span-4">
            <h2 id="privacy-title" className="h-section">
              Privacy notice
            </h2>
            <div className="disc mt-10 hidden w-[60%] md:block">
              <Photo name="tyreStack" sizes="20vw" />
            </div>
          </div>
          <div data-reveal className="space-y-4 md:col-span-7 md:col-start-6">
            {LIVE ? (
              <p>
                Enquiries and booking requests are sent by email to the Diwan Auto Care team so they can call you back.
                They are not used for marketing or shared with anyone else.
              </p>
            ) : (
              <p>
                <strong>This is a demo.</strong> The forms on this concept site check what you type in your browser and then
                stop. Nothing is sent, stored, or shared, and the site itself uses no cookies or analytics. The branch
                map is embedded from Google Maps, which applies Google’s own privacy policy.
              </p>
            )}
            <p>
              On the live site, the details you give (your name, phone number, optional email, the service you need and
              your message) would be used only to answer your enquiry or arrange your visit. They would be kept for no
              longer than needed for that purpose and never sold or used for marketing without your consent.
            </p>
            <p>
              To ask what is held about you, or to have it deleted, you would write to{' '}
              <a className="link" href={`mailto:${business.email}`}>
                {business.email}
              </a>
              . The final wording must be approved by {business.legalName} before launch, in line with India’s Digital
              Personal Data Protection Act, 2023.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
