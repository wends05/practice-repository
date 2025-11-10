import { fetchQuery, preloadQuery } from "convex/nextjs";
import RegistrationPage from "@/components/events/registrations/RegistrationPage";
import { api } from "../../../../../../convex/_generated/api";
import type { Id } from "../../../../../../convex/_generated/dataModel";

export default async function Registrations({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const preloadedEventRegistrations = await preloadQuery(
		api.events.getRegistrationsByEventId,
		{
			eventId: id as Id<"events">,
		},
	);

	const event = await fetchQuery(api.events.getEventById, {
		eventId: id as Id<"events">,
	});

	if (!event) {
		return <div>Event not found</div>;
	}
	return (
		<RegistrationPage
			preloadedEventRegistrations={preloadedEventRegistrations}
			event={event}
		/>
	);
}
