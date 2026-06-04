import type { HandlerParameters } from "./intent-map";

export async function handleAddTransaction(params: HandlerParameters) {}

export async function handleAddSplitTransaction(params: HandlerParameters) {}

export async function handleGetSummary(params: HandlerParameters) {}

export async function handleGetTransactionByCategoryOverPeriods(params: HandlerParameters) {}

export async function handleGetRecentTransactions(params: HandlerParameters) {}

export async function handleGetTopExpenseOverPeriods(params: HandlerParameters) {}

export async function handleCompareExpenseOverPeriods(params: HandlerParameters) {}

export async function handleGetBalance(params: HandlerParameters) {}

export async function handleSetBudget(params: HandlerParameters) {}

export async function handleGetBudget(params: HandlerParameters) {}

export async function handleDeleteLastTransaction(params: HandlerParameters) {}

export async function handleHelp(params: HandlerParameters) {}

export async function handleClarifiaction(params: HandlerParameters) {}

export async function handleNonFinancialQuery(params: HandlerParameters) {}
