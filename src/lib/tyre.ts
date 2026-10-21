/*
  Reads a tyre size as printed on the sidewall, e.g. "205/55 R16 91V"
  or a two-wheeler size such as "100/90-17 55P".
  Load and speed tables follow the standard ETRTO / ISO 4000 indices.
*/

const LOAD_KG: Record<number, number> = {
  50: 190, 51: 195, 52: 200, 53: 206, 54: 212, 55: 218, 56: 224, 57: 230, 58: 236, 59: 243,
  60: 250, 61: 257, 62: 265, 63: 272, 64: 280, 65: 290, 66: 300, 67: 307, 68: 315, 69: 325,
  70: 335, 71: 345, 72: 355, 73: 365, 74: 375, 75: 387, 76: 400, 77: 412, 78: 425, 79: 437,
  80: 450, 81: 462, 82: 475, 83: 487, 84: 500, 85: 515, 86: 530, 87: 545, 88: 560, 89: 580,
  90: 600, 91: 615, 92: 630, 93: 650, 94: 670, 95: 690, 96: 710, 97: 730, 98: 750, 99: 775,
  100: 800, 101: 825, 102: 850, 103: 875, 104: 900, 105: 925, 106: 950, 107: 975, 108: 1000,
  109: 1030, 110: 1060, 111: 1090, 112: 1120, 113: 1150, 114: 1180, 115: 1215, 116: 1250,
  117: 1285, 118: 1320, 119: 1360, 120: 1400,
}

const SPEED_KMH: Record<string, number> = {
  J: 100, K: 110, L: 120, M: 130, N: 140, P: 150, Q: 160, R: 170, S: 180, T: 190,
  U: 200, H: 210, V: 240, W: 270, Y: 300,
}

export type TyreSize = {
  code: string
  widthMm: number
  aspect: number
  construction: 'Radial' | 'Bias ply'
  rimIn: number
  loadIndex?: number
  loadKg?: number
  speed?: string
  speedKmh?: number
  sidewallMm: number
  rimMm: number
  diameterMm: number
  circumferenceM: number
}

const PATTERN = /^(\d{2,3})\s*\/\s*(\d{2,3})\s*(ZR|R|-|B|D)?\s*(\d{2})(?:\s*(?:C)?\s*(\d{2,3})\s*\(?([A-Z])?\)?)?$/i

export function parseTyreSize(input: string): TyreSize | { error: string } {
  const raw = input.trim().toUpperCase().replace(/\s+/g, ' ')
  if (!raw) return { error: 'Type the size printed on your tyre’s sidewall.' }
  const m = raw.match(PATTERN)
  if (!m) return { error: 'That doesn’t look like a tyre size. Try the pattern 205/55 R16 91V.' }

  const widthMm = Number(m[1])
  const aspect = Number(m[2])
  const rimIn = Number(m[4])
  if (widthMm < 70 || widthMm > 355) return { error: 'Tread width is usually between 70 and 355 mm.' }
  if (aspect < 25 || aspect > 110) return { error: 'The second number (profile) is usually between 25 and 110.' }
  if (rimIn < 8 || rimIn > 24) return { error: 'Rim sizes run from about 8 to 24 inches.' }

  const construction = m[3] === '-' || m[3] === 'B' || m[3] === 'D' ? 'Bias ply' : 'Radial'
  const loadIndex = m[5] ? Number(m[5]) : undefined
  const speed = m[6] && SPEED_KMH[m[6]] ? m[6] : undefined

  const sidewallMm = (widthMm * aspect) / 100
  const rimMm = rimIn * 25.4
  const diameterMm = rimMm + 2 * sidewallMm

  const code = `${widthMm}/${aspect} ${construction === 'Radial' ? 'R' : '-'}${rimIn}${
    loadIndex ? ` ${loadIndex}` : ''
  }${speed ?? ''}`

  return {
    code,
    widthMm,
    aspect,
    construction,
    rimIn,
    loadIndex,
    loadKg: loadIndex ? LOAD_KG[loadIndex] : undefined,
    speed,
    speedKmh: speed ? SPEED_KMH[speed] : undefined,
    sidewallMm,
    rimMm,
    diameterMm,
    circumferenceM: (Math.PI * diameterMm) / 1000,
  }
}

/* Typical sizes by vehicle type, for the quick picks. Not tied to any model. */
export const typicalSizes = [
  { label: 'Hatchback', code: '165/80 R14 85T' },
  { label: 'Compact sedan', code: '185/65 R15 88H' },
  { label: 'Compact SUV', code: '215/60 R16 95H' },
  { label: 'Full-size SUV', code: '235/65 R17 104H' },
  { label: 'Motorcycle', code: '100/90-17 55P' },
]
