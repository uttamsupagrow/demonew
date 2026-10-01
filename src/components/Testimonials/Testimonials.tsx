import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Quote, Star } from 'lucide-react';
import { testimonials } from '../../data/testimonials';
import { EASE } from '../../lib/motion';

/** Editorial testimonial carousel: drag/swipe, autoplay with pause-on-hover, arrows + dot pagination. */
export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();
  const timer = useRef<number | null>(null);
  const n = testimonials.length;

  const go = (next: number, d?: number) => {
    setDir(d ?? (next > index || (index === n - 1 && next === 0) ? 1 : -1));
    setIndex(((next % n) + n) % n);
  };

  useEffect(() => {
    if (paused || reduced) return;
    timer.current = window.setInterval(() => go(index + 1, 1), 6000);
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, paused, reduced]);

  const t = testimonials[index];

  const slide = {
    hidden: (d: number) => ({ opacity: 0, x: d > 0 ? 60 : -60 }),
    show: { opacity: 1, x: 0, transition: { duration: 0.55, ease: EASE } },
    exit: (d: number) => ({ opacity: 0, x: d > 0 ? -60 : 60, transition: { duration: 0.35, ease: EASE } }),
  };

  return (
    <section className="section-pad bg-espresso text-white" aria-label="Client testimonials" aria-roledescription="carousel">
      <div className="container-page">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          {/* Left editorial copy */}
          <div>
            <p className="eyebrow mb-4 !text-accent">Kind words</p>
            <h2 className="display-lg text-white">The reviews we are quietly proud of</h2>
            <p className="lede mt-5 !text-white/60">
              Over 2,100 verified reviews across our three studios. Here is what clients say between sessions.
            </p>

            {/* Controls */}
            <div className="mt-10 flex items-center gap-4">
              <button
                onClick={() => go(index - 1, -1)}
                aria-label="Previous testimonial"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/25 transition-all duration-300 hover:border-accent hover:bg-accent active:scale-95"
              >
                <ArrowLeft className="h-5 w-5" aria-hidden />
              </button>
              <button
                onClick={() => go(index + 1, 1)}
                aria-label="Next testimonial"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/25 transition-all duration-300 hover:border-accent hover:bg-accent active:scale-95"
              >
                <ArrowRight className="h-5 w-5" aria-hidden />
              </button>
              <div className="ml-4 flex items-center gap-2.5" role="tablist" aria-label="Choose testimonial">
                {testimonials.map((tt, i) => (
                  <button
                    key={tt.name}
                    role="tab"
                    aria-selected={i === index}
                    aria-label={`Testimonial ${i + 1} of ${n}`}
                    onClick={() => go(i)}
                    className="group py-2"
                  >
                    <span
                      className={`block h-1.5 rounded-full transition-all duration-500 ${
                        i === index ? 'w-8 bg-accent' : 'w-1.5 bg-white/30 group-hover:bg-white/60'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Slide area */}
          <div
            className="relative min-h-[340px] sm:min-h-[300px]"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onTouchStart={() => setPaused(true)}
            onTouchEnd={() => setPaused(false)}
            aria-live="polite"
          >
            <AnimatePresence custom={dir} mode="wait">
              <motion.figure
                key={t.name}
                custom={dir}
                variants={slide}
                initial="hidden"
                animate="show"
                exit="exit"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.12}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -70) go(index + 1, 1);
                  else if (info.offset.x > 70) go(index - 1, -1);
                }}
                className="surface cursor-grab active:cursor-grabbing !border-white/10 !bg-white/[0.05] p-8 backdrop-blur-sm sm:p-10"
              >
                <Quote className="h-8 w-8 text-accent" aria-hidden />
                <div className="mt-4 flex gap-1" aria-label={`${t.rating} out of 5 stars`}>
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-accent text-accent" aria-hidden />
                  ))}
                </div>
                <blockquote className="mt-5 font-display text-[1.5rem] leading-snug text-white/90 sm:text-[1.7rem]">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-7 flex items-center gap-4">
                  <img src={t.avatar} alt="" loading="lazy" className="h-12 w-12 rounded-full object-cover ring-1 ring-white/20" />
                  <div>
                    <p className="font-semibold text-white">{t.name}</p>
                    <p className="text-sm text-white/50">
                      {t.treatment} · {t.location}
                    </p>
                  </div>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
