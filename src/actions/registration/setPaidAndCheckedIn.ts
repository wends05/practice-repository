import { fetchMutation } from "convex/nextjs";
import { api } from "../../../convex/_generated/api";
import type { Id } from "../../../convex/_generated/dataModel";

export const setPaidAndCheckedIn = async (registrantId: Id<"registrants">) => {
  return await fetchMutation(api.registrations.setPaidAndCheckedIn, {
    registrantId,
  });
};
