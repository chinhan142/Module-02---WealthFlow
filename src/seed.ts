import { STORAGE_KEYS } from "./storage";

export function seedCategories() {
  if (localStorage.getItem(STORAGE_KEYS.CATEGORIES)) return;

  localStorage.setItem(
    STORAGE_KEYS.CATEGORIES,
    JSON.stringify([
      {
        categoryId: 101,
        categoryName: "Food",
        categoryDescription: "Food and drinks",
        categoryLimit: 3000000,
        categoryIcon: "restaurant",
      },
      {
        categoryId: 102,
        categoryName: "Shopping",
        categoryDescription: "Shopping and personal items",
        categoryLimit: 2000000,
        categoryIcon: "shopping_basket",
      },
      {
        categoryId: 103,
        categoryName: "Housing",
        categoryDescription: "Rent and utilities",
        categoryLimit: 5000000,
        categoryIcon: "home",
      },
    ]),
  );
}

export function seedTransaction() {
  if (localStorage.getItem(STORAGE_KEYS.TRANSACTION)) return;

  localStorage.setItem(
    STORAGE_KEYS.TRANSACTION,
    JSON.stringify([
      {
        transactionId: 1001,
        transactionType: "expense",
        transactionNote: "Lunch with friends",
        transactionTime: "2026-06-10",
        categoryId: 101,
        categoryName: "Food",
        totalAmount: 250000,
      },
      {
        transactionId: 1002,
        transactionType: "expense",
        transactionNote: "New headphones",
        transactionTime: "2026-06-15",
        categoryId: 102,
        categoryName: "Shopping",
        totalAmount: 1200000,
      },
    ]),
  );
}
