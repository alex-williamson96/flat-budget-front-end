import { useEffect, useState } from "react";
import Budget, { Category } from "../../routes/budget";
import BudgetTableRow from "./budget-row/BudgetTableRow";
import useBudgetStore from "../../stores/budget-store";

interface BudgetTableSectionProps {
  categoryList: Category[];
  budgetTableId: number;
}

const BudgetTableSection = ({
  categoryList,
  budgetTableId,
}: BudgetTableSectionProps) => {
  const [sumDollarsAssigned, setSumDollarsAssigned] = useState(0);
  const [sumCentsAssigned, setSumCentsAssigned] = useState(0);
  const [sumDollarsActivity, setSumDollarsActivity] = useState(0);
  const [sumCentsActivity, setSumCentsActivity] = useState(0);
  const [sumDollarsAvailable, setSumDollarsAvailable] = useState(0);
  const [sumCentsAvailable, setSumCentsAvailable] = useState(0);

  const [updateUseEffect, setUpdateUseEffect] = useState(0);

  const {
    updateAssignedDollar,
    updateAssignedCents,
    setAssignedDollar,
    setAssignedCents,
  } = useBudgetStore();

  useEffect(() => {
    const newSumDollarsAssigned = categoryList.reduce(
      (totalDollars, category) => totalDollars + category.dollarAssigned,
      0
    );
    const newSumCentsAssigned = categoryList.reduce(
      (totalCents, category) => totalCents + category.centsAssigned,
      0
    );
    const newSumDollarsActivity = categoryList.reduce(
      (totalDollars, category) => totalDollars + category.dollarActivity,
      0
    );
    const newSumCentsActivity = categoryList.reduce(
      (totalCents, category) => totalCents + category.centsActivity,
      0
    );
    const newSumDollarsAvailable =
      newSumDollarsAssigned - newSumDollarsActivity;
    const newSumCentsAvailable = newSumCentsAssigned - newSumCentsActivity;

    updateAssignedDollar(newSumDollarsAssigned);
    updateAssignedCents(newSumCentsAssigned);

    setSumDollarsAssigned(newSumDollarsAssigned);
    setSumCentsAssigned(newSumCentsAssigned);
    setSumDollarsActivity(newSumDollarsActivity);
    setSumCentsActivity(newSumCentsActivity);
    setSumDollarsAvailable(newSumDollarsAvailable);
    setSumCentsAvailable(newSumCentsAvailable);
  }, [updateUseEffect]);

  const handleRowUpdate = (category: Category) => {
    const index = categoryList.findIndex((cat) => cat.id === category.id);
    categoryList[index] = category;
    setUpdateUseEffect((prev) => prev + 1);
  };

  const sortedCategoryList = categoryList.sort(
    (a, b) => a.subOrder - b.subOrder
  );

  return sortedCategoryList.map((category) => (
    <BudgetTableRow
      key={category.id}
      category={category}
      sumDollarsAssigned={sumDollarsAssigned}
      sumCentsAssigned={sumCentsAssigned}
      sumDollarsActivity={sumDollarsActivity}
      sumCentsActivity={sumCentsActivity}
      sumDollarsAvailable={sumDollarsAssigned - sumDollarsActivity}
      sumCentsAvailable={sumCentsAvailable}
      budgetTableId={budgetTableId}
      onRowUpdate={handleRowUpdate}
    />
  ));
};

export default BudgetTableSection;
