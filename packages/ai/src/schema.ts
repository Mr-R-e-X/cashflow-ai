import { z } from "zod";

export const PERIODS = [
  "today",
  "yesterday",
  "this_week",
  "last_week",
  "this_month",
  "last_month",
  "this_year",
] as const;

export const TransactionIntentSchema = z.discriminatedUnion("intent", [
  z.object({
    intent: z.literal("add_transaction"),
    transactionType: z.enum(["income", "expense", "investment"]),
    amount: z.number().positive(),
    category: z.string(),
    note: z.string().optional(),
    date: z.string().optional(),
    confidence: z.number().min(0).max(1).optional(),
  }),

  z.object({
    intent: z.literal("add_split_transaction"),
    amount: z.number().positive(),
    split_by: z.number().positive(),
    per_person_amount: z.number().positive().optional(),
    category: z.string(),
    note: z.string().optional(),
    date: z.string().optional(),
    confidence: z.number().min(0).max(1).optional(),
  }),

  z.object({
    intent: z.literal("get_summary"),
    period: z.enum(PERIODS),
    confidence: z.number().min(0).max(1).optional(),
  }),

  z.object({
    intent: z.literal("get_by_category"),
    category: z.string(),
    period: z.enum(PERIODS),
    confidence: z.number().min(0).max(1).optional(),
  }),

  z.object({
    intent: z.literal("get_recent"),
    limit: z.number().min(1).max(20).default(5),
    confidence: z.number().min(0).max(1).optional(),
  }),

  z.object({
    intent: z.literal("get_top_expenses"),
    period: z.enum(PERIODS),
    limit: z.number().default(5),
    confidence: z.number().min(0).max(1).optional(),
  }),

  z.object({
    intent: z.literal("compare_periods"),
    period_one: z.enum(PERIODS),
    period_two: z.enum(PERIODS),
    confidence: z.number().min(0).max(1).optional(),
  }),

  z.object({
    intent: z.literal("get_balance"),
    period: z.enum(PERIODS),
    confidence: z.number().min(0).max(1).optional(),
  }),

  z.object({
    intent: z.literal("set_budget"),
    category: z.string(),
    amount: z.number().positive(),
    period: z.enum(["this_week", "this_month"]),
    confidence: z.number().min(0).max(1).optional(),
  }),

  z.object({
    intent: z.literal("check_budget"),
    category: z.string().optional(),
    confidence: z.number().min(0).max(1).optional(),
  }),

  z.object({
    intent: z.literal("delete_last"),
    confidence: z.number().min(0).max(1).optional(),
  }),

  z.object({
    intent: z.literal("undo"),
    confidence: z.number().min(0).max(1).optional(),
  }),

  z.object({
    intent: z.literal("help"),
    topic: z.enum([
      "general",
      "add_transaction",
      "split",
      "summary",
      "budget",
      "investment",
      "delete",
      "categories",
      "balance",
      "export",
    ]),
    confidence: z.number().min(0).max(1).optional(),
  }),

  z.object({
    intent: z.literal("clarification_required"),
    confidence: z.number().min(0).max(1),
    message: z.string(),
  }),

  z.object({
    intent: z.literal("non_financial"),
    confidence: z.number().min(0).max(1).optional(),
    message: z.string(),
  }),
]);

export const TransactionSchema = TransactionIntentSchema;
export type TransactionIntent = z.infer<typeof TransactionIntentSchema>;
