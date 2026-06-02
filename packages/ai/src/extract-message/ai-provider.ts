import { createGoogleGenerativeAI } from "@ai-sdk/google";
import type { LanguageModel } from "ai";
import { env } from "../utils/env";

export const googleProvider = createGoogleGenerativeAI({
  apiKey: env.GEMINI_API_KEY,
});

export const gemini2FlashModel: LanguageModel = googleProvider("gemini-2.5-flash-lite");

/**
 * NOTE: Here I cached the system context -> it is available for Paid tire -> charges 1$ per hour. -> It is better to cache the system context as it doesn't change frequently and it will save cost and also improve performance. -> with cached token per request can be completed with average 67 tokens, where as otehrwise it will take average 2k tokens per request.
 * 
 * import {  google, type GoogleLanguageModelOptions } from "@ai-sdk/google";
 * import { SYSTEM_PROMPT } from "./system-prompt";
 * import { GoogleGenAI } from "@google/genai";
 * export const ai = new GoogleGenAI({
    apiKey: env.GEMINI_API_KEY,
  });
 * export const MODEL = "gemini-2.5-flash";

 * let cachedContentName: string | null = null;

 * let cacheExpireTime: Date | null = null;
 *  export async function getCachedContentName(): Promise<string> {
   const isExpired = !cacheExpireTime || new Date() >= cacheExpireTime;

   if (cachedContentName && !isExpired) {
     return cachedContentName;
   }

   const cache = await ai.caches.create({
     model: MODEL,
     config: {
       systemInstruction: SYSTEM_PROMPT,
       ttl: "300s",
     },
   });

   cachedContentName = cache.name!;
   cacheExpireTime = new Date(cache.expireTime!);

   console.log("[ai] cache created, expires at:", cacheExpireTime);

   return cachedContentName;
 }

 */
