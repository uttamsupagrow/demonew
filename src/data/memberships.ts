export interface MembershipTier {
  name: string;
  tagline: string;
  price: number;
  period: string;
  popular?: boolean;
  perks: string[];
}

export const membershipTiers: MembershipTier[] = [
  {
    name: 'Core',
    tagline: 'For maintenance glow',
    price: 79,
    period: '/month',
    perks: [
      '1 signature facial per month',
      '5% off all other treatments',
      'Priority booking window',
      'Birthday glow boost',
      'Pause anytime',
    ],
  },
  {
    name: 'Plus',
    tagline: 'Our most-loved plan',
    price: 149,
    period: '/month',
    popular: true,
    perks: [
      'Everything in Core',
      'Monthly LED or peel add-on',
      '10% off laser & injectables',
      'Annual Visia skin imaging',
      'One guest facial voucher / quarter',
      'Free rescheduling',
    ],
  },
  {
    name: 'Elite',
    tagline: 'Full-access membership',
    price: 279,
    period: '/month',
    perks: [
      'Everything in Plus',
      'Quarterly LaseMD Ultra session',
      '15% off everything, always',
      'Dedicated provider & concierge line',
      'Two Morpheus8 body credits / year',
      'Exclusive event invitations',
    ],
  },
];

export interface ComparisonRow {
  feature: string;
  core: string | boolean;
  plus: string | boolean;
  elite: string | boolean;
}

export const membershipComparison: ComparisonRow[] = [
  { feature: 'Signature facials', core: '1 / month', plus: '1 / month', elite: '2 / month' },
  { feature: 'Treatment discount', core: '5%', plus: '10%', elite: '15%' },
  { feature: 'Peels & LED add-ons', core: false, plus: '1 / month', elite: 'Unlimited' },
  { feature: 'LaseMD Ultra sessions', core: false, plus: false, elite: '3 / year' },
  { feature: 'Morpheus8 body credits', core: false, plus: false, elite: '2 / year' },
  { feature: 'Visia skin imaging', core: false, plus: 'Annual', elite: 'Semi-annual' },
  { feature: 'Guest facial vouchers', core: false, plus: '1 / quarter', elite: '1 / month' },
  { feature: 'Priority booking', core: true, plus: true, elite: true },
  { feature: 'Dedicated provider', core: false, plus: false, elite: true },
  { feature: 'Pause or cancel', core: 'Anytime', plus: 'Anytime', elite: 'Anytime' },
];
