import { formOptions } from "@tanstack/react-form";
import type z from "zod";
import { useAppForm } from "@/forms/_formHooks";
import { EventRegisterFormSchema } from "@/schema/Registration";
import { useEventRegistrationStore } from "@/stores/event-registration";

const EventRegisterFormStep1Schema = EventRegisterFormSchema.pick({
	name: true,
	email: true,
	phone: true,
	affiliation: true,
	otherPeople: true,
});

type EventRegisterFormStep1 = z.infer<typeof EventRegisterFormStep1Schema>;

const eventRegisterFormStep1Opts = (formData: EventRegisterFormStep1) =>
	formOptions({
		defaultValues: formData,
		validators: {
			onSubmit: EventRegisterFormStep1Schema,
		},
	});

export default function useEventRegisterStep1Form() {
	const { setFormData, nextStep, prevStep, formData } =
		useEventRegistrationStore();
	const f = useAppForm({
		...eventRegisterFormStep1Opts(formData),
		onSubmitMeta: {
			prev: false,
		},
		onSubmitInvalid: ({ meta, value }) => {
			if (meta.prev) {
				setFormData(value);

				prevStep();
			}
		},
		onSubmit: async ({ value, meta }) => {
			console.log("Step 1 data saved:", { ...formData, ...value });

			if (meta.prev) {
				prevStep();
			} else {
				nextStep();
			}
			setFormData({ ...formData, ...value });
		},
	});
	return f;
}
