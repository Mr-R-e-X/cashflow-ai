import { Redis } from "ioredis";
import { env } from "../utils/env";

export const redisCache = new Redis(env.REDIS_URL, {
  maxRetriesPerRequest: null,
  enableReadyCheck: false,
});

redisCache.on("error", (err) => console.error("[cache] error:", err));
redisCache.on("connect", () => console.log("[cache] connected ✅"));
