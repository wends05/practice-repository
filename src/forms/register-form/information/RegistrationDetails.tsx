import { FieldSet } from "@/components/ui/field";
import { Item, ItemContent, ItemHeader } from "@/components/ui/item";
import { useEventRegistrationStore } from "@/stores/event-registration";
import PersonDetails from "./PersonDetails";

export default function RegistrationDetails() {
	const { formData } = useEventRegistrationStore();
	return (
		<FieldSet>
			<PersonDetails
				headerLabel="Registrant Details"
				name={formData.name}
				email={formData.email}
				phone={formData.phone}
			/>

			<Item variant={"outline"}>
				<ItemHeader>
					<h3>Affiliation</h3>
				</ItemHeader>
				<ItemContent>
					<p>{formData.affiliation}</p>
				</ItemContent>
			</Item>
			{formData.otherPeople && formData.otherPeople?.length > 0 && (
				<Item variant={"muted"}>
					<ItemHeader>
						<h3>Other People</h3>
					</ItemHeader>
					<ItemContent>
						{formData.otherPeople.map((person, index) => (
							<PersonDetails
								key={person.email}
								name={person.name}
								email={person.email}
								phone={person.phone}
								headerLabel={`Person ${index + 1}`}
							/>
						))}
					</ItemContent>
				</Item>
			)}
		</FieldSet>
	);
}
