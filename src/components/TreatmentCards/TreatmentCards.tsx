import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { treatments } from '../../data/treatments';
import SectionHeading from '../SectionHeading/SectionHeading';
import { staggerContainer, staggerItem, revealMask } from '../../lib/motion';
import { motion } from 'framer-motion';

/** Editorial treatment grid — large image cards with hover zoom, overlay shift and arrow micro-interaction. */
export default function TreatmentCards() {
  return (
    <section id="treatments" className="section-pad bg-bg-alt" aria-label="Our treatments">
      <div className="container-page">
        <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Treatments"
            title="Everything your skin has been asking for"
            lede="Six signature protocols, one philosophy: honest expectations, medical-grade technology and results you can photograph."
          />
        </div>

        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {treatments.map((t, i) => (
            <motion.article key={t.slug} variants={i % 3 === 1 ? revealMask : staggerItem} className="group">
              <Link
                to={t.href}
                className="surface relative flex h-full flex-col overflow-hidden transition-shadow duration-500 hover:shadow-[0_18px_50px_-20px_rgba(28,26,23,0.25)]"
                aria-label={`${t.title} — view treatment`}
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden" data-cursor="image">
                  <img
                    src={t.image}
                    alt={t.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-espresso/70 via-espresso/10 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
                  <span className="absolute left-4 top-4 rounded-full bg-white/85 px-3 py-1 text-xs font-semibold tracking-wide text-espresso backdrop-blur-sm">
                    From ${t.priceFrom}
                  </span>
                  <h3 className="absolute bottom-4 left-5 right-5 font-display text-[1.7rem] leading-tight text-white transition-transform duration-500 group-hover:-translate-y-1">
                    {t.title}
                  </h3>
                </div>

                {/* Body */}
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-sm leading-relaxed text-ink-soft transition-transform duration-500 group-hover:translate-x-0.5">
                    {t.short}
                  </p>
                  <span className="mt-5 flex items-center gap-2 text-sm font-semibold tracking-wide text-accent-deep">
                    Explore treatment
                    <ArrowUpRight
                      aria-hidden
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                    />
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
