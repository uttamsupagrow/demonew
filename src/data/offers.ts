export interface Offer {
  title: string;
  detail: string;
  price: string;
  priceNote?: string;
  code: string;
  terms: string;
  cta: string;
  featured?: boolean;
}

export const offers: Offer[] = [
  {
    title: 'New Client Laser Series',
    detail: '10% off any laser hair removal package for first-time clients.',
    price: '-10%',
    priceNote: 'on your first package',
    code: 'VELORA10',
    terms: 'Valid for new clients on package purchases of 6+ sessions. Cannot be combined with memberships.',
    cta: 'Claim offer',
    featured: true,
  },
  {
    title: 'Neuromodulator Special',
    detail: 'Precision Botox pricing at an accessible per-unit rate.',
    price: '$10',
    priceNote: 'per unit',
    code: 'TOX10',
    terms: 'Limited to 50 units per client per month. New and returning clients. Must book by end of month.',
    cta: 'Book now',
  },
  {
    title: 'LaseMD Ultra Introduction',
    detail: '$200 off your first fractional resurfacing session.',
    price: '-$200',
    priceNote: 'first LaseMD session',
    code: 'GLOW200',
    terms: 'New clients only. Includes numbing and post-care kit. Non-transferable.',
    cta: 'Start glowing',
  },
];
