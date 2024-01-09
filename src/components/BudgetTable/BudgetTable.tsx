import { BudgetTableDto, Category } from "../../routes/budget";
import BudgetTableSection from "./BudgetTableSection";

interface CategorizedCategories {
  [mainOrder: number]: Category[];
}

const BudgetTable = ({ budget: budgetTable }: { budget: BudgetTableDto }) => {

  const categorizedCategories = budgetTable.categoryList.reduce<CategorizedCategories>((result, category) => {
    const { mainOrder } = category;

    // Create an array for each mainOrder if it doesn't exist
    if (!result[mainOrder]) {
      result[mainOrder] = [];
    }

    // Push the category into the respective mainOrder array
    result[mainOrder].push(category);

    return result;
  }, {});


  return (
    <div className="overflow-x-auto">
      <table className="table table-compact w-full table-auto">
        <thead>
          <tr className="hover">
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
        {Object.keys(categorizedCategories).map(mainOrder => {
          const categories = categorizedCategories[parseInt(mainOrder, 10)];
          return (
            <BudgetTableSection key={mainOrder} categoryList={categories} />
          )
        })}
      </table>
    </div>
  );
}

export default BudgetTable;
