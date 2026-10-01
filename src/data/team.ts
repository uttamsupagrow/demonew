import { images } from '../lib/images';

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  credentials: string;
}

export const team: TeamMember[] = [
  {
    name: 'Dr. Elena Voss',
    role: 'Medical Director',
    bio: 'Board-certified in dermatologic surgery. Fifteen years refining combination protocols for skin of color and mature skin.',
    image: images.team01,
    credentials: 'MD, FAAD',
  },
  {
    name: 'Naomi Carter',
    role: 'Lead Nurse Injector',
    bio: 'Known for conservative artistry. Naomi has placed over 40,000 units of neuromodulator with an obsession for symmetry.',
    image: images.team02,
    credentials: 'RN, CPNP',
  },
  {
    name: 'Isla Fontaine',
    role: 'Master Laser Specialist',
    bio: 'Trained on every major hair-removal platform. Isla calibrates each pulse to your Fitzpatrick type — no defaults, ever.',
    image: images.team03,
    credentials: 'CLT, ALSS',
  },
  {
    name: 'Marcus Reed',
    role: 'Clinical Aesthetician',
    bio: 'Formerly of a five-star resort spa, Marcus brings medical-grade rigor and genuinely relaxing hands to every facial.',
    image: images.team04,
    credentials: 'LED, CIDESCO',
  },
];
