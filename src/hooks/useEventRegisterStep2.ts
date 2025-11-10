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
      onChange: (values) => {
        EventRegisterFormStep2Schema.parse(values);
      },
    },
  });

export default function useEventRegisterStep2Form() {
  const { setFormData, nextStep, prevStep, formData } =
    useEventRegistrationStore();
  const f = useAppForm({
    ...eventRegisterFormStep2Opts(formData),
    onSubmitMeta: {
      prev: false,
    },
    onSubmitInvalid: ({ meta, value }) => {
      console.log(value.paymentMethod);
      if (meta.prev) {
        prevStep();
      }
    },
    onSubmit: async ({ value, meta }) => {
      setFormData(value);
      console.log("Step 2 data saved:", { ...formData, ...value });
      if (meta.prev) {
        prevStep();
      } else {
        nextStep();
      }
    },
  });

  return f;
}
