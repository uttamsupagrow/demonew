import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { team } from '../../data/team';
import SectionHeading from '../SectionHeading/SectionHeading';
import { staggerContainer, staggerItem } from '../../lib/motion';

/** Premium team grid — portrait zoom + overlay info reveal on hover/tap. */
export default function Team() {
  return (
    <section className="section-pad bg-bg" aria-label="Meet the team">
      <div className="container-page">
        <SectionHeading
          eyebrow="The team"
          title="Medical expertise with an artist's eye"
          lede="Physician-supervised and endlessly pedantic about symmetry, skin of color and natural-looking outcomes."
          align="center"
        />

        <motion.ul
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {team.map((m) => (
            <motion.li key={m.name} variants={staggerItem} className="group relative overflow-hidden rounded-[var(--radius-card)]" data-cursor="image">
              <img
                src={m.image}
                alt={`Portrait of ${m.name}, ${m.role}`}
                loading="lazy"
                className="aspect-[3/4] w-full object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-[1.07]"
              />
              {/* Base gradient always visible for name legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-transparent to-transparent" />
              {/* Hover overlay */}
              <div className="absolute inset-0 flex flex-col justify-end bg-espresso/0 p-6 transition-all duration-500 group-hover:bg-espresso/55">
                <p className="font-display text-2xl text-white">{m.name}</p>
                <p className="text-sm font-medium tracking-wide text-accent">{m.role}</p>
                <div className="max-h-0 overflow-hidden opacity-0 transition-all duration-500 ease-out group-hover:max-h-40 group-hover:opacity-100">
                  <p className="pt-3 text-sm leading-relaxed text-white/85">{m.bio}</p>
                  <p className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-white/70">
                    {m.credentials}
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                  </p>
                </div>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
