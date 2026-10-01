import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { pageVariants } from '../../lib/motion';

/** Wraps each route's content in a fade/slide enter-exit transition. */
export default function PageTransition({ children }: { children: ReactNode }) {
  return (
    <motion.main id="main-content" variants={pageVariants} initial="initial" animate="enter" exit="exit">
      {children}
    </motion.main>
  );
}
