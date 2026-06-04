import { startMessageWorker } from "./message.worker";
import { startReplyWorker } from "./reply.worker";

export async function startWorkers() {
  startMessageWorker();
  startReplyWorker();
}
