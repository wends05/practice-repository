import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import type { Doc } from "../../../../convex/_generated/dataModel";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";

interface RegistrationItemProps {
	registrantWithPaymentMethod: Doc<"registrants"> & {
		paymentMethod: Doc<"registrations">["paymentMethod"];
	};
}
export default function RegistrationCard({
	registrantWithPaymentMethod,
}: RegistrationItemProps) {
	return (
		<li>
			<Card>
				<CardHeader>
					<CardTitle>{registrantWithPaymentMethod.name}</CardTitle>
					<CardDescription>
						<div className="">
							<div>Email: {registrantWithPaymentMethod.email}</div>
							<div>
								Payment Method: {registrantWithPaymentMethod.paymentMethod}
							</div>
							<div>Paid: {registrantWithPaymentMethod.paid ? "Yes" : "No"}</div>
							<div>
								Checked In:{" "}
								{registrantWithPaymentMethod.checkedIn ? "Yes" : "No"}
							</div>
						</div>
					</CardDescription>
				</CardHeader>
				<CardFooter>
					<ConfirmDeleteDialog registrantId={registrantWithPaymentMethod._id} />
				</CardFooter>
			</Card>
		</li>
	);
}
