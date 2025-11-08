import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const personRegistrationSchema = {
  name: v.string(),
  email: v.string(),
  phone: v.string(),
};

const paymentMethods = ["BPI", "ONSITE"];

export default defineSchema({
  event: defineTable({
    name: v.string(),
    date: v.string(),
    location: v.string(),
    description: v.optional(v.string()),
  }),
  registration: defineTable({
    ...personRegistrationSchema,
    eventId: v.id("event"),
    affiliation: v.string(),
    paymentMethod: v.union(
      ...paymentMethods.map((method) => v.literal(method))
    ),
    date: v.string(),
    otherPeople: v.optional(v.array(v.object(personRegistrationSchema))),

    paid: v.optional(v.boolean()),
  })
    .index("byEventAndEmail", ["eventId", "email"])
    .index("by_event", ["eventId"])
});
