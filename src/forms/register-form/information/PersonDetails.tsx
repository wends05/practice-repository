import { Item, ItemContent, ItemHeader } from "@/components/ui/item";

interface PersonDetailsProps {
	headerLabel: string;
	name: string;
	email: string;
	phone: string;
}

export default function PersonDetails({
	headerLabel,
	name,
	email,
	phone,
}: PersonDetailsProps) {
	return (
		<Item variant={"outline"}>
			<ItemHeader>
				<h3>{headerLabel}</h3>
			</ItemHeader>
			<ItemContent>
				<p>
					<strong>Name:</strong> {name}
				</p>
				<p>
					<strong>Email:</strong> {email}
				</p>
				<p>
					<strong>Phone:</strong> {phone}
				</p>
			</ItemContent>
		</Item>
	);
}
