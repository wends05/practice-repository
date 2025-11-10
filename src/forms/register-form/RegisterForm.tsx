"use client";

import { useEventRegistrationStore } from "@/stores/event-registration";
import type { Doc } from "../../../convex/_generated/dataModel";
import RegisterStep1 from "./RegisterStep1";
import RegisterStep2 from "./RegisterStep2";
import RegisterStep3 from "./RegisterStep3";
import RegistrationPageStart from "./RegistrationPageStart";
import SubmittedPage from "./SubmittedPage";

interface RegisterFormProps {
	event: Doc<"events">;
}

export default function RegisterForm({ event }: RegisterFormProps) {
	const { step } = useEventRegistrationStore();
	return (
		<div className="flex w-full flex-col items-center p-10">
			<div className="max-w-3xl w-full">
				{step === 1 && <RegistrationPageStart event={event} />}
				{step === 2 && <RegisterStep1 />}
				{step === 3 && <RegisterStep2 />}
				{step === 4 && <RegisterStep3 />}
				{step === 5 && <SubmittedPage event={event} />}
			</div>
		</div>
	);
}
