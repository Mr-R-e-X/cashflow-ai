import { Worker } from "bullmq";
import { redisConnection } from "../client/redis";
import {
  MessageQueueNameEnum,
  type IncomingMessageJobData,
  type ReplyMessageJobData,
} from "../types";

export function incomingMessageWorker(handler: (job: IncomingMessageJobData) => Promise<void>) {
  return new Worker<IncomingMessageJobData>(
    MessageQueueNameEnum.IncomingMessageProcess,
    async (job) => await handler(job.data),
    {
      connection: redisConnection,
      concurrency: 20,
    }
  );
}

export function replyMessageWorker(handler: (job: ReplyMessageJobData) => Promise<void>) {
  return new Worker<ReplyMessageJobData>(
    MessageQueueNameEnum.ReplyMessageProcess,
    async (job) => await handler(job.data),
    {
      connection: redisConnection,
      concurrency: 20,
    }
  );
}
