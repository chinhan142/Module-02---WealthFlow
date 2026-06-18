import { getDashboardSelectedTime } from "./time";
import type { Category, Transaction } from "./types";

// Using enum for safety typo
export const STORAGE_KEYS = {
  CATEGORIES: "wf_categories", // key name: wf_categories
  TRANSACTION: "wf_transaction",
  MONTH: "wf_month",
  YEAR: "wf_year",
};

// CATEGORY FUNCTION
export function getCategories(): Category[] {
  let categoryList = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
  if (!categoryList) return [];
  return JSON.parse(categoryList);
}

export function addCategory(
  categoryName: string,
  categoryDescription: string,
  categoryLimit: number,
  categoryIcon: string,
) {
  const categoryList = getCategories();
  let newCategory: Category = {
    categoryId: Date.now(),
    categoryName: categoryName,
    categoryDescription: categoryDescription,
    categoryLimit: categoryLimit,
    categoryIcon: categoryIcon,
  };
  categoryList.push(newCategory);
  localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categoryList));
}

export function editCategory(
  categoryId: number,
  editName: string,
  editLimit: number,
) {
  const categoryList = getCategories();
  categoryList.forEach((categoryItem) => {
    if (categoryItem.categoryId == categoryId) {
      categoryItem.categoryName = editName;
      categoryItem.categoryLimit = editLimit;
    }
  });
  localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categoryList));
}

export function deleteCategory(categoryId: number) {
  const categoryList = getCategories();
  const newList = categoryList.filter(
    (categoryItem) => categoryItem.categoryId !== categoryId,
  );
  localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(newList));
}

export function getSpentAmountByCategory(categoryId: number): number {
  const categoryTransaction = getTransactionInCategory(categoryId);
  const categoryExpenseTransaction = categoryTransaction.filter(
    (item) => item.transactionType === "expense",
  );
  const totalExpense = categoryExpenseTransaction.reduce(
    (total, item) => total + item.totalAmount,
    0,
  );

  return totalExpense;
}

export function getCategoryById(categoryId: number): Category | undefined {
  const categoryList = getCategories();

  return categoryList.find((item) => item.categoryId === categoryId);
}

export function getCategoryIdByName(
  categoryName: string,
): Category | undefined {
  const categoryList = getCategories();

  return categoryList.find(
    (item) => item.categoryName.toLowerCase() === categoryName.toLowerCase(),
  );
}

// TRANSACTION FUNCTION
export function getTransactions(): Transaction[] {
  let transactionList = localStorage.getItem(STORAGE_KEYS.TRANSACTION);
  if (!transactionList) return [];
  return JSON.parse(transactionList);
}

export function addTransaction(
  transactionType: "income" | "expense",
  totalAmount: number,
  categoryId: number,
  categoryName: string,
  transactionTime: string,
  transactionNote: string,
) {
  let transactionList = getTransactions();
  let newTransaction: Transaction = {
    transactionId: Date.now(),
    transactionType: transactionType,
    totalAmount: totalAmount,
    categoryId: categoryId,
    categoryName: categoryName,
    transactionTime: transactionTime,
    transactionNote: transactionNote,
  };
  transactionList.push(newTransaction);
  localStorage.setItem(
    STORAGE_KEYS.TRANSACTION,
    JSON.stringify(transactionList),
  );
}

export function deleteTransaction(transactionId: number) {
  const transactionList = getTransactions();
  const newTransactionList = transactionList.filter(
    (item) => item.transactionId !== transactionId,
  );
  localStorage.setItem(
    STORAGE_KEYS.TRANSACTION,
    JSON.stringify(newTransactionList),
  );
}

// Filter function
export function getTransactionsByMonth(
  month: string,
  year: string,
): Transaction[] {
  const transactionList = getTransactions();
  const monthTransaction = transactionList.filter((transaction) => {
    const date = new Date(transaction.transactionTime);
    return (
      (date.getMonth() + 1).toString() === month &&
      date.getFullYear().toString() === year
    );
  });
  return monthTransaction;
}

export function getMonthSummary(month: string, year: string) {
  const totalIncome = getTransacionByType("income", month, year);
  const totalExpense = getTransacionByType("expense", month, year);
  const balance = totalIncome - totalExpense;
  return { totalIncome, totalExpense, balance };
}

export function getTransacionByType(
  type: "income" | "expense",
  month: string,
  year: string,
): number {
  const monthlyTransaction = getTransactionsByMonth(month, year);
  const total = monthlyTransaction.reduce((total, transaction) => {
    if (transaction.transactionType === type) {
      total += transaction.totalAmount;
    }
    return total; // In reduce(), must return the value after each iteration
  }, 0);
  return total;
}

export function getTransactionInCategory(categoryId: number): Transaction[] {
  const time = getDashboardSelectedTime();
  const month =
    time?.selectedMonth.toString() ?? (new Date().getMonth() + 1).toString();
  const year =
    time?.selectedYear.toString() ?? new Date().getFullYear().toString();
  const monthTransaction = getTransactionsByMonth(month, year);
  const categoryMonthTransaction = monthTransaction.filter(
    (item) => item.categoryId === categoryId,
  );

  return categoryMonthTransaction;
}

export function isCategoryNameExists(
  categoryName: string,
  excludeId?: number,
): boolean {
  const categoryList = getCategories();
  return categoryList.some(
    (item) =>
      item.categoryName.toLowerCase() === categoryName.toLowerCase() &&
      item.categoryId !== excludeId,
  );
}
