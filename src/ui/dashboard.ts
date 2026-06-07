import { getMonthSummary } from "../storage";

export function renderDashboardUI() {
  const today = new Date(Date.now());
  const todayMonth = (today.getMonth() + 1).toString();
  const todayYear = today.getFullYear().toString();
  const monthlyStats = getMonthSummary(todayMonth, todayYear);

  const balanceAmountEl = document.querySelector("#balance-amount");
  if (balanceAmountEl) {
    balanceAmountEl.textContent = `${monthlyStats.balance.toString()} VNĐ`;
  }

  const incomeEl = document.querySelector("#income-amount");
  if (incomeEl) {
    incomeEl.textContent = `${monthlyStats.totalIncome.toString()} VNĐ`;
  }

  const expenseEl = document.querySelector("#expense-amount");
  if (expenseEl) {
    expenseEl.textContent = `${monthlyStats.totalExpense.toString()} VNĐ`;
  }
}
