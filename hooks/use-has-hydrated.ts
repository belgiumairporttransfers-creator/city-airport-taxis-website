import { useState, useEffect } from "react";
import { useBookingStore } from "@/store/use-booking-store";

/** True after the booking persist store has finished rehydrating (and migrating). */
export function useHasHydrated() {
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    const persistApi = useBookingStore.persist;
    if (!persistApi) {
      setHasHydrated(true);
      return;
    }

    if (persistApi.hasHydrated()) {
      setHasHydrated(true);
      return;
    }

    return persistApi.onFinishHydration(() => {
      setHasHydrated(true);
    });
  }, []);

  return hasHydrated;
}
