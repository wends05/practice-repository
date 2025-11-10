import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createEvent = mutation({
	args: {
		name: v.string(),
		date: v.string(),
		location: v.string(),
		description: v.optional(v.string()),
	},
	handler: async (ctx, args) => {
		const eventId = await ctx.db.insert("events", {
			name: args.name,
			date: args.date,
			location: args.location,
			description: args.description,
		});
		return eventId;
	},
});

export const getEventById = query({
	args: {
		eventId: v.id("events"),
	},
	handler: async (ctx, args) => {
		const event = await ctx.db.get(args.eventId);
		return event;
	},
});

export const getAllEvents = query({
	handler: async (ctx) => {
		const events = await ctx.db.query("events").collect();
		return events;
	},
});

export const getRegistrationsByEventId = query({
	args: {
		eventId: v.id("events"),
	},
	handler: async (ctx, args) => {
		const registrations = await ctx.db
			.query("registrants")
			.withIndex("by_event", (q) => q.eq("eventId", args.eventId))
			.collect();

		return Promise.all(
			registrations.map(async (registrant) => {
				const registration = await ctx.db.get(registrant.registrationId);
				if (!registration) {
					throw new Error("Registration not found");
				}
				return {
					...registrant,
					paymentMethod: registration?.paymentMethod,
				};
			}),
		);
	},
});
