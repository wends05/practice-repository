import Image from "next/image";
import { useRef } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";

import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupInput,
} from "@/components/ui/input-group";
import { Item, ItemContent, ItemHeader } from "@/components/ui/item";
import type useEventRegisterStep2Form from "@/hooks/useEventRegisterStep2";
import { PaymentMethodSchema } from "@/schema/PaymentMethod";

interface PaymentMethodProps {
	f: ReturnType<typeof useEventRegisterStep2Form>;
}
export default function PaymentMethod({ f }: PaymentMethodProps) {
	const imageRef = useRef<HTMLInputElement | null>(null);
	const handleRemoveFile = () => {
		if (imageRef.current) {
			imageRef.current.value = "";
		}
		f.setFieldValue("paymentProofImage", undefined);
	};

	return (
		<>
			<f.AppField
				name="paymentMethod"
				listeners={{
					onChange: ({ value }) => {
						if (value === "ONSITE") {
							f.setFieldValue("paymentProofImage", undefined);
						}
					},
				}}
			>
				{(field) => (
					<field.FormSelect
						items={PaymentMethodSchema.options}
						label="Payment Method"
					/>
				)}
			</f.AppField>
			<f.Subscribe
				selector={(s) => ({
					paymentMethod: s.values.paymentMethod,
					paymentProofImage: s.values.paymentProofImage,
				})}
			>
				{({ paymentMethod, paymentProofImage }) => {
					const imageUrl = paymentProofImage
						? URL.createObjectURL(paymentProofImage)
						: "";

					return (
						paymentMethod === "BPI" && (
							<Item variant={"outline"}>
								<ItemHeader>
									BPI Account Details: 1234-5678-9012 (Account Name: ABC Events)
								</ItemHeader>
								<ItemContent>
									<f.AppField
										name="paymentProofImage"
										validators={{
											onChange: ({ value, fieldApi }) => {
												const paymentMethod =
													fieldApi.form.getFieldValue("paymentMethod");
												if (paymentMethod === "BPI" && !value) {
													return "Payment proof is required for BPI payments";
												}
												return undefined;
											},
										}}
									>
										{(field) => (
											<>
												{imageUrl && (
													<AspectRatio ratio={16 / 9} className="mb-4">
														<Image
															src={imageUrl}
															alt="Proof of Payment Image"
															className="object-contain"
															fill
														/>
													</AspectRatio>
												)}
												<Field>
													<FieldLabel>Upload Proof of Payment</FieldLabel>
													<InputGroup>
														<InputGroupAddon align={"inline-end"}>
															<InputGroupButton
																onClick={handleRemoveFile}
																variant={"destructive"}
															>
																Remove File
															</InputGroupButton>
														</InputGroupAddon>
														<InputGroupInput
															ref={imageRef}
															type="file"
															accept="image/*,application/pdf"
															onChange={(e) => {
																const file = e.target.files?.[0];
																if (!file) return;
																field.handleChange(file);
															}}
															placeholder="Upload your payment proof here"
														/>
													</InputGroup>
													<FieldError
														errors={field.state.meta.errors.map((message) => ({
															message:
																typeof message === "string"
																	? message
																	: message?.message,
														}))}
													/>
												</Field>
											</>
										)}
									</f.AppField>
								</ItemContent>
							</Item>
						)
					);
				}}
			</f.Subscribe>
		</>
	);
}
