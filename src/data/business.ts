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
  // Source of the founding year only.
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

export type Branch = {
  id: string
  name: string
  area: string
  city: 'Thane' | 'Bhiwandi'
  address: string
  phone: string
  hq?: boolean
}

/*
  The business's four locations, as confirmed by the site owner on 21 Oct 2026
  (from the company's own location listing). Shop numbers and phone numbers
  are from the official contact page.
*/
export const branches: Branch[] = [
  {
    id: 'anand-nagar',
    name: 'Anand Nagar',
    area: 'Kasarvadavli · Headquarters',
    city: 'Thane',
    address: 'Shop 13–16, Sagar Residency, Anand Nagar, Kasarvadavli, Ghodbunder Road, Thane West 400615',
    phone: '+91 91370 74742',
    hq: true,
  },
  {
    id: 'pawar-nagar',
    name: 'Pawar Nagar',
    area: 'Vasant Vihar',
    city: 'Thane',
    address: 'A1 – 003/004/005, Harasiddh Park, Pawar Nagar, Vasant Vihar, Thane West 400610',
    phone: '+91 98694 40371',
  },
  {
    id: 'kothari-compound',
    name: 'Kothari Compound',
    area: 'Manpada',
    city: 'Thane',
    address: 'Godown 1C, 27 Acres, Kothari Compound, Tikujiniwadi, Manpada, Thane West 400610',
    phone: '+91 99302 88585',
  },
  {
    id: 'bhiwandi',
    name: 'Gopal Nagar',
    area: 'Bhiwandi',
    city: 'Bhiwandi',
    address: 'D3, Shop 32–34, Gopal Nagar, Rajiv Gandhi Chowk, Old Agra Road, Bhiwandi 421302',
    phone: '+91 73502 20046',
  },
]

export const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, '')}`

export const mapsHref = (address: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`Diwan Auto Care, ${address}`)}`

/* Primary number for the header call button: the Anand Nagar headquarters. */
export const primaryPhone = '+91 91370 74742'
