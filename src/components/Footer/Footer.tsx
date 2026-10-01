import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Instagram, Facebook, Youtube, Check } from 'lucide-react';
import { treatments } from '../../data/treatments';
import { locations } from '../../data/locations';
import { staggerContainer, staggerItem, fadeUp } from '../../lib/motion';

const socials = [
  { icon: Instagram, label: 'Instagram', href: 'https://instagram.com' },
  { icon: Facebook, label: 'Facebook', href: 'https://facebook.com' },
  { icon: Youtube, label: 'YouTube', href: 'https://youtube.com' },
];

/** Large editorial footer with animated entrance, newsletter and back-to-top. */
export default function Footer() {
  const emailRef = useRef<HTMLInputElement>(null);
  const [subscribed, setSubscribed] = useState(false);

  const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <motion.footer
      className="relative mt-auto overflow-hidden bg-espresso text-white"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-40px' }}
      variants={staggerContainer(0.08)}
      aria-label="Site footer"
    >
      {/* Oversized watermark word */}
      <motion.p
        aria-hidden
        variants={{ hidden: { opacity: 0, y: 60 }, show: { opacity: 0.05, y: 0, transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] } } }}
        className="pointer-events-none absolute -bottom-6 left-1/2 w-full -translate-x-1/2 select-none text-center font-display text-[22vw] leading-none tracking-[0.08em] text-white"
      >
        VELORA
      </motion.p>

      <div className="container-page relative py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
          {/* Brand + newsletter */}
          <motion.div variants={fadeUp}>
            <p className="font-display text-3xl tracking-[0.3em]">VELORA</p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
              Laser & aesthetic medicine. Physician-supervised studios in Chicago and Oak Brook.
            </p>
            <form
              className="mt-7"
              onSubmit={(e) => {
                e.preventDefault();
                const v = emailRef.current?.value ?? '';
                if (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) {
                  setSubscribed(true);
                  if (emailRef.current) emailRef.current.value = '';
                } else {
                  emailRef.current?.focus();
                }
              }}
            >
              <label htmlFor="nl-email" className="eyebrow !text-accent mb-2 block">
                Glow letter — monthly, no spam
              </label>
              {subscribed ? (
                <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 text-sm text-white/85">
                  <Check className="h-4 w-4 text-accent" aria-hidden /> You are on the list. Welcome.
                </motion.p>
              ) : (
                <div className="flex max-w-sm overflow-hidden rounded-full border border-white/25 focus-within:border-accent transition-colors">
                  <input
                    id="nl-email"
                    ref={emailRef}
                    type="email"
                    required
                    placeholder="you@email.com"
                    className="w-full bg-transparent px-5 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe to newsletter"
                    className="group flex shrink-0 items-center justify-center bg-accent px-5 text-white transition-colors hover:bg-accent-deep"
                  >
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden />
                  </button>
                </div>
              )}
            </form>
          </motion.div>

          {/* Treatments */}
          <motion.nav variants={staggerItem} aria-label="Footer treatments">
            <h2 className="eyebrow !text-accent mb-4">Treatments</h2>
            <ul className="space-y-2.5 text-sm">
              {treatments.map((t) => (
                <li key={t.slug}>
                  <Link to={t.href} className="text-white/70 transition-all duration-300 hover:pl-1 hover:text-white">
                    {t.title}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>

          {/* Studio / locations */}
          <motion.nav variants={staggerItem} aria-label="Footer locations">
            <h2 className="eyebrow !text-accent mb-4">Studios</h2>
            <ul className="space-y-4 text-sm text-white/70">
              {locations.map((l) => (
                <li key={l.name}>
                  <p className="font-semibold text-white">{l.name}</p>
                  <p>{l.address}</p>
                </li>
              ))}
              <li>
                <Link to="/contact" className="inline-flex items-center gap-1.5 text-accent transition-colors hover:text-white">
                  All locations <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                </Link>
              </li>
            </ul>
          </motion.nav>

          {/* Explore + socials */}
          <motion.div variants={staggerItem}>
            <h2 className="eyebrow !text-accent mb-4">Explore</h2>
            <ul className="space-y-2.5 text-sm">
              {[
                { l: 'About', to: '/#about' },
                { l: 'Results', to: '/#results' },
                { l: 'Membership', to: '/memberships' },
                { l: 'Contact', to: '/contact' },
              ].map((x) => (
                <li key={x.l}>
                  <Link to={x.to} className="text-white/70 transition-all duration-300 hover:pl-1 hover:text-white">
                    {x.l}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`VELORA on ${s.label}`}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-white/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:text-accent"
                >
                  <s.icon className="h-4 w-4" aria-hidden />
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div variants={fadeUp} className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/45 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} VELORA Laser & Aesthetic Medicine. Fictional demo brand.</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <a href="#privacy" className="transition-colors hover:text-white">Privacy</a>
            <a href="#terms" className="transition-colors hover:text-white">Terms</a>
            <a href="#accessibility" className="transition-colors hover:text-white">Accessibility</a>
            <button onClick={toTop} className="group inline-flex items-center gap-1.5 transition-colors hover:text-white">
              Back to top
              <ArrowRight className="h-3.5 w-3.5 -rotate-90 transition-transform duration-300 group-hover:-translate-y-0.5" aria-hidden />
            </button>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
}
