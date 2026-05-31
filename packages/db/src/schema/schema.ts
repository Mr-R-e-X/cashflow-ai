import {
  date,
  integer,
  jsonb,
  numeric,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  phone: varchar("phone", { length: 20 }).notNull().unique(),
  name: varchar("name", { length: 100 }),
  currency: varchar("currency", { length: 10 }).default("INR"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const transactions = pgTable("transactions", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),
  intent: varchar("intent", {
    enum: ["add_transaction", "add_split_transaction"],
  }).notNull(),
  amount: numeric("amount", { precision: 12, scale: 2 }).notNull(),
  transactionType: varchar("transaction_type", {
    enum: ["income", "expense"],
  }).notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  splitBy: integer("split_by"),
  perPersonAmount: numeric("per_person_amount", { precision: 12, scale: 2 }),
  confidence: numeric("confidence", { precision: 3, scale: 2 }),
  note: text("note"),
  date: date("date").notNull(),
  raw: text("raw").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const webhookLogs = pgTable("webhook_logs", {
  id: uuid("id").primaryKey().defaultRandom(),
  messageId: varchar("message_id").unique(),
  phone: varchar("phone"),
  payload: jsonb("payload").notNull(),
  status: varchar("status", {
    enum: ["received", "processed", "failed"],
  }).default("received"),
  createdAt: timestamp("created_at").defaultNow(),
});
