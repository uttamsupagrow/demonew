import { motion, useScroll, useTransform } from 'framer-motion';
import { Star } from 'lucide-react';
import CTAButton from '../Buttons/CTAButton';
import { images } from '../../lib/images';
import { EASE } from '../../lib/motion';
import { useBooking } from '../../hooks/useBookingModal';

/** Cinematic hero: masked image reveal → headline clip-reveal → copy → CTAs → trust row. ~1.2s sequence. */
export default function Hero() {
  const { open } = useBooking();
  const { scrollY } = useScroll();
  const imgY = useTransform(scrollY, [0, 700], [0, 120]); // parallax (desktop-weighted, cheap transform)
  const contentY = useTransform(scrollY, [0, 700], [0, -40]);
  const fade = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-espresso" aria-label="Welcome to VELORA">
      {/* Background image with mask reveal + parallax */}
      <motion.div
        className="absolute inset-0"
        initial={{ clipPath: 'inset(0% 0% 100% 0%)' }}
        animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
        transition={{ duration: 1.1, ease: EASE, delay: 0.15 }}
        style={{ y: imgY }}
        data-cursor="image"
      >
        <img
          src={images.heroMain}
          alt="Velora clinic interior — soft light treatment room"
          fetchPriority="high"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-espresso/60 via-espresso/25 to-espresso/85" />
      </motion.div>

      {/* Decorative ring */}
      <motion.div
        aria-hidden
        className="absolute right-[8%] top-[18%] hidden h-40 w-40 rounded-full border border-white/20 lg:block"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: EASE, delay: 0.9 }}
      />

      <motion.div className="container-page relative z-10 pb-16 pt-36 md:pb-24" style={{ y: contentY }}>
        {/* Brand line */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.35 }}
          className="eyebrow mb-6 !text-accent"
        >
          Laser & Aesthetic Medicine — Chicago
        </motion.p>

        {/* Headline with per-line clip reveal */}
        <h1 className="display-xl max-w-4xl text-white">
          {['Be your', 'own muse.'].map((line, i) => (
            <span key={line} className="block overflow-hidden pb-1">
              <motion.span
                className="block italic-[0.02em]"
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.85, ease: EASE, delay: 0.45 + i * 0.12 }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* Supporting copy */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.85 }}
          className="mt-6 max-w-xl text-base leading-relaxed text-white/75 md:text-lg"
        >
          Physician-led laser hair removal, resurfacing and injectables — delivered with
          editorial calm, honest pricing and technology you can trust.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 1.0 }}
          className="mt-9 flex flex-wrap items-center gap-4"
        >
          <CTAButton variant="accent" size="lg" onClick={() => open()}>
            Book Now
          </CTAButton>
          <CTAButton variant="ghostLight" size="lg" to="/#treatments" arrow={false}>
            Explore Treatments
          </CTAButton>
        </motion.div>

        {/* Trust indicators stagger in */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.25 }}
          style={{ opacity: fade }}
          className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-white/15 pt-6"
        >
          {[
            { icon: true, label: '4.9 · 2,100+ five-star reviews' },
            { label: 'FDA-cleared technology' },
            { label: 'Physician-supervised care' },
          ].map((t, i) => (
            <motion.div
              key={t.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE, delay: 1.3 + i * 0.12 }}
              className="flex items-center gap-2 text-sm text-white/70"
            >
              {t.icon && (
                <span className="flex text-accent" aria-hidden>
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </span>
              )}
              {t.label}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        aria-hidden
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 md:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
      >
        <motion.div
          className="h-12 w-px bg-gradient-to-b from-transparent via-white/60 to-transparent"
          animate={{ scaleY: [0.4, 1, 0.4], originY: 0 }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  );
}
