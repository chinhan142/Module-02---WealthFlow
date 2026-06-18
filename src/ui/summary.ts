import { getExistMonthYear, getMonthSummary } from "../storage";

export function renderSumaryTable() {
  const summaryTableBodyEl = document.querySelector("#summary-table-body");
  const existedMonthYear = getExistMonthYear();

  if (summaryTableBodyEl instanceof HTMLElement) {
    summaryTableBodyEl.innerHTML = existedMonthYear
      .map((item) => {
        const monthStats = getMonthSummary(item.month, item.year);

        return `
        <tr class="hover:bg-slate-50 transition-colors">
            <td class="py-4 px-5 font-medium text-slate-700">
                ${item.month} / ${item.year}
            </td>
            <td class="py-4 px-5 text-right text-green-600 font-medium">
                ${monthStats.totalIncome}
            </td>
            <td class="py-4 px-5 text-right text-red-600 font-medium">
                ${monthStats.totalExpense}
            </td>
            <td class="py-4 px-5 text-right font-semibold text-slate-800">
                ${monthStats.balance}
            </td>
        </tr>
        `;
      })
      .join("");
  }
}
