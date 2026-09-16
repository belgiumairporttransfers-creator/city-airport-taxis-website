import { useState, useEffect } from "react";
import { useBookingStore } from "@/store/use-booking-store";

/** True after the booking persist store has finished rehydrating (and migrating). */
export function useHasHydrated() {
  const [hasHydrated, setHasHydrated] = useState(() =>
    useBookingStore.persist.hasHydrated()
  );

  useEffect(() => {
    const unsubFinish = useBookingStore.persist.onFinishHydration(() => {
      setHasHydrated(true);
    });

    setHasHydrated(useBookingStore.persist.hasHydrated());

    return unsubFinish;
  }, []);

  return hasHydrated;
}
