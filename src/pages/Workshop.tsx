import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { PageHeader } from '../components/PageHeader'
import { Gallery } from '../components/Gallery'
import { useSeo } from '../lib/useSeo'

export function Workshop() {
  useSeo(
    'Workshop gallery',
    'Photographs of tyre fitting, wheel alignment, balancing and the roads around Thane. Illustrative images for an independent Diwan Auto Care website concept.',
  )
  return (
    <>
      <PageHeader
        title="Workshop"
        photo="balancing"
        clip="punctureCheck"
        intro="Alignment ramps, balancing machines, tyres and the roads of Thane: the work behind every visit."
      >
        <Link to="/services" className="btn btn-primary">
          See the services <ArrowRight size={18} className="arrow" aria-hidden="true" />
        </Link>
      </PageHeader>

      <Gallery />
    </>
  )
}
