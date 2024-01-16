import { create } from "zustand";
import { Budget, BudgetTableDto, Category } from "../routes/budget";
import BudgetTable from "../components/BudgetTable/BudgetTable";

interface BudgetTableStore {
  budgetTables: BudgetTableDto[];
  updateCategory: (
    category: Category,
    budgetTableId: number
  ) => void;
  // setCategoryList: (categoryList: Category[]) => void;
  setBudgetTables: (budgetTableList: BudgetTableDto[]) => void;
}

const useBudgetTableStore = create<BudgetTableStore>()((set) => ({
  budgetTables: [],
  updateCategory: (category: Category, budgetTableId: number) =>
    set((state) => ({
      budgetTables: updateBudgetTable(
        category,
        budgetTableId,
        state.budgetTables
      ),
    })),
  // setCategoryList: (categoryList: Category[]) => set({}),
  setBudgetTables: (budgetTableList: BudgetTableDto[]) =>
    set({ budgetTables: budgetTableList }),
}));

const updateBudgetTable = (
  updatedCategory: Category,
  budgetTableId: number,
  budgetTableList: BudgetTableDto[]
) => {
  const index = budgetTableList.findIndex(
    (budgetTable) => budgetTable.id === budgetTableId
  );

  if (index === -1) {
    console.error("BudgetTableDto not found, error while updating category");
    return budgetTableList;
  }

  // Find the index of the category in the CategoryList of the BudgetTableDto
  const categoryIndex = budgetTableList[index].categoryList.findIndex(
    (category) => category.id === updatedCategory.id
  );

  if (categoryIndex === -1) {
    console.error(
      "Category not found in the specified BudgetTableDto, error while updating"
    );
    return budgetTableList;
  }

  // Create a new object with the updated category
  const updatedBudgetTableDto: BudgetTableDto = {
    ...budgetTableList[index],
    categoryList: [
      ...budgetTableList[index].categoryList.slice(0, categoryIndex),
      {
        ...budgetTableList[index].categoryList[categoryIndex],
        ...updatedCategory,
      },
      ...budgetTableList[index].categoryList.slice(categoryIndex + 1),
    ],
  };

  const updatedList = [...budgetTableList];
  updatedList[index] = updatedBudgetTableDto;

  return updatedList;
};

export default useBudgetTableStore;
