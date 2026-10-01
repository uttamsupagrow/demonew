import { Check, X } from 'lucide-react';
import PageTransition from '../components/PageTransition/PageTransition';
import SectionHeading from '../components/SectionHeading/SectionHeading';
import CTAButton from '../components/Buttons/CTAButton';
import Reveal, { RevealGroup } from '../components/Reveal/Reveal';
import FAQ from '../components/FAQ/FAQ';
import Testimonials from '../components/Testimonials/Testimonials';
import { membershipTiers, membershipComparison } from '../data/memberships';
import { generalFaq } from '../data/faq';
import { images } from '../lib/images';
import { usePageMeta } from '../lib/seo';
import { useBooking } from '../hooks/useBookingModal';

function Cell({ value }: { value: string | boolean }) {
  if (typeof value === 'boolean') {
    return value ? (
      <span className="inline-flex items-center justify-center" aria-label="Included">
        <Check aria-hidden className="h-4.5 w-4.5 text-accent-deep" strokeWidth={2.5} />
      </span>
    ) : (
      <span className="inline-flex items-center justify-center" aria-label="Not included">
        <X aria-hidden className="h-4 w-4 text-muted/50" />
      </span>
    );
  }
  return <span className="text-sm text-ink-soft">{value}</span>;
}

export default function Memberships() {
  const { open } = useBooking();

  usePageMeta({
    title: 'Memberships',
    description:
      'VELORA membership plans — Core, Plus and Elite. Monthly facials, treatment discounts, priority booking and exclusive credits at our laser & aesthetics studios.',
    path: '/memberships',
  });

  return (
    <PageTransition>
      {/* ---------- HERO ---------- */}
      <section className="relative flex min-h-[62vh] items-end overflow-hidden pb-16 pt-40 md:pb-24">
        <div className="absolute inset-0" aria-hidden>
          <img
            src={images.membership}
            alt=""
            className="h-full w-full object-cover"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-espresso/85 via-espresso/45 to-espresso/25" />
        </div>
        <div className="container-page relative z-10">
          <SectionHeading
            light
            eyebrow="Membership"
            title="Beauty, on a rhythm."
            lede="A monthly plan built around your skin calendar — consistent results, member pricing, and first access to new technology."
          />
        </div>
      </section>

      {/* ---------- TIERS ---------- */}
      <section className="section-pad" aria-labelledby="tiers-heading">
        <div className="container-page">
          <h2 id="tiers-heading" className="sr-only">
            Membership tiers
          </h2>
          <RevealGroup className="grid gap-6 md:grid-cols-3 md:gap-8" stagger={0.12}>
            {membershipTiers.map((tier) => (
              <article
                key={tier.name}
                className={`relative flex flex-col rounded-card border p-8 transition-shadow duration-500 hover:shadow-lg md:p-10 ${
                  tier.popular
                    ? 'border-transparent bg-espresso text-white shadow-xl md:-translate-y-4'
                    : 'border-line bg-white/70 text-ink'
                }`}
              >
                {tier.popular && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-accent px-4 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-white shadow-md">
                    Most popular
                  </span>
                )}
                <p
                  className={`eyebrow ${tier.popular ? 'text-accent' : ''}`}
                >
                  {tier.name}
                </p>
                <p className={`mt-2 text-sm ${tier.popular ? 'text-white/70' : 'text-muted'}`}>
                  {tier.tagline}
                </p>
                <p className="mt-6 flex items-baseline gap-1.5">
                  <span className="font-display text-6xl leading-none">${tier.price}</span>
                  <span className={`text-sm ${tier.popular ? 'text-white/60' : 'text-muted'}`}>
                    {tier.period}
                  </span>
                </p>
                <ul className={`mt-8 flex-1 space-y-3.5 border-t pt-8 ${tier.popular ? 'border-white/15' : 'border-line'}`}>
                  {tier.perks.map((perk) => (
                    <li key={perk} className="flex items-start gap-3 text-sm leading-relaxed">
                      <Check
                        aria-hidden
                        strokeWidth={2.5}
                        className={`mt-0.5 h-4 w-4 shrink-0 ${tier.popular ? 'text-accent' : 'text-accent-deep'}`}
                      />
                      <span className={tier.popular ? 'text-white/85' : 'text-ink-soft'}>{perk}</span>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => open(`${tier.name} Membership`)}
                  aria-label={`Join the ${tier.name} membership`}
                  className={`shine mt-10 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium tracking-wide transition-all duration-300 active:scale-[0.97] ${
                    tier.popular
                      ? 'bg-accent text-white hover:bg-accent-deep'
                      : 'border border-espresso/25 text-ink hover:bg-espresso hover:text-white'
                  }`}
                >
                  Join {tier.name}
                </button>
              </article>
            ))}
          </RevealGroup>

          <Reveal className="mx-auto mt-10 max-w-2xl text-center text-sm leading-relaxed text-muted">
            All plans can be paused once per year, cancel anytime with 30 days notice, and are
            transferable between VELORA locations. Credits never expire while your membership is active.
          </Reveal>
        </div>
      </section>

      {/* ---------- COMPARISON TABLE ---------- */}
      <section className="section-pad bg-bg-alt" aria-labelledby="compare-heading">
        <div className="container-page">
          <SectionHeading
            align="center"
            eyebrow="Compare plans"
            title="What's included, side by side"
          />
          <h2 id="compare-heading" className="sr-only">
            Membership feature comparison table
          </h2>
          <Reveal className="mt-14 overflow-hidden rounded-card border border-line bg-white">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse text-left">
                <caption className="sr-only">
                  Comparison of features across the Core, Plus and Elite membership tiers
                </caption>
                <thead>
                  <tr className="border-b border-line bg-cream/60">
                    <th scope="col" className="px-6 py-5 text-sm font-semibold text-ink">
                      Feature
                    </th>
                    {membershipTiers.map((t) => (
                      <th
                        key={t.name}
                        scope="col"
                        className={`px-6 py-5 text-center text-sm font-semibold ${
                          t.popular ? 'bg-espresso text-white' : 'text-ink'
                        }`}
                      >
                        {t.name}
                        <span className={`block text-xs font-normal ${t.popular ? 'text-accent' : 'text-muted'}`}>
                          ${t.price}/mo
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {membershipComparison.map((row, i) => (
                    <tr key={row.feature} className={i % 2 ? 'bg-bg/60' : ''}>
                      <th scope="row" className="px-6 py-4 text-sm font-medium text-ink-soft">
                        {row.feature}
                      </th>
                      <td className="px-6 py-4 text-center">
                        <Cell value={row.core} />
                      </td>
                      <td className="bg-espresso/[0.04] px-6 py-4 text-center">
                        <Cell value={row.plus} />
                      </td>
                      <td className="px-6 py-4 text-center">
                        <Cell value={row.elite} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- TESTIMONIALS + FAQ + CTA ---------- */}
      <Testimonials />
      <FAQ
        eyebrow="Membership questions"
        title="Before you join"
        items={generalFaq.slice(0, 4)}
      />
      <section className="section-pad bg-espresso text-white">
        <div className="container-page flex flex-col items-center gap-8 text-center">
          <Reveal>
            <p className="eyebrow text-accent">Ready when you are</p>
            <h2 className="display-lg mt-4 text-white">Start your membership today</h2>
            <p className="mx-auto mt-4 max-w-xl text-white/70">
              Book a consultation and we'll match you to the right plan in under fifteen minutes.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <CTAButton size="lg" variant="accent" onClick={() => open('Membership')} arrow>
              Book a membership consult
            </CTAButton>
          </Reveal>
        </div>
      </section>
    </PageTransition>
  );
}
