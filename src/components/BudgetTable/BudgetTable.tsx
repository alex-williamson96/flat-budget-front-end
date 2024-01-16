import { BudgetTableDto, Category } from "../../routes/budget";
import useBudgetStore from "../../stores/budget-store";
import BudgetTableSection from "./BudgetTableSection";
import NewCategoryButton from "./budget-row/NewCategoryButton";
import useIsMobile from "../../hooks/useIsMobile";
import { useState } from "react";

interface CategorizedCategories {
  [mainOrder: number]: Category[];
}

interface BudgetTableProps {
  budgetTable: BudgetTableDto;
}

const BudgetTable = ({ budgetTable }: BudgetTableProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const { isMobile } = useIsMobile();

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
        <thead className="group">
          <tr className="bg-base-300 text-base-content text-lg">
            <th className="w-0">
              <input type="checkbox" className="checkbox" />
            </th>
            <th
              className="relative"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              Category
              <span
                className={`pl-2 tooltip ${
                  isHovered || isMobile
                    ? "visible opacity-100"
                    : "invisible opacity-0"
                } tooltip-right`}
                data-tip="Add new category"
              >
                {<NewCategoryButton mainOrder={0} categoryId={0} />}
              </span>
            </th>
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
