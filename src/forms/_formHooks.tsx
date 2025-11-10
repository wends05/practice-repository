import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import FormInput from "@/components/form/FormInput";
import FormSelect from "@/components/form/FormSelect";

export const { fieldContext, formContext, useFieldContext, useFormContext } =
	createFormHookContexts();

export const { useAppForm, withForm } = createFormHook({
	fieldContext,
	formContext,
	fieldComponents: {
		FormInput,
		FormSelect,
	},
	formComponents: {},
});
