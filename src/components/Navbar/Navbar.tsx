import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ChevronDown, Menu } from 'lucide-react';
import CTAButton from '../Buttons/CTAButton';
import MobileMenu from '../MobileMenu/MobileMenu';
import { treatments } from '../../data/treatments';
import { useBooking } from '../../hooks/useBookingModal';
import { EASE } from '../../lib/motion';

const navLinks = [
  { label: 'About', to: '/#about' },
  { label: 'Results', to: '/#results' },
  { label: 'Locations', to: '/contact' },
  { label: 'Membership', to: '/memberships' },
  { label: 'Contact', to: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [treatmentsOpen, setTreatmentsOpen] = useState(false);
  const { open: openBooking } = useBooking();
  const location = useLocation();
  const ref = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 24));

  // Close menus on route change
  useEffect(() => {
    setMenuOpen(false);
    setTreatmentsOpen(false);
  }, [location.pathname]);

  // Escape closes dropdowns
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setTreatmentsOpen(false);
        setMenuOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const linkCls = ({ isActive }: { isActive: boolean }) =>
    `relative text-sm font-medium tracking-wide transition-colors duration-300 after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100 ${
      scrolled ? 'text-ink-soft hover:text-ink' : 'text-white/85 hover:text-white'
    } ${isActive && location.pathname !== '/' ? '!text-accent' : ''}`;

  return (
    <>
      <motion.header
        ref={ref}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
        className={`fixed inset-x-0 top-0 z-[80] transition-all duration-500 ${
          scrolled
            ? 'border-b border-line bg-bg/90 shadow-[0_1px_20px_rgba(28,26,23,0.06)] backdrop-blur-md'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <div className="container-page flex h-[72px] items-center justify-between gap-6 md:h-20">
          {/* Logo */}
          <Link
            to="/"
            aria-label="VELORA home"
            className={`font-display text-2xl font-semibold tracking-[0.32em] transition-colors duration-500 md:text-[1.7rem] ${
              scrolled ? 'text-ink' : 'text-white'
            }`}
          >
            VELORA
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
            {/* Treatments dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setTreatmentsOpen(true)}
              onMouseLeave={() => setTreatmentsOpen(false)}
            >
              <button
                aria-expanded={treatmentsOpen}
                aria-haspopup="true"
                onClick={() => setTreatmentsOpen((o) => !o)}
                className={`flex items-center gap-1.5 text-sm font-medium tracking-wide transition-colors duration-300 ${
                  scrolled ? 'text-ink-soft hover:text-ink' : 'text-white/85 hover:text-white'
                }`}
              >
                Treatments
                <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${treatmentsOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {treatmentsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.28, ease: EASE }}
                    className="absolute left-1/2 top-full w-[320px] -translate-x-1/2 pt-4"
                  >
                    <div className="surface overflow-hidden p-2 shadow-xl shadow-ink/5">
                      {treatments.map((t) => (
                        <Link
                          key={t.slug}
                          to={t.href}
                          className="group flex items-center justify-between rounded-xl px-4 py-3 transition-colors hover:bg-bg-alt"
                        >
                          <span>
                            <span className="block text-sm font-semibold text-ink">{t.title}</span>
                            <span className="block text-xs text-muted">From ${t.priceFrom} · {t.duration}</span>
                          </span>
                          <span className="text-accent opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">→</span>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {navLinks.map((l) => (
              <NavLink key={l.label} to={l.to} className={linkCls}>
                {l.label}
              </NavLink>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <div className="hidden md:block">
              <CTAButton size="md" onClick={() => openBooking()}>
                Book Now
              </CTAButton>
            </div>
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              className={`flex h-11 w-11 items-center justify-center rounded-full border transition-colors lg:hidden ${
                scrolled ? 'border-line text-ink hover:bg-bg-alt' : 'border-white/30 text-white hover:bg-white/10'
              }`}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </motion.header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
