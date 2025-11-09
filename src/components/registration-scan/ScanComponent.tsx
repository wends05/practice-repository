"use client";
import { type IDetectedBarcode, Scanner } from "@yudiel/react-qr-scanner";
import { useState } from "react";
import { toast } from "sonner";
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
  const [facingMode, setFacingMode] = useState<"user" | "environment">(
    "environment"
  );

  const handleScan = async (data: IDetectedBarcode[]) => {
    setPaused(true);
    if (data.length === 0) return;

    try {
      const qrCodeData = data[0].rawValue;
      const { message, data: registrationData } =
        await scanRegistrationQRCode(qrCodeData);
      if (registrationData) {
        setScannedRegistrationData(registrationData);
      }
      if (message) {
        toast.info(message);
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Unknown error. Please try again.";
      toast.error(`Error scanning QR code: ${errorMessage}`);
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
                facingMode,
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
              setPaused={setPaused}
              scannedRegistrationData={scannedRegistrationData}
            />
          )}
        </div>
        <div className="space-x-3">
          <Button
            onClick={() =>
              setFacingMode((prev) =>
                prev === "user" ? "environment" : "user"
              )
            }
          >
            Switch Camera
          </Button>
          {paused && <Button onClick={() => setPaused(false)}>Unpause</Button>}
        </div>
      </div>
    </div>
  );
}
