import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import type { Doc } from "../../../convex/_generated/dataModel";

interface RegistrationDetailsProps {
  scannedRegistrationData: Doc<"registration">;
}

export default function RegistrationDetails({
  scannedRegistrationData,
}: RegistrationDetailsProps) {
  const event = useQuery(api.events.getEventById, {
    eventId: scannedRegistrationData.eventId,
  });

  if (!event) {
    return <p>Loading event details...</p>;
  }

  return (
    <div>
      <h2>Registration Details</h2>
      {scannedRegistrationData ? (
        <ul>
          <li>Name: {scannedRegistrationData.name}</li>
          <li>Email: {scannedRegistrationData.email}</li>
          <li>Event name: {event?.name}</li>
          <li>Paid: {scannedRegistrationData.paid ? "Yes" : "No"}</li>
        </ul>
      ) : (
        <p>No registration data available</p>
      )}
    </div>
  );
}
