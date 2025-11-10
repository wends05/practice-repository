import { FieldGroup, FieldSeparator } from "@/components/ui/field";
import useEventRegisterStep1Form from "@/hooks/useEventRegisterStep1";
import Organization from "./main/Organization";
import OtherPeople from "./main/OtherPeople";
import PersonalInfo from "./main/PersonalInfo";
import RegisterActionButtons from "./RegisterActionButtons";

export default function RegisterStep1() {
	const f = useEventRegisterStep1Form();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		e.stopPropagation();
	};
	const handlePrevStep = () => {
		f.handleSubmit({ prev: true });
	};

	const handleNextStep = async () => {
		f.handleSubmit({ prev: false });
	};

	return (
		<form onSubmit={handleSubmit} className="w-full">
			<FieldGroup>
				<PersonalInfo f={f} />
				<FieldSeparator />
				<Organization f={f} />
				<OtherPeople f={f} />
				<RegisterActionButtons
					prevStep={handlePrevStep}
					nextStep={handleNextStep}
				/>
			</FieldGroup>
		</form>
	);
}
