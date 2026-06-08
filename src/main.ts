import { router } from "./ui/router";
import { renderDashboardUI } from "./ui/dashboard";
import {
  deleteTransactionLedger,
  renderTransactionSheet,
  transactionForm,
} from "./ui/transactions";

router();
// Dashboard screen
renderDashboardUI();

// Transaciton screen
transactionForm();
renderTransactionSheet();
deleteTransactionLedger();

window.addEventListener("hashchange", router);
