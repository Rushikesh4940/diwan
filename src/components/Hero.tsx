import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { branches, business } from '../data/business'
import { stagger } from '../lib/style'

const SIDEWALL = `DIWAN AUTO CARE · SINCE ${business.founded} · TYRES · WHEELS · BATTERIES · ALIGNMENT · BALANCING · THANE · BHIWANDI · YOUR SAFETY PARTNER · `

const WHEEL_LETTERING = 'TUBELESS RADIAL · DIWAN AUTO CARE · '

/* Point on a circle around the wheel centre (0,0); angle in degrees, 0 = 3 o'clock, clockwise. */
const at = (r: number, deg: number) => {
  const t = (deg * Math.PI) / 180
  return `${(r * Math.cos(t)).toFixed(1)},${(r * Math.sin(t)).toFixed(1)}`
}

/* A ring segment between two radii, used for the brake caliper. */
const segment = (r1: number, r2: number, from: number, to: number) =>
  `M${at(r2, from)} A${r2},${r2} 0 0 1 ${at(r2, to)} L${at(r1, to)} A${r1},${r1} 0 0 0 ${at(r1, from)} Z`

const SPOKES = [0, 72, 144, 216, 288]
const HOLES_OUTER = Array.from({ length: 24 }, (_, i) => i * 15)
const HOLES_INNER = Array.from({ length: 18 }, (_, i) => i * 20 + 10)
const TREAD = Array.from({ length: 64 }, (_, i) => i * (360 / 64))
const polar = (r: number, deg: number) => [r * Math.cos((deg * Math.PI) / 180), r * Math.sin((deg * Math.PI) / 180)]
const hexagon = (r: number) =>
  Array.from({ length: 6 }, (_, i) => polar(r, i * 60 + 30).map((n) => n.toFixed(1)).join(',')).join(' ')

