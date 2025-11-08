"use client";

import type { Preloaded } from "convex/react";
import { useEventRegistrationStore } from "@/stores/event-registration";
import type { api } from "../../../convex/_generated/api";
import RegisterStep1 from "./RegisterStep1";
import RegisterStep2 from "./RegisterStep2";
import RegisterStep3 from "./RegisterStep3";
import RegistrationPageStart from "./RegistrationPageStart";
import SubmittedPage from "./SubmittedPage";

interface RegisterFormProps {
  preloadedEventData: Preloaded<typeof api.events.getEventById>;
}

export default function RegisterForm({
  preloadedEventData,
}: RegisterFormProps) {
  const { step } = useEventRegistrationStore();
  return (
    <div className="flex w-full flex-col items-center p-10">
      <div className="w-3xl">
        {step === 1 && (
          <RegistrationPageStart preloadedEventData={preloadedEventData} />
        )}
        {step === 2 && <RegisterStep1 />}
        {step === 3 && <RegisterStep2 />}
        {step === 4 && <RegisterStep3 />}
        {step === 5 && <SubmittedPage />}
      </div>
    </div>
  );
}
