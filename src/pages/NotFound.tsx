import { Link } from 'react-router-dom'
import { Ring } from '../components/Wordmark'
import { useSeo } from '../lib/useSeo'

export function NotFound() {
  useSeo('Page not found', 'This page does not exist on the Diwan Auto Care website concept.')
  return (
    <section className="frame grid min-h-[70svh] items-center gap-10 py-20 md:grid-cols-12" aria-labelledby="page-title">
      <div className="md:col-span-7">
        <h1 id="page-title" className="display text-[clamp(3rem,7vw,6rem)]">
          Off the road
        </h1>
        <p className="lead mt-6 max-w-[36ch]">That page doesn’t exist. Try the services, or find the branch nearest you.</p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Link to="/services" className="btn btn-primary">
            Services
          </Link>
          <Link to="/contact#branches" className="btn btn-quiet">
            Branches
          </Link>
        </div>
      </div>
      <Ring size={320} className="hidden text-accent md:col-span-4 md:col-start-9 md:block md:h-auto md:w-full" />
    </section>
  )
}
