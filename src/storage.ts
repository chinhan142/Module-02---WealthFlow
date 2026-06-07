import type { Category, Transaction } from "./types";

// Using enum for safety typo
const STORAGE_KEYS = {
  CATEGORIES: "wf_categories", // key name: wf_categories
  TRANSACTION: "wf_transaction",
};

// CATEGORY FUNCTION
export function getCategories(): Category[] {
  let categoryList = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
  if (!categoryList) return [];
  return JSON.parse(categoryList);
}

// Fix this function later!
export function addCategory(category: Category) {
  const categoryList = getCategories();
  categoryList.push(category);
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
  transactionTime: string,
  transactionNote: string,
) {
  let transactionList = getTransactions();
  let newTransaction: Transaction = {
    transactionId: Date.now(),
    transactionType: transactionType,
    transactionNote: transactionNote,
    transactionTime: transactionTime,
    categoryId: categoryId,
    totalAmount: totalAmount,
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
  type: string,
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
