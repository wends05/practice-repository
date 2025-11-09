import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useEventRegistrationStore } from "@/stores/event-registration";
import type { Doc } from "../../../convex/_generated/dataModel";
import NoteSection from "./submitted/NoteSection";
import QRCodeSection from "./submitted/QRCodeSection";

interface RegisterStep4Props {
  event: Doc<"events">;
}

export default function RegisterStep4({ event }: RegisterStep4Props) {
  const router = useRouter();

  const formData = useEventRegistrationStore((state) => state.formData);
  const resetForm = useEventRegistrationStore((state) => state.resetForm);

  const handleFinish = () => {
    resetForm();
    router.back();
  };

  return (
    <div className="space-y-5">
      <h3>Thank you for registering, {formData.name}!</h3>
      <QRCodeSection eventDetails={event} />
      <NoteSection />
      <div className=" flex gap-2 flex-col">
        <Button onClick={handleFinish} className="w-full">
          Finish
        </Button>
      </div>
    </div>
  );
}
