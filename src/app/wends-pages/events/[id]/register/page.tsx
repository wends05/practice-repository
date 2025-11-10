import { fetchQuery } from "convex/nextjs";
import RegisterForm from "@/forms/register-form/RegisterForm";
import { api } from "../../../../../../convex/_generated/api";
import type { Id } from "../../../../../../convex/_generated/dataModel";

export default async function RegisterPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const event = await fetchQuery(api.events.getEventById, {
		eventId: id as Id<"events">,
	});

	if (!event) {
		return <div>Event not found</div>;
	}
	return <RegisterForm event={event} />;
}
