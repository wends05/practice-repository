import { Calendar, MapPin } from "lucide-react";
import Link from "next/link";
import type { Doc } from "../../../convex/_generated/dataModel";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";

interface Event {
	event: Doc<"events">;
}
export default function EventCard({ event }: Event) {
	return (
		<Card>
			<CardHeader>
				<h2>{event.name}</h2>
			</CardHeader>
			<CardContent>
				<p>{event.description}</p>
			</CardContent>
			<CardFooter className="space-x-2 flex flex-col items-start gap-3">
				<div className="space-y-4">
					<div className="flex gap-3 items-center">
						<Calendar />
						<span>{event.date}</span>
					</div>
					<div className="flex gap-3 items-center">
						<MapPin />
						<span>{event.location}</span>
					</div>
				</div>
				<div className="space-x-2">
					<Link href={`/wends-pages/events/${event._id}/register`}>
						<Button>Register</Button>
					</Link>
					<Link href={`/wends-pages/events/${event._id}`}>
						<Button variant={"outline"}>View Details</Button>
					</Link>
					<Link href={`/wends-pages/events/${event._id}/registrations`}>
						<Button variant={"outline"}>View Registrations</Button>
					</Link>
				</div>
			</CardFooter>
		</Card>
	);
}
