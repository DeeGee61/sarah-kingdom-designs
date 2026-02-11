export interface Project {
  slug: string
  title: string
  tagline: string
  location: string
  year: number
  scope: string[]
  description: string
  heroImage: string
  images: string[]
  testimonial?: {
    quote: string
    author: string
  }
}

const unsplash = (id: string, w = 1400) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`

export const projects: Project[] = [
  {
    slug: 'alpine-retreat',
    title: 'Alpine Retreat',
    tagline: 'Mountain warmth meets modern restraint',
    location: 'Boulder, CO',
    year: 2024,
    scope: ['Full Home', 'Custom Furniture', 'Lighting Design'],
    description:
      'A 3,200 sq ft mountain home reimagined with layered neutrals, live-edge walnut, and floor-to-ceiling glass that frames the Flatirons. Every material was chosen to age gracefully alongside the landscape.',
    heroImage: unsplash('1600210492-b52bd06c5efd'),
    images: [
      unsplash('1600585154340-be6161a56a0c'),
      unsplash('1600566753086-00f18fb6b3ea'),
      unsplash('1600573472592-401b489a3cdc'),
    ],
    testimonial: {
      quote:
        'Sarah understood our home before we could articulate what we wanted. Every room feels like it was always meant to be this way.',
      author: 'The Hendersons',
    },
  },
  {
    slug: 'pearl-street-loft',
    title: 'Pearl Street Loft',
    tagline: 'Urban edge softened by craft',
    location: 'Boulder, CO',
    year: 2024,
    scope: ['Loft Renovation', 'Kitchen Design', 'Art Curation'],
    description:
      'A former commercial space on Pearl Street transformed into a 1,800 sq ft live-work loft. Exposed concrete and steel meet hand-plastered walls and bespoke cabinetry in oiled oak.',
    heroImage: unsplash('1600607687939-ce8a6c25118c'),
    images: [
      unsplash('1600585154526-990dced4db0d'),
      unsplash('1556909114-f6e7ad7d3136'),
      unsplash('1600566753190-17f0baa2a6c0'),
    ],
    testimonial: {
      quote:
        "The loft feels like a gallery and a home at the same time. Sarah's eye for proportion is unmatched.",
      author: 'David Chen',
    },
  },
  {
    slug: 'canyon-house',
    title: 'Canyon House',
    tagline: 'Stone, light, and silence',
    location: 'Eldorado Springs, CO',
    year: 2023,
    scope: ['Full Home', 'Landscape Integration', 'Custom Millwork'],
    description:
      'Perched above Eldorado Canyon, this home required materials that could hold their own against dramatic geology. Local sandstone, blackened steel, and vast expanses of glass create a home that feels carved from the canyon itself.',
    heroImage: unsplash('1600596542815-611a33f57d4f'),
    images: [
      unsplash('1600210491-ed8bdca5804e'),
      unsplash('1600585153490-76fb20a32601'),
      unsplash('1600573472592-401b489a3cdc'),
    ],
  },
  {
    slug: 'mapleton-hill-revival',
    title: 'Mapleton Hill Revival',
    tagline: 'Heritage restored with a modern hand',
    location: 'Boulder, CO',
    year: 2023,
    scope: ['Historic Renovation', 'Color Consultation', 'Textile Design'],
    description:
      'A 1920s Mapleton Hill bungalow restored to its original character while introducing contemporary comfort. Original hardwoods were refinished, plaster walls repaired, and each room given a palette drawn from the Colorado clay.',
    heroImage: unsplash('1600585154340-be6161a56a0c'),
    images: [
      unsplash('1600210492-b52bd06c5efd'),
      unsplash('1600566753086-00f18fb6b3ea'),
      unsplash('1556909114-f6e7ad7d3136'),
    ],
    testimonial: {
      quote:
        'She treated our old house with such respect. It feels like the home it was always supposed to be.',
      author: 'Margaret & Paul Whitfield',
    },
  },
  {
    slug: 'flatiron-modern',
    title: 'Flatiron Modern',
    tagline: 'Clean geometry, warm soul',
    location: 'Boulder, CO',
    year: 2024,
    scope: ['New Build Interior', 'Furniture Sourcing', 'Art Direction'],
    description:
      'A new-construction home designed to feel immediately lived-in. Warm plaster, unlacquered brass, and linen upholstery counterbalance the architect\'s crisp lines. The result is modern without being cold.',
    heroImage: unsplash('1600607687644-c7171b42498f'),
    images: [
      unsplash('1600585154526-990dced4db0d'),
      unsplash('1600596542815-611a33f57d4f'),
      unsplash('1600210491-ed8bdca5804e'),
    ],
  },
  {
    slug: 'chautauqua-cottage',
    title: 'Chautauqua Cottage',
    tagline: 'Small space, big intention',
    location: 'Boulder, CO',
    year: 2022,
    scope: ['Room Refresh', 'Custom Built-Ins', 'Styling'],
    description:
      'A 900 sq ft cottage near Chautauqua Park designed to maximize every inch without sacrificing beauty. Custom built-in storage, a curated palette of sage and cream, and thoughtful lighting make this tiny home feel expansive.',
    heroImage: unsplash('1600566753190-17f0baa2a6c0'),
    images: [
      unsplash('1600573472592-401b489a3cdc'),
      unsplash('1600585154340-be6161a56a0c'),
      unsplash('1600607687939-ce8a6c25118c'),
    ],
    testimonial: {
      quote:
        'I never believed a small home could feel this luxurious. Sarah proved me wrong.',
      author: 'Lisa Nakamura',
    },
  },
  {
    slug: 'table-mesa-family',
    title: 'Table Mesa Family Home',
    tagline: 'Designed for the beautiful mess of life',
    location: 'Boulder, CO',
    year: 2023,
    scope: ['Full Home', 'Kid-Friendly Design', 'Outdoor Living'],
    description:
      'A family of five needed a home that could survive daily life and still feel intentional. Performance fabrics, rounded edges, and a playful-yet-sophisticated color story make every room both beautiful and bombproof.',
    heroImage: unsplash('1600585153490-76fb20a32601'),
    images: [
      unsplash('1600566753086-00f18fb6b3ea'),
      unsplash('1600210492-b52bd06c5efd'),
      unsplash('1556909114-f6e7ad7d3136'),
    ],
  },
  {
    slug: 'niwot-ranch',
    title: 'Niwot Ranch Retreat',
    tagline: 'Where rustic meets refined',
    location: 'Niwot, CO',
    year: 2022,
    scope: ['Full Home', 'Barn Conversion', 'Material Sourcing'],
    description:
      'A 5-acre property featuring a main house and converted barn studio. Reclaimed timber, hand-forged iron, and natural stone ground every space in the land, while modern proportions and carefully edited furnishings keep it from veering into cliché.',
    heroImage: unsplash('1600210491-ed8bdca5804e'),
    images: [
      unsplash('1600596542815-611a33f57d4f'),
      unsplash('1600607687644-c7171b42498f'),
      unsplash('1600585154526-990dced4db0d'),
    ],
  },
  {
    slug: 'gunbarrel-mid-century',
    title: 'Gunbarrel Mid-Century',
    tagline: 'Restoring the bones, adding the warmth',
    location: 'Gunbarrel, CO',
    year: 2024,
    scope: ['Renovation', 'Period-Appropriate Design', 'Landscape Design'],
    description:
      'A 1960s ranch home in Gunbarrel restored with reverence for its mid-century bones. Walnut paneling was preserved, original terrazzo floors polished, and new furnishings selected to honor the era without becoming a time capsule.',
    heroImage: unsplash('1556909114-f6e7ad7d3136'),
    images: [
      unsplash('1600566753190-17f0baa2a6c0'),
      unsplash('1600573472592-401b489a3cdc'),
      unsplash('1600585154340-be6161a56a0c'),
    ],
    testimonial: {
      quote:
        'Sarah understood mid-century design at a level that blew us away. She preserved everything worth saving and reimagined the rest.',
      author: 'Tom & Rachel Briggs',
    },
  },
  {
    slug: 'baseline-studio',
    title: 'Baseline Creative Studio',
    tagline: 'A workspace as intentional as the work',
    location: 'Boulder, CO',
    year: 2024,
    scope: ['Commercial Interior', 'Acoustic Design', 'Brand Environment'],
    description:
      'A 2,400 sq ft creative studio for a branding agency. The brief was "a space that makes clients trust us before we say a word." Polished concrete, felt acoustic panels, and a curated material library do exactly that.',
    heroImage: unsplash('1600607687644-c7171b42498f'),
    images: [
      unsplash('1600585153490-76fb20a32601'),
      unsplash('1600210492-b52bd06c5efd'),
      unsplash('1600607687939-ce8a6c25118c'),
    ],
    testimonial: {
      quote:
        'Our studio went from forgettable to unforgettable. Clients always comment on the space now.',
      author: 'Apex Branding Co.',
    },
  },
]

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

export function getFeaturedProjects(): Project[] {
  return projects.slice(0, 4)
}
