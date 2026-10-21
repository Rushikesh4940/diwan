import { useId, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { parseTyreSize, typicalSizes, type TyreSize } from '../lib/tyre'

const MAX_DIAMETER = 800 // mm; the largest tyre we draw at full size

/* The tyre drawn side-on, to scale against MAX_DIAMETER. */
function TyreDrawing({ t }: { t: TyreSize }) {
  const scale = 46 / (MAX_DIAMETER / 2)
  const rOut = Math.max(24, (t.diameterMm / 2) * scale)
  const rRim = rOut * (t.rimMm / t.diameterMm)
  const blocks = 44
  return (
    <svg viewBox="-50 -50 100 100" className="h-full w-full overflow-visible" aria-hidden="true">
      <g>
        {Array.from({ length: blocks }, (_, i) => (
          <rect
            key={i}
            x={-1.6}
            y={-rOut - 1.4}
            width={3.2}
            height={3.6}
            fill="var(--color-ground)"
            transform={`rotate(${(360 / blocks) * i})`}
          />
        ))}
        <circle r={rOut} fill="var(--color-ground)" style={{ transition: 'r 500ms var(--ease-out-expo)' }} />
        <circle r={rRim} fill="var(--color-paper)" style={{ transition: 'r 500ms var(--ease-out-expo)' }} />
        {Array.from({ length: 5 }, (_, i) => (
          <rect
            key={i}
            x={-rRim * 0.13}
            y={-rRim * 0.92}
            width={rRim * 0.26}
            height={rRim * 0.7}
            fill="var(--color-surface-2)"
            transform={`rotate(${72 * i})`}
          />
        ))}
        <circle r={rRim * 0.26} fill="var(--color-surface-2)" />
        <circle r={rRim * 0.09} fill="var(--color-paper)" />
      </g>
    </svg>
  )
}

function Readout({ t }: { t: TyreSize }) {
  const rows: [string, string, string][] = [
    [String(t.widthMm), 'Tread width', `${t.widthMm} mm across the tread`],
    [String(t.aspect), 'Profile', `Sidewall is ${t.aspect}% of the width: ${Math.round(t.sidewallMm)} mm tall`],
    [t.construction === 'Radial' ? 'R' : '–', 'Construction', t.construction],
    [String(t.rimIn), 'Rim', `Fits a ${t.rimIn}-inch wheel`],
  ]
  if (t.loadIndex) rows.push([String(t.loadIndex), 'Load index', t.loadKg ? `Up to ${t.loadKg} kg per tyre` : 'See the load table'])
  if (t.speed) rows.push([t.speed, 'Speed rating', `Rated to ${t.speedKmh} km/h`])
  return (
    <dl className="grid gap-x-5 gap-y-3 [grid-template-columns:auto_1fr]">
      {rows.map(([k, label, text]) => (
        <div key={label} className="contents">
          <dt className="display tabular text-right text-[1.75rem] leading-none text-accent">{k}</dt>
          <dd className="leading-snug">
            <span className="font-semibold">{label}</span>
            <span className="block text-base text-muted">{text}</span>
          </dd>
        </div>
      ))}
      <div className="contents">
        <dt className="display tabular text-right text-[1.75rem] leading-none text-accent">⌀</dt>
        <dd className="leading-snug">
          <span className="font-semibold">Overall diameter</span>
          <span className="block text-base text-muted">
            {Math.round(t.diameterMm)} mm · {t.circumferenceM.toFixed(2)} m per turn
          </span>
        </dd>
      </div>
    </dl>
  )
}

export function TyreDecoder({ headingLevel = 2 }: { headingLevel?: 2 | 3 }) {
  const [selected, setSelected] = useState(typicalSizes[1].code)
  const [custom, setCustom] = useState('')
  const inputId = useId()
  const errorId = useId()

  const query = custom.trim() ? custom : selected
  const result = useMemo(() => parseTyreSize(query), [query])
  const ok = !('error' in result)
  const lastGood = useMemo(() => parseTyreSize(selected) as TyreSize, [selected])
  const shown = ok ? (result as TyreSize) : lastGood
  const H = headingLevel === 2 ? 'h2' : 'h3'

  return (
    <section id="tyre-size" className="frame section scroll-mt-24" aria-labelledby="decoder-title">
      <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-6">
        {/* Disc with the drawn tyre */}
        <div className="relative min-w-0 lg:order-2 lg:col-span-5 lg:col-start-6">
          <div className="relative mx-auto aspect-square w-[86vw] max-w-[640px] lg:w-full">
            <div className="absolute inset-[6%] rounded-full bg-accent" />
            <div className="absolute inset-0">
              <TyreDrawing t={shown} />
            </div>
          </div>
          <p className="mt-4 text-center font-display text-[1.5rem] font-bold tabular tracking-[-0.02em]" aria-live="polite">
            {shown.code}
          </p>
        </div>

        {/* Names and input */}
        <div className="min-w-0 lg:order-1 lg:col-span-4 lg:self-end">
          <H id="decoder-title" className="h-section">
            Read your tyre
          </H>
          <p className="mt-4 max-w-[34ch]">
            The code on the sidewall says what fits your car. Pick a typical size or type yours to see what each part means.
          </p>
          <ul
            className="mt-7 flex flex-wrap gap-2 lg:flex-col lg:flex-nowrap lg:gap-1"
            aria-label="Typical tyre sizes"
          >
            {typicalSizes.map((s) => {
              const active = !custom.trim() && s.code === selected
              return (
                <li key={s.code} className="shrink-0">
                  <button
                    type="button"
                    aria-pressed={active}
                    onClick={() => {
                      setSelected(s.code)
                      setCustom('')
                    }}
                    className={`group flex min-h-[44px] items-baseline gap-3 rounded-full px-4 py-2 text-left transition-colors lg:w-full lg:rounded-none lg:px-0 ${
                      active ? 'bg-accent text-paper-ink lg:bg-transparent lg:text-ink' : 'bg-surface-2 text-muted hover:text-ink lg:bg-transparent'
                    }`}
                  >
                    <span className="font-display text-[1.25rem] font-bold tracking-[-0.02em] lg:text-[clamp(1.5rem,2.2vw,2.25rem)]">
                      {s.label}
                    </span>
                    <span className="hidden whitespace-nowrap text-base tabular lg:inline">{s.code}</span>
                    {active && <span className="sr-only">(selected)</span>}
                  </button>
                </li>
              )
            })}
          </ul>
          <div className="mt-6">
            <label htmlFor={inputId} className="field-label">
              Your tyre size
            </label>
            <input
              id={inputId}
              className="field field-dark tabular uppercase placeholder:normal-case"
              placeholder="e.g. 195/55 R16 87V"
              value={custom}
              onChange={(e) => setCustom(e.target.value)}
              aria-invalid={custom.trim() !== '' && !ok}
              aria-describedby={errorId}
              autoComplete="off"
              spellCheck={false}
              inputMode="text"
            />
            <p id={errorId} className="field-error min-h-[1.5em] text-danger" aria-live="polite">
              {custom.trim() && !ok ? (result as { error: string }).error : ''}
            </p>
          </div>
        </div>

        {/* Readout */}
        <div className="min-w-0 lg:order-3 lg:col-span-3 lg:self-end">
          <Readout t={shown} />
          <Link
            to={`/contact?service=${shown.construction === 'Bias ply' ? 'bike-tyres' : 'car-tyres'}&size=${encodeURIComponent(shown.code)}`}
            className="btn btn-primary mt-8 w-full"
          >
            Ask about this size <ArrowRight size={18} className="arrow" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}
