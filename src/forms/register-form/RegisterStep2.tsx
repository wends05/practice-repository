import { FieldGroup } from "@/components/ui/field";
import useEventRegisterStep2Form from "@/hooks/useEventRegisterStep2";
import PaymentInfo from "./payment/PaymentInfo";
import PaymentMethod from "./payment/PaymentMethod";
import RegisterActionButtons from "./RegisterActionButtons";

export default function RegisterStep2() {
  const { f, nextStep, prevStep } = useEventRegisterStep2Form();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handlePrevStep = () => {
    prevStep();
  };

  const handleNextStep = async () => {
    // Validate all fields first
    await f.validateField("paymentMethod", "change");
    await f.validateField("paymentProofImage", "change");

    // Submit the form to trigger onSubmit validation
    await f.handleSubmit();

    // Check if there are any field errors
    const paymentMethodErrors = f.state.fieldMeta.paymentMethod?.errors;
    const paymentProofErrors = f.state.fieldMeta.paymentProofImage?.errors;

    const hasFieldErrors =
      (paymentMethodErrors && paymentMethodErrors.length > 0) ||
      (paymentProofErrors && paymentProofErrors.length > 0);

    // Only proceed if there are no errors and form was successfully submitted
    if (!hasFieldErrors && f.state.isSubmitted) {
      nextStep();
    } else {
      console.log("Validation errors:", {
        paymentMethod: paymentMethodErrors,
        paymentProof: paymentProofErrors,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FieldGroup>
        <PaymentInfo />
        <PaymentMethod f={f} />
        <RegisterActionButtons
          prevStep={handlePrevStep}
          nextStep={handleNextStep}
        />
      </FieldGroup>
    </form>
  );
}
