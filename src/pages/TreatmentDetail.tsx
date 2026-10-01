import { useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Check, Clock, Layers, Wallet } from 'lucide-react';
import PageTransition from '../components/PageTransition/PageTransition';
import SectionHeading from '../components/SectionHeading/SectionHeading';
import CTAButton from '../components/Buttons/CTAButton';
import Reveal, { RevealGroup } from '../components/Reveal/Reveal';
import BeforeAfter from '../components/BeforeAfter/BeforeAfter';
import Testimonials from '../components/Testimonials/Testimonials';
import FAQ from '../components/FAQ/FAQ';
import Offers from '../components/Offers/Offers';
import { getTreatment } from '../data/treatments';
import { images } from '../lib/images';
import { EASE, fadeUp, staggerContainer, staggerItem } from '../lib/motion';
import { useBooking } from '../hooks/useBookingModal';
import { usePageMeta } from '../lib/seo';

/** Shared treatment hero with masked image reveal + parallax. */
function TreatmentHero({ title, short, image }: { title: string; short: string; image: string }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 140]);

  return (
    <section ref={ref} className="relative flex min-h-[72svh] items-end overflow-hidden bg-espresso" aria-label={`${title} intro`}>
      <motion.div className="absolute inset-0" style={{ y }} data-cursor="image">
        <motion.img
          src={image}
          alt={title}
          fetchPriority="high"
          className="h-full w-full object-cover"
          initial={{ clipPath: 'inset(0% 0% 100% 0%)', scale: 1.06 }}
          animate={{ clipPath: 'inset(0% 0% 0% 0%)', scale: 1 }}
          transition={{ duration: 1.15, ease: EASE }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-espresso/55 via-espresso/30 to-espresso/90" />
      </motion.div>

      <div className="container-page relative z-10 pb-16 pt-36 md:pb-24">
        <motion.nav
          aria-label="Breadcrumb"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mb-5 text-xs uppercase tracking-[0.2em] text-white/60"
        >
          <Link to="/" className="transition-colors hover:text-white">Home</Link> <span aria-hidden> / </span>{' '}
          <span className="text-white">{title}</span>
        </motion.nav>
        <motion.h1
          initial={{ opacity: 0, y: 44 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.35 }}
          className="display-xl max-w-4xl text-white"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.55 }}
          className="lede mt-5 !text-white/75"
        >
          {short}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.75 }}
          className="mt-8 flex flex-wrap gap-3"
        >
          <BookTreatmentButton title={title} />
          <CTAButton to="/#results" variant="ghostLight">See results</CTAButton>
        </motion.div>
      </div>
    </section>
  );
}

function BookTreatmentButton({ title }: { title: string }) {
  const { open } = useBooking();
  return <CTAButton size="lg" variant="accent" onClick={() => open(title)}>Book Now</CTAButton>;
}

