import { addCategory, getCategories } from "../storage";

export function categoryFormPopClose() {
  const formPopEl = document.querySelector("#modal-cat");
  const addCategoryBtnEl = document.querySelector("#add-category-btn");
  const closeCategoryBtnEl = document.querySelector("#close-modal");
  const cancelBtnEl = document.querySelector("#cancel-button");

  if (formPopEl instanceof HTMLElement) {
    formPopEl.classList.add("hidden");
  }

  addCategoryBtnEl?.addEventListener("click", () => {
    (formPopEl as HTMLElement).classList.remove("hidden");
  });

  closeCategoryBtnEl?.addEventListener("click", () => {
    (formPopEl as HTMLElement).classList.add("hidden");
  });

  cancelBtnEl?.addEventListener("click", () => {
    (formPopEl as HTMLElement).classList.add("hidden");
  });
}

export function categoryForm() {
  const categoryFormEl = document.querySelector("#category-form");

  categoryFormEl?.addEventListener("submit", (event) => {
    event.preventDefault();

    if (categoryFormEl instanceof HTMLFormElement) {
      const formData = new FormData(categoryFormEl);
      const formObject = Object.fromEntries(formData);

      addCategory(
        formObject.categoryName.toString(),
        formObject.categoryDescription.toString(),
        +formObject.categoryLimit,
        formObject.categoryIcon.toString(),
      );
      renderCategories();
      categoryFormEl.reset();
    }
  });
}

export function renderCategories() {
  const categoryGridEl = document.querySelector("#category-grid");

  if (categoryGridEl instanceof HTMLElement) {
    const categoryList = getCategories();

    categoryGridEl.innerHTML = categoryList
      .map(
        (category) => `
        <div
          class="bg-white p-6 rounded-[24px] shadow-sm border border-slate-100 hover:shadow-md transition-all"
        >
          <div class="flex justify-between items-start mb-4">
            <div>
              <h3 class="text-lg font-bold text-slate-800">
                ${category.categoryName}
              </h3>

              <p class="text-sm text-slate-400 mt-1">
                ${category.categoryDescription}
              </p>
            </div>

            <span class="material-symbols-outlined text-primary text-3xl">
              ${category.categoryIcon}
            </span>
          </div>

          <div class="border-t border-slate-100 pt-4">
            <p
              class="text-[10px] uppercase tracking-wider text-slate-400 font-bold"
            >
              Monthly Budget Limit
            </p>

            <p class="text-xl font-bold text-primary mt-1">
              $${category.categoryLimit.toLocaleString()}
            </p>
          </div>

          <div class="flex gap-2 mt-5">
            <button
              data-id="${category.categoryId}"
              class="edit-category flex-1 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-bold"
            >
              Edit
            </button>

            <button
              data-id="${category.categoryId}"
              class="delete-category flex-1 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl text-xs font-bold"
            >
              Delete
            </button>
          </div>
        </div>
      `,
      )
      .join("");
  }
}
