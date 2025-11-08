import { Button } from "@/components/ui/button";
import { useEventRegistrationStore } from "@/stores/event-registration";

interface RegisterActionButtonsProps {
  prevStep: () => void;
  nextStep: () => void;
}

export default function RegisterActionButtons({
  prevStep,
  nextStep,
}: RegisterActionButtonsProps) {
  const { step, MAX_STEP } = useEventRegistrationStore();
  return (
    <div className=" flex gap-2 flex-col">
      <Button type="submit" onClick={prevStep}>
        {step === 1 ? "Return" : "Previous Step"}
      </Button>
      <Button type="submit" onClick={nextStep}>
        {step === MAX_STEP ? "Submit" : "Next Step"}
      </Button>
    </div>
  );
}
