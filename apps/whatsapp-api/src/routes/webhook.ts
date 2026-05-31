import { Hono } from "hono";
import { env } from "../utils/env";

export const webhookRoute = new Hono();

webhookRoute.post("/", async (c) => {
  console.log("Received webhook event:", await c.req.json());

  return c.json({ status: "success" });
});

webhookRoute.get("/", async (c) => {
  const mode = c.req.query("hub.mode");
  const token = c.req.query("hub.verify_token");
  const challenge = c.req.query("hub.challenge");
  console.log("Received webhook verification request:", { mode, token, challenge });
  if (mode === "subscribe" && token === env.WHATSAPP_VERIFY_TOKEN) {
    return c.text(challenge ?? "");
  }

  return c.json({ error: "Forbidden" }, 403);
});
