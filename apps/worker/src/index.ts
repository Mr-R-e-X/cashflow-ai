import "./utils/env";
import { checkDbConnection } from "@cashflow-ai/db";

async function bootstrap() {
  await checkDbConnection();
  console.log("Worker is up and running! 🚀");
}

bootstrap().catch((err) => {
  console.error("Error during worker initialization:", err);
  process.exit(1);
});
