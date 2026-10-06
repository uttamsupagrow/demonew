import { motion } from 'framer-motion';
import { ShieldCheck, CreditCard, CalendarClock, HeartHandshake } from 'lucide-react';
import { staggerContainer, staggerItem } from '../../lib/motion';

const policies = [
  { icon: ShieldCheck, title: 'Consult-first promise', text: 'Every protocol begins with an honest assessment. If we do not think a treatment will serve you, we will say so and recommend what will.' },
  { icon: CreditCard, title: 'Interest-free plans', text: 'Packages of six or more can be split into monthly payments at zero interest — in-house, no third-party credit checks required.' },
  { icon: CalendarClock, title: '6-hour rescheduling', text: 'Life happens. Reschedule free up to six hours before your appointment; members reschedule anytime.' },
  { icon: HeartHandshake, title: 'Results guarantee', text: 'If a full series does not deliver the agreed outcome, we continue care at no charge until it does.' },
];

/** Compact trust/policy strip with staggered reveal. */
export default function Policies() {
  return (
    <section className="border-y border-line bg-bg py-14" aria-label="Our promises">
      <div className="container-page">
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {policies.map((p) => (
            <motion.div key={p.title} variants={staggerItem} className="flex gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-cream text-accent-deep">
                <p.icon className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <h3 className="text-sm font-bold tracking-wide text-ink">{p.title}</h3>
                <p className="mt-1 text-[0.85rem] leading-relaxed text-muted">{p.text}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
