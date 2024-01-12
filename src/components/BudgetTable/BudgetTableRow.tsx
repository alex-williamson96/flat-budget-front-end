import { useEffect } from "react";
import { Category } from "../../routes/budget";
import CurrencyDisplay from "../UI/Helper/CurrencyDisplay";
import useBudgetStore from "../../stores/budget-store";

interface BudgetTableRowProps {
  category: Category;
  index: number;
  sumDollarsAssigned: number;
  sumCentsAssigned: number;
  sumDollarsActivity: number;
  sumCentsActivity: number;
  sumDollarsAvailable: number;
  sumCentsAvailable: number;
}

const BudgetTableRow = (props: BudgetTableRowProps) => {

  const updateAssignedDollars = useBudgetStore((state) => state.updateAssignedDollar)
  const updateAssignedCents = useBudgetStore((state) => state.updateAssignedCents)
  const d = useBudgetStore(state => state.assignedDollar)

  useEffect(() => {
    updateAssignedCents(props.sumCentsAssigned)
    updateAssignedDollars(props.sumDollarsAssigned)

  }, [props.sumDollarsAssigned, props.sumCentsAssigned])

  if (props.category.subOrder === 0) {

    return (
      <thead>
        <tr className="bg-base-200">
          <th className="w-0">
            <input type="checkbox" className="checkbox" />
          </th>
          <th className="text-base-content text-xl">{props.category.name}</th>
          <th></th>
          <th><CurrencyDisplay dollar={props.sumDollarsAssigned} cents={props.sumCentsAssigned} /></th>
          <th><CurrencyDisplay dollar={props.sumDollarsActivity} cents={props.sumCentsActivity} /></th>
          <th><CurrencyDisplay dollar={props.sumDollarsAvailable} cents={props.sumCentsAvailable} /></th>
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
        <th>{props.category.name}</th>
        <th>{props.category.notes}</th>
        <th><CurrencyDisplay dollar={props.category.dollarAssigned} cents={props.category.centsAssigned} /></th>
        <th><CurrencyDisplay dollar={props.category.dollarActivity} cents={props.category.centsActivity} /></th>
        <th><CurrencyDisplay dollar={props.category.dollarAvailable} cents={props.category.centsActivity} /></th>
      </tr>
    </tbody>
  );
}

export default BudgetTableRow;
