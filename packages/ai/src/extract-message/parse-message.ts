import { generateText, Output } from "ai";
import { TransactionSchema, type TransactionIntent } from "../schema";
import { gemini2FlashModel } from "./ai-provider";
import { SYSTEM_PROMPT } from "./system-prompt";

export async function parseMessage(rawText: string): Promise<TransactionIntent> {
  const { output } = await generateText({
    model: gemini2FlashModel,
    system: SYSTEM_PROMPT,
    prompt: rawText,
    output: Output.object({
      schema: TransactionSchema,
    }),
  });

  return output;
}

/**
 * For Paid service we can use cached system call.
 * 
 * import { getCachedContentName, MODEL } from "./ai-provider";
 * export async function parseMessage(rawText: string): Promise<TransactionIntent> {
  const cachedContent = await getCachedContentName();

  const { output, providerMetadata } = await generateText({
    model: MODEL,
    prompt: rawText,
    output: Output.object({
      schema: TransactionSchema,
    }),
    providerOptions: {
      google: {
        cachedContent,
      },
    },
  });
  console.log("Cached Tokens, ", providerMetadata?.cachedTokens);
  return output;
}
 */
