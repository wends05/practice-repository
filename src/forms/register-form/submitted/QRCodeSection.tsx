import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Item, ItemContent } from "@/components/ui/item";
import { useEventRegistrationStore } from "@/stores/event-registration";

export default function QRCodeSection() {
  const formData = useEventRegistrationStore((state) => state.formData);

  const handleDownloadQRCode = async () => {
    if (formData.qrCodeURL) {
      try {
        const response = await fetch(formData.qrCodeURL);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "event-qr-code.png";
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
        <span>Please save this QR Code for event check-in</span>
        {formData.qrCodeURL && (
          <>
            <AspectRatio ratio={16 / 9} className="max-w-sm my-4">
              <Image src={formData.qrCodeURL} alt="QR Code" fill />
            </AspectRatio>
            <Button onClick={handleDownloadQRCode} className="mr-4">
              Download QR Code
            </Button>
          </>
        )}
      </ItemContent>
    </Item>
  );
}
