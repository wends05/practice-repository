import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useEventRegistrationStore } from "@/stores/event-registration";
import NoteSection from "./submitted/NoteSection";
import QRCodeSection from "./submitted/QRCodeSection";

export default function RegisterStep4() {
  const router = useRouter();

  const formData = useEventRegistrationStore((state) => state.formData);
  const prevStep = useEventRegistrationStore((state) => state.prevStep);
  const resetForm = useEventRegistrationStore((state) => state.resetForm);

  const handleFinish = () => {
    resetForm();
    router.back();
  };

  return (
    <div className="space-y-5">
      <h3>Thank you for registering, {formData.name}!</h3>
      <QRCodeSection />
      <NoteSection />
      <div className=" flex gap-2 flex-col">
        <Button onClick={handleFinish} className="w-full">
          Finish
        </Button>
      </div>
    </div>
  );
}
