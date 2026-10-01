import Hero from '../components/Hero/Hero';
import TrustStats from '../components/TrustStats/TrustStats';
import TreatmentCards from '../components/TreatmentCards/TreatmentCards';
import Benefits from '../components/Benefits/Benefits';
import FeatureSection from '../components/FeatureSection/FeatureSection';
import { CaseStudies } from '../components/BeforeAfter/BeforeAfter';
import Testimonials from '../components/Testimonials/Testimonials';
import Team from '../components/Team/Team';
import Locations from '../components/Locations/Locations';
import Offers from '../components/Offers/Offers';
import Policies from '../components/Policies/Policies';
import FAQ from '../components/FAQ/FAQ';
import PageTransition from '../components/PageTransition/PageTransition';
import CTAButton from '../components/Buttons/CTAButton';
import Reveal from '../components/Reveal/Reveal';
import { generalFaq } from '../data/faq';
import { images } from '../lib/images';
import { useBooking } from '../hooks/useBookingModal';
import { usePageMeta } from '../lib/seo';

export default function Home() {
  const { open } = useBooking();
  usePageMeta({
    title: 'VELORA — Laser & Aesthetic Medicine',
    description:
      'Premium laser hair removal, LaseMD Ultra, Morpheus8, injectables and facials across three Chicago-area studios. Physician-supervised, FDA-cleared technology, transparent pricing.',
    path: '/',
  });

  return (
    <PageTransition>
      <Hero />
      <TrustStats />
      <TreatmentCards />
      <Benefits />

      {/* Editorial image/text rows */}
      <div className="bg-bg">
        <FeatureSection
          feature={{
            id: 'philosophy',
            eyebrow: 'Our philosophy',
            title: 'Laser light, handled like a craft',
            body: 'Every pulse at VELORA is calibrated to your skin type, your goals and the physics of the device — never a factory setting. Our specialists train hundreds of hours per platform before they ever treat a client.',
            points: [
              'Fitzpatrick I–VI protocols on medical-grade diode lasers',
              'Patch tests and strand mapping before every first session',
              'Cooling handpieces and comfort-first pacing',
            ],
            image: images.editorialClinic,
            imageAlt: 'VELORA specialist performing a laser treatment',
            cta: { label: 'See laser hair removal', to: '/laser-hair-removal' },
          }}
        />
        <FeatureSection
          feature={{
            reverse: true,
            eyebrow: 'The studio',
            title: 'Clinical precision, hotel-grade calm',
            body: 'Designed with an interior architect, our studios feel nothing like a clinic lobby. Warm oak, linen, indirect light and sound-proofed suites — because anxiety is the enemy of good skin.',
            image: images.interior,
            imageAlt: 'Calm, minimal VELORA treatment studio interior',
            cta: { label: 'Book a tour or consult', onClick: () => open('Consultation') },
          }}
        />
      </div>

      <CaseStudies />
      <Testimonials />
      <Team />

      {/* Membership teaser band */}
      <section className="relative overflow-hidden bg-espresso py-20 text-white md:py-28" aria-label="Membership">
        <div className="container-page relative grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow mb-4 !text-accent">VELORA Circle</p>
            <h2 className="display-lg text-white">Membership that makes consistency affordable</h2>
            <p className="lede mt-5 !text-white/65">
              Great skin is a habit, not an event. From $79/month, the Circle bundles facials, discounts and priority
              booking into one quiet monthly ritual.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <CTAButton to="/memberships" variant="accent">Explore memberships</CTAButton>
              <CTAButton onClick={() => open('Membership')} variant="ghostLight">Ask about the Circle</CTAButton>
            </div>
          </Reveal>
          <Reveal className="relative">
            <img src={images.membership} alt="Relaxed client during a VELORA facial" loading="lazy" data-cursor="image" className="aspect-[5/4] w-full rounded-[var(--radius-card)] object-cover" />
            <span className="absolute -left-4 bottom-8 hidden rotate-[-4deg] rounded-xl bg-white px-5 py-3 font-display text-lg text-espresso shadow-xl sm:block">
              Core · Plus · Elite
            </span>
          </Reveal>
        </div>
      </section>

      <Locations />
      <Offers />
      <Policies />
      <FAQ items={generalFaq} lede="Still curious? Our coordinators answer the phone like humans — reach us anytime." />

      {/* Final CTA band */}
      <section className="section-pad bg-bg text-center" aria-label="Book now">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow mb-4">Begin</p>
            <h2 className="display-xl mx-auto max-w-4xl text-ink">Your skin, in better hands</h2>
            <p className="lede mx-auto mt-6">Free consultations, six-week results windows, and a team that answers for both.</p>
            <div className="mt-10 flex justify-center gap-4">
              <CTAButton size="lg" onClick={() => open()}>Book Now</CTAButton>
              <CTAButton size="lg" variant="outline" to="/contact">Contact us</CTAButton>
            </div>
          </Reveal>
        </div>
      </section>
    </PageTransition>
  );
}
