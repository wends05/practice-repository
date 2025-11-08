"use server";
import { fetchMutation } from "convex/nextjs";
import QRCode from "qrcode";
import type { EventRegisterForm } from "@/schema/Registration";
import { api } from "../../../convex/_generated/api";
import type { Id } from "../../../convex/_generated/dataModel";
import Cryptr from "cryptr";
import { CRYPTR_SECRET } from "..";

export const createRegistrationQRCode = async (
  eventId: string,
  registrationData: EventRegisterForm
) => {
  console.log("Generating QR Code for registration data:", registrationData);

  await fetchMutation(api.registration.createRegistration, {
    eventId: eventId as Id<"event">,
    registrationData: {
      name: registrationData.name,
      email: registrationData.email,
      paymentMethod: registrationData.paymentMethod,
      affiliation: registrationData.affiliation,
      phone: registrationData.phone,
      date: new Date().toISOString(),
      otherPeople: registrationData.otherPeople,
    },
  });

  const cryptr = new Cryptr(CRYPTR_SECRET);

  const qrcodePattern = `IBC-${eventId}-REGISTRATION-${registrationData.name}-${registrationData.email}`;
  const encryptedData = cryptr.encrypt(qrcodePattern);
  const qrCodeDataURL = await QRCode.toDataURL(encryptedData, {
    errorCorrectionLevel: "H",
    type: "image/png",
  });

  console.log("Generated QR Code Data URL:", qrCodeDataURL);
  return qrCodeDataURL;
};
