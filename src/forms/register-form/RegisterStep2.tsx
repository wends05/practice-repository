import { FieldGroup } from "@/components/ui/field";
import useEventRegisterStep2Form from "@/hooks/useEventRegisterStep2";
import PaymentInfo from "./payment/PaymentInfo";
import PaymentMethod from "./payment/PaymentMethod";
import RegisterActionButtons from "./RegisterActionButtons";

export default function RegisterStep2() {
  const f = useEventRegisterStep2Form();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handlePrevStep = () => {
    f.handleSubmit({ prev: true });
  };

  const handleNextStep = () => {
    console.log(f.state.values);
    f.handleSubmit({ prev: false });
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
