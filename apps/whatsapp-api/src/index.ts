import { Hono } from "hono";
import { env } from "./utils/env";
import { webhookRoute } from "./routes/webhook";

const app = new Hono();

app.route("/webhook", webhookRoute);

export default {
  port: env.PORT,
  fetch: app.fetch,
};
