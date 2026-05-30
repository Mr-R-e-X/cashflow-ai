import { Hono } from "hono";
import { env } from "./utils/env";

const app = new Hono();

export default {
  port: env.PORT,
  fetch: app.fetch,
};
