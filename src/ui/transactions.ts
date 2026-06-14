import {
  addTransaction,
  getTransactions,
  deleteTransaction,
  getCategories,
} from "../storage";
export function transactionForm() {
  const formEl = document.querySelector("#transaction-form");

  // Transaction type logic
  const transactionTypeEl = document.querySelector("#transactionType");
  const expenseBtnEl = document.querySelector("#type-expense");
  const incomeBtnEl = document.querySelector("#type-income");

  // Set transaction type
  expenseBtnEl?.addEventListener("click", () => {
    if (transactionTypeEl) {
      (transactionTypeEl as HTMLInputElement).value = "expense";
    }
    (expenseBtnEl as HTMLElement).classList.add("bg-red-200");
    (incomeBtnEl as HTMLElement).classList.remove("bg-green-200");
  });

  incomeBtnEl?.addEventListener("click", () => {
    if (transactionTypeEl) {
      (transactionTypeEl as HTMLInputElement).value = "income";
    }
    (incomeBtnEl as HTMLElement).classList.add("bg-green-200");
    (expenseBtnEl as HTMLElement).classList.remove("bg-red-200");
  });

  // Render CategoryName List
  transactionCategoryListRender();

  formEl?.addEventListener("submit", (event) => {
    event.preventDefault();

    if (formEl instanceof HTMLFormElement) {
      const formData = new FormData(formEl);
      const formDataObject = Object.fromEntries(formData);

      const transactionType = formDataObject.transactionType;
      if (transactionType === "income" || transactionType === "expense") {
        addTransaction(
          transactionType,
          +formDataObject.totalAmount,
          formDataObject.categoryName.toString(),
          formDataObject.transactionTime.toString(),
          formDataObject.transactionNote.toString(),
        );
      }

      renderTransactionSheet();
      formEl.reset();
    }
  });
}

export function transactionCategoryListRender() {
  const categoryListEl = document.querySelector("#categoryList");
  if (categoryListEl) {
    const categoryList = getCategories();

    if (categoryListEl instanceof HTMLElement) {
      categoryListEl.innerHTML = categoryList
        .map(
          (item) =>
            `
            <option>${item.categoryName}</option>
          `,
        )
        .join("");
    }
  }
}

export function renderTransactionSheet() {
  const transactionList = getTransactions();
  const ledgerTableBodyEl = document.querySelector("#ledger-table-body");
  if (ledgerTableBodyEl instanceof HTMLElement) {
    ledgerTableBodyEl.innerHTML = transactionList
      .map(
        (item) => `
      <tr class="hover:bg-slate-50 transition-colors">
        <td class="px-4 py-3">
          <span class="text-xs font-medium text-slate-600">
            ${item.transactionTime}
          </span>
        </td>

        <td class="px-4 py-3">
          <span
            class="inline-flex items-center px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-[11px] font-semibold"
          >
            ${item.categoryName}
          </span>
        </td>

        <td class="px-4 py-3">
          <span class="text-sm font-medium text-slate-800">
            ${item.transactionNote || "-"}
          </span>
        </td>

        <td class="px-4 py-3 text-right">
          <span
            class="text-sm font-bold ${
              item.transactionType === "income"
                ? "text-green-600"
                : "text-red-500"
            }"
          >
            ${
              item.transactionType === "income" ? "+" : "-"
            }$${item.totalAmount.toFixed(2)}
          </span>
        </td>

        <td class="px-4 py-3 text-center">
          <button
            class="text-xs font-semibold text-slate-500 hover:text-red-500 transition-colors button-delete-transaction"
            data-transaction-id="${item.transactionId}"
          >
            Delete
          </button>
        </td>
      </tr>
    `,
      )
      .join("");
  }
}

export function deleteTransactionLedger() {
  const tbodyEl = document.querySelector("#ledger-table-body");
  tbodyEl?.addEventListener("click", (event) => {
    const transactionId = (event.target as HTMLElement).dataset.transactionId;
    if (transactionId) {
      deleteTransaction(+transactionId);
    }
    renderTransactionSheet();
  });
}
