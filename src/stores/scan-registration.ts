import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Doc } from "../../convex/_generated/dataModel";

type ScanRegistrationData = {
  scannedRegistrationData: Doc<"registration"> | null;
};

type ScanRegistrationActions = {
  setScannedRegistrationData: (data: Doc<"registration"> | null) => void;
};

export const useScanRegistrationStore = create<
  ScanRegistrationData & ScanRegistrationActions
>()(
  persist(
    (set) => ({
      scannedRegistrationData: null,
      setScannedRegistrationData: (data) =>
        set({ scannedRegistrationData: data }),
    }),
    {
      name: "scan-registration-store",
      partialize: (state) => ({
        scannedRegistrationData: state.scannedRegistrationData,
      }),
    }
  )
);
