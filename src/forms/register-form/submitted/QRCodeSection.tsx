import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Item, ItemContent } from "@/components/ui/item";
import { useEventRegistrationStore } from "@/stores/event-registration";
import type { Doc } from "../../../../convex/_generated/dataModel";

interface QRCodeSectionProps {
  eventDetails: Doc<"events">;
}

export default function QRCodeSection({ eventDetails }: QRCodeSectionProps) {
  const qrCodes = useEventRegistrationStore((state) => state.qrCodes);

  const handleDownloadQRCode = async (dataUrl: string, email: string) => {
    if (qrCodes.length > 0) {
      try {
        const response = await fetch(dataUrl);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${eventDetails.name}-${email}.png`;
        link.click();
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error("Failed to download QR code:", error);
      }
    }
  };
  return (
    <Item>
      <ItemContent>
        <span>
          {qrCodes.length > 1
            ? "Here are your QR Codes for your group registration:"
            : "Here is your QR Code for your registration:"}
        </span>

        {qrCodes.length > 0 &&
          qrCodes.map((code, index) => (
            <Item
              key={`${code.email}-${index}`}
              className="mb-4 flex items-center flex-col"
              variant={"outline"}
            >
              <ItemContent className="flex flex-col items-center">
                <div className=" bg-slate-500 flex items-center justify-center relative h-50 w-50">
                  <Image src={code.qrCodeDataURL} alt="QR Code" fill />
                </div>
                <Button
                  onClick={() =>
                    handleDownloadQRCode(code.qrCodeDataURL, code.email)
                  }
                  className="mr-4"
                >
                  Download QR Code for {code.name}
                </Button>
              </ItemContent>
            </Item>
          ))}
      </ItemContent>
    </Item>
  );
}
