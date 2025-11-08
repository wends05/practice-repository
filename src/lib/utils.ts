import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const IBCStringSchema = z.object({
  eventId: z.string(),
  name: z.string(),
  email: z.email(),
});

export type IBCData = z.infer<typeof IBCStringSchema>;

export function formatIBCString(eventId: string, name: string, email: string) {
  const validated = IBCStringSchema.parse({ eventId, name, email });
  return `IBC-${validated.eventId}-REGISTRATION-${validated.name}-${validated.email}`;
}

export function parseIBCString(ibcString: string): IBCData {
  const parts = ibcString.split("-REGISTRATION-");
  if (parts.length !== 2) {
    throw new Error("Invalid IBC string format");
  }

  const [prefix, details] = parts;
  const prefixParts = prefix.split("-");
  if (prefixParts.length < 2 || prefixParts[0] !== "IBC") {
    throw new Error("Invalid IBC string prefix");
  }

  const eventId = prefixParts.slice(1).join("-");
  const detailParts = details.split("-");
  if (detailParts.length < 2) {
    throw new Error("Invalid IBC string details");
  }

  const name = detailParts.slice(0, detailParts.length - 1).join("-");
  const email = detailParts[detailParts.length - 1];

  return IBCStringSchema.parse({ eventId, name, email });
}
