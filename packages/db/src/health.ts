import { sql } from "drizzle-orm";
import { db } from "./client";

export async function checkDbConnection() {
  try {
    await db.execute(sql`SELECT 1`);
    console.log("[db] connected ✅");
  } catch (err) {
    console.error("[db] connection failed ❌", err);
    process.exit(1);
  }
}
