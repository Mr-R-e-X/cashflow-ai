import { z } from "zod";

export const incomingMessageJobSchema = z.object({
  rawText: z.string(),
  userPhone: z.string(),
  messageId: z.string(),
});

export type IncomingMessageJobData = z.infer<typeof incomingMessageJobSchema>;
