import { BudgetTableDto, Category } from "../../routes/budget";
import useBudgetStore from "../../stores/budget-store";
import BudgetTableSection from "./BudgetTableSection";

interface CategorizedCategories {
  [mainOrder: number]: Category[];
}

interface BudgetTableProps {
  budgetTable: BudgetTableDto;
}

const BudgetTable = ({ budgetTable }: BudgetTableProps) => {
  const categorizedCategories =
    budgetTable.categoryList.reduce<CategorizedCategories>(
      (result, category) => {
        const { mainOrder } = category;

        if (!result[mainOrder]) {
          result[mainOrder] = [];
        }

        result[mainOrder].push(category);
        return result;
      },
      {}
    );

  return (
    <div className="overflow-x-auto rounded-lg border border-neutral">
      <table className="table table-compact w-full table-auto">
        <thead>
          <tr className="bg-base-300 text-base-content text-lg">
            <th className="w-0">
              <input type="checkbox" className="checkbox" />
            </th>
            <th>Category</th>
            <th></th>
            <th>Assigned</th>
            <th>Activity</th>
            <th>Available</th>
          </tr>
        </thead>
        {Object.keys(categorizedCategories).map((mainOrder) => {
          const categories = categorizedCategories[parseInt(mainOrder, 10)];
          return (
            <BudgetTableSection
              key={mainOrder}
              categoryList={categories}
              budgetTableId={budgetTable.id}
            />
          );
        })}
      </table>
    </div>
  );
};

export default BudgetTable;
