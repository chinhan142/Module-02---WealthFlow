import { router } from "./ui/router";
import { renderDashboardUI } from "./ui/dashboard";
import {
  deleteTransactionLedger,
  renderTransactionSheet,
  transactionForm,
} from "./ui/transactions";
import {
  categoryForm,
  categoryFormPopClose,
  renderCategories,
  setupCategoryActions,
} from "./ui/categories";
import { initTime } from "./time";

function handleRouting() {
  router();

  const hash = window.location.hash || "#dashboard";
  if (hash === "#dashboard" || hash === "") {
    renderDashboardUI();
  } else if (hash === "#transactions") {
    renderTransactionSheet();
  } else if (hash === "#categories") {
    renderCategories();
  }
}

window.addEventListener("hashchange", handleRouting);
window.addEventListener("DOMContentLoaded", handleRouting);

// Transaciton screen
transactionForm();
deleteTransactionLedger();

// Category screen
categoryFormPopClose();
categoryForm();
setupCategoryActions();

// Time filter
initTime();
