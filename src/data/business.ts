/*
  Business facts used on the site.

  Every value here was taken from a public source on 21 Oct 2026 and is listed
  with that source. Anything marked `confirm: true` disagrees between sources or
  was only found on a third-party listing; it must be checked with the business
  before a production launch (see README → "To confirm before launch").
*/

export const SOURCES = {
  official: 'https://diwanautocare.com',
  officialContact: 'https://diwanautocare.com/contact/',
  officialAbout: 'https://diwanautocare.com/about-us/',
  officialServices: 'https://diwanautocare.com/services-offered/',
  michelin: 'https://www.michelin.in/news/michelin-india-mumbai-largest-mts-store-diwan-auto-care',
  tyreplex: 'https://www.tyreplex.com/tyre-dealers-in-ozar/diwan-auto-care-llp_1',
} as const

export const business = {
  legalName: 'Diwan Auto Care LLP',
  name: 'Diwan Auto Care',
  tagline: 'Your Safety Partner', // official logo lockup
  // Michelin India press release (8 Oct 2025): "Founded in 1978".
  // The official site says "more than 40 years" (About) and "over 30 years" (Home).
  founded: 1978,
  foundedConfirm: true,
  // Official About page: three businesses merged in April 2019.
  formerNames: ['Tyre Best', 'Battery Best Sales-N-Service', 'Auto Care Centre'],
  mergedIn: 'April 2019',
  // Official About page.
  teamSize: 'more than 50',
  values: ['Honesty', 'Expertise', 'Quality'],
  email: 'custcare@diwanautocare.com',
  // Two branches list these hours on TyrePlex; not stated on the official site.
  hours: 'Daily, 10:00 am – 8:00 pm',
  hoursConfirm: true,
  // Official site footer links.
  social: {
    instagram: 'https://www.instagram.com/diwanautocare/',
    facebook: 'https://www.facebook.com/diwanautocare/',
  },
  // No WhatsApp number is published by the business.
  whatsapp: null as string | null,
  // Brands shown on the official site's partner strip.
  brands: [
    'Michelin',
    'Bridgestone',
    'Continental',
    'Yokohama',
    'Apollo',
    'CEAT',
    'JK Tyre',
    'Maxxis',
    'Nexen',
    'Firestone',
    'Exide',
    'Amaron',
    'Hijon',
    'Momo',
    'Roger',
  ],
} as const

/* Oshiwara store facts: Michelin India press release, 8 Oct 2025. */
export const oshiwaraStore = {
  launched: 'October 2025',
  showroomSqFt: 400,
  serviceAreaSqFt: 3100,
  bays: 4,
  lifts: 2,
  pit: 1,
  equipment: ['Hunter wheel alignment', 'Hunter Road Force wheel balancing'],
} as const

export type Branch = {
  id: string
  name: string
  area: string
  city: 'Thane' | 'Bhiwandi' | 'Mumbai'
  address: string
  phone: string
  note?: string
  /* Schematic position on the branch map, 0–100 in each axis. Not to scale. */
  map: { x: number; y: number }
}

/* Addresses and numbers: official contact page. */
export const branches: Branch[] = [
  {
    id: 'anand-nagar',
    name: 'Anand Nagar',
    area: 'Ghodbunder Road',
    city: 'Thane',
    address:
      'Shop 13–16, Sagar Residency, opp. Grand Square, near Kasarvadavli police station, behind DMart, Ghodbunder Road, Thane West 400615',
    phone: '+91 91370 74742',
    map: { x: 51, y: 22 },
  },
  {
    id: 'kothari-compound',
    name: 'Kothari Compound',
    area: 'Manpada',
    city: 'Thane',
    address:
      'Godown 1C, 27 Acres, Kothari Compound, near Happy Valley Circle, Tikujiniwadi Road, Manpada, Thane West 400610',
    phone: '+91 99302 88585',
    map: { x: 49, y: 37 },
  },
  {
    id: 'pawar-nagar',
    name: 'Pawar Nagar',
    area: 'opp. Hiranandani Meadows',
    city: 'Thane',
    address:
      'A1 – 003/004/005, Harasiddh Park, Pawar Nagar, street opp. Hiranandani Meadows, Thane West 400610',
    phone: '+91 98694 40371',
    map: { x: 53, y: 47 },
  },
  {
    id: 'chandanwadi',
    name: 'Chandanwadi',
    area: 'Almeda Road',
    city: 'Thane',
    address: 'Shop 2–3, Akshata Apartment, Almeda Road, Chandanwadi, Thane West 400601',
    phone: '+91 91370 74742',
    map: { x: 55, y: 58 },
  },
  {
    id: 'bhiwandi',
    name: 'Bhiwandi',
    area: 'Old Wada Road',
    city: 'Bhiwandi',
    address:
      'D3, Shop 32–34, Gopal Nagar, Rajiv Gandhi Chowk, opp. Beni Prasad petrol pump, Old Wada Road, Bhiwandi 421302',
    phone: '+91 73502 20046',
    map: { x: 86, y: 14 },
  },
  {
    id: 'jogeshwari',
    name: 'Jogeshwari West',
    area: 'Oshiwara',
    city: 'Mumbai',
    address: 'Gala 4, Sadhna Industrial Estate, near Oshiwara Plaza, Jogeshwari West, Mumbai 400102',
    phone: '+91 91370 74742',
    note: 'Michelin Tyre & Service store, opened with Michelin India in October 2025.',
    map: { x: 14, y: 82 },
  },
]

export const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, '')}`

export const mapsHref = (address: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`Diwan Auto Care, ${address}`)}`

/* Primary number for the header call button: the number shared by three branches. */
export const primaryPhone = '+91 91370 74742'
