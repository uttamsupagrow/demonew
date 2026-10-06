interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  lede?: string;
  align?: 'left' | 'center';
  light?: boolean;
  id?: string;
}

import Reveal from '../Reveal/Reveal';
import { fadeUp, staggerContainer, staggerItem } from '../../lib/motion';
import { motion } from 'framer-motion';

/** Editorial section heading: eyebrow + display title + optional lede, animated as a stagger group. */
export default function SectionHeading({ eyebrow, title, lede, align = 'left', light = false, id }: SectionHeadingProps) {
  return (
    <motion.div
      id={id}
      className={`max-w-3xl ${align === 'center' ? 'mx-auto text-center' : ''}`}
      variants={staggerContainer(0.12)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
    >
      {eyebrow && (
        <motion.p variants={staggerItem} className={`eyebrow mb-4 ${light ? '!text-accent' : ''}`}>
          {eyebrow}
        </motion.p>
      )}
      <motion.h2 variants={fadeUp} className={`display-lg ${light ? 'text-white' : 'text-ink'}`}>
        {title}
      </motion.h2>
      {lede && (
        <motion.p variants={fadeUp} className={`lede mt-5 ${align === 'center' ? 'mx-auto' : ''} ${light ? '!text-white/70' : ''}`}>
          {lede}
        </motion.p>
      )}
    </motion.div>
  );
}

export { Reveal };
