import { useParams } from "next/navigation";
import { createRegistrationQRCode } from "@/actions/registration/createRegistrationQRCode";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { useEventRegistrationStore } from "@/stores/event-registration";
import RegistrationDetails from "./information/RegistrationDetails";
import RegisterActionButtons from "./RegisterActionButtons";

export default function RegisterStep3() {
  const formData = useEventRegistrationStore((state) => state.formData);
  const prevStep = useEventRegistrationStore((state) => state.prevStep);
  const nextStep = useEventRegistrationStore((state) => state.nextStep);
  const setQrCodes = useEventRegistrationStore((state) => state.setQrCodes);

  const handlePrevStep = () => {
    prevStep();
  };

  const { id } = useParams();

  const handleSubmit = async () => {
    if (!id || Array.isArray(id) || id.length === 0) {
      return;
    }
    const qrCodes = await createRegistrationQRCode(id, formData);
    setQrCodes(qrCodes);
    nextStep();
  };
  return (
    <FieldGroup>
      <FieldSet>
        <Field>
          <FieldLegend>Review Information</FieldLegend>
          <FieldDescription>
            Please review your information before submitting your registration.
          </FieldDescription>
          <FieldContent>
            <RegistrationDetails />
          </FieldContent>
        </Field>
      </FieldSet>
      <RegisterActionButtons
        nextStep={handleSubmit}
        prevStep={handlePrevStep}
      />
    </FieldGroup>
  );
}
