import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import CTAButton from '../Buttons/CTAButton';
import { fadeUp, slideFromLeft, slideFromRight, staggerContainer, staggerItem, tBase } from '../../lib/motion';

interface Feature {
  eyebrow: string;
  title: string;
  body: string;
  points?: string[];
  image: string;
  imageAlt: string;
  reverse?: boolean;
  cta?: { label: string; to?: string; href?: string; onClick?: () => void };
  id?: string;
}

const imgReveal: Variants = {
  hidden: { clipPath: 'inset(0% 0% 0% 100%)' },
  show: { clipPath: 'inset(0% 0% 0% 0%)', transition: { duration: 1.05, ease: [0.22, 1, 0.36, 1] } },
};

/** Alternating editorial image/text rows with independent reveals and subtle parallax on the image. */
export default function FeatureSection({ feature }: { feature: Feature }) {
  const { eyebrow, title, body, points, image, imageAlt, reverse, cta, id } = feature;

  return (
    <section id={id} className="section-pad" aria-label={title}>
      <div className="container-page">
        <div className={`grid items-center gap-12 lg:grid-cols-2 lg:gap-20 ${reverse ? 'lg:[direction:rtl]' : ''}`}>
          {/* Image column */}
          <motion.div
            className="[direction:ltr] relative overflow-hidden rounded-[var(--radius-card)]"
            variants={imgReveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-100px' }}
            style={{ willChange: 'clip-path' }}
            data-cursor="image"
          >
            <motion.img
              src={image}
              alt={imageAlt}
              loading="lazy"
              className="aspect-[4/5] w-full object-cover sm:aspect-[5/4] lg:aspect-[4/5]"
              initial={{ scale: 1.08 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={tBase}
            />
            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
          </motion.div>

          {/* Text column */}
          <motion.div
            className="[direction:ltr] max-w-xl"
            variants={reverse ? slideFromLeft : slideFromRight}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
          >
            <motion.p variants={fadeUp} className="eyebrow mb-4">
              {eyebrow}
            </motion.p>
            <motion.h2 variants={fadeUp} className="display-lg text-ink">
              {title}
            </motion.h2>
            <motion.p variants={fadeUp} className="lede mt-5">
              {body}
            </motion.p>

            {points && (
              <motion.ul
                variants={staggerContainer(0.08)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="mt-7 space-y-3"
              >
                {points.map((p) => (
                  <motion.li key={p} variants={staggerItem} className="flex items-start gap-3 text-[0.95rem] text-ink-soft">
                    <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {p}
                  </motion.li>
                ))}
              </motion.ul>
            )}

            {cta && (
              <motion.div variants={fadeUp} className="mt-9">
                <CTAButton to={cta.to} href={cta.href} onClick={cta.onClick} variant="outline">
                  {cta.label}
                </CTAButton>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
