import { preloadQuery } from "convex/nextjs";
import EventsList from "@/components/events/EventsList";
import { api } from "../../../../convex/_generated/api";

export default async function EventsPage() {
	const preloadedEvents = await preloadQuery(api.events.getAllEvents);
	return <EventsList preloadedEvents={preloadedEvents} />;
}
