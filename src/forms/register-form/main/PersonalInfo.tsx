import { FieldLegend, FieldSet } from "@/components/ui/field";
import type useEventRegisterStep1Form from "@/hooks/useEventRegisterStep1";

interface PersonalInfoProps {
	f: ReturnType<typeof useEventRegisterStep1Form>;
}
export default function PersonalInfo({ f }: PersonalInfoProps) {
	return (
		<FieldSet>
			<FieldLegend>Personal Information</FieldLegend>
			<f.AppField name="name">
				{(field) => (
					<field.FormInput label="Name" type="text" placeholder="John Doe" />
				)}
			</f.AppField>
			<f.AppField name="email">
				{(field) => (
					<field.FormInput
						label="Email"
						type="email"
						placeholder="johndoe@gmail.com"
					/>
				)}
			</f.AppField>
			<f.AppField name="phone">
				{(field) => (
					<field.FormInput
						label="Phone"
						type="tel"
						placeholder="09XXXXXXXXXX"
					/>
				)}
			</f.AppField>
		</FieldSet>
	);
}
