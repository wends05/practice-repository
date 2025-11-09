import { Button } from "@/components/ui/button";
import { Item, ItemContent } from "@/components/ui/item";
import { useEventRegistrationStore } from "@/stores/event-registration";
import type { Doc } from "../../../convex/_generated/dataModel";

interface RegistrationPageStartProps {
  event: Doc<"events">;
}
export default function RegistrationPageStart({
  event,
}: RegistrationPageStartProps) {
  const nextStep = useEventRegistrationStore((state) => state.nextStep);

  return (
    <div>
      <Item>
        <ItemContent>
          {!event ? (
            <>No event found</>
          ) : (
            <>
              <h2>{event.name}</h2>
              <p>{event.description}</p>
              <p>
                Date: {new Date(event.date).toLocaleDateString()} at{" "}
                {new Date(event.date).toLocaleTimeString()}
              </p>
              <p>Location: {event.location}</p>
            </>
          )}
        </ItemContent>
      </Item>
      <div className=" flex gap-2 flex-col">
        <Button onClick={nextStep} className="w-full">
          Next
        </Button>
      </div>{" "}
    </div>
  );
}
