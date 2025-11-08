import { useEventRegistrationStore } from "@/stores/event-registration";

export default function Submitted() {
  const formData = useEventRegistrationStore((state) => state.formData);

  return (
    <div>
      <h3>Your Registration has been submitted!</h3>
    </div>
  );
}
