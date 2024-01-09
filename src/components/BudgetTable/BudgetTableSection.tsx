import { Category } from "../../routes/budget";
import BudgetTableRow from "./BudgetTableRow";

const BudgetTableSection = ({ categoryList: categoryList }: { categoryList: Category[] }) => {

  const sumDollarsAssigned = categoryList.reduce((totalDollars, category) => totalDollars + category.dollarAssigned, 0);
  const sumCentsAssigned = categoryList.reduce((totalCents, category) => totalCents + category.centsAssigned, 0);

  const sumDollarsActivity = categoryList.reduce((totalDollars, category) => totalDollars + category.dollarActivity, 0);
  const sumCentsActivity = categoryList.reduce((totalCents, category) => totalCents + category.centsActivity, 0);

  const sumDollarsAvailable = categoryList.reduce((totalDollars, category) => totalDollars + category.dollarAvailable, 0);
  const sumCentsAvailable = categoryList.reduce((totalCents, category) => totalCents + category.centsAvailable, 0);



  return (
    categoryList.map((category, index) => (
      <BudgetTableRow
        key={category.id}
        category={category}
        index={index}
        sumDollarsAssigned={sumDollarsAssigned}
        sumCentsAssigned={sumCentsAssigned}
        sumDollarsActivity={sumDollarsActivity}
        sumCentsActivity={sumCentsActivity}
        sumDollarsAvailable={sumDollarsAvailable}
        sumCentsAvailable={sumCentsAvailable} />
    ))
  )
}

export default BudgetTableSection;