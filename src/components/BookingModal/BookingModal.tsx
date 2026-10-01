import { useRef, useState, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, X } from 'lucide-react';
import { treatments } from '../../data/treatments';
import { locations } from '../../data/locations';
import CTAButton from '../Buttons/CTAButton';
import { backdropVariants, modalVariants, staggerContainer, staggerItem } from '../../lib/motion';
import { useBooking } from '../../hooks/useBookingModal';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';

interface Errors {
  name?: string;
  email?: string;
  phone?: string;
  treatment?: string;
  date?: string;
}

const fieldCls =
  'w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink placeholder:text-muted/70 transition-all duration-300 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/25';
const labelCls = 'mb-1.5 block text-xs font-semibold uppercase tracking-[0.14em] text-ink-soft';

/** Polished booking drawer/modal: backdrop fade, scale/slide panel, staggered fields, validation + mocked success state. */
export default function BookingModal() {
  const { isOpen, close, presetTreatment } = useBooking();
  const panelRef = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [form, setForm] = useState({ name: '', email: '', phone: '', treatment: presetTreatment ?? '', location: locations[0].name, date: '', message: '' });

  useBodyScrollLock(isOpen);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const validate = (): boolean => {
    const er: Errors = {};
    if (form.name.trim().length < 2) er.name = 'Please enter your full name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email)) er.email = 'Please enter a valid email address.';
    if (form.phone.replace(/\D/g, '').length < 7) er.phone = 'Please enter a valid phone number.';
    if (!form.treatment) er.treatment = 'Please choose a treatment.';
    if (!form.date) er.date = 'Please pick a preferred date.';
    setErrors(er);
    return Object.keys(er).length === 0;
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validate()) setSubmitted(true); // Mocked — no real appointment is created.
  };

  const handleClose = () => {
    close();
    window.setTimeout(() => {
      setSubmitted(false);
      setErrors({});
    }, 350);
  };

  const Error = ({ msg }: { msg?: string }) =>
    msg ? (
      <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} role="alert" className="mt-1.5 text-xs font-medium text-red-600">
        {msg}
      </motion.p>
    ) : null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-6"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          role="dialog"
          aria-modal="true"
          aria-label="Book an appointment"
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-espresso/60 backdrop-blur-sm" onClick={handleClose} aria-hidden />

          {/* Panel */}
          <motion.div
            ref={panelRef}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative max-h-[92svh] w-full overflow-y-auto rounded-t-[1.75rem] bg-bg p-6 shadow-2xl sm:max-w-lg sm:rounded-[1.75rem] sm:p-8"
          >
            <button
              onClick={handleClose}
              aria-label="Close booking dialog"
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink-soft transition-all duration-300 hover:rotate-90 hover:border-espresso hover:text-ink"
            >
              <X className="h-4.5 w-4.5" aria-hidden />
            </button>

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="flex min-h-[380px] flex-col items-center justify-center text-center"
                >
                  <motion.span
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.15, type: 'spring', stiffness: 260, damping: 20 }}
                    className="flex h-16 w-16 items-center justify-center rounded-full bg-cream text-accent-deep"
                  >
                    <CheckCircle2 className="h-8 w-8" aria-hidden />
                  </motion.span>
                  <h2 className="display-lg mt-6 text-ink">Request received</h2>
                  <p className="lede mx-auto mt-3 !text-sm">
                    Thank you, {form.name.split(' ')[0]}. A VELORA coordinator will confirm availability for{' '}
                    <strong>{form.treatment}</strong> at our {form.location} studio within one business day.
                  </p>
                  <p className="mt-3 text-xs text-muted">This demo does not create a real appointment.</p>
                  <div className="mt-8 w-full max-w-xs">
                    <CTAButton fullWidth onClick={handleClose} variant="primary">
                      Done
                    </CTAButton>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  variants={staggerContainer(0.05, 0.05)}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, y: 16 }}
                  transition={{ duration: 0.25 }}
                  onSubmit={onSubmit}
                  noValidate
                  className="space-y-4"
                >
                  <motion.div variants={staggerItem}>
                    <p className="eyebrow mb-1">VELORA</p>
                    <h2 className="font-display text-3xl text-ink">Book your consultation</h2>
                    <p className="mt-1 text-sm text-muted">Free, 20 minutes, zero pressure.</p>
                  </motion.div>

                  <motion.div variants={staggerItem} className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="bk-name" className={labelCls}>Full name</label>
                      <input id="bk-name" className={fieldCls} placeholder="Jordan Avery" value={form.name} onChange={set('name')} autoComplete="name" aria-invalid={!!errors.name} />
                      <Error msg={errors.name} />
                    </div>
                    <div>
                      <label htmlFor="bk-phone" className={labelCls}>Phone</label>
                      <input id="bk-phone" type="tel" className={fieldCls} placeholder="(312) 555-0100" value={form.phone} onChange={set('phone')} autoComplete="tel" aria-invalid={!!errors.phone} />
                      <Error msg={errors.phone} />
                    </div>
                  </motion.div>

                  <motion.div variants={staggerItem}>
                    <label htmlFor="bk-email" className={labelCls}>Email</label>
                    <input id="bk-email" type="email" className={fieldCls} placeholder="you@email.com" value={form.email} onChange={set('email')} autoComplete="email" aria-invalid={!!errors.email} />
                    <Error msg={errors.email} />
                  </motion.div>

                  <motion.div variants={staggerItem} className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="bk-treatment" className={labelCls}>Treatment</label>
                      <select id="bk-treatment" className={fieldCls} value={form.treatment} onChange={set('treatment')} aria-invalid={!!errors.treatment}>
                        <option value="">Select…</option>
                        {treatments.map((t) => (
                          <option key={t.slug} value={t.title}>{t.title}</option>
                        ))}
                        <option value="Not sure yet">Not sure yet — advise me</option>
                      </select>
                      <Error msg={errors.treatment} />
                    </div>
                    <div>
                      <label htmlFor="bk-location" className={labelCls}>Preferred studio</label>
                      <select id="bk-location" className={fieldCls} value={form.location} onChange={set('location')}>
                        {locations.map((l) => (
                          <option key={l.name} value={l.name}>{l.name}</option>
                        ))}
                      </select>
                    </div>
                  </motion.div>

                  <motion.div variants={staggerItem}>
                    <label htmlFor="bk-date" className={labelCls}>Preferred date & time</label>
                    <input id="bk-date" type="date" className={fieldCls} value={form.date} min={new Date().toISOString().split('T')[0]} onChange={set('date')} aria-invalid={!!errors.date} />
                    <Error msg={errors.date} />
                  </motion.div>

                  <motion.div variants={staggerItem}>
                    <label htmlFor="bk-message" className={labelCls}>Anything we should know? <span className="normal-case text-muted">(optional)</span></label>
                    <textarea id="bk-message" rows={3} className={fieldCls} placeholder="Goals, sensitivities, previous treatments…" value={form.message} onChange={set('message')} />
                  </motion.div>

                  <motion.div variants={staggerItem} className="pt-2">
                    <CTAButton type="submit" size="lg" fullWidth>
                      Request appointment
                    </CTAButton>
                    <p className="mt-3 text-center text-xs text-muted">By requesting, you agree to our cancellation policy. We never share your details.</p>
                  </motion.div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
