"use server";

import { fetchMutation } from "convex/nextjs";
import { parseIBCString } from "@/lib/utils";
import { api } from "../../../convex/_generated/api";
import type { Id } from "../../../convex/_generated/dataModel";
import Cryptr from "cryptr";
import { CRYPTR_SECRET } from "..";

export const scanRegistrationQRCode = async (qrCodeData: string) => {
  const cryptr = new Cryptr(CRYPTR_SECRET);
  const decryptedData = cryptr.decrypt(qrCodeData);

  const parsedQRCode = parseIBCString(decryptedData);

  if (!parsedQRCode) {
    throw new Error("Invalid QR code data");
  }

  const registrationData = await fetchMutation(
    api.registration.markRegistrationAsPaid,
    {
      eventId: parsedQRCode.eventId as Id<"event">,
      email: parsedQRCode.email,
    }
  );

  return registrationData;
};
