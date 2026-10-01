/**
 * Centralized image configuration.
 * All imagery is served from a single source so assets can be swapped later
 * by editing only this file. Replace URLs with local imports in /src/assets
 * when final brand photography is available.
 */

const PEXELS = 'https://images.pexels.com/photos';

/** Build a pexels URL with size + compression params. */
const px = (id: number, w = 1200, h?: number) =>
  `${PEXELS}/${id}/pexels-photo-${id}.jpeg?auto=compress&w=${w}${h ? `&h=${h}&fit=crop` : ''}`;

export const images = {
  // Hero & editorial
  heroMain: px(3777969, 1800),
  heroPortrait: px(4107529, 1200),
  editorialClinic: px(4056785, 1400),
  interior: px(3993311, 1400),
  treatmentRoom: px(7440141, 1200),

  // Treatments
  treatmentLaser: px(7670973, 1200),
  treatmentFaceBody: px(6787435, 1200),
  treatmentInjectables: px(4107277, 1200),
  treatmentFacial: px(5203074, 1200),
  treatmentLaseMD: px(7439911, 1200),
  treatmentMorpheus: px(6690108, 1200),

  // Before / After pairs (placeholder stock — replace with real results)
  before01: px(5743482, 900),
  after01: px(4246057, 900),
  before02: px(3993312, 900),
  after02: px(4105382, 900),
  before03: px(6550391, 900),
  after03: px(3764172, 900),

  // Team portraits
  team01: px(3933642, 800),
  team02: px(6432135, 800),
  team03: px(6695249, 800),
  team04: px(3998391, 800),

  // Locations
  location01: px(4057577, 1200),
  location02: px(4246056, 1200),
  location03: px(3993310, 1200),

  // Misc
  technology: px(4107529, 1200),
  membership: px(3777969, 1400),
} as const;

export type ImageKey = keyof typeof images;
