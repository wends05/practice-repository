"use client";
import { type IDetectedBarcode, Scanner } from "@yudiel/react-qr-scanner";
import { useState } from "react";
import { scanRegistrationQRCode } from "@/actions/registration/scanRegistrationQRCode";
import { useScanRegistrationStore } from "@/stores/scan-registration";
import ReturnButton from "../ReturnButton";
import { Button } from "../ui/button";
import RegistrationDetails from "./RegistrationDetails";

export default function ScanComponent() {
  const setScannedRegistrationData = useScanRegistrationStore(
    (state) => state.setScannedRegistrationData
  );

  const scannedRegistrationData = useScanRegistrationStore(
    (state) => state.scannedRegistrationData
  );

  const [paused, setPaused] = useState(false);

  const handleScan = async (data: IDetectedBarcode[]) => {
    setPaused(true);
    if (data.length > 0) {
      const qrCodeData = data[0].rawValue;
      const registrationData = await scanRegistrationQRCode(qrCodeData);
      if (registrationData) {
        setScannedRegistrationData(registrationData);
      }
    }
  };

  return (
    <div className="p-10 space-y-6">
      <ReturnButton />
      <div className="space-y-4">
        <div className="flex gap-4">
          <div className="h-80 w-80 relative border border-gray-300 rounded-md overflow-hidden">
            <Scanner
              onScan={handleScan}
              onError={(err) => {
                console.error(err);
              }}
              constraints={{
                aspectRatio: 1,
                width: {
                  ideal: 500,
                },
                height: {
                  ideal: 500,
                },
              }}
              components={{
                finder: false,
                torch: true,
              }}
              paused={paused}
            />
          </div>
          {scannedRegistrationData && (
            <RegistrationDetails
              scannedRegistrationData={scannedRegistrationData}
            />
          )}
        </div>
        {paused && <Button onClick={() => setPaused(false)}>Unpause</Button>}
      </div>
    </div>
  );
}
