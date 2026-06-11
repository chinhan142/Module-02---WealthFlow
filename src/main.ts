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
} from "./ui/categories";

router();
// Dashboard screen
renderDashboardUI();

// Transaciton screen
transactionForm();
renderTransactionSheet();
deleteTransactionLedger();

// Category screen
categoryFormPopClose();
categoryForm();
renderCategories();

window.addEventListener("hashchange", router);
