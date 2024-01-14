import { useEffect } from "react";
import { Category } from "../../routes/budget";
import CurrencyDisplay from "../UI/Helper/CurrencyDisplay";
import useBudgetStore from "../../stores/budget-store";
import BudgetTableInput from "./BudgetTableInput";

interface BudgetTableRowProps {
  category: Category;
  sumDollarsAssigned: number;
  sumCentsAssigned: number;
  sumDollarsActivity: number;
  sumCentsActivity: number;
  sumDollarsAvailable: number;
  sumCentsAvailable: number;
}

const BudgetTableRow = ({
  category,
  sumDollarsAssigned,
  sumCentsAssigned,
  sumDollarsActivity,
  sumCentsActivity,
  sumDollarsAvailable,
  sumCentsAvailable }: BudgetTableRowProps) => {

  const updateAssignedDollars = useBudgetStore((state) => state.updateAssignedDollar)
  const updateAssignedCents = useBudgetStore((state) => state.updateAssignedCents)

  useEffect(() => {
    updateAssignedCents(sumCentsAssigned)
    updateAssignedDollars(sumDollarsAssigned)

    console.log('this is running')

  }, [sumDollarsAssigned, sumCentsAssigned])

  if (category.subOrder === 0) {

    return (
      <thead>
        <tr className="bg-base-200">
          <th className="w-0">
            <input type="checkbox" className="checkbox" />
          </th>
          <th className="text-base-content text-xl">{category.name}</th>
          <th></th>
          <th><CurrencyDisplay dollar={sumDollarsAssigned} cents={sumCentsAssigned} /></th>
          <th><CurrencyDisplay dollar={sumDollarsActivity} cents={sumCentsActivity} /></th>
          <th><CurrencyDisplay dollar={sumDollarsAvailable} cents={sumCentsAvailable} /></th>
        </tr>
      </thead>
    )
  }

  return (
    <tbody>
      <tr>
        <th className="w-0">
          <input type="checkbox" className="checkbox" />
        </th>
        <th>{category.name}</th>
        <th>{category.notes}</th>
        <th><BudgetTableInput dollar={category.dollarAssigned} cents={category.centsAssigned} /></th>
        <th><CurrencyDisplay dollar={category.dollarActivity} cents={category.centsActivity} /></th>
        <th><CurrencyDisplay dollar={category.dollarAvailable} cents={category.centsActivity} /></th>
      </tr>
    </tbody>
  );
}

export default BudgetTableRow;
