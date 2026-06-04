import type { HandlerParameters } from "./intent-map";

export async function handleAddTransaction(params: HandlerParameters): Promise<string> {
  return "Hello";
}

export async function handleAddSplitTransaction(params: HandlerParameters): Promise<string> {
  return "Hello";
}

export async function handleGetSummary(params: HandlerParameters): Promise<string> {
  return "Hello";
}

export async function handleGetTransactionByCategoryOverPeriods(
  params: HandlerParameters
): Promise<string> {
  return "Hello";
}

export async function handleGetRecentTransactions(params: HandlerParameters): Promise<string> {
  return "Hello";
}

export async function handleGetTopExpenseOverPeriods(params: HandlerParameters): Promise<string> {
  return "Hello";
}

export async function handleCompareExpenseOverPeriods(params: HandlerParameters): Promise<string> {
  return "Hello";
}

export async function handleGetBalance(params: HandlerParameters): Promise<string> {
  return "Hello";
}

export async function handleSetBudget(params: HandlerParameters): Promise<string> {
  return "Hello";
}

export async function handleGetBudget(params: HandlerParameters): Promise<string> {
  return "Hello";
}

export async function handleDeleteLastTransaction(params: HandlerParameters): Promise<string> {
  return "Hello";
}

export async function handleHelp(params: HandlerParameters): Promise<string> {
  return "Hello";
}

export async function handleClarifiaction(params: HandlerParameters): Promise<string> {
  return "Hello";
}

export async function handleNonFinancialQuery(params: HandlerParameters): Promise<string> {
  return "Hello";
}
