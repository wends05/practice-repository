"use server";

import { fetchMutation } from "convex/nextjs";
import { api } from "../../../convex/_generated/api";
import type { Id } from "../../../convex/_generated/dataModel";

export const deleteRegistrant = async (registrantId: Id<"registrants">) => {
	await fetchMutation(api.registrations.deleteRegistrant, {
		registrantId,
	});
};
