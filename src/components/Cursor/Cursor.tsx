import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

/** Subtle desktop-only custom cursor that expands over interactive elements. Disabled on touch & reduced motion. */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });
  const [variant, setVariant] = useState<'default' | 'link' | 'image'>('default');

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduced) return;
    setEnabled(true);

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = e.target as HTMLElement;
      const interactive = el.closest('a, button, [role="button"], input, select, textarea');
      const image = el.closest('[data-cursor="image"]');
      setVariant(image ? 'image' : interactive ? 'link' : 'default');
    };

    window.addEventListener('mousemove', move, { passive: true });
    return () => window.removeEventListener('mousemove', move);
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="vel-cursor"
      style={{ x: sx, y: sy }}
      animate={{
        width: variant === 'default' ? 12 : variant === 'link' ? 40 : 64,
        height: variant === 'default' ? 12 : variant === 'link' ? 40 : 64,
        opacity: variant === 'default' ? 1 : 0.5,
      }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
    />
  );
}
