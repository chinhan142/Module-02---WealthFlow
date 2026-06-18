export function showBudgetAlert(message: string) {
  const alertEl = document.querySelector("#budget-alarm");
  const alertTextEl = document.querySelector("#budget-alarm-text");
  if (alertEl && alertTextEl) {
    alertTextEl.textContent = message;
    alertEl.classList.remove("hidden");

    setTimeout(() => alertEl.classList.add("hidden"), 5000);
  }
}
