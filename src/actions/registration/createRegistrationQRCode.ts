"use server";
import { fetchMutation } from "convex/nextjs";
import Cryptr from "cryptr";
import QRCode from "qrcode";
import type { EventRegisterForm } from "@/schema/Registration";
import { api } from "../../../convex/_generated/api";
import type { Id } from "../../../convex/_generated/dataModel";
import { CRYPTR_SECRET } from "..";

export const createRegistrationQRCode = async (
	eventId: string,
	registrationData: EventRegisterForm,
) => {
	console.log("Generating QR Code for registration data:", registrationData);

	await fetchMutation(api.registrations.createRegistration, {
		eventId: eventId as Id<"events">,
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
	const registrants = [
		{
			name: registrationData.name,
			email: registrationData.email,
		},
		...(registrationData.otherPeople || []).map((person) => ({
			name: person.name,
			email: person.email,
		})),
	];

	const qrCodes = await Promise.all(
		registrants.map(async (registrant) => {
			const qrcodePattern = `IBC-${eventId}-REGISTRATION-${registrant.name}-${registrant.email}`;
			const encryptedData = cryptr.encrypt(qrcodePattern);
			const qrCodeDataURL = await QRCode.toDataURL(encryptedData, {
				errorCorrectionLevel: "H",
				type: "image/png",
			});
			return {
				name: registrant.name,
				email: registrant.email,
				qrCodeDataURL,
			};
		}),
	);

	return qrCodes;
};
