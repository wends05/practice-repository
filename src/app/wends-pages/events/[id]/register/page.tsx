import { preloadQuery } from "convex/nextjs";
import RegisterForm from "@/forms/register-form/RegisterForm";
import { api } from "../../../../../../convex/_generated/api";
import type { Id } from "../../../../../../convex/_generated/dataModel";

export default async function RegisterPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const preloadedEventData = await preloadQuery(api.events.getEventById, {
    eventId: id as Id<"event">,
  });
  return <RegisterForm preloadedEventData={preloadedEventData} />;
}
