import { formOptions } from "@tanstack/react-form";
import type z from "zod";
import { useAppForm } from "@/forms/_formHooks";
import { EventRegisterFormSchema } from "@/schema/Registration";
import { useEventRegistrationStore } from "@/stores/event-registration";

const EventRegisterFormStep2Schema = EventRegisterFormSchema.pick({
  paymentMethod: true,
  paymentProofImage: true,
});

type EventRegisterFormStep2 = z.infer<typeof EventRegisterFormStep2Schema>;

const eventRegisterFormStep2Opts = (formData: EventRegisterFormStep2) =>
  formOptions({
    defaultValues: formData,
    validators: {
      onSubmit: EventRegisterFormStep2Schema,
    },
  });

export default function useEventRegisterStep2Form() {
  const { setFormData, nextStep, prevStep, formData } =
    useEventRegistrationStore();
  const f = useAppForm({
    ...eventRegisterFormStep2Opts(formData),
    onSubmit: async ({ value }) => {
      setFormData(value);
      console.log("Step 2 data saved:", { ...formData, ...value });
    },
  });

  return {
    f,
    nextStep,
    prevStep,
  };
}
