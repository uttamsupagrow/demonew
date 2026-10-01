import { images } from '../lib/images';

export interface Treatment {
  slug: string;
  title: string;
  short: string;
  description: string;
  image: string;
  href: string;
  priceFrom: number;
  priceUnit: string;
  duration: string;
  sessions: string;
  benefits: string[];
  steps: { title: string; text: string }[];
  technology: { name: string; text: string };
  faq: { q: string; a: string }[];
}

export const treatments: Treatment[] = [
  {
    slug: 'laser-hair-removal',
    title: 'Laser Hair Removal',
    short: 'Smooth, hair-free skin — permanently reduced, effortlessly.',
    description:
      'Our medical-grade diode laser targets unwanted hair across all skin types with precision cooling for comfort. Series treatments deliver lasting reduction on face, body and everywhere in between.',
    image: images.treatmentLaser,
    href: '/laser-hair-removal',
    priceFrom: 89,
    priceUnit: 'per session',
    duration: '10–60 min',
    sessions: '6–8 sessions recommended',
    benefits: [
      'Safe for all six Fitzpatrick skin types',
      'Contact cooling for a comfortable experience',
      'Permanent reduction — not temporary removal',
      'No ingrown hairs, no razor burn, no wax pain',
    ],
    steps: [
      { title: 'Consultation', text: 'We assess your skin type, hair goals and treatment area to build a personalized protocol.' },
      { title: 'Preparation', text: 'The area is cleansed and prepped; you will shave 24 hours before your visit.' },
      { title: 'Treatment', text: 'The laser delivers precise pulses while integrated cooling protects the skin surface.' },
      { title: 'Aftercare', text: 'Soothing gel and home-care guidance keep skin calm; shed happens over 1–3 weeks.' },
    ],
    technology: {
      name: 'TriWavelength Diode Platform',
      text: 'Three synchronized wavelengths (755/808/1064 nm) let us treat every depth of follicle across the full spectrum of skin tones, with a sapphire cooling tip that keeps the epidermis at a comfortable temperature.',
    },
    faq: [
      { q: 'Does laser hair removal hurt?', a: 'Most clients describe a warm snapping sensation. Our contact-cooling handpiece makes treatment very tolerable, and numbing cream is available on request.' },
      { q: 'How many sessions will I need?', a: 'Typically 6–8 sessions spaced 4–8 weeks apart, depending on area, hormones and hair cycle. Most clients see 80–90% reduction after the series.' },
      { q: 'Is it safe for darker skin tones?', a: 'Yes. The 1064 nm wavelength bypasses epidermal melanin, making treatment safe for skin of color when performed by our trained providers.' },
      { q: 'How should I prepare?', a: 'Shave the area within 24 hours of your appointment, avoid sun and self-tanner for two weeks, and skip waxing or plucking for six weeks prior.' },
    ],
  },
  {
    slug: 'facials',
    title: 'Facials & Skin Health',
    short: 'Clinical facials engineered for real skin change.',
    description:
      'Beyond-the-spa facials combining medical-grade actives, lymphatic massage and LED phototherapy — customized after digital skin analysis to target congestion, pigment, dehydration and early aging.',
    image: images.treatmentFacial,
    href: '/facials',
    priceFrom: 120,
    priceUnit: 'per treatment',
    duration: '60–90 min',
    sessions: 'Monthly maintenance recommended',
    benefits: [
      'Digital skin analysis before every treatment',
      'Customized acid and enzyme protocols',
      'LED phototherapy included in every facial',
      'Visible glow with zero downtime',
    ],
    steps: [
      { title: 'Analysis', text: 'Multispectral imaging reveals hydration, pigment and congestion beneath the surface.' },
      { title: 'Cleanse & Exfoliate', text: 'A double cleanse followed by the appropriate acid or enzyme for your skin condition.' },
      { title: 'Extract & Treat', text: 'Gentle extraction, high-frequency sanitation and targeted boosters do the heavy lifting.' },
      { title: 'Calm & Protect', text: 'LED therapy, massage and barrier repair leave skin luminous and settled.' },
    ],
    technology: {
      name: 'Medical-Grade Hydra Infusion & LED',
      text: 'Vortex-fusion delivery saturates skin with antioxidants and peptides while red and blue LED wavelengths calm inflammation and stimulate collagen at the cellular level.',
    },
    faq: [
      { q: 'How often should I get a facial?', a: 'Every 4 weeks aligns with your skin\u2019s natural cell turnover cycle. Acne management plans may start biweekly.' },
      { q: 'Will I break out afterwards?', a: 'Minor purging can occur for 2–5 days if congestion was present. We tailor pressure and acids to minimize it.' },
      { q: 'Can I wear makeup right after?', a: 'We recommend waiting 12 hours so active ingredients fully absorb and pores settle.' },
    ],
  },
  {
    slug: 'lasemd',
    title: 'LaseMD Ultra',
    short: 'Non-ablative fractional resurfacing. Zero drama, all glow.',
    description:
      'LaseMD Ultra uses a thulium fiber laser to create microscopic channels in the skin, triggering renewal without damaging the surface. Treat texture, tone, sun damage and fine lines with minimal downtime.',
    image: images.treatmentLaseMD,
    href: '/lasemd',
    priceFrom: 450,
    priceUnit: 'per session',
    duration: '30–45 min',
    sessions: '3 sessions for full results',
    benefits: [
      'Improves texture, tone and fine lines',
      'Minimal downtime — typically 24–48 hours',
      'Safe for all skin types, year-round',
      'Boosts absorption of topical brighteners',
    ],
    steps: [
      { title: 'Cleanse & Numb', text: 'Skin is prepped and topical anesthetic is applied for comfort.' },
      { title: 'Fractional Passes', text: 'The Er:YAG 1410 nm handpiece creates micro-channels at adjustable density.' },
      { title: 'Infusion', text: 'Depigmenting or hydrating serums are applied to penetrate deeply through the channels.' },
      { title: 'Recovery', text: 'Cooling mask and aftercare kit support smooth healing over the next day or two.' },
    ],
    technology: {
      name: 'Thulium Fiber 1410 nm Laser',
      text: 'A water-targeting wavelength that heats dermal tissue fractionally while sparing the epidermis — delivering collagen remodeling and pigment clearance without ablative downtime.',
    },
    faq: [
      { q: 'What does recovery look like?', a: 'Expect sand-like texture and mild warmth for 24–48 hours, followed by a visible glow as skin renews.' },
      { q: 'Can LaseMD be combined with other treatments?', a: 'Yes — it pairs exceptionally well with injectables, peels and Morpheus8 in a staged plan.' },
      { q: 'Is it safe in summer?', a: 'With disciplined SPF use, yes. We adjust density for clients with higher sun exposure.' },
    ],
  },
  {
    slug: 'morpheus8',
    title: 'Morpheus8',
    short: 'Subdermal adipose remodeling. Contour and tighten.',
    description:
      'Morpheus8 combines microneedling with radiofrequency energy to remodel tissue beneath the surface of the skin — tightening laxity, smoothing scars and refining contours on face and body.',
    image: images.treatmentMorpheus,
    href: '/morpheus8',
    priceFrom: 700,
    priceUnit: 'per session',
    duration: '60–90 min',
    sessions: '2–3 sessions, 4–6 weeks apart',
    benefits: [
      'Tightens skin and reduces folds',
      'Softens acne scars and texture',
      'Body contouring for abdomen & arms',
      'Works for all skin types',
    ],
    steps: [
      { title: 'Numbing', text: 'A prescription topical anesthetic ensures comfort during the procedure.' },
      { title: 'Insulated Microneedles', text: 'Gold-tip needles penetrate up to 4mm, reaching the subdermal fat layer.' },
      { title: 'RF Delivery', text: 'Radiofrequency energy coagulates deep tissue, triggering contraction and remodeling.' },
      { title: 'Healing', text: 'Growth-factor serum and aftercare guide 2–4 days of redness toward dramatic results.' },
    ],
    technology: {
      name: 'Morpheus8 RF Microneedling Platform',
      text: 'The only FDA-cleared device combining adjustable-depth insulated microneedles with bipolar RF — treating from superficial scarring to deep tissue tightening in one platform.',
    },
    faq: [
      { q: 'How long do results last?', a: 'Collagen remodeling continues for 3–6 months after your final session. Annual touch-ups maintain contour.' },
      { q: 'Is there downtime?', a: 'Expect grid-marked redness for 24–72 hours. Most clients return to normal activities quickly with mineral makeup.' },
      { q: 'Who is not a candidate?', a: 'Pregnant clients, those with pacemakers or active skin infection should not undergo RF treatments.' },
    ],
  },
  {
    slug: 'injectables',
    title: 'Injectables',
    short: 'Neuromodulators and fillers with an artistic hand.',
    description:
      'Botox, dysport and dermal fillers administered by nurse injectors who believe in restraint. Natural movement, refreshed proportion — never frozen, never overdone.',
    image: images.treatmentInjectables,
    href: '/injectables',
    priceFrom: 12,
    priceUnit: 'per unit',
    duration: '20–45 min',
    sessions: 'Results last 3–6 months',
    benefits: [
      'Physician-supervised nurse injectors',
      'Transparent per-unit pricing',
      'Conservative, natural-first technique',
      'Complimentary 2-week refinement visit',
    ],
    steps: [
      { title: 'Assessment', text: 'Facial dynamics are mapped while you move and rest to plan precise placement.' },
      { title: 'Treatment', text: 'Ultra-fine needles deliver product with minimal discomfort; ice reduces swelling.' },
      { title: 'Refinement', text: 'A free follow-up at two weeks perfects symmetry and top-ups.' },
    ],
    technology: {
      name: 'Microdroplet & Cannula Technique',
      text: 'We combine small-dose intramuscular placement with blunt cannulas for filler, reducing bruising and preserving expressive movement.',
    },
    faq: [
      { q: 'How much does Botox cost?', a: 'We price transparently per unit with frequent member offers. Your injector quotes an exact range before treating.' },
      { q: 'Will I still look like me?', a: 'Yes. Our philosophy is preservation, not paralysis — you keep movement and lose the tired creases.' },
      { q: 'When will I see results?', a: 'Neuromodulators begin acting in 3–5 days and settle by day 14. Filler results are immediate once swelling resolves.' },
    ],
  },
  {
    slug: 'face-and-body',
    title: 'Face & Body',
    short: 'Contouring, tightening and rejuvenation beyond the face.',
    description:
      'From body RF contouring to chemical peels and skin-boosting infusions — a full menu of non-invasive treatments designed around your anatomy and goals.',
    image: images.treatmentFaceBody,
    href: '/face-and-body',
    priceFrom: 150,
    priceUnit: 'per session',
    duration: '30–90 min',
    sessions: 'Varies by protocol',
    benefits: [
      'Head-to-toe treatment menu',
      'Combination protocols for faster results',
      'Body contouring with visible inch loss',
      'Medical supervision on every plan',
    ],
    steps: [
      { title: 'Goal Mapping', text: 'We design a sequence of treatments matched to your timeline and budget.' },
      { title: 'Protocol', text: 'Peels, RF, microneedling or infusion sessions are scheduled in optimal order.' },
      { title: 'Tracking', text: 'Standardized photography lets us measure progress objectively.' },
    ],
    technology: {
      name: 'Multi-Modality Aesthetic Suite',
      text: 'One clinic, every tool: cavitation, EM muscle stimulation, cryolipolysis alternatives and RF tightening — chosen for your anatomy rather than sold as a package.',
    },
    faq: [
      { q: 'Which body areas can be treated?', a: 'Abdomen, flanks, arms, thighs, back and chest are most common; we treat face and neck with dedicated protocols.' },
      { q: 'Do combination plans work better?', a: 'Yes — pairing tissue tightening with contouring typically outperforms either alone, and we stage them efficiently.' },
    ],
  },
];

export const getTreatment = (slug: string) => treatments.find((t) => t.slug === slug);
