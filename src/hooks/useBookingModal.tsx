import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';

interface BookingContextValue {
  isOpen: boolean;
  /** Preselected treatment slug/title when opened from a specific card/page. */
  presetTreatment?: string;
  open: (treatment?: string) => void;
  close: () => void;
}

const BookingContext = createContext<BookingContextValue | null>(null);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [presetTreatment, setPresetTreatment] = useState<string | undefined>();

  const open = useCallback((treatment?: string) => {
    setPresetTreatment(treatment);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo(
    () => ({ isOpen, presetTreatment, open, close }),
    [isOpen, presetTreatment, open, close],
  );

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error('useBooking must be used within BookingProvider');
  return ctx;
}

/** Lock body scroll while modal/menu is open. */
export function useScrollLock(locked: boolean) {
  // Implemented via effect inside consumers to avoid re-render churn here.
  return locked;
}
