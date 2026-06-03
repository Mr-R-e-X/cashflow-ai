import { startMessageWorker } from "./message.worker";

export async function startWorkers() {
  startMessageWorker();
}
