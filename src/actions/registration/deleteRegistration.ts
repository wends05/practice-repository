"use server";

import { fetchMutation } from "convex/nextjs";
import { api } from "../../../convex/_generated/api";
import type { Id } from "../../../convex/_generated/dataModel";

export const deleteRegistration = async (
  registrationId: Id<"registration">
) => {
  await fetchMutation(api.registration.deleteRegistration, {
    registrationId: registrationId,
  });
};
