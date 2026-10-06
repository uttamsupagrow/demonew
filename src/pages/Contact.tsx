import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Clock, Mail, MapPin, Phone, Send } from 'lucide-react';
import PageTransition from '../components/PageTransition/PageTransition';
import SectionHeading from '../components/SectionHeading/SectionHeading';
import Reveal, { RevealGroup } from '../components/Reveal/Reveal';
import FAQ from '../components/FAQ/FAQ';
import Locations from '../components/Locations/Locations';
import CTAButton from '../components/Buttons/CTAButton';
import { generalFaq } from '../data/faq';
import { treatments } from '../data/treatments';
import { locations } from '../data/locations';
import { usePageMeta } from '../lib/seo';
import { EASE, staggerContainer, staggerItem } from '../lib/motion';
import { useBooking } from '../hooks/useBookingModal';

interface Errors {
  name?: string;
  email?: string;
  message?: string;
}

const inputCls =
  'w-full rounded-lg border border-line bg-white px-4 py-3 text-sm text-ink placeholder:text-muted/70 transition-colors duration-300 focus:border-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/30';

export default function Contact() {
  const { open } = useBooking();
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [form, setForm] = useState({ name: '', email: '', phone: '', treatment: '', location: '', message: '' });

  usePageMeta({
    title: 'Contact & Locations',
    description:
      'Get in touch with VELORA. Questions about laser hair removal, facials, LaseMD Ultra, Morpheus8 or injectables — our concierge team replies within one business day.',
    path: '/contact',
  });

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    if (errors[key as keyof Errors]) setErrors((er) => ({ ...er, [key]: undefined }));
  };

  const validate = (): boolean => {
    const er: Errors = {};
    if (form.name.trim().length < 2) er.name = 'Please enter your full name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email)) er.email = 'Please enter a valid email address.';
    if (form.message.trim().length < 10) er.message = 'Please write at least a short message (10+ characters).';
    setErrors(er);
    return Object.keys(er).length === 0;
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    // Mocked submission — no appointment is actually booked here.
    setSent(true);
  };

  return (
    <PageTransition>
      {/* ---------- HEADER STRIP ---------- */}
      <section className="bg-espresso pb-16 pt-36 text-white md:pb-20 md:pt-44">
        <div className="container-page">
          <SectionHeading
            light
            eyebrow="Contact"
            title="We'd love to hear from you"
            lede="Questions, consult requests or press — reach us below. Our concierge replies within one business day."
          />
          <RevealGroup className="mt-10 flex flex-wrap gap-x-10 gap-y-4 text-sm text-white/75" stagger={0.1}>
            <a href="tel:+13125550100" className="group inline-flex items-center gap-2.5 transition-colors hover:text-accent">
              <Phone aria-hidden className="h-4 w-4 text-accent" /> +1 (312) 555-0100
            </a>
            <a href="mailto:hello@velora.example.com" className="group inline-flex items-center gap-2.5 transition-colors hover:text-accent">
              <Mail aria-hidden className="h-4 w-4 text-accent" /> hello@velora.example.com
            </a>
            <span className="inline-flex items-center gap-2.5">
              <Clock aria-hidden className="h-4 w-4 text-accent" /> Mon–Sat · 9:00 – 20:00
            </span>
          </RevealGroup>
        </div>
      </section>

      {/* ---------- FORM + INFO ---------- */}
      <section className="section-pad" aria-label="Contact form and studio information">
        <div className="container-page grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-20">
          {/* Form */}
          <motion.form
            onSubmit={onSubmit}
            noValidate
            variants={staggerContainer(0.07)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="surface p-8 md:p-10"
            aria-busy={sent}
          >
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="flex min-h-[380px] flex-col items-center justify-center gap-5 text-center"
                role="status"
                aria-live="polite"
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/12 text-accent-deep">
                  <Check aria-hidden className="h-8 w-8" strokeWidth={2.25} />
                </span>
                <h3 className="display-md">Message received</h3>
                <p className="max-w-sm text-sm leading-relaxed text-ink-soft">
                  Thank you, {form.name.split(' ')[0]}. This is a demo form, so nothing was actually sent —
                  but on a live site our concierge would reply to{' '}
                  <span className="font-medium text-ink">{form.email}</span> within one business day.
                </p>
                <div className="mt-2 flex flex-wrap justify-center gap-3">
                  <CTAButton onClick={() => open(form.treatment || undefined)}>Book instead</CTAButton>
                  <CTAButton
                    variant="outline"
                    arrow={false}
                    onClick={() => {
                      setSent(false);
                      setForm({ name: '', email: '', phone: '', treatment: '', location: '', message: '' });
                    }}
                  >
                    Send another message
                  </CTAButton>
                </div>
              </motion.div>
            ) : (
              <>
                <h2 className="display-md mb-8">Send us a message</h2>
                <div className="grid gap-5 sm:grid-cols-2">
                  <motion.div variants={staggerItem}>
                    <label htmlFor="c-name" className="mb-2 block text-sm font-medium text-ink">
                      Full name <span className="text-accent-deep" aria-hidden>*</span>
                    </label>
                    <input id="c-name" type="text" autoComplete="name" value={form.name} onChange={set('name')}
                      aria-invalid={!!errors.name} aria-describedby={errors.name ? 'c-name-err' : undefined}
                      className={inputCls} placeholder="Jordan Lee" />
                    {errors.name && <p id="c-name-err" className="mt-1.5 text-xs text-red-700">{errors.name}</p>}
                  </motion.div>
                  <motion.div variants={staggerItem}>
                    <label htmlFor="c-email" className="mb-2 block text-sm font-medium text-ink">
                      Email <span className="text-accent-deep" aria-hidden>*</span>
                    </label>
                    <input id="c-email" type="email" autoComplete="email" value={form.email} onChange={set('email')}
                      aria-invalid={!!errors.email} aria-describedby={errors.email ? 'c-email-err' : undefined}
                      className={inputCls} placeholder="you@example.com" />
                    {errors.email && <p id="c-email-err" className="mt-1.5 text-xs text-red-700">{errors.email}</p>}
                  </motion.div>
                  <motion.div variants={staggerItem}>
                    <label htmlFor="c-phone" className="mb-2 block text-sm font-medium text-ink">Phone</label>
                    <input id="c-phone" type="tel" autoComplete="tel" value={form.phone} onChange={set('phone')}
                      className={inputCls} placeholder="(optional)" />
                  </motion.div>
                  <motion.div variants={staggerItem}>
                    <label htmlFor="c-treatment" className="mb-2 block text-sm font-medium text-ink">Treatment of interest</label>
                    <select id="c-treatment" value={form.treatment} onChange={set('treatment')} className={inputCls}>
                      <option value="">Not sure yet</option>
                      {treatments.map((t) => (
                        <option key={t.slug} value={t.title}>{t.title}</option>
                      ))}
                      <option value="Membership">Membership</option>
                    </select>
                  </motion.div>
                  <motion.div variants={staggerItem} className="sm:col-span-2">
                    <label htmlFor="c-location" className="mb-2 block text-sm font-medium text-ink">Preferred location</label>
                    <select id="c-location" value={form.location} onChange={set('location')} className={inputCls}>
                      <option value="">Any location</option>
                      {locations.map((l) => (
                        <option key={l.name} value={l.name}>{l.name}</option>
                      ))}
                    </select>
                  </motion.div>
                  <motion.div variants={staggerItem} className="sm:col-span-2">
                    <label htmlFor="c-message" className="mb-2 block text-sm font-medium text-ink">
                      Message <span className="text-accent-deep" aria-hidden>*</span>
                    </label>
                    <textarea id="c-message" rows={5} value={form.message} onChange={set('message')}
                      aria-invalid={!!errors.message} aria-describedby={errors.message ? 'c-msg-err' : undefined}
                      className={`${inputCls} resize-y`} placeholder="Tell us about your goals, questions or preferred times…" />
                    {errors.message && <p id="c-msg-err" className="mt-1.5 text-xs text-red-700">{errors.message}</p>}
                  </motion.div>
                </div>
                <motion.div variants={staggerItem} className="mt-8 flex flex-wrap items-center gap-4">
                  <CTAButton type="submit" size="lg">
                    <span className="inline-flex items-center gap-2.5">
                      Send message <Send aria-hidden className="h-4 w-4" />
                    </span>
                  </CTAButton>
                  <p className="text-xs text-muted" aria-live="polite">Demo only — submissions are not stored.</p>
                </motion.div>
              </>
            )}
          </motion.form>

          {/* Quick booking card */}
          <Reveal className="flex flex-col gap-6">
            <div className="rounded-card bg-espresso p-8 text-white md:p-10">
              <p className="eyebrow text-accent">Prefer to book directly?</p>
              <h3 className="display-md mt-3 text-white">Reserve your consultation</h3>
              <p className="mt-4 text-sm leading-relaxed text-white/70">
                Pick a treatment, location and time that suits you — our booking assistant confirms
                within one business day. First consultations are complimentary.
              </p>
              <button
                type="button"
                onClick={() => open()}
                className="shine mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-medium tracking-wide text-white transition-all duration-300 hover:bg-accent-deep active:scale-[0.97]"
              >
                Open booking assistant
              </button>
            </div>
            <ul className="space-y-4">
              {locations.map((l) => (
                <li key={l.name} className="surface flex items-start gap-4 p-5">
                  <MapPin aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-accent-deep" />
                  <div>
                    <p className="text-sm font-semibold text-ink">{l.name}</p>
                    <p className="mt-0.5 text-sm text-ink-soft">{l.address}</p>
                    <p className="mt-1 text-xs text-muted">{l.hours}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ---------- LOCATIONS + FAQ ---------- */}
      <Locations />
      <FAQ items={generalFaq} eyebrow="Good to know" title="Common questions" />
    </PageTransition>
  );
}
