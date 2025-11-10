import * as z from "zod";

export const EventSchema = z.object({
  id: z.uuid(),
  name: z.string().min(1, "Event name is required"),
  date: z.date(),
  location: z.string().min(1, "Location is required"),
  description: z.string().optional(),
});

export type Event = z.infer<typeof EventSchema>;
