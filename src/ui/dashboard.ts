import { getMonthSummary } from "../storage";
import { getDashboardSelectedTime } from "../time";

export function renderDashboardUI() {
  const time = getDashboardSelectedTime();
  const today = new Date(Date.now());

  // ?? -> nullish coalescing operator: safely fallback to the right side if the left is null or undefined -> this is more safe than the || operator
  const month =
    time?.selectedMonth.toString() ?? (today.getMonth() + 1).toString();
  const year = time?.selectedYear.toString() ?? today.getFullYear();
  const monthlyStats = getMonthSummary(month, year);

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
