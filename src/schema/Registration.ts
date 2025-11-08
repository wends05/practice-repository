import z from "zod";
import { PaymentMethodSchema } from "./PaymentMethod";

export const RegistrantSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
});

export const EventRegisterFormSchema = RegistrantSchema.extend({
  paymentMethod: PaymentMethodSchema,
  paymentProofImage: z.instanceof(File).optional(),
  date: z.date().default(new Date()),
  affiliation: z.string().min(1, "Affiliation is required").max(200),
  otherPeople: z.array(RegistrantSchema).optional(),
  qrCodeURL: z.string().optional(),
}).refine(
  (data) => {
    if (data.paymentMethod === "BPI") {
      return data.paymentProofImage !== undefined;
    }
    return true;
  },
  {
    error: "Payment proof image is required for BPI payment method",
    path: ["paymentProofImage"],
  }
);

export type EventRegisterForm = z.infer<typeof EventRegisterFormSchema>;

export const EventRegistrationQRCodeSchema = z.regex(
  /^IBC-[A-Za-z0-9]+-REGISTRATION-[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
);
