import { createGoogleGenerativeAI } from "@ai-sdk/google";
import type { LanguageModel } from "ai";
import { env } from "../utils/env";

export const googleProvider = createGoogleGenerativeAI({
  apiKey: env.GEMINI_API_KEY,
});

export const gemini2FlashModel: LanguageModel = googleProvider("gemini-2.0-flash");
