import type { PhotoKey } from './images'
import type { clips } from './clips'

/*
  Services and products. Every service listed here is named by the business on
  its official site (brakes are also named in a Michelin India release). The "includes" and
  "why it matters" copy is written for this concept from those descriptions and
  general tyre-care practice; the business should review it before launch.
*/

export type Service = {
  id: string
  name: string
  category: 'tyres-wheels' | 'batteries-more'
  photo: PhotoKey
  /* A looping clip shown in place of the photo where one exists */
  clip?: keyof typeof clips
  /* One fact shown under the specimen tile on the home page */
  fact: string
  summary: string
  includes: string[]
  benefits: string[]
  source: 'official' | 'michelin'
}

export const categories = [
  {
    id: 'tyres-wheels',
    name: 'Tyres and wheels',
    intro: 'New tyres for cars and two-wheelers, alloy wheels, and the alignment and balancing that make them last.',
  },
  {
    id: 'batteries-more',
    name: 'Batteries, brakes and help on the road',
    intro: 'Car and bike batteries, brake work, the accessories worth keeping in the boot, and assistance when you are stuck.',
  },
] as const

export const services: Service[] = [
  {
    id: 'car-tyres',
    name: 'Car tyres',
    category: 'tyres-wheels',
    photo: 'tread',
    fact: '15 tyre and battery brands on one rack',
    summary:
      'Passenger-car tyres from the major brands, matched to your car’s size, load and speed rating, fitted and inflated to spec.',
    includes: [
      'Size and rating check against your current tyres',
      'Options across brands and budgets, compared side by side',
      'Fitting, valve check and inflation to the recommended pressure',
      'Old tyre inspection and advice on the remaining set',
    ],
    benefits: ['Grip you can rely on in the monsoon', 'The right load and speed rating for your car'],
    source: 'official',
  },
  {
    id: 'bike-tyres',
    name: 'Bike tyres',
    category: 'tyres-wheels',
    photo: 'tyreStack',
    fact: 'Two-wheeler sizes, tube and tubeless',
    summary: 'Tyres for motorcycles and scooters, with fitting while you wait.',
    includes: ['Size match for front and rear', 'Tube and tubeless options', 'Fitting and pressure check'],
    benefits: ['Safer braking on wet roads', 'Longer life from the right compound'],
    source: 'official',
  },
  {
    id: 'alloy-wheels',
    name: 'Alloy wheels',
    category: 'tyres-wheels',
    photo: 'alloyWheel',
    fact: 'A wide selection, fitted with your tyres',
    summary: 'Alloy wheels in a range of designs and sizes, fitted, balanced and torqued as a set.',
    includes: ['Size and offset check for your car', 'Mounting your tyres on the new rims', 'Balancing and fitting'],
    benefits: ['A lighter, sharper-looking wheel', 'Correct fitment, no rubbing or vibration'],
    source: 'official',
  },
  {
    id: 'wheel-alignment',
    name: 'Wheel alignment',
    category: 'tyres-wheels',
    photo: 'alignmentClamp',
    fact: 'Toe, camber and axle geometry set to spec',
    summary:
      'Setting toe, camber and the geometry of every axle so the car tracks straight and the tyres wear evenly.',
    includes: [
      'Measurement of toe, camber and rear-axle geometry',
      'Adjustment to the manufacturer’s figures',
      'Before-and-after readings explained',
      'Steering-wheel centring',
    ],
    benefits: ['Less uneven tyre wear', 'Better handling and a straighter drive', 'A safer car to drive'],
    source: 'official',
  },
  {
    id: 'wheel-balancing',
    name: 'Wheel balancing',
    category: 'tyres-wheels',
    photo: 'balancing',
    fact: 'No shake through the steering at speed',
    summary:
      'Balancing the weight of each tyre and wheel so it turns smoothly at speed, without vibration through the steering.',
    includes: ['Spin test of each wheel', 'Weights fitted where the assembly is light', 'Re-check after correction'],
    benefits: ['No shake at highway speeds', 'Protects tyres from uneven, damaging wear'],
    source: 'official',
  },
  {
    id: 'puncture-repair',
    name: 'Puncture repair',
    category: 'tyres-wheels',
    photo: 'wornTread',
    clip: 'punctureCheck',
    fact: 'Slow leaks found and repaired',
    summary:
      'Finding and repairing punctures and slow leaks, and telling you honestly when a tyre is past repair.',
    includes: ['Leak location and valve check', 'Repair where the tyre allows it', 'Re-inflation and balance check'],
    benefits: ['Back on the road quickly', 'A straight answer on repair versus replace'],
    source: 'official',
  },
  {
    id: 'batteries',
    name: 'Batteries',
    category: 'batteries-more',
    photo: 'battery',
    fact: 'Car and bike batteries from top brands',
    summary: 'Car and two-wheeler batteries from leading brands, tested, fitted and set up for your vehicle.',
    includes: ['Battery and charging-system test', 'Recommendation by size and capacity', 'Fitting and terminal care'],
    benefits: ['Reliable starts through the rains', 'Advice that keeps a battery healthy for longer'],
    source: 'official',
  },
  {
    id: 'brakes',
    name: 'Brakes',
    category: 'batteries-more',
    photo: 'hubBrake',
    fact: 'Brake service alongside tyres and wheels',
    summary: 'Brake inspection and service while the wheels are already off for tyres or alignment.',
    includes: ['Pad and disc inspection', 'Replacement where needed', 'Road test'],
    benefits: ['Shorter, more confident stops', 'One visit for tyres and brakes'],
    source: 'michelin',
  },
  {
    id: 'accessories',
    name: 'Accessories',
    category: 'batteries-more',
    photo: 'alloyCaliper',
    fact: 'Inflators and kit worth keeping in the boot',
    summary: 'Useful car accessories, including portable inflators for tubeless tyres for roadside top-ups.',
    includes: ['Tubeless tyre inflators', 'Car accessories in store', 'Advice on what is worth buying'],
    benefits: ['Ready for a slow puncture far from a shop'],
    source: 'official',
  },
  {
    id: 'roadside-assistance',
    name: 'Roadside assistance',
    category: 'batteries-more',
    photo: 'ghodbunder',
    fact: 'Phone help, spare fitting, battery charging',
    summary: 'Help when you are stuck: advice over the phone, spare-tyre fitting and battery charging.',
    includes: ['Phone assistance', 'Spare tyre fitting', 'Battery charging'],
    benefits: ['A known local team to call', 'Less time stranded at the roadside'],
    source: 'official',
  },
]

export const serviceById = (id: string | null) => services.find((s) => s.id === id)
