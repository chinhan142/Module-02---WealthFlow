import { STORAGE_KEYS } from "./storage";
import { renderCategories } from "./ui/categories";
import { renderDashboardUI } from "./ui/dashboard";
import { renderTransactionSheet } from "./ui/transactions";

export function initTime() {
  const monthPickerEl = document.querySelector("#month-picker");

  const time = getDashboardSelectedTime();
  if (time) {
    (monthPickerEl as HTMLInputElement).value =
      `${time.selectedYear}-${time.selectedMonth.toString().padStart(2, "0")}`;
  }

  monthPickerEl?.addEventListener("input", (event) => {
    const target = event.target as HTMLInputElement;
    const rawMonthYear: string = target.value;

    const [selectedYear, selectedMonth] = rawMonthYear.split("-");

    localStorage.setItem(
      STORAGE_KEYS.YEAR,
      JSON.stringify(parseInt(selectedYear, 10)),
    );
    localStorage.setItem(
      STORAGE_KEYS.MONTH,
      JSON.stringify(parseInt(selectedMonth, 10)),
    );

    renderDashboardUI();
  });
}

export function getDashboardSelectedTime() {
  const monthData = localStorage.getItem(STORAGE_KEYS.MONTH);
  const yearData = localStorage.getItem(STORAGE_KEYS.YEAR);
  if (!monthData) return;
  if (!yearData) return;

  const selectedMonth = JSON.parse(monthData);
  const selectedYear = JSON.parse(yearData);

  return { selectedMonth, selectedYear };
}
