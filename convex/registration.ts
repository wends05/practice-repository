import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const createRegistration = mutation({
  args: {
    eventId: v.id("event"),
    registrationData: v.object({
      name: v.string(),
      email: v.string(),
      phone: v.string(),
      affiliation: v.string(),
      date: v.string(),
      otherPeople: v.optional(
        v.array(
          v.object({
            name: v.string(),
            email: v.string(),
            phone: v.string(),
          })
        )
      ),
      paymentMethod: v.string(),
    }),
  },
  handler: (ctx, args) => {
    return ctx.db.insert("registration", {
      ...args.registrationData,
      eventId: args.eventId,
      paid: false,
    });
  },
});

export const checkRegistrationPayment = mutation({
  args: {
    eventId: v.id("event"),
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const registration = ctx.db
      .query("registration")
      .withIndex("byEventAndEmail", (q) =>
        q.eq("eventId", args.eventId).eq("email", args.email)
      );
    return registration !== null;
  },
});

export const markRegistrationAsPaid = mutation({
  args: {
    eventId: v.id("event"),
    email: v.string(),
  },
  handler: async (ctx, args) => {
    // check if the registration is already paid
    const existingRegistration = await ctx.db
      .query("registration")
      .withIndex("byEventAndEmail", (q) =>
        q.eq("eventId", args.eventId).eq("email", args.email)
      )
      .first();
    if (!existingRegistration) {
      throw new Error("Registration not found");
    }
    if (existingRegistration.paid) {
      return existingRegistration;
    }

    // mark the registration as paid
    const registration = await ctx.db
      .query("registration")
      .withIndex("byEventAndEmail", (q) =>
        q.eq("eventId", args.eventId).eq("email", args.email)
      )
      .first();
    if (!registration) throw new Error("Registration not found");
    await ctx.db.patch(registration._id, { paid: true });
    return ctx.db.get(registration._id);
  },
});

export const deleteRegistration = mutation({
  args: {
    registrationId: v.id("registration"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.registrationId);
  },
});
