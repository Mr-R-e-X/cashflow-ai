import { Queue } from "bullmq";
import { redisConnection } from "../client/redis";
import type { IncomingMessageJobData } from "../types";

export const incomingMessageProcessingQueue = new Queue<IncomingMessageJobData>(
  "incoming-message-process",
  {
    connection: redisConnection,
    defaultJobOptions: {
      attempts: 3,
      backoff: { type: "exponential", delay: 2000 },
      removeOnComplete: 100,
      removeOnFail: 500,
    },
  }
);
