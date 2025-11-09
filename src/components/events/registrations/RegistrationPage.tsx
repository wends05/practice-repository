"use client";
import type { Preloaded } from "convex/react";
import type { api } from "../../../../convex/_generated/api";
import type { Doc } from "../../../../convex/_generated/dataModel";
import EventRegistrationList from "./RegistrationList";

interface RegistrationPageProps {
  preloadedEventRegistrations: Preloaded<
    typeof api.events.getRegistrationsByEventId
  >;
  event: Doc<"events">;
}
export default function RegistrationPage({
  preloadedEventRegistrations,
  event,
}: RegistrationPageProps) {
  return (
    <main className="space-y-5">
      <div>
        <h2>Registrations for: </h2>
        <h3>{event.name}</h3>
      </div>
      <EventRegistrationList
        preloadedEventRegistrations={preloadedEventRegistrations}
      />
    </main>
  );
}
