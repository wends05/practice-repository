import { preloadQuery } from "convex/nextjs";
import EventComponent from "@/components/events/EventComponent";
import { api } from "../../../../../convex/_generated/api";
import type { Id } from "../../../../../convex/_generated/dataModel";

export default async function EventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const preloadedEventInformation = await preloadQuery(
    api.events.getEventById,
    {
      eventId: id as Id<"event">,
    }
  );

  if (!preloadedEventInformation) {
    return <div>Event not found</div>;
  }
  return (
    <EventComponent preloadedEventInformation={preloadedEventInformation} />
  );
}
