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
