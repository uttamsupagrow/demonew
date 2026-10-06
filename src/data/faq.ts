export interface FaqItem {
  q: string;
  a: string;
}

/** General site-wide FAQ (used on Home + Contact). Treatment-specific FAQs live in treatments.ts */
export const generalFaq: FaqItem[] = [
  {
    q: 'What happens at my first visit?',
    a: 'Every first visit begins with a consultation: skin analysis, goal mapping and a transparent plan with pricing before anything is treated. No pressure, no surprises — just an honest protocol you can approve.',
  },
  {
    q: 'Do you offer payment plans?',
    a: 'Yes. We partner with CareCredit and offer in-house interest-free installment plans on packages of six sessions or more. Membership tiers also spread costs monthly with built-in discounts.',
  },
  {
    q: 'Are your devices FDA-cleared?',
    a: 'Every platform we operate — our diode laser, LaseMD Ultra thulium laser, Morpheus8 RF microneedling system and injectable lines — is FDA-cleared and operated under physician supervision.',
  },
  {
    q: 'How far in advance should I book?',
    a: 'Laser series appointments are typically available within one week; injector slots open every Tuesday. Members receive priority booking and same-week availability as part of their tier.',
  },
  {
    q: 'What is your cancellation policy?',
    a: 'We ask for 24 hours notice so another client can take your slot. Late cancellations incur a $50 fee deducted from package credits; no-shows forfeit the session.',
  },
  {
    q: 'Is treatment safe for dark or tanned skin?',
    a: 'Yes. Our tri-wavelength diode includes the 1064 nm Nd:YAG setting specifically calibrated for skin of color, and all providers complete Fitzpatrick-specific training before treating independently.',
  },
];
