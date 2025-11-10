"use client";
import { useId } from "react";
import { useFieldContext } from "@/forms/_formHooks";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";

interface FormInputProps {
	label: string;
	placeholder?: string;
	type: React.HTMLInputTypeAttribute;
}

export default function FormInput({
	label,
	type,
	placeholder,
}: FormInputProps) {
	const id = useId();
	const field = useFieldContext<string>();
	return (
		<Field>
			<FieldLabel htmlFor={id}>{label}</FieldLabel>
			<Input
				name={field.name}
				id={id}
				value={field.state.value}
				type={type}
				placeholder={placeholder}
				onChange={(e) => field.handleChange(e.target.value)}
				onBlur={field.handleBlur}
			/>
			<FieldError errors={field.state.meta.errors} />
		</Field>
	);
}
