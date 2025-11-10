import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { EventRegisterForm } from "@/schema/Registration";

const MAX_EVENT_REGISTRATION_STEP = 5;
interface EventRegistrationState {
	formData: EventRegisterForm;
	step: number;
	MAX_STEP: number;
	qrCodes: Array<{ name: string; email: string; qrCodeDataURL: string }>;
}

interface EventRegistrationActions {
	setFormData: (data: Partial<EventRegisterForm>) => void;
	prevStep: () => void;
	nextStep: () => void;
	resetForm: () => void;
	setQrCodes: (
		qrCodes: Array<{ name: string; email: string; qrCodeDataURL: string }>,
	) => void;
}

const initialValues: EventRegisterForm = {
	name: "",
	email: "",
	phone: "",
	paymentMethod: "ONSITE",
	affiliation: "",
	date: new Date(),
};

export const useEventRegistrationStore = create<
	EventRegistrationState & EventRegistrationActions
>()(
	persist(
		(set) => ({
			formData: initialValues,
			step: 1,
			MAX_STEP: MAX_EVENT_REGISTRATION_STEP,
			prevStep: () =>
				set((state) => ({
					step: state.step > 1 ? state.step - 1 : 1,
				})),
			nextStep: () =>
				set((state) => ({
					step:
						state.step < MAX_EVENT_REGISTRATION_STEP
							? state.step + 1
							: MAX_EVENT_REGISTRATION_STEP,
				})),
			setFormData: (data) =>
				set((state) => ({
					formData: { ...state.formData, ...data },
				})),
			qrCodes: [],
			setQrCodes: (qrCodes) => set({ qrCodes }),
			resetForm: () => set({ step: 1, formData: initialValues }),
		}),
		{
			name: "event-registration-store",
			partialize: (state) => {
				const { formData } = state;
				// exclude paymentProof from persisted formData
				const { paymentProofImage: _, ...formDataWithoutPaymentProof } =
					formData;
				return { formData: formDataWithoutPaymentProof };
			},
		},
	),
);
