import { ConvexError, v } from "convex/values";
import { mutation } from "./_generated/server";

export const createRegistration = mutation({
	args: {
		eventId: v.id("events"),
		registrationData: v.object({
			name: v.string(),
			email: v.string(),
			phone: v.string(),
			affiliation: v.string(),
			date: v.optional(v.string()),
			otherPeople: v.optional(
				v.array(
					v.object({
						name: v.string(),
						email: v.string(),
						phone: v.string(),
					}),
				),
			),
			paymentMethod: v.string(),
		}),
	},
	handler: async (ctx, args) => {
		const registration = await ctx.db.insert("registrations", {
			affiliation: args.registrationData.affiliation,
			paymentMethod: args.registrationData.paymentMethod,
			date: args.registrationData.date || new Date().toISOString(),
			eventId: args.eventId,
		});
		await ctx.db.insert("registrants", {
			name: args.registrationData.name,
			email: args.registrationData.email,
			phone: args.registrationData.phone,
			eventId: args.eventId,
			registrationId: registration,
			isPointPerson: true,
		});

		if (args.registrationData.otherPeople) {
			for (const person of args.registrationData.otherPeople) {
				await ctx.db.insert("registrants", {
					name: person.name,
					email: person.email,
					phone: person.phone,
					eventId: args.eventId,
					registrationId: registration,
					isPointPerson: false,
				});
			}
		}
		return registration;
	},
});

export const checkRegistrationPayment = mutation({
	args: {
		eventId: v.id("events"),
		email: v.string(),
	},
	handler: async (ctx, args) => {
		const registration = ctx.db
			.query("registrants")
			.withIndex("by_event_and_email", (q) =>
				q.eq("eventId", args.eventId).eq("email", args.email),
			);
		return registration !== null;
	},
});

export const markRegistrationAsPaid = mutation({
	args: {
		eventId: v.id("events"),
		email: v.string(),
	},
	handler: async (ctx, args) => {
		// check if the registration is already paid
		const existingRegistration = await ctx.db
			.query("registrants")
			.withIndex("by_event_and_email", (q) =>
				q.eq("eventId", args.eventId).eq("email", args.email),
			)
			.first();

		if (!existingRegistration) {
			throw new ConvexError("Registration not found");
		}
		if (existingRegistration.paid) {
			throw new ConvexError("Registration is already marked as paid");
		}

		// mark the registration as paid
		const registration = await ctx.db
			.query("registrants")
			.withIndex("by_event_and_email", (q) =>
				q.eq("eventId", args.eventId).eq("email", args.email),
			)
			.first();
		if (!registration) throw new Error("Registration not found");
		await ctx.db.patch(registration._id, { paid: true });
		return ctx.db.get(registration._id);
	},
});

export const checkInRegistrant = mutation({
	args: {
		eventId: v.id("events"),
		email: v.string(),
	},
	handler: async (ctx, args) => {
		// check if the registration is already paid
		const existingRegistration = await ctx.db
			.query("registrants")
			.withIndex("by_event_and_email", (q) =>
				q.eq("eventId", args.eventId).eq("email", args.email),
			)
			.first();

		if (!existingRegistration) {
			throw new ConvexError({ message: "Registration not found" });
		}
		if (!existingRegistration.paid) {
			const event = await ctx.db.get(args.eventId);
			if (!event) {
				throw new ConvexError({ message: "Event not found" });
			}
			throw new ConvexError({
				message: `This person has not paid yet for event: ${event.name}`,
				data: existingRegistration,
			});
		}
		if (existingRegistration.checkedIn) {
			throw new ConvexError({
				data: existingRegistration,
				message: "Registration is already marked as checked in",
			});
		}

		// mark the registration as checked in
		const registration = await ctx.db
			.query("registrants")
			.withIndex("by_event_and_email", (q) =>
				q.eq("eventId", args.eventId).eq("email", args.email),
			)
			.first();
		if (!registration) throw new Error("Registration not found");
		await ctx.db.patch(registration._id, { checkedIn: true });
		return ctx.db.get(registration._id);
	},
});

export const deleteRegistrant = mutation({
	args: {
		registrantId: v.id("registrants"),
	},
	handler: async (ctx, args) => {
		await ctx.db.delete(args.registrantId);
	},
});
export const setPaidAndCheckedIn = mutation({
	args: {
		registrantId: v.id("registrants"),
	},
	handler: async (ctx, args) => {
		await ctx.db.patch(args.registrantId, { paid: true, checkedIn: true });
		return ctx.db.get(args.registrantId);
	},
});
