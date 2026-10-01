import { AnimatePresence, motion } from 'framer-motion';
import { useId, useState } from 'react';
import type { FaqItem } from '../../data/faq';
import { EASE } from '../../lib/motion';
import SectionHeading from '../SectionHeading/SectionHeading';

function FaqRow({ item, isOpen, onToggle }: { item: FaqItem; isOpen: boolean; onToggle: () => void }) {
  const panelId = useId();
  return (
    <div className="border-b border-line">
      <h3>
        <button
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={`${panelId}-panel`}
          className="flex w-full items-center justify-between gap-6 py-5 text-left transition-colors duration-300 hover:text-accent-deep"
        >
          <span className="font-display text-[1.3rem] leading-snug text-ink sm:text-[1.45rem]">{item.q}</span>
          {/* Plus → X rotation */}
          <span
            aria-hidden
            className={`relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ${
              isOpen ? 'rotate-45 border-accent bg-accent text-white' : 'border-line text-ink-soft'
            }`}
          >
            <span className="absolute h-px w-3.5 bg-current" />
            <span className="absolute h-3.5 w-px bg-current" />
          </span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`${panelId}-panel`}
            role="region"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="overflow-hidden"
          >
            <p className="max-w-3xl pb-6 pr-12 text-[0.95rem] leading-relaxed text-ink-soft">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface FAQProps {
  items: FaqItem[];
  title?: string;
  eyebrow?: string;
  lede?: string;
  dark?: boolean;
}

/** Animated accordion — one open at a time, Framer Motion height animation, accessible wiring. */
export default function FAQ({
  items,
  title = 'Questions, answered plainly',
  eyebrow = 'FAQ',
  lede,
  dark = false,
}: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      className={`section-pad ${dark ? 'bg-espresso text-white' : 'bg-bg-alt'}`}
      aria-label="Frequently asked questions"
    >
      <div className="container-page grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
        <SectionHeading eyebrow={eyebrow} title={title} lede={lede} light={dark} />
        <div className={dark ? '[&_.border-line]:border-white/15 [&_h3_span]:text-white [&_p]:text-white/70' : ''}>
          {items.map((item, i) => (
            <FaqRow key={item.q} item={item} isOpen={openIndex === i} onToggle={() => setOpenIndex(openIndex === i ? null : i)} />
          ))}
        </div>
      </div>
    </section>
  );
}
