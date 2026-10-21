import type { CSSProperties } from 'react'

/* Stagger index for entrance animations (read by `--i` in index.css). */
export const stagger = (i: number) => ({ '--i': i }) as CSSProperties
