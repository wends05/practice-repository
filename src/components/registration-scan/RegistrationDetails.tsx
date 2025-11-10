import { useQuery } from "convex/react";
import { useState } from "react";
import { setPaidAndCheckedIn } from "@/actions/registration/setPaidAndCheckedIn";
import { useScanRegistrationStore } from "@/stores/scan-registration";
import { api } from "../../../convex/_generated/api";
import type { Doc } from "../../../convex/_generated/dataModel";
import { Button } from "../ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../ui/card";

interface RegistrationDetailsProps {
	scannedRegistrationData: Doc<"registrants">;
	setPaused: (pause: boolean) => void;
}

export default function RegistrationDetails({
	scannedRegistrationData,
	setPaused,
}: RegistrationDetailsProps) {
	const event = useQuery(api.events.getEventById, {
		eventId: scannedRegistrationData.eventId,
	});

	const resetData = useScanRegistrationStore((state) => state.resetData);
	const setScannedRegistrationData = useScanRegistrationStore(
		(store) => store.setScannedRegistrationData,
	);

	const [loading, setLoading] = useState(false);
	if (!event) {
		return <p>Loading event details...</p>;
	}

	const handleClear = () => {
		resetData();
		setPaused(false);
	};

	const handleCheckIn = async () => {
		setLoading(true);
		const newRegistrationData = await setPaidAndCheckedIn(
			scannedRegistrationData._id,
		);
		setScannedRegistrationData(newRegistrationData);
		setLoading(false);
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>Registration Details</CardTitle>
			</CardHeader>
			<CardContent className="h-full">
				{scannedRegistrationData ? (
					<div>
						<div>Name: {scannedRegistrationData.name}</div>
						<div>Email: {scannedRegistrationData.email}</div>
						<div>Event name: {event?.name}</div>
						<div>Paid: {scannedRegistrationData.paid ? "Yes" : "No"}</div>
						<div>
							Checked In: {scannedRegistrationData.checkedIn ? "Yes" : "No"}
						</div>

						{!scannedRegistrationData.paid && (
							<div className="text-red-600 font-semibold">
								<div>Warning: This registration has not yet paid</div>
								<Button className="mt-2" onClick={handleCheckIn}>
									{loading
										? "Loading..."
										: "Mark this person as Paid and checked in"}
								</Button>
							</div>
						)}
					</div>
				) : (
					<p>No registration data available</p>
				)}
			</CardContent>
			<CardFooter>
				<Button onClick={handleClear}>Clear</Button>
			</CardFooter>
		</Card>
	);
}
