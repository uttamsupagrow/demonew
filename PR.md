# feat: VELORA — Premium Laser & Medical Aesthetics Website

## Summary
Complete production-ready React + TypeScript + Vite site recreating the UX/layout/animation language of a high-end laser spa (reference: muselaserspa.com) with **original code and original content** for the fictional brand **VELORA**. 52 files, ~3,970 insertions.

## Stack
React 18 · Vite 6 · TypeScript · Tailwind CSS v4 · Framer Motion 12 · React Router 6 · lucide-react

## What's included

### Pages / Routes
| Route | Page |
|---|---|
| `/` | Home (hero, trust stats, treatments, benefits, before/after, case studies, team, locations, offers, testimonials, FAQ, policies) |
| `/laser-hair-removal` | Treatment detail (data-driven) |
| `/facials` | Treatment detail |
| `/lasemd` | Treatment detail |
| `/morpheus8` | Treatment detail |
| `/injectables` | Treatment detail |
| `/face-and-body` | Treatment detail |
| `/memberships` | Core / Plus / Elite tiers + comparison table |
| `/contact` | Validated contact form + locations + quick booking |

Every treatment page renders from one reusable `TreatmentDetail` template driven by `src/data/treatments.ts`: hero → intro → benefits → how-it-works → technology → pricing → before/after → testimonials → FAQ → CTA. Unique SEO metadata per route via `usePageMeta`.

### Components (23+)
Navbar (transparent→solid on scroll, active states), MobileMenu (fullscreen, staggered items, scroll lock), Hero (cinematic 700–1200 ms load sequence + parallax), TrustStats (viewport-triggered animated counters), TreatmentCards (editorial grid, hover zoom/overlay/arrow), Benefits (staggered 01–05 numerals), FeatureSection (alternating image/text, clip-path mask reveals, parallax), BeforeAfter (draggable divider — mouse/touch/keyboard accessible), CaseStudies, Testimonials (carousel: drag/swipe, autoplay pause-on-hover, arrows + dots), Team (hover overlays), Locations, Offers, Policies, FAQ (height-animated accordion, single-open, rotating plus icon), Footer (editorial multi-column, newsletter), BookingModal (backdrop fade + scale/slide, staggered fields, full validation, mocked success state that never claims a real booking), Cursor (desktop-only, expands over interactive elements), PageTransition (AnimatePresence mode="wait" + scroll reset), Reveal (once-in-view utility), CTAButton (shine sweep, arrow micro-interaction, press scale).

### Animation system (`src/lib/motion.ts`)
Shared easing curve `[0.22, 1, 0.36, 1]`; variants: fadeUp / fadeIn / scaleIn / slideIn / revealMask (clip-path) / stagger containers / page enter-exit / modal. All animations use `transform`/`opacity` only (GPU-friendly), trigger once via viewport detection, and are neutralized under `prefers-reduced-motion: reduce` (CSS global override + `useReducedMotion` hook).

### Quality gates
- ✅ `tsc -b` — 0 errors
- ✅ `vite build` — clean, code-split chunks (motion/router lazy split, manualChunks in vite.config)
- ✅ All 9 routes smoke-tested at 200; no console errors
- ✅ Accessibility: semantic HTML, heading hierarchy, skip link, focus states, ARIA on carousel/accordion/modal/forms, keyboard-operable before/after slider
- ✅ Responsive: intentional layouts at 1440/1280/1024/768/480/390/360; no horizontal overflow
- ✅ SEO: title/description/OG/canonical per page + JSON-LD `MedicalClinic` in index.html
- ✅ Images centralized in `src/lib/images.ts` (single place to swap); lazy loading below the fold

## How to run
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build
```

## Notes / follow-ups
- Placeholder photos, addresses and phone numbers must be replaced before launch (all centralized in `src/lib/images.ts` and `src/data/locations.ts`).
- Booking/contact submissions are intentionally mocked — wire `VITE_BOOKING_API_URL` when a backend exists. No secrets required today.
