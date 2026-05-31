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
