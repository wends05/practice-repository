"use client";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import type { Doc } from "../../../convex/_generated/dataModel";
import { Button } from "../ui/button";
import { Item, ItemContent, ItemHeader } from "../ui/item";

interface EventInformationProps {
  event: Doc<"events">;
}
export default function EventPage({ event }: EventInformationProps) {
  const { id } = useParams();

  if (!event) {
    return notFound();
  }
  return (
    <div className="h-full pb-10 space-y-3">
      <Item variant={"outline"}>
        <ItemHeader>
          <h4>{event.name}</h4>
        </ItemHeader>
        <ItemContent>
          <div className="text-neutral-500">Description</div>
          <div>{event.description}</div>
        </ItemContent>
      </Item>
      <div className="space-x-3">
        <Link href={`/wends-pages/events/${id}/register`}>
          <Button>Register</Button>
        </Link>
        <Link href={`/wends-pages/events/${id}/registrations`}>
          <Button>View Registrations</Button>
        </Link>
      </div>
    </div>
  );
}
