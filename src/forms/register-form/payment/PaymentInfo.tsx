import { DollarSign, User } from "lucide-react";
import {
  Item,
  ItemContent,
  ItemFooter,
  ItemHeader,
} from "@/components/ui/item";
import { useEventRegistrationStore } from "@/stores/event-registration";

export default function PaymentInfo() {
  const { formData } = useEventRegistrationStore();
  const numberOfPeople = 1 + (formData.otherPeople?.length || 0);
  const totalPrice = 200 * numberOfPeople; // Assuming each registrant costs $200
  return (
    <Item variant="outline">
      <ItemHeader>Payment</ItemHeader>
      <ItemContent>
        <span className="flex gap-2 items-center">
          <User /> Number of People: {numberOfPeople}
        </span>
        <span className="flex gap-2 items-center">
          <DollarSign /> Price per Person: ₱200
        </span>
      </ItemContent>
      <ItemFooter>
        <h4 className="mt-4 font-bold text-lg flex gap-2 items-center">
          Total: ${totalPrice}
        </h4>
      </ItemFooter>
    </Item>
  );
}
