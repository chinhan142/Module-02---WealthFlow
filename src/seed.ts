// src/seed.ts
import { STORAGE_KEYS } from "./storage";

export function seedData() {
  if (!localStorage.getItem(STORAGE_KEYS.CATEGORIES)) {
    const initialCategories = [
      {
        categoryId: 1,
        categoryName: "Ăn uống",
        categoryDescription: "Chi phí ăn hàng ngày",
        categoryLimit: 3000000,
        categoryIcon: "restaurant",
      },
      {
        categoryId: 2,
        categoryName: "Xăng xe",
        categoryDescription: "Đổ xăng",
        categoryLimit: 1000000,
        categoryIcon: "directions_car",
      },
    ];
    localStorage.setItem(
      STORAGE_KEYS.CATEGORIES,
      JSON.stringify(initialCategories),
    );
  }
}

export function seedCategories() {
  localStorage.setItem(
    STORAGE_KEYS.CATEGORIES,
    JSON.stringify([
      {
        categoryId: 101,
        categoryName: "Shopping",
        categoryDescription: "Shopping and personal items",
        categoryLimit: 2000000,
        categoryIcon: "shopping_basket",
      },
      {
        categoryId: 102,
        categoryName: "Housing",
        categoryDescription: "Rent and utilities",
        categoryLimit: 5000000,
        categoryIcon: "home",
      },
      {
        categoryId: 103,
        categoryName: "Entertainment",
        categoryDescription: "Movies and games",
        categoryLimit: 1500000,
        categoryIcon: "movie",
      },
      {
        categoryId: 104,
        categoryName: "Food",
        categoryDescription: "Food and drinks",
        categoryLimit: 3000000,
        categoryIcon: "restaurant",
      },
      {
        categoryId: 105,
        categoryName: "Transportation",
        categoryDescription: "Travel expenses",
        categoryLimit: 1000000,
        categoryIcon: "directions_car",
      },
      {
        categoryId: 106,
        categoryName: "Healthcare",
        categoryDescription: "Medical expenses",
        categoryLimit: 1000000,
        categoryIcon: "health_and_safety",
      },
    ]),
  );
}

export function seedTransaction() {
  localStorage.setItem(
    STORAGE_KEYS.TRANSACTION,
    JSON.stringify([
      // ===== June 2026 =====
      {
        transactionId: 1001,
        transactionType: "expense",
        transactionNote: "Bought new clothes",
        transactionTime: "2026-06-03",
        categoryId: 101,
        categoryName: "Shopping",
        totalAmount: 450000,
      },
      {
        transactionId: 1002,
        transactionType: "expense",
        transactionNote: "Monthly rent",
        transactionTime: "2026-06-01",
        categoryId: 102,
        categoryName: "Housing",
        totalAmount: 3500000,
      },
      {
        transactionId: 1003,
        transactionType: "expense",
        transactionNote: "Cinema weekend",
        transactionTime: "2026-06-07",
        categoryId: 103,
        categoryName: "Entertainment",
        totalAmount: 300000,
      },
      {
        transactionId: 1004,
        transactionType: "expense",
        transactionNote: "Restaurant dinner",
        transactionTime: "2026-06-10",
        categoryId: 104,
        categoryName: "Food",
        totalAmount: 850000,
      },
      {
        transactionId: 1005,
        transactionType: "expense",
        transactionNote: "Fuel refill",
        transactionTime: "2026-06-12",
        categoryId: 105,
        categoryName: "Transportation",
        totalAmount: 250000,
      },
      {
        transactionId: 1006,
        transactionType: "expense",
        transactionNote: "Medicine purchase",
        transactionTime: "2026-06-15",
        categoryId: 106,
        categoryName: "Healthcare",
        totalAmount: 180000,
      },
      {
        transactionId: 1007,
        transactionType: "income",
        transactionNote: "Salary",
        transactionTime: "2026-06-01",
        categoryId: 104,
        categoryName: "Food",
        totalAmount: 15000000,
      },

      // ===== May 2026 =====
      {
        transactionId: 2001,
        transactionType: "expense",
        transactionNote: "New shoes",
        transactionTime: "2026-05-05",
        categoryId: 101,
        categoryName: "Shopping",
        totalAmount: 650000,
      },
      {
        transactionId: 2002,
        transactionType: "expense",
        transactionNote: "Monthly rent",
        transactionTime: "2026-05-01",
        categoryId: 102,
        categoryName: "Housing",
        totalAmount: 3500000,
      },
      {
        transactionId: 2003,
        transactionType: "expense",
        transactionNote: "Steam games",
        transactionTime: "2026-05-08",
        categoryId: 103,
        categoryName: "Entertainment",
        totalAmount: 400000,
      },
      {
        transactionId: 2004,
        transactionType: "expense",
        transactionNote: "Food and coffee",
        transactionTime: "2026-05-12",
        categoryId: 104,
        categoryName: "Food",
        totalAmount: 900000,
      },
      {
        transactionId: 2005,
        transactionType: "expense",
        transactionNote: "Fuel and parking",
        transactionTime: "2026-05-20",
        categoryId: 105,
        categoryName: "Transportation",
        totalAmount: 350000,
      },
      {
        transactionId: 2006,
        transactionType: "income",
        transactionNote: "Salary",
        transactionTime: "2026-05-01",
        categoryId: 104,
        categoryName: "Food",
        totalAmount: 15000000,
      },

      // ===== April 2026 =====
      {
        transactionId: 3001,
        transactionType: "expense",
        transactionNote: "Accessories",
        transactionTime: "2026-04-02",
        categoryId: 101,
        categoryName: "Shopping",
        totalAmount: 500000,
      },
      {
        transactionId: 3002,
        transactionType: "expense",
        transactionNote: "Monthly rent",
        transactionTime: "2026-04-01",
        categoryId: 102,
        categoryName: "Housing",
        totalAmount: 3500000,
      },
      {
        transactionId: 3003,
        transactionType: "expense",
        transactionNote: "Concert ticket",
        transactionTime: "2026-04-11",
        categoryId: 103,
        categoryName: "Entertainment",
        totalAmount: 500000,
      },
      {
        transactionId: 3004,
        transactionType: "expense",
        transactionNote: "Family dinner",
        transactionTime: "2026-04-15",
        categoryId: 104,
        categoryName: "Food",
        totalAmount: 1200000,
      },
      {
        transactionId: 3005,
        transactionType: "income",
        transactionNote: "Salary",
        transactionTime: "2026-04-01",
        categoryId: 104,
        categoryName: "Food",
        totalAmount: 15000000,
      },
    ]),
  );
}
