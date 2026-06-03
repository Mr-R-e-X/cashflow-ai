import { parseMessage } from "@cashflow-ai/ai";
import { incomingMessageWorker, type IncomingMessageJobData } from "@cashflow-ai/queue";

async function handleIncomingMessage({ rawText, userPhone }: IncomingMessageJobData) {
  const result = await parseMessage(rawText);
}

export async function startMessageWorker() {
  const worker = incomingMessageWorker(handleIncomingMessage);

  worker.on("completed", (job) => console.log(`[message-worker] done ${job.id}`));
  worker.on("failed", (job, err) =>
    console.error(`[message-worker] failed ${job?.id}`, err.message)
  );
  worker.on("error", (err) => console.error(`[message-worker] error`, err.message));

  process.on("SIGTERM", async () => {
    await worker.close();
    process.exit(0);
  });

  process.on("SIGINT", async () => {
    await worker.close();
    process.exit(0);
  });

  console.log("[message-worker] started");
  return worker;
}
