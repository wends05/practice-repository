"use client";
import { Button } from "@/components/ui/button";
import { FieldDescription, FieldLegend, FieldSet } from "@/components/ui/field";
import { Item, ItemContent, ItemHeader } from "@/components/ui/item";
import type useEventRegisterStep1Form from "@/hooks/useEventRegisterStep1";

interface OtherPeopleProps {
	f: ReturnType<typeof useEventRegisterStep1Form>;
}
export default function OtherPeople({ f }: OtherPeopleProps) {
	return (
		<Item variant={"outline"}>
			<ItemContent>
				<FieldSet>
					<FieldLegend>Other People</FieldLegend>
					<FieldDescription>
						Add other people you want to register for the event.
					</FieldDescription>
					<f.AppField name="otherPeople" mode="array">
						{(field) => (
							<>
								{field.state.value?.map((_, idx) => (
									// biome-ignore lint/suspicious/noArrayIndexKey: Needed for form logic
									<Item key={idx} variant={"outline"}>
										<ItemHeader className="text-xl">
											Person #{idx + 1}
										</ItemHeader>
										<f.AppField name={`otherPeople[${idx}].name`}>
											{(subField) => (
												<subField.FormInput
													label="Name"
													type="text"
													placeholder="Jane Doe"
												/>
											)}
										</f.AppField>

										<f.AppField name={`otherPeople[${idx}].email`}>
											{(subField) => (
												<subField.FormInput
													label="Email"
													type="email"
													placeholder="jane.doe@example.com"
												/>
											)}
										</f.AppField>
										<f.AppField name={`otherPeople[${idx}].phone`}>
											{(subField) => (
												<subField.FormInput
													label="Phone"
													type="tel"
													placeholder="09XXXXXXXXXX"
												/>
											)}
										</f.AppField>
										<Button
											type="button"
											variant="destructive"
											onClick={() => field.removeValue(idx)}
										>
											Remove Person
										</Button>
									</Item>
								))}
								<Button
									type="button"
									onClick={() =>
										field.pushValue({
											name: "",
											email: "",
											phone: "",
										})
									}
								>
									Add Person
								</Button>
							</>
						)}
					</f.AppField>
				</FieldSet>
			</ItemContent>
		</Item>
	);
}
