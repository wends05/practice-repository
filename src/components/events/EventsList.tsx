"use client";

import { preloadedQueryResult } from "convex/nextjs";
import type { Preloaded } from "convex/react";
import type { api } from "../../../convex/_generated/api";
import EventCard from "./EventCard";

interface EventsListProps {
	preloadedEvents: Preloaded<typeof api.events.getAllEvents>;
}

export default function EventsList({ preloadedEvents }: EventsListProps) {
	const events = preloadedQueryResult(preloadedEvents);
	return (
		<div className="space-y-5">
			<h1>Events List</h1>
			<ul className="space-y-3">
				{events.map((event) => (
					<EventCard key={event._id} event={event} />
				))}
			</ul>
		</div>
	);
}
