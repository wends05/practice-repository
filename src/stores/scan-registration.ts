import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Doc } from "../../convex/_generated/dataModel";

type ScanRegistrationData = {
  scannedRegistrationData: Doc<"registrants"> | null;
};

type ScanRegistrationActions = {
  setScannedRegistrationData: (data: Doc<"registrants"> | null) => void;
  resetData: () => void;
};

export const useScanRegistrationStore = create<
  ScanRegistrationData & ScanRegistrationActions
>()(
  persist(
    (set) => ({
      scannedRegistrationData: null,
      setScannedRegistrationData: (data) =>
        set({ scannedRegistrationData: data }),
      resetData: () => set({ scannedRegistrationData: null }),
    }),
    {
      name: "scan-registration-store",
      partialize: (state) => ({
        scannedRegistrationData: state.scannedRegistrationData,
      }),
    }
  )
);
