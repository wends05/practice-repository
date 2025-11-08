import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import type { Id } from "../../../convex/_generated/dataModel";

export const useEventDetails = (eventId: Id<"event">) => {
  const eventDetailsPreloaded = useQuery(api.events.getEventById, {
    eventId,
  });
  return eventDetailsPreloaded;
};
