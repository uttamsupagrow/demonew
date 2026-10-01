import { motion } from 'framer-motion';
import { Clock, MapPin, Phone } from 'lucide-react';
import { locations } from '../../data/locations';
import SectionHeading from '../SectionHeading/SectionHeading';
import CTAButton from '../Buttons/CTAButton';
import { staggerContainer, staggerItem } from '../../lib/motion';

/** Elegant location cards with image hover zoom + map links. */
export default function Locations() {
  return (
    <section className="section-pad bg-bg-alt" aria-label="Our locations">
      <div className="container-page">
        <SectionHeading
          eyebrow="Locations"
          title="Three studios, one standard"
          lede="Each VELORA studio is designed like the treatment room you would imagine — quiet light, warm materials, zero clinical chill."
          align="center"
        />

        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="mt-14 grid gap-6 md:grid-cols-3"
        >
          {locations.map((l) => (
            <motion.article key={l.name} variants={staggerItem} className="surface group flex flex-col overflow-hidden transition-shadow duration-500 hover:shadow-[0_18px_50px_-20px_rgba(28,26,23,0.22)]">
              <div className="relative aspect-[16/10] overflow-hidden" data-cursor="image">
                <img src={l.image} alt={`VELORA ${l.name} studio`} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1000ms] ease-out group-hover:scale-[1.06]" />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso/60 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-90" />
                <h3 className="absolute bottom-4 left-5 font-display text-2xl text-white">{l.name}</h3>
              </div>
              <div className="flex flex-1 flex-col gap-3 p-6 text-sm">
                {l.note && <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent-deep">{l.note}</p>}
                <p className="flex items-start gap-2.5 text-ink-soft">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-muted" aria-hidden />
                  {l.address}
                </p>
                <p className="flex items-center gap-2.5 text-ink-soft">
                  <Clock className="h-4 w-4 shrink-0 text-muted" aria-hidden />
                  {l.hours}
                </p>
                <p className="flex items-center gap-2.5 text-ink-soft">
                  <Phone className="h-4 w-4 shrink-0 text-muted" aria-hidden />
                  <a href={`tel:${l.phone.replace(/[^\d+]/g, '')}`} className="transition-colors hover:text-accent-deep">
                    {l.phone}
                  </a>
                </p>
                <div className="mt-auto flex items-center gap-3 pt-4">
                  <CTAButton href={l.mapUrl} variant="outline" size="md" arrow={false} className="!px-4 !py-2 text-xs">
                    Directions
                  </CTAButton>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
