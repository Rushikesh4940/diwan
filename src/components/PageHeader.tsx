import type { ReactNode } from 'react'
import { Photo } from './Photo'
import { Clip } from './Clip'
import type { clips } from '../data/clips'
import type { PhotoKey } from '../data/images'
import { stagger } from '../lib/style'

type Props = { title: string; intro: ReactNode; photo: PhotoKey; clip?: keyof typeof clips; children?: ReactNode }

/*
  Inner-page opening: the title on the left, and the tyre motif at its second
  scale — a yellow ring holding a photograph, cropped by the right edge.
*/
export function PageHeader({ title, intro, photo, clip, children }: Props) {
  return (
    <section className="relative overflow-hidden" aria-labelledby="page-title">
      <div className="frame relative z-10 grid min-h-[min(68svh,640px)] items-center gap-10 pb-16 pt-12 md:grid-cols-12 md:py-20">
        <div className="md:col-span-6">
          <h1 id="page-title" className="display hero-line text-[clamp(3rem,10vw,4rem)] md:text-[clamp(3.5rem,5.6vw,6rem)]" style={stagger(0)}>
            {title}
          </h1>
          <div className="hero-line lead mt-6 max-w-[36ch]" style={stagger(1)}>
            {intro}
          </div>
          {children && (
            <div className="hero-line mt-8" style={stagger(2)}>
              {children}
            </div>
          )}
        </div>
        <div className="relative h-[72vw] md:col-span-6 md:h-full">
          <div className="absolute left-[8%] top-0 aspect-square w-[100vw] rounded-full bg-accent p-[7%] md:left-[12%] md:top-1/2 md:w-[min(64vh,48vw)] md:-translate-y-1/2">
            <div className="shutter disc h-full w-full">
              {clip ? <Clip name={clip} /> : <Photo name={photo} priority sizes="(min-width: 768px) 44vw, 90vw" />}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
