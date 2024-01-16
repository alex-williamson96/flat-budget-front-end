import { Category } from "../../../routes/budget";
import CurrencyDisplay from "../../UI/Helper/CurrencyDisplay";
import BudgetTableInput from "./BudgetTableInput";
import CategoryService from "../../../services/category-service";
import { useMutation, useQueryClient } from "react-query";
import BudgetRowName from "./BudgetRowName";
import { useState } from "react";
import useIsMobile from "../../../hooks/useIsMobile";
import NewCategoryButton from "./NewCategoryButton";

export interface Currency {
  dollar: number;
  cents: number;
}

interface BudgetTableRowProps {
  category: Category;
  sumDollarsAssigned: number;
  sumCentsAssigned: number;
  sumDollarsActivity: number;
  sumCentsActivity: number;
  sumDollarsAvailable: number;
  sumCentsAvailable: number;
  budgetTableId: number;
  onRowUpdate: (category: Category) => void;
}

const BudgetTableRow = ({
  category,
  sumDollarsAssigned,
  sumCentsAssigned,
  sumDollarsActivity,
  sumCentsActivity,
  sumDollarsAvailable,
  sumCentsAvailable,
  budgetTableId,
  onRowUpdate,
}: BudgetTableRowProps) => {
  // console.log('row updated: ', category.name)

  // const updateCategory = useBudgetTableStore((state) => state.updateCategory);
  // const { setAssignedDollar, setAssignedCents } = useBudgetStore();

  const queryClient = useQueryClient();

  const [isHovered, setIsHovered] = useState(false);

  const { isMobile } = useIsMobile();

  const { mutate: updateCategoryAssignedValues } = useMutation(
    async (category: Category) =>
      CategoryService.updateAssignedValues(category),
    {
      onError: (err) => {
        console.error(err);
      },
      onSuccess: () => {
        queryClient.refetchQueries({ queryKey: ["categoryAmount"] });
      },
    }
  );

  const handleRowAssignedValuesUpdate = ({ dollar, cents }: Currency) => {
    const updatedCategory = {
      ...category,
      dollarAssigned: dollar,
      centsAssigned: cents,
    };

    onRowUpdate(updatedCategory);

    updateCategoryAssignedValues(updatedCategory);
  };

  const handleRowNameChange = (name: string) => {
    const updatedCategory = {
      ...category,
      name: name,
    };

    onRowUpdate(updatedCategory);
  };

  if (category.subOrder === 0) {
    return (
      <thead className="group">
        <tr className="bg-base-200">
          <th className="w-0">
            <input type="checkbox" className="checkbox" />
          </th>
          <th
            className="text-base-content text-xl relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {
              <BudgetRowName
                categoryId={category.id}
                categoryName={category.name}
                onCategoryNameChange={handleRowNameChange}
              />
            }
            <span
              className={`pl-2 tooltip ${
                isHovered || isMobile
                  ? "visible opacity-100"
                  : "invisible opacity-0"
              }`}
              data-tip="Add new category"
            >
              {
                <NewCategoryButton
                  mainOrder={category.mainOrder}
                  categoryId={category.id}
                />
              }
            </span>
          </th>
          <th></th>
          <th>
            <CurrencyDisplay
              dollar={sumDollarsAssigned}
              cents={sumCentsAssigned}
            />
          </th>
          <th>
            <CurrencyDisplay
              dollar={sumDollarsActivity}
              cents={sumCentsActivity}
            />
          </th>
          <th>
            <CurrencyDisplay
              dollar={sumDollarsAssigned - sumDollarsActivity}
              cents={sumCentsAssigned - sumCentsActivity}
            />
          </th>
        </tr>
      </thead>
    );
  }

  return (
    <tbody>
      <tr>
        <th className="w-0">
          <input type="checkbox" className="checkbox" />
        </th>
        <th>
          {
            <BudgetRowName
              categoryId={category.id}
              categoryName={category.name}
              onCategoryNameChange={handleRowNameChange}
            />
          }
        </th>
        <th>{category.notes}</th>
        <th>
          <BudgetTableInput
            dollar={category.dollarAssigned}
            cents={category.centsAssigned}
            onAssignedChanged={handleRowAssignedValuesUpdate}
          />
        </th>
        <th>
          <CurrencyDisplay
            dollar={category.dollarActivity}
            cents={category.centsActivity}
          />
        </th>
        <th>
          <CurrencyDisplay
            dollar={category.dollarAssigned - category.dollarActivity}
            cents={category.centsAssigned - category.centsActivity}
          />
        </th>
      </tr>
    </tbody>
  );
};

export default BudgetTableRow;
