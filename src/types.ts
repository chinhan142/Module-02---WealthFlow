// Implement interface for object models

export interface Category {
  categoryId: number;
  categoryName: string;
  categoryDescription: string;
  categoryLimit: number;
  categoryIcon: string;
}

export interface Transaction {
  transactionId: number;
  transactionType: "income" | "expense";
  transactionNote: string;
  transactionTime: string;
  categoryName: string;
  totalAmount: number;
}
