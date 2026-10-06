import { motion } from 'framer-motion';
import { EASE, staggerContainer, staggerItem, fadeUp } from '../../lib/motion';

const benefits = [
  { num: '01', title: 'Premium Technology', text: 'Candela diode lasers, LaseMD Ultra thulium resurfacing and Morpheus8 RF — the platforms leading aesthetic medicine, maintained to clinical standard.' },
  { num: '02', title: 'Accessible Pricing', text: 'Transparent per-session pricing published on every page. Package discounts, memberships and interest-free plans mean excellence should not require a loan.' },
  { num: '03', title: 'Exceptional Service', text: 'One provider, start to finish. No rotating staff, no re-explaining your history — just a team that remembers you between visits.' },
  { num: '04', title: 'Easy Payment', text: 'CareCredit, Apple Pay, card splits and in-house installments. Checkout takes seconds; plans stretch over months.' },
  { num: '05', title: 'Flexible Scheduling', text: 'Late-evening and weekend appointments across three studios, free rescheduling up to 6 hours before, and membership priority windows.' },
];

/** Numbered editorial benefits with large display numerals and staggered scroll reveals. */
export default function Benefits() {
  return (
    <section id="about" className="section-pad bg-cream/60" aria-label="Why VELORA">
      <div className="container-page">
        <motion.div variants={staggerContainer(0.1)} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }}>
          <motion.p variants={fadeUp} className="eyebrow mb-4">
            The VELORA difference
          </motion.p>
          <motion.h2 variants={fadeUp} className="display-lg max-w-3xl text-ink">
            Five reasons clients keep their appointment cards full
          </motion.h2>

          <ol className="mt-16 divide-y divide-line border-y border-line">
            {benefits.map((b) => (
              <motion.li
                key={b.num}
                variants={staggerItem}
                className="group grid gap-3 py-8 transition-colors duration-500 hover:bg-white/50 sm:grid-cols-[7rem_1fr] sm:gap-8 md:py-10"
              >
                <span className="font-display text-5xl font-medium text-accent/50 transition-all duration-500 group-hover:text-accent-deep md:text-6xl" aria-hidden>
                  {b.num}
                </span>
                <div className="max-w-2xl">
                  <h3 className="font-display text-[1.7rem] text-ink">{b.title}</h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-soft">{b.text}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </motion.div>
      </div>
    </section>
  );
}

void EASE;
