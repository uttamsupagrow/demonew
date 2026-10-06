import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Star, Users, ShieldCheck, Award } from 'lucide-react';
import { EASE } from '../../lib/motion';
import { usePrefersReducedMotion } from '../../hooks/useReducedMotion';

interface Stat {
  icon: typeof Star;
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  label: string;
}

const stats: Stat[] = [
  { icon: Star, value: 4.9, decimals: 1, label: 'Average rating across 2,100+ verified reviews' },
  { icon: Users, value: 18, suffix: 'k+', label: 'Happy clients treated since 2016' },
  { icon: ShieldCheck, value: 100, suffix: '%', label: 'FDA-cleared technology, physician-supervised' },
  { icon: Award, value: 35, suffix: '+', label: 'Years of combined clinical experience' },
];

/** Animated count-up that triggers once on viewport entry. */
function Counter({ value, decimals = 0, prefix = '', suffix = '' }: Omit<Stat, 'icon' | 'label'>) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (!inView || reduced) return;
    let raf = 0;
    const start = performance.now();
    const dur = 1400;
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3); // ease-out cubic
      if (ref.current) {
        ref.current.textContent = `${prefix}${(value * eased).toFixed(decimals)}${suffix}`;
      }
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, decimals, prefix, suffix, reduced]);

  // Respect reduced motion: jump straight to final value
  useEffect(() => {
    if (reduced && inView && ref.current) {
      ref.current.textContent = `${prefix}${value.toFixed(decimals)}${suffix}`;
    }
  }, [inView, reduced, value, decimals, prefix, suffix]);

  return <span ref={ref}>{`${prefix}0${decimals ? '.0' : ''}${suffix}`}</span>;
}

export default function TrustStats() {
  return (
    <section className="section-pad bg-bg" aria-label="Why clients trust VELORA">
      <div className="container-page">
        <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, ease: EASE, delay: i * 0.12 }}
              className="flex flex-col items-start gap-4 border-l border-line pl-6 first:border-l-0 first:pl-0 sm:border-l sm:pl-6"
            >
              <motion.span
                initial={{ scale: 0.6, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: EASE, delay: 0.1 + i * 0.12 }}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-cream text-accent-deep"
              >
                <s.icon className="h-5 w-5" aria-hidden />
              </motion.span>
              <p className="font-display text-5xl font-medium leading-none text-ink md:text-6xl">
                <Counter value={s.value} decimals={s.decimals} prefix={s.prefix} suffix={s.suffix} />
              </p>
              <p className="text-sm leading-relaxed text-muted">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