/*
  The tyre, seen side-on. The yellow sidewall carries lettering that turns
  clockwise; inside it the wheel turns the other way.

  Realism comes from two things: shading on the rubber and metal, and keeping
  the light still. Parts that look the same all the way round (rim lip, disc
  face, hub, rubber) do not move, so their highlights stay put, while the
  spokes, lug nuts, drilled holes, tread blocks and moulded lettering spin
  through that light. The brake caliper is bolted to the car and never turns.
*/
export function Tyre({ className = '' }: { className?: string }) {
  return (
    <div className={`relative aspect-square ${className}`} aria-hidden="true">
      <svg viewBox="0 0 1000 1000" className="absolute inset-0 h-full w-full">
        <defs>
          <path id="sidewall-path" d="M500,500 m-428,0 a428,428 0 1,1 856,0 a428,428 0 1,1 -856,0" />
          <path id="wheel-letter-path" d="M0,0 m-326,0 a326,326 0 1,1 652,0 a326,326 0 1,1 -652,0" />
          {/* Rubber: darker at the shoulder, a faint sheen on the sidewall */}
          <radialGradient id="rubber" cx="0" cy="0" r="372" gradientUnits="userSpaceOnUse">
            <stop offset="0.78" stopColor="#0c0c0c" />
            <stop offset="0.86" stopColor="#232322" />
            <stop offset="0.93" stopColor="#1a1a19" />
            <stop offset="1" stopColor="#080808" />
          </radialGradient>
          {/* Polished rim lip, lit from the top left */}
          <linearGradient id="chrome" x1="-300" y1="-300" x2="300" y2="300" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="0.3" stopColor="#bdbdb8" />
            <stop offset="0.5" stopColor="#f4f4f1" />
            <stop offset="0.72" stopColor="#7d7c77" />
            <stop offset="1" stopColor="#d2d2cd" />
          </linearGradient>
          {/* Cast-iron disc with a machined sheen */}
          <radialGradient id="disc" cx="-40" cy="-60" r="260" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#a3a19b" />
            <stop offset="0.55" stopColor="#6c6a65" />
            <stop offset="1" stopColor="#4a4945" />
          </radialGradient>
          <radialGradient id="hub" cx="-25" cy="-30" r="110" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="0.6" stopColor="#d8d8d4" />
            <stop offset="1" stopColor="#9b9a95" />
          </radialGradient>
          <linearGradient id="spoke-lit" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#fbfbf9" />
            <stop offset="1" stopColor="#cfcfca" />
          </linearGradient>
          <linearGradient id="spoke-shade" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#a9a8a3" />
            <stop offset="1" stopColor="#d9d9d5" />
          </linearGradient>
          <linearGradient id="caliper" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#ffd84a" />
            <stop offset="1" stopColor="#c99a00" />
          </linearGradient>
        </defs>

        {/* Outer ring: clockwise */}
        <circle cx="500" cy="500" r="500" fill="var(--color-accent)" />
        <g className="sidewall-turn">
          <text fill="var(--color-ground)" fontFamily="var(--font-display)" fontWeight="700" fontSize="46" letterSpacing="6">
            <textPath href="#sidewall-path" textLength="2650" lengthAdjust="spacing">
              {SIDEWALL}
            </textPath>
          </text>
        </g>

        <g transform="translate(500 500)" className="wheel-in">
          {/* Rubber (still) */}
          <circle r="374" fill="url(#rubber)" />

          {/* Tread shoulder and moulded lettering (turning) */}
          <g className="wheel-turn">
            {TREAD.map((d) => (
              <rect key={d} x="-7" y="-374" width="14" height="22" rx="2" fill="#2b2b2a" transform={`rotate(${d})`} />
            ))}
            <text fontFamily="var(--font-display)" fontWeight="700" fontSize="22" letterSpacing="5">
              <textPath href="#wheel-letter-path" textLength="2000" lengthAdjust="spacing" fill="#3c3c3a">
                {WHEEL_LETTERING.repeat(3)}
              </textPath>
            </text>
          </g>

          {/* Rim barrel and disc face (still) */}
          <circle r="292" fill="#151514" />
          <circle r="228" fill="url(#disc)" />
          {[150, 170, 190, 210].map((r) => (
            <circle key={r} r={r} fill="none" stroke="#ffffff" strokeOpacity="0.07" strokeWidth="2" />
          ))}

          {/* Drilled holes (turning) */}
          <g className="wheel-turn">
            {HOLES_OUTER.map((d) => {
              const [x, y] = polar(196, d)
              return <circle key={`o${d}`} cx={x} cy={y} r="7" fill="#1b1b1a" />
            })}
            {HOLES_INNER.map((d) => {
              const [x, y] = polar(166, d)
              return <circle key={`i${d}`} cx={x} cy={y} r="6" fill="#1b1b1a" />
            })}
          </g>
          <circle r="112" fill="#3a3935" />

          {/* Caliper: fixed to the car, does not turn */}
          <g>
            <path d={segment(176, 252, -80, -20)} fill="url(#caliper)" />
            <path d={segment(194, 234, -72, -28)} fill="#b38900" fillOpacity="0.55" />
            {[-74, -26].map((d) => {
              const [x, y] = polar(214, d)
              return <circle key={d} cx={x} cy={y} r="7" fill="#7a5d00" />
            })}
            <text
              transform={`rotate(-50) translate(214 0) rotate(90)`}
              textAnchor="middle"
              dominantBaseline="central"
              fontFamily="var(--font-display)"
              fontWeight="700"
              fontSize="20"
              letterSpacing="3"
              fill="var(--color-ground)"
            >
              DIWAN
            </text>
          </g>

          {/* Spokes, lug nuts and centre cap (turning) */}
          <g className="wheel-turn">
            {SPOKES.map((d) => (
              <g key={d} transform={`rotate(${d})`}>
                <path d="M-8,-86 L-30,-84 L-62,-284 L-34,-288 Z" fill="#000" fillOpacity="0.35" transform="translate(6 4)" />
                <path d="M8,-86 L30,-84 L62,-284 L34,-288 Z" fill="#000" fillOpacity="0.35" transform="translate(6 4)" />
                <path d="M-8,-86 L-30,-84 L-62,-284 L-34,-288 Z" fill="url(#spoke-lit)" />
                <path d="M8,-86 L30,-84 L62,-284 L34,-288 Z" fill="url(#spoke-shade)" />
                <path d="M-11,-86 L-17,-86 L-44,-286 L-38,-287 Z" fill="#ffffff" fillOpacity="0.55" />
              </g>
            ))}
          </g>
          <circle r="96" fill="url(#hub)" />
          <g className="wheel-turn">
            {SPOKES.map((d) => {
              const [x, y] = polar(58, d - 90)
              return (
                <g key={`n${d}`} transform={`translate(${x.toFixed(1)} ${y.toFixed(1)})`}>
                  <polygon points={hexagon(13)} fill="#7f7e79" />
                  <polygon points={hexagon(9)} fill="#c9c9c4" />
                  <circle r="4" fill="#5c5b57" />
                </g>
              )
            })}
            <circle r="34" fill="var(--color-ground)" />
            <circle r="22" fill="none" stroke="var(--color-accent)" strokeWidth="9" />
            <circle r="5" fill="var(--color-accent)" />
          </g>

          {/* Rim lip over the spoke ends (still), then the valve stem (turning) */}
          <circle r="294" fill="none" stroke="url(#chrome)" strokeWidth="18" />
          <circle r="304" fill="none" stroke="#000" strokeOpacity="0.55" strokeWidth="5" />
          <g className="wheel-turn">
            <rect x="-6" y="-318" width="12" height="22" rx="3" fill="#2a2a29" />
            <rect x="-4" y="-322" width="8" height="8" rx="2" fill="#bdbdb8" />
          </g>
        </g>
      </svg>
    </div>
  )
}

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-ground" aria-labelledby="hero-title">
      <div className="frame relative z-10 flex flex-col pt-10 lg:min-h-[min(calc(100svh-108px),900px)] lg:justify-center lg:py-20">
        <div className="lg:max-w-[50%]">
          <h1 id="hero-title" className="display text-[clamp(3.3rem,11.5vw,5.5rem)] lg:text-[clamp(4rem,6.4vw,6.5rem)]">
            <span className="hero-line block" style={stagger(0)}>
              Tyres &amp; wheels
            </span>
            <span className="hero-line block" style={stagger(1)}>
              since {business.founded}
            </span>
          </h1>
          <p className="hero-line lead mt-6 max-w-[34ch] lg:mt-9" style={stagger(2)}>
            Diwan Auto Care fits tyres, aligns and balances wheels and replaces batteries for cars and bikes, at four
            branches across Thane and Bhiwandi.
          </p>
          <div className="hero-line mt-8 flex flex-wrap gap-3 lg:mt-9" style={stagger(3)}>
            <Link to="/services" className="btn btn-primary">
              Explore services <ArrowRight size={18} className="arrow" aria-hidden="true" />
            </Link>
            <Link to="/contact" className="btn btn-quiet">
              Make an enquiry
            </Link>
          </div>
          <p className="hero-line small mt-7 max-w-[40ch] text-muted lg:mt-8" style={stagger(4)}>
            Family-run since {business.founded} · {branches.length} branches · Headquarters in Anand Nagar, Thane
          </p>
        </div>
      </div>

      {/* Phone and tablet: 130vw across, rising from the bottom edge. Desktop: ~120vh across, left edge held at 52% so it never meets the text, cropped by the viewport. */}
      <Tyre className="pointer-events-none relative left-1/2 -mb-[62vw] mt-10 w-[130vw] -translate-x-1/2 sm:-mb-[56vw] sm:w-[110vw] lg:absolute lg:left-[52%] lg:top-[55%] lg:m-0 lg:w-[max(min(120vh,92vw),56vw)] lg:translate-x-0 lg:-translate-y-1/2" />
    </section>
  )
}
