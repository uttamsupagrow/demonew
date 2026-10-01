import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Copy, Tag } from 'lucide-react';
import { offers } from '../../data/offers';
import SectionHeading from '../SectionHeading/SectionHeading';
import CTAButton from '../Buttons/CTAButton';
import { staggerContainer, staggerItem } from '../../lib/motion';
import { useBooking } from '../../hooks/useBookingModal';

/** Promotional offer cards with strong price typography + copy-code micro-interaction. */
export default function Offers() {
  const { open } = useBooking();
  const [copied, setCopied] = useState<string | null>(null);

  const copy = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(code);
      window.setTimeout(() => setCopied(null), 1800);
    } catch {
      setCopied(code);
      window.setTimeout(() => setCopied(null), 1800);
    }
  };

  return (
    <section className="section-pad bg-bg" aria-label="Special offers">
      <div className="container-page">
        <SectionHeading
          eyebrow="Offers"
          title="Considerate pricing, openly advertised"
          lede="No games, no fine-print ambushes. Current promotions for new and returning clients."
        />

        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="mt-14 grid gap-6 md:grid-cols-3"
        >
          {offers.map((o) => (
            <motion.article
              key={o.code}
              variants={staggerItem}
              className={`surface group relative flex flex-col p-7 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_24px_60px_-24px_rgba(28,26,23,0.3)] ${
                o.featured ? 'border-accent/50 ring-1 ring-accent/25' : ''
              }`}
            >
              {o.featured && (
                <span className="absolute -top-3 left-7 rounded-full bg-accent px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-white">
                  Most claimed
                </span>
              )}
              <p className="font-display text-6xl leading-none text-ink transition-colors duration-500 group-hover:text-accent-deep">{o.price}</p>
              <p className="mt-1 text-sm text-muted">{o.priceNote}</p>
              <h3 className="mt-5 font-display text-[1.5rem] text-ink">{o.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{o.detail}</p>

              <button
                onClick={() => copy(o.code)}
                aria-label={`Copy promo code ${o.code}`}
                className="mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-dashed border-accent/60 bg-cream/60 px-4 py-2 text-sm font-semibold tracking-[0.12em] text-accent-deep transition-all duration-300 hover:bg-accent hover:text-white active:scale-95"
              >
                {copied === o.code ? <Check className="h-4 w-4" aria-hidden /> : <Tag className="h-4 w-4" aria-hidden />}
                {copied === o.code ? 'COPIED' : o.code}
                {!copied && <Copy className="h-3.5 w-3.5 opacity-50" aria-hidden />}
              </button>

              <p className="mt-4 text-xs leading-relaxed text-muted">{o.terms}</p>

              <div className="mt-6">
                <CTAButton variant={o.featured ? 'primary' : 'outline'} fullWidth onClick={() => open(o.title)}>
                  {o.cta}
                </CTAButton>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
