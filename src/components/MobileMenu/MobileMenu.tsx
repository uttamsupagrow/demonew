import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { treatments } from '../../data/treatments';
import CTAButton from '../Buttons/CTAButton';
import { useBooking } from '../../hooks/useBookingModal';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';
import { EASE } from '../../lib/motion';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

const overlayVariants = {
  hidden: { clipPath: 'inset(0% 0% 100% 0%)' },
  visible: { clipPath: 'inset(0% 0% 0% 0%)', transition: { duration: 0.55, ease: EASE } },
  exit: { clipPath: 'inset(0% 0% 100% 0%)', transition: { duration: 0.4, ease: EASE } },
};

const item = {
  hidden: { opacity: 0, y: 36 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: 0.2 + i * 0.055, duration: 0.5, ease: EASE } }),
  exit: { opacity: 0, y: 12, transition: { duration: 0.15 } },
};

/** Fullscreen animated mobile menu with staggered links and CTA. */
export default function MobileMenu({ open, onClose }: MobileMenuProps) {
  const booking = useBooking();
  useBodyScrollLock(open);

  const links = [
    { label: 'About VELORA', to: '/#about' },
    { label: 'Results', to: '/#results' },
    { label: 'Locations', to: '/contact' },
    { label: 'Membership', to: '/memberships' },
    { label: 'Contact', to: '/contact' },
  ];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] bg-espresso text-white md:hidden"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
        >
          <div className="flex h-full flex-col overflow-y-auto px-6 pb-10 pt-5">
            <div className="flex items-center justify-between">
              <span className="font-display text-2xl tracking-[0.3em]">VELORA</span>
              <button
                onClick={onClose}
                aria-label="Close menu"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 transition-colors hover:bg-white/10"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="mt-10" aria-label="Mobile">
              <p className="eyebrow mb-3 !text-accent">Treatments</p>
              <ul className="mb-8 space-y-1">
                {treatments.map((t, i) => (
                  <motion.li key={t.slug} custom={i} variants={item}>
                    <Link
                      to={t.href}
                      onClick={onClose}
                      className="block py-2 font-display text-[1.7rem] leading-snug text-white/90 transition-colors hover:text-accent"
                    >
                      {t.title}
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <p className="eyebrow mb-3 !text-accent">Explore</p>
              <ul>
                {links.map((l, i) => (
                  <motion.li key={l.label} custom={treatments.length + i} variants={item}>
                    <Link
                      to={l.to}
                      onClick={onClose}
                      className="block py-2 text-lg font-medium text-white/80 transition-colors hover:text-accent"
                    >
                      {l.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>

            <motion.div custom={treatments.length + links.length} variants={item} className="mt-auto pt-10">
              <CTAButton
                variant="accent"
                size="lg"
                fullWidth
                onClick={() => {
                  onClose();
                  booking.open();
                }}
              >
                Book Now
              </CTAButton>
              <p className="mt-4 text-sm text-white/50">Lincoln Park · Wicker Park · Oak Brook</p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
