import { replyMessageWorker, type ReplyMessageJobData } from "@cashflow-ai/queue";

async function handleReplyMessage({ message, userPhone }: ReplyMessageJobData) {}

export async function startReplyWorker() {
  const worker = replyMessageWorker(handleReplyMessage);

  worker.on("completed", (job) => console.log(`[reply-worker] done ${job.id}`));
  worker.on("failed", (job, err) => console.error(`[reply-worker] failed ${job?.id}`, err.message));
  worker.on("error", (err) => console.error(`[reply-worker] error`, err.message));

  process.on("SIGTERM", async () => {
    await worker.close();
    process.exit(0);
  });

  process.on("SIGINT", async () => {
    await worker.close();
    process.exit(0);
  });

  console.log("[reply-worker] started");
  return worker;
}
