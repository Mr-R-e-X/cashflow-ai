import { parseMessage } from "@cashflow-ai/ai";
import {
  incomingMessageWorker,
  replyMessageProcessingQueue,
  type IncomingMessageJobData,
} from "@cashflow-ai/queue";
import { intentHandlerMap } from "../handlers/intent-map";

async function handleIncomingMessage({ rawText, userPhone, messageId }: IncomingMessageJobData) {
  const results = await parseMessage(rawText);

  const writeIntents = results.filter(
    (r) => r.intent === "add_transaction" || r.intent === "add_split_transaction"
  );

  const otherIntents = results.filter(
    (r) => r.intent !== "add_transaction" && r.intent !== "add_split_transaction"
  );

  const writeReplies = await Promise.all(
    writeIntents.map((result) => {
      const handler = intentHandlerMap[result.intent];
      return handler({ userPhone, result, rawText, messageId });
    })
  );

  const otherReplies = await Promise.all(
    otherIntents.map((result) => {
      const handler = intentHandlerMap[result.intent];
      return handler({ userPhone, result, rawText, messageId });
    })
  );

  if (writeReplies.length > 0) {
    const writeMessage =
      writeReplies.length === 1
        ? `${writeReplies[0]}`
        : `${writeReplies.length} transactions:\n${writeReplies.map((r) => `  ${r}`).join("\n")}`;

    await replyMessageProcessingQueue.add(
      "reply-write-message",
      { userPhone, message: writeMessage },
      { jobId: `reply-write-${messageId}` }
    );
  }

  if (otherReplies.length > 0) {
    const otherMessage = otherReplies.join("\n\n");

    await replyMessageProcessingQueue.add(
      "reply-read-message",
      { userPhone, message: otherMessage },
      { jobId: `reply-read-${messageId}` }
    );
  }
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
