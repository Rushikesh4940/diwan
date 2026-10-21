/*
  Every photograph on this concept site comes from Wikimedia Commons under a
  licence that allows commercial use. They were cropped, resized and converted
  to monochrome for one consistent treatment; under the share-alike licences
  these adapted versions are offered under the same licence as the original.

  They are illustrative pictures of the trade and the area. None of them shows
  Diwan Auto Care's own branches, staff, customers or work. Replace them with
  the business's own photography before launch.
*/

export type Photo = {
  slug: string
  alt: string
  width: number
  height: number
  sizes: number[]
  title: string
  creator: string
  licence: string
  licenceUrl: string
  page: string
  category: 'Tyres' | 'Wheels' | 'Batteries & brakes' | 'Thane'
}

const BY_SA_2 = 'https://creativecommons.org/licenses/by-sa/2.0/'
const BY_SA_3 = 'https://creativecommons.org/licenses/by-sa/3.0/'
const BY_SA_4 = 'https://creativecommons.org/licenses/by-sa/4.0/'
const BY_2 = 'https://creativecommons.org/licenses/by/2.0/'

export const photos = {
  tread: {
    slug: 'tread',
    alt: 'Close-up of an all-season car tyre tread and its shoulder blocks',
    width: 1920, height: 1440, sizes: [640, 1280, 1920],
    title: 'All Season tire tread and code', creator: 'Ken T1381',
    licence: 'CC BY-SA 3.0', licenceUrl: BY_SA_3,
    page: 'https://commons.wikimedia.org/w/index.php?curid=19758290', category: 'Tyres',
  },
  wornTread: {
    slug: 'worn-tread',
    alt: 'A worn car tyre with shallow, uneven tread grooves',
    width: 1920, height: 1242, sizes: [640, 1280, 1920],
    title: 'Tire tread', creator: 'Jbobby',
    licence: 'CC BY-SA 3.0', licenceUrl: BY_SA_3,
    page: 'https://commons.wikimedia.org/w/index.php?curid=16212888', category: 'Tyres',
  },
  tyreStack: {
    slug: 'tyre-stack',
    alt: 'A stack of four car tyres on alloy rims standing on a workshop floor',
    width: 1920, height: 2123, sizes: [640, 1280, 1920],
    title: 'Car tire stack 20170516', creator: 'Santeri Viinamäki',
    licence: 'CC BY-SA 4.0', licenceUrl: BY_SA_4,
    page: 'https://commons.wikimedia.org/w/index.php?curid=58963082', category: 'Tyres',
  },
  hubBrake: {
    slug: 'hub-brake',
    alt: 'A car raised on a lift with the wheel removed, showing the brake disc, caliper and hub',
    width: 1920, height: 2048, sizes: [640, 1280, 1920],
    title: 'Car tyre replacement (3)', creator: 'Herry Lawford',
    licence: 'CC BY 2.0', licenceUrl: BY_2,
    page: 'https://commons.wikimedia.org/w/index.php?curid=57647944', category: 'Batteries & brakes',
  },
  alignmentClamp: {
    slug: 'alignment-clamp',
    alt: 'A wheel alignment sensor clamped to a car wheel on an alignment ramp',
    width: 1920, height: 1440, sizes: [640, 1280, 1920],
    title: 'Wheel alignment on a Ford Focus 1', creator: 'Mike Peel (www.mikepeel.net)',
    licence: 'CC BY-SA 4.0', licenceUrl: BY_SA_4,
    page: 'https://commons.wikimedia.org/w/index.php?curid=57016633', category: 'Wheels',
  },
  alignmentBay: {
    slug: 'alignment-bay',
    alt: 'A saloon car on a raised alignment ramp inside a service bay, with targets on each wheel',
    width: 1920, height: 1368, sizes: [640, 1280, 1920],
    title: 'Wheel alignment on a Ford Focus 3', creator: 'Mike Peel (www.mikepeel.net)',
    licence: 'CC BY-SA 4.0', licenceUrl: BY_SA_4,
    page: 'https://commons.wikimedia.org/w/index.php?curid=57016651', category: 'Wheels',
  },
  balancing: {
    slug: 'balancing',
    alt: 'A tyre mounted on a wheel balancing machine, its weights tray and display beside it',
    width: 1920, height: 1080, sizes: [640, 1280, 1920],
    title: 'Wheel balancing', creator: 'ProjectManhattan',
    licence: 'CC BY-SA 3.0', licenceUrl: BY_SA_3,
    page: 'https://commons.wikimedia.org/w/index.php?curid=36837716', category: 'Wheels',
  },
  alloyCaliper: {
    slug: 'alloy-caliper',
    alt: 'A five-spoke alloy wheel with a large brake caliper behind the spokes',
    width: 1920, height: 1276, sizes: [640, 1280, 1920],
    title: 'Porsche Boxster 986 Ph. 2 brake disc', creator: 'Friday83260',
    licence: 'CC BY-SA 4.0', licenceUrl: BY_SA_4,
    page: 'https://commons.wikimedia.org/w/index.php?curid=36116030', category: 'Wheels',
  },
  alloyWheel: {
    slug: 'alloy-wheel',
    alt: 'A machined two-tone alloy wheel standing on its own',
    width: 1656, height: 1736, sizes: [640, 1280],
    title: 'Black diamond alloy wheels', creator: 'Duru2007',
    licence: 'CC BY-SA 3.0', licenceUrl: BY_SA_3,
    page: 'https://commons.wikimedia.org/w/index.php?curid=16944550', category: 'Wheels',
  },
  battery: {
    slug: 'battery',
    alt: 'A 12-volt car battery with its positive and negative terminals capped',
    width: 1920, height: 1673, sizes: [640, 1280, 1920],
    title: 'Diamond Energie car battery', creator: 'Santeri Viinamäki',
    licence: 'CC BY-SA 4.0', licenceUrl: BY_SA_4,
    page: 'https://commons.wikimedia.org/w/index.php?curid=50272349', category: 'Batteries & brakes',
  },
  ghodbunder: {
    slug: 'ghodbunder-road',
    alt: 'Ghodbunder Road (State Highway 42) curving along the creek below the hills north of Thane',
    width: 1920, height: 1440, sizes: [640, 1280, 1920],
    title: 'Ghodbunder Road (SH 42)', creator: 'Dinesh Valke',
    licence: 'CC BY-SA 2.0', licenceUrl: BY_SA_2,
    page: 'https://commons.wikimedia.org/w/index.php?curid=51599802', category: 'Thane',
  },
  thane: {
    slug: 'thane-yeoor',
    alt: 'Thane city towers seen across green hillside from the Yeoor Hills',
    width: 1920, height: 1080, sizes: [640, 1280, 1920],
    title: 'Thane city, from Yeoor Hills', creator: 'Dinesh Valke',
    licence: 'CC BY-SA 2.0', licenceUrl: BY_SA_2,
    page: 'https://commons.wikimedia.org/w/index.php?curid=112348677', category: 'Thane',
  },
} satisfies Record<string, Photo>

export type PhotoKey = keyof typeof photos

export const allPhotos: Photo[] = Object.values(photos)
