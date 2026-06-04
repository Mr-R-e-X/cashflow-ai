import { Queue } from "bullmq";
import { redisConnection } from "../client/redis";
import {
  MessageQueueNameEnum,
  type IncomingMessageJobData,
  type ReplyMessageJobData,
} from "../types";

export const incomingMessageProcessingQueue = new Queue<IncomingMessageJobData>(
  MessageQueueNameEnum.IncomingMessageProcess,
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

export const replyMessageProcessingQueue = new Queue<ReplyMessageJobData>(
  MessageQueueNameEnum.ReplyMessageProcess,
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
