import { fetchQuery } from "convex/nextjs";
import EventComponent from "@/components/events/EventComponent";
import { api } from "../../../../../convex/_generated/api";
import type { Id } from "../../../../../convex/_generated/dataModel";

export default async function EventPage({
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
	return <EventComponent event={event} />;
}
