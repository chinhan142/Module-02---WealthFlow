import { getMonthlyBudgetUsage, getMonthSummary } from "../storage";
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

  renderCircleBudget();
}

export function renderCircleBudget() {
  const circleEl = document.querySelector("#budget-circle") as SVGElement;
  const pctTextEl = document.querySelector("#budget-circle-pct");
  const statusEl = document.querySelector("#status");
  const usageClaimEl = document.querySelector("#usage-claim");

  const radius = 54;
  const circuference = 2 * Math.PI * radius;

  const usage = getMonthlyBudgetUsage();
  const offset = circuference - (usage / 100) * circuference;

  if (usage >= 80) {
    circleEl.setAttribute("stroke", "#DB2626");
    (statusEl as HTMLElement).innerText = "Alert";
    (usageClaimEl as HTMLElement).innerText =
      "You are going way to high on your monthly budget usage";
  }

  circleEl.setAttribute("stroke-dashoffset", offset.toString());
  (pctTextEl as HTMLElement).innerText = `${Math.round(usage)}`;
}
