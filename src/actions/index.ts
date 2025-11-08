import Cryptr from "cryptr";

export const CRYPTR_SECRET = process.env.CRYPTR_SECRET || "SampleSecretKey";
export const cryptr = new Cryptr(CRYPTR_SECRET);
