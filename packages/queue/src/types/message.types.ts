import { z } from "zod";

export const incomingMessageJobSchema = z.object({
  rawText: z.string(),
  userPhone: z.string(),
  messageId: z.string(),
});

export const replyMessageJobSchema = z.object({
  message: z.string(),
  userPhone: z.string(),
});

export enum MessageQueueNameEnum {
  IncomingMessageProcess = "incoming-message-process",
  ReplyMessageProcess = "reply-message-process",
}

export type IncomingMessageJobData = z.infer<typeof incomingMessageJobSchema>;
export type ReplyMessageJobData = z.infer<typeof replyMessageJobSchema>;
