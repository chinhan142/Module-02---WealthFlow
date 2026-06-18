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
import { renderSumaryTable } from "./ui/summary";
import { seedCategories, seedTransaction } from "./seed";

// Seed data
seedCategories();
seedTransaction();

function updateView() {
  const hash = window.location.hash || "#dashboard";

  if (hash === "#dashboard" || hash === "") {
    renderDashboardUI();
  } else if (hash === "#transactions") {
    renderTransactionSheet();
  } else if (hash === "#categories") {
    renderCategories();
  } else if (hash === "#summary") {
    renderSumaryTable();
  }
}

function handleRouting() {
  router();
  updateView();
}

window.addEventListener("hashchange", handleRouting);
window.addEventListener("DOMContentLoaded", handleRouting);
window.addEventListener("time-changed", updateView);

// Transaction screen
transactionForm();
deleteTransactionLedger();

// Category screen
categoryFormPopClose();
categoryForm();
setupCategoryActions();

// Time filter
initTime();
