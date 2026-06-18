import {
  addCategory,
  deleteCategory,
  editCategory,
  getCategories,
  getCategoryById,
  getSpentAmountByCategory,
  isCategoryNameExists,
} from "../storage";
import { transactionCategoryListRender } from "./transactions";

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

      const editIdEl = categoryFormEl.querySelector(
        "#edit-id",
      ) as HTMLInputElement | null;
      const editId = editIdEl?.value ? +editIdEl.value : undefined;

      if (isCategoryNameExists(formObject.categoryName.toString(), editId)) {
        alert("This category name is existed! Please enter another name!");
        return;
      }

      const limit = +formObject.categoryLimit;
      if (limit <= 0) {
        alert("Limit must be a positive number!");
        return;
      }
      if (formObject.categoryName.toString().trim() === "") {
        alert("Category name can't be empty!");
        return;
      }

      if (editIdEl && editIdEl.value !== "") {
        editCategory(
          +editIdEl.value,
          formObject.categoryName.toString(),
          +formObject.categoryLimit,
        );
      } else {
        addCategory(
          formObject.categoryName.toString(),
          formObject.categoryDescription.toString(),
          +formObject.categoryLimit,
          formObject.categoryIcon.toString(),
        );
      }

      if (editIdEl) editIdEl.value = "";
      categoryFormEl.reset();
      document.querySelector("#modal-cat")?.classList.add("hidden");

      renderCategories();
      transactionCategoryListRender();
    }
  });
}

export function renderCategories() {
  const categoryGridEl = document.querySelector("#category-grid");

  if (categoryGridEl instanceof HTMLElement) {
    const categoryList = getCategories();

    categoryGridEl.innerHTML = categoryList
      .map((category) => {
        const categorySpent = getSpentAmountByCategory(category.categoryId);
        const isOverLimit = categorySpent > category.categoryLimit;

        return `
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
              ${category.categoryLimit.toLocaleString()} VND
            </p>
          </div>

          <div class="border-t border-slate-100 pt-4">
            <p
              class="text-[10px] uppercase tracking-wider text-slate-400 font-bold"
            >
              Current Monthly Spent
            </p>

            <p class="text-xl font-bold ${isOverLimit ? "text-red-500" : "text-primary"} mt-1">
            ${categorySpent.toLocaleString()} VND
            </p>
          </div>



          <div class="flex gap-2 mt-5">
            <button
              id="edit-category"
              data-category-id="${category.categoryId}"
              class="edit-category flex-1 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-bold"
            >
              Edit
            </button>

            <button
              data-category-id="${category.categoryId}"
              class="delete-category flex-1 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl text-xs font-bold"
            >
              Delete
            </button>
          </div>
        </div>
      `;
      })
      .join("");
  }
}

export function renderEditCategory(categoryId: number) {
  const category = getCategoryById(categoryId);

  if (category) {
    const modalEl = document.querySelector("#modal-cat") as HTMLElement;
    const formEl = document.querySelector("#category-form") as HTMLFormElement;

    if (modalEl && formEl) {
      (formEl.elements.namedItem("categoryName") as HTMLInputElement).value =
        category.categoryName;

      (
        formEl.elements.namedItem("categoryDescription") as HTMLInputElement
      ).value = category.categoryDescription;

      (formEl.elements.namedItem("categoryLimit") as HTMLInputElement).value =
        category.categoryLimit.toString();

      // Hidden input for saving category id
      let hiddenIdInput = formEl.querySelector("#edit-id") as HTMLInputElement;
      if (!hiddenIdInput) {
        hiddenIdInput = document.createElement("input");
        hiddenIdInput.type = "hidden";
        hiddenIdInput.id = "edit-id";
        formEl.appendChild(hiddenIdInput);
      }
      hiddenIdInput.value = category.categoryId.toString();
    }

    modalEl.classList.remove("hidden");
  }
}

export function setupCategoryActions() {
  const categoryGridEl = document.querySelector("#category-grid");

  // Using Event Delegation to executes delete and edit
  categoryGridEl?.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;
    const categoryId = Number(target.dataset.categoryId);

    if (target.classList.contains("delete-category")) {
      deleteCategory(categoryId);

      renderCategories();
    } else if (target.classList.contains("edit-category")) {
      renderEditCategory(categoryId);
    }
  });
}
