import type { ReactNode } from 'react';
import { motion, type Variants } from 'framer-motion';
import { fadeUp, staggerContainer, tBase, viewportOnce } from '../../lib/motion';

interface RevealProps {
  children: ReactNode;
  className?: string;
  variant?: Variants;
  as?: 'div' | 'section' | 'li' | 'article' | 'span';
  delay?: number;
  once?: boolean;
}

/** Generic scroll-reveal wrapper — one-shot viewport animation. */
export default function Reveal({ children, className, variant = fadeUp, as = 'div', delay, once = true }: RevealProps) {
  const Cmp = motion[as];
  const v: Variants =
    delay != null
      ? { hidden: variant.hidden, show: { ...(variant.show as object), transition: { ...(tBase as object), delay } } }
      : variant;
  return (
    <Cmp
      className={className}
      variants={v}
      initial="hidden"
      whileInView="show"
      viewport={{ ...(once ? viewportOnce : {}), amount: 0.2 }}
    >
      {children}
    </Cmp>
  );
}

/** Staggered list container — pair with Reveal.Item style children using staggerItem. */
export function RevealGroup({ children, className, stagger = 0.09, as = 'div' }: { children: ReactNode; className?: string; stagger?: number; as?: 'div' | 'ul' | 'section' }) {
  const Cmp = motion[as];
  return (
    <Cmp className={className} variants={staggerContainer(stagger)} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px', amount: 0.15 }}>
      {children}
    </Cmp>
  );
}
