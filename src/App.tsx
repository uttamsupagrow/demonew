import { lazy, Suspense, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import BookingModal from './components/BookingModal/BookingModal';
import Cursor from './components/Cursor/Cursor';
import { BookingProvider } from './hooks/useBookingModal';

// Code-split: heavy pages load on demand
const Home = lazy(() => import('./pages/Home'));
const TreatmentDetail = lazy(() => import('./pages/TreatmentDetail'));
const Memberships = lazy(() => import('./pages/Memberships'));
const Contact = lazy(() => import('./pages/Contact'));

/** Reset scroll on navigation; honor in-page hash links (#about etc.). */
function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname, hash]);
  return null;
}

function PageFallback() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center" role="status" aria-label="Loading page">
      <span className="h-8 w-8 animate-spin rounded-full border-2 border-line border-t-accent" />
    </div>
  );
}

export default function App() {
  const location = useLocation();

  return (
    <BookingProvider>
      <Cursor />
      <ScrollManager />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-espresso focus:px-5 focus:py-2.5 focus:text-sm focus:text-white"
      >
        Skip to content
      </a>
      <Navbar />
      <Suspense fallback={<PageFallback />}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/laser-hair-removal" element={<TreatmentDetail />} />
            <Route path="/facials" element={<TreatmentDetail />} />
            <Route path="/lasemd" element={<TreatmentDetail />} />
            <Route path="/morpheus8" element={<TreatmentDetail />} />
            <Route path="/injectables" element={<TreatmentDetail />} />
            <Route path="/face-and-body" element={<TreatmentDetail />} />
            <Route path="/memberships" element={<Memberships />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </AnimatePresence>
      </Suspense>
      <Footer />
      <BookingModal />
    </BookingProvider>
  );
}
