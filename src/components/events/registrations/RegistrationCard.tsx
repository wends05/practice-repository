import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
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
  registration: Doc<"registration">;
}
export default function RegistrationCard({
  registration,
}: RegistrationItemProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{registration.name}</CardTitle>
        <CardDescription>
          Email: {registration.email} - Paid: {registration.paid ? "Yes" : "No"}
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <ConfirmDeleteDialog registrationId={registration._id} />
      </CardFooter>
    </Card>
  );
}
