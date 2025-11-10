import { Trash } from "lucide-react";
import { useState } from "react";
import { deleteRegistrant } from "@/actions/registration/deleteRegistration";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import type { Id } from "../../../../convex/_generated/dataModel";

interface ConfirmDeleteDialogProps {
	registrantId: Id<"registrants">;
}
export default function ConfirmDeleteDialog({
	registrantId,
}: ConfirmDeleteDialogProps) {
	const [isOpen, setIsOpen] = useState(false);

	const handleDelete = async () => {
		await deleteRegistrant(registrantId);
		setIsOpen(false);
	};
	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button variant={"destructive"}>
					<Trash />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogTitle>Confirm Deletion</DialogTitle>
				<DialogDescription>
					Are you sure you want to delete this registration? This action cannot
					be undone.
				</DialogDescription>
				<DialogFooter>
					<DialogClose>Cancel</DialogClose>
					<Button variant="destructive" onClick={handleDelete}>
						Delete
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
