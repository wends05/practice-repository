"use client";
import { type Preloaded, usePreloadedQuery } from "convex/react";
import type { api } from "../../../../convex/_generated/api";
import RegistrationCard from "./RegistrationCard";

interface EventRegistrationsProps {
	preloadedEventRegistrations: Preloaded<
		typeof api.events.getRegistrationsByEventId
	>;
}
export default function EventRegistrationList({
	preloadedEventRegistrations,
}: EventRegistrationsProps) {
	const eventRegistrations = usePreloadedQuery(preloadedEventRegistrations);

	if (eventRegistrations.length === 0) {
		return <p>No registrations found for this event yet.</p>;
	}

	return (
		<ul className="space-y-3">
			{eventRegistrations.map((registration) => (
				<RegistrationCard
					registrantWithPaymentMethod={registration}
					key={registration._id}
				/>
			))}
		</ul>
	);
}
