import { router } from "./ui/router";
import { renderDashboardUI } from "./ui/dashboard";

router();
renderDashboardUI();

window.addEventListener("hashchange", router);
