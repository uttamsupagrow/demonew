import { useEffect, useState } from 'react';

/** Lock body scroll while an overlay (modal / mobile menu) is open. */
export function useBodyScrollLock(locked: boolean) {
  const [offset] = useState(() => window.innerWidth - document.documentElement.clientWidth);

  useEffect(() => {
    if (!locked) return;
    const prevOverflow = document.body.style.overflow;
    const prevPadding = document.body.style.paddingRight;
    document.body.style.overflow = 'hidden';
    if (offset > 0) document.body.style.paddingRight = `${offset}px`;
    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPadding;
    };
  }, [locked, offset]);
}
