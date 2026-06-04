import type { TransactionIntent } from "@cashflow-ai/ai";
import {
  handleAddSplitTransaction,
  handleAddTransaction,
  handleClarifiaction,
  handleCompareExpenseOverPeriods,
  handleDeleteLastTransaction,
  handleGetBalance,
  handleGetBudget,
  handleGetRecentTransactions,
  handleGetSummary,
  handleGetTopExpenseOverPeriods,
  handleGetTransactionByCategoryOverPeriods,
  handleHelp,
  handleNonFinancialQuery,
  handleSetBudget,
} from "./message.handler";

export type HandlerParameters = { userPhone: string; result: TransactionIntent; rawText: string };

type Handler = (params: HandlerParameters) => Promise<void>;

export const intentHandlerMap: Record<TransactionIntent["intent"], Handler> = {
  add_transaction: handleAddTransaction,
  add_split_transaction: handleAddSplitTransaction,
  get_summary: handleGetSummary,
  get_by_category: handleGetTransactionByCategoryOverPeriods,
  get_recent: handleGetRecentTransactions,
  get_top_expenses: handleGetTopExpenseOverPeriods,
  compare_periods: handleCompareExpenseOverPeriods,
  get_balance: handleGetBalance,
  set_budget: handleSetBudget,
  check_budget: handleGetBudget,
  delete_last: handleDeleteLastTransaction,
  undo: handleDeleteLastTransaction,
  help: handleHelp,
  clarification_required: handleClarifiaction,
  non_financial: handleNonFinancialQuery,
};
