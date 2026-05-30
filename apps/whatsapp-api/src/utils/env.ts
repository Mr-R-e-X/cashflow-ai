import { z } from "zod";

export const envSchema = z.object({
  PORT: z.string().default("3001"),
});

export const env = envSchema.parse(process.env);
