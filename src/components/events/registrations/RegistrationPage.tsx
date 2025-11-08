"use client";
import { type Preloaded, usePreloadedQuery } from "convex/react";
import type { api } from "../../../../convex/_generated/api";
import EventRegistrationList from "./RegistrationList";

interface RegistrationPageProps {
  preloadedEventRegistrations: Preloaded<
    typeof api.events.getRegistrationsByEventId
  >;
  preloadedEventDetails: Preloaded<typeof api.events.getEventById>;
}
export default function RegistrationPage({
  preloadedEventRegistrations,
  preloadedEventDetails,
}: RegistrationPageProps) {
  const event = usePreloadedQuery(preloadedEventDetails);
  return (
    <main className="space-y-5">
      <div>
        <h2>Registrations for: </h2>
        <h3>{event?.name}</h3>
      </div>
      <EventRegistrationList
        preloadedEventRegistrations={preloadedEventRegistrations}
      />
    </main>
  );
}
