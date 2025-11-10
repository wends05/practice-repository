import { FieldLegend, FieldSet } from "@/components/ui/field";
import type useEventRegisterStep1Form from "@/hooks/useEventRegisterStep1";

interface OrganizationProps {
	f: ReturnType<typeof useEventRegisterStep1Form>;
}

export default function Organization({ f }: OrganizationProps) {
	return (
		<FieldSet>
			<FieldLegend>Organization</FieldLegend>
			<f.AppField name="affiliation">
				{(field) => (
					<field.FormInput
						label="Affiliation"
						type="text"
						placeholder="Your organization or company"
					/>
				)}
			</f.AppField>
		</FieldSet>
	);
}
