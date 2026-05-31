import { Worker } from "bullmq";
import { redisConnection } from "../client/redis";
import type { IncomingMessageJobData } from "../types";

export function incomingMessageWorker(handler: (job: IncomingMessageJobData) => Promise<void>) {
  return new Worker<IncomingMessageJobData>(
    "incoming-message-process",
    async (job) => await handler(job.data),
    {
      connection: redisConnection,
      concurrency: 10,
    }
  );
}
