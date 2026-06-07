export function router(): void {
  const hash = window.location.hash || "#dashboard";

  document.querySelectorAll(".page").forEach((page) => {
    page.classList.add("hidden");
  });

  document.getElementById(`page-${hash.slice(1)}`)?.classList.remove("hidden");
}
