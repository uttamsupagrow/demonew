import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { MoveHorizontal } from 'lucide-react';
import { images } from '../../lib/images';

interface CaseStudy {
  label: string;
  treatment: string;
  sessions: string;
  result: string;
  before: string;
  after: string;
}

const cases: CaseStudy[] = [
  {
    label: 'Permanently reduced',
    treatment: 'Laser Hair Removal — Full Legs',
    sessions: '7 sessions · 9 months',
    result: '92% hair reduction with no ingrown follicles. Client switched to maintenance twice per year.',
    before: images.before01,
    after: images.after01,
  },
  {
    label: 'Texture refined',
    treatment: 'Morpheus8 — Acne Scarring',
    sessions: '3 sessions · 5 months',
    result: 'Visible softening of boxcar scars and tightened jawline contour with minimal downtime.',
    before: images.before02,
    after: images.after02,
  },
  {
    label: 'Tone renewed',
    treatment: 'LaseMD Ultra — Sun Damage',
    sessions: '2 sessions · 8 weeks',
    result: 'Evened pigment, refined pores and a lit-from-within glow captured at 60 days.',
    before: images.before03,
    after: images.after03,
  },
];

/** Draggable, keyboard-accessible before/after comparison slider. */
export default function BeforeAfter({
  before,
  after,
  altBefore = 'Before treatment',
  altAfter = 'After treatment',
}: {
  before: string;
  after: string;
  altBefore?: string;
  altAfter?: string;
}) {
  const [pos, setPos] = useState(50);
  const wrapRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const reduced = useReducedMotion();

  const updateFromClientX = useCallback((clientX: number) => {
    const rect = wrapRef.current?.getBoundingClientRect();
    if (!rect) return;
    const p = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(98, Math.max(2, p)));
  }, []);

  useEffect(() => {
    const move = (e: PointerEvent) => dragging.current && updateFromClientX(e.clientX);
    const up = () => (dragging.current = false);
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
  }, [updateFromClientX]);

  return (
    <motion.div
      ref={wrapRef}
      className="relative aspect-[4/3] w-full touch-pan-y select-none overflow-hidden rounded-[var(--radius-card)]"
      data-cursor="image"
      initial={{ opacity: 0, scale: reduced ? 1 : 1.03 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      onPointerDown={(e) => {
        dragging.current = true;
        updateFromClientX(e.clientX);
      }}
    >
      {/* AFTER (base layer) */}
      <img src={after} alt={altAfter} loading="lazy" className="absolute inset-0 h-full w-full object-cover" draggable={false} />

      {/* BEFORE (clipped overlay) */}
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <img src={before} alt={altBefore} loading="lazy" className="h-full w-full object-cover" draggable={false} />
      </div>

      {/* Labels */}
      <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-espresso/70 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-sm">
        Before
      </span>
      <span className="pointer-events-none absolute right-4 top-4 rounded-full bg-white/85 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-espresso backdrop-blur-sm">
        After
      </span>

      {/* Divider */}
      <div className="pointer-events-none absolute inset-y-0" style={{ left: `${pos}%` }}>
        <div className="absolute inset-y-0 -ml-px w-0.5 bg-white/90 shadow-[0_0_12px_rgba(0,0,0,0.35)]" />
        <div className="absolute top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-white text-espresso shadow-lg">
          <MoveHorizontal className="h-5 w-5" aria-hidden />
        </div>
      </div>

      {/* Accessible range control overlays the whole image */}
      <input
        type="range"
        min={2}
        max={98}
        step={0.5}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') setPos((p) => Math.max(2, p - 3));
          if (e.key === 'ArrowRight') setPos((p) => Math.min(98, p + 3));
        }}
        aria-label="Drag to compare before and after results"
        className="ba-range"
      />
    </motion.div>
  );
}

/** Horizontal-scroll case-study rail built on the comparison slider. */
export function CaseStudies() {
  return (
    <section id="results" className="section-pad bg-bg" aria-label="Case studies and results">
      <div className="container-page">
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow mb-3">Real results</p>
            <h2 className="display-lg text-ink">Case studies you can drag through</h2>
          </div>
          <p className="lede max-w-md !text-sm">
            Unretouched captures from our Visia imaging system. Drag each divider to see the difference a protocol makes.
          </p>
        </div>

        <motion.div
          className="no-scrollbar -mx-[clamp(1.25rem,4vw,3rem)] flex snap-x snap-mandatory gap-6 overflow-x-auto px-[clamp(1.25rem,4vw,3rem)] pb-4"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.14 } } }}
        >
          {cases.map((c) => (
            <motion.article
              key={c.treatment}
              variants={{ hidden: { opacity: 0, y: 48 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } } }}
              className="w-[min(88vw,560px)] shrink-0 snap-start"
            >
              <BeforeAfter before={c.before} after={c.after} altBefore={`${c.treatment} before`} altAfter={`${c.treatment} after`} />
              <div className="mt-5 flex items-start justify-between gap-4">
                <div>
                  <p className="font-display text-2xl text-ink">{c.label}</p>
                  <p className="mt-1 text-sm font-medium text-accent-deep">{c.treatment}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.14em] text-muted">{c.sessions}</p>
                </div>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">{c.result}</p>
            </motion.article>
          ))}
        </motion.div>
        <p className="mt-4 text-xs text-muted">Individual results may vary. Photos are illustrative placeholders pending real client consent imagery.</p>
      </div>
    </section>
  );
}
