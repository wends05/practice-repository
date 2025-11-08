"use server";
import Cryptr from "cryptr";

export const CRYPTR_SECRET = process.env.CRYPTR_SECRET || "SampleSecretKey";
