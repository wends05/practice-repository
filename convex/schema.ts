import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const personRegistrationSchema = {
	name: v.string(),
	email: v.string(),
	phone: v.string(),
};

const paymentMethods = ["BPI", "ONSITE"];

export default defineSchema({
	events: defineTable({
		name: v.string(),
		date: v.string(),
		location: v.string(),
		description: v.optional(v.string()),
	}),
	registrations: defineTable({
		eventId: v.id("events"),
		affiliation: v.string(),
		paymentMethod: v.union(
			...paymentMethods.map((method) => v.literal(method)),
		),
		date: v.string(),
	}).index("by_event", ["eventId"]),
	registrants: defineTable({
		...personRegistrationSchema,
		eventId: v.id("events"),
		registrationId: v.id("registrations"),
		isPointPerson: v.boolean(),
		paid: v.optional(v.boolean()),
		checkedIn: v.optional(v.boolean()),
	})
		.index("by_event_and_email", ["eventId", "email"])
		.index("by_event", ["eventId"]),
});