/** Data-driven treatment detail page: hero → intro → benefits → how it works → technology → pricing → before/after → testimonials → FAQ → CTA. */
export default function TreatmentDetail() {
  const { slug } = useParams();
  const treatment = getTreatment(slug ?? '');
  const { open } = useBooking();

  usePageMeta({
    title: treatment ? `${treatment.title}` : 'Treatment',
    description: treatment?.description ?? 'VELORA laser and aesthetic medicine treatments.',
    path: `/${slug ?? ''}`,
  });

  useEffect(() => {
    if (!treatment) window.location.assign('/');
  }, [treatment]);

  if (!treatment) return null;

  const meta = [
    { icon: Wallet, label: `From $${treatment.priceFrom}`, sub: treatment.priceUnit },
    { icon: Clock, label: treatment.duration, sub: 'per session' },
    { icon: Layers, label: treatment.sessions, sub: 'protocol' },
  ];

  return (
    <PageTransition>
      <TreatmentHero title={treatment.title} short={treatment.short} image={treatment.image} />

      {/* Intro + quick facts */}
      <section className="section-pad bg-bg" aria-label="Overview">
        <div className="container-page grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-20">
          <Reveal>
            <p className="eyebrow mb-4">Overview</p>
            <h2 className="display-lg text-ink">What it is — and who it is for</h2>
            <p className="mt-6 max-w-2xl text-[1.05rem] leading-relaxed text-ink-soft">{treatment.description}</p>
          </Reveal>
          <RevealGroup className="grid content-start gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {meta.map((m) => (
              <motion.div key={m.label} variants={staggerItem} className="surface flex items-center gap-4 p-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-cream text-accent-deep">
                  <m.icon className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <p className="font-display text-xl leading-tight text-ink">{m.label}</p>
                  <p className="text-xs uppercase tracking-[0.14em] text-muted">{m.sub}</p>
                </div>
              </motion.div>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-pad bg-bg-alt" aria-label="Benefits">
        <div className="container-page">
          <SectionHeading eyebrow="Benefits" title={`Why clients choose ${treatment.title.toLowerCase()}`} />
          <motion.ul
            variants={staggerContainer(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            className="mt-12 grid gap-x-10 gap-y-5 sm:grid-cols-2"
          >
            {treatment.benefits.map((b) => (
              <motion.li key={b} variants={fadeUp} className="flex items-start gap-3.5 border-b border-line pb-5 text-[0.98rem] text-ink-soft">
                <Check className="mt-1 h-4 w-4 shrink-0 text-accent-deep" aria-hidden />
                {b}
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      {/* How it works */}
      <section className="section-pad bg-espresso text-white" aria-label="How it works">
        <div className="container-page">
          <SectionHeading eyebrow="How it works" title="Your visit, step by step" light lede="No mystery, no rush — a clear sequence from consultation to aftercare." />
          <ol className="mt-14 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
            {treatment.steps.map((s, i) => (
              <motion.li
                key={s.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, ease: EASE, delay: i * 0.12 }}
                className="relative rounded-[var(--radius-card)] border border-white/12 bg-white/[0.04] p-7 backdrop-blur-sm"
              >
                <span className="font-display text-5xl text-accent/70" aria-hidden>{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-4 font-display text-2xl text-white">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/65">{s.text}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* Technology */}
      <section className="section-pad bg-bg" aria-label="Technology">
        <div className="container-page">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <img
                src={images.technology}
                alt={`${treatment.technology.name} device`}
                loading="lazy"
                data-cursor="image"
                className="aspect-[5/4] w-full rounded-[var(--radius-card)] object-cover"
              />
            </Reveal>
            <Reveal variant={fadeUp}>
              <p className="eyebrow mb-4">The technology</p>
              <h2 className="display-lg text-ink">{treatment.technology.name}</h2>
              <p className="lede mt-5">{treatment.technology.text}</p>
              <div className="mt-8">
                <CTAButton onClick={() => open(treatment.title)}>Book a free consult</CTAButton>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Pricing + offers */}
      <section className="border-y border-line bg-cream/60 py-14" aria-label="Pricing">
        <div className="container-page flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <p className="eyebrow mb-2">Transparent pricing</p>
            <p className="font-display text-4xl text-ink md:text-5xl">
              From <span className="text-accent-deep">${treatment.priceFrom}</span>{' '}
              <span className="text-2xl text-muted md:text-3xl">{treatment.priceUnit}</span>
            </p>
            <p className="mt-2 text-sm text-muted">Packages of 6+ qualify for interest-free monthly plans.</p>
          </div>
          <CTAButton size="lg" onClick={() => open(treatment.title)}>Book Now</CTAButton>
        </div>
      </section>
      <Offers />

      {/* Before / After */}
      <section className="section-pad bg-bg-alt" aria-label="Before and after results">
        <div className="container-page">
          <SectionHeading eyebrow="Results" title="Drag through the difference" align="center" lede="Illustrative captures pending real client-consent photography." />
          <div className="mx-auto mt-12 max-w-3xl">
            <BeforeAfter before={images.before02} after={images.after02} altBefore={`${treatment.title} — before`} altAfter={`${treatment.title} — after`} />
          </div>
        </div>
      </section>

      <Testimonials />
      <FAQ items={treatment.faq} title={`${treatment.title} questions`} eyebrow="FAQ" />

      {/* Final CTA */}
      <section className="section-pad bg-espresso text-center text-white" aria-label="Book now">
        <div className="container-page">
          <Reveal>
            <h2 className="display-xl mx-auto max-w-3xl text-white">Ready when you are</h2>
            <p className="lede mx-auto mt-6 !text-white/65">Free consultations at all three studios. Twenty minutes, honest answers, zero pressure.</p>
            <div className="mt-10 flex justify-center">
              <CTAButton size="lg" variant="accent" onClick={() => open(treatment.title)}>Book Now</CTAButton>
            </div>
          </Reveal>
        </div>
      </section>
    </PageTransition>
  );
}
