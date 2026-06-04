import { checkDbConnection } from "@cashflow-ai/db";
import { Hono } from "hono";
import { webhookRoute } from "./routes/webhook";
import { env } from "./utils/env";
import { startWorkers } from "./workers";

await checkDbConnection();

startWorkers();

const app = new Hono();

app.route("/webhook", webhookRoute);

export default {
  port: env.PORT,
  fetch: app.fetch,
};
