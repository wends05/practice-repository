"use server";

import { fetchMutation } from "convex/nextjs";
import { ConvexError } from "convex/values";
import Cryptr from "cryptr";
import { parseIBCString } from "@/lib/utils";
import { api } from "../../../convex/_generated/api";
import type { Id } from "../../../convex/_generated/dataModel";
import { CRYPTR_SECRET } from "..";

export const scanRegistrationQRCode = async (qrCodeData: string) => {
  const cryptr = new Cryptr(CRYPTR_SECRET);
  const decryptedData = cryptr.decrypt(qrCodeData);

  const parsedQRCode = parseIBCString(decryptedData);

  if (!parsedQRCode) {
    throw new Error("Invalid QR code data");
  }
  try {
    const registrationData = await fetchMutation(
      api.registrations.checkInRegistrant,
      {
        eventId: parsedQRCode.eventId as Id<"events">,
        email: parsedQRCode.email,
      }
    );

    return {
      message: "Checked In successfully",
      data: registrationData,
    };
  } catch (error) {
    if (error instanceof ConvexError) {
      const { data, message } = error.data;

      if (data)
        return {
          message,
          data,
        };
      throw new Error(message);
    }
    throw error;
  }
};
