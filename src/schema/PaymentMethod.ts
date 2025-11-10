import * as z from "zod";

export const PaymentMethodSchema = z.enum(["BPI", "ONSITE"]);
