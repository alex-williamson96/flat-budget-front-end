import { Category } from "../../routes/budget";
import CurrencyDisplay from "../UI/Helper/CurrencyDisplay";
import BudgetTableInput from "./BudgetTableInput";
import useBudgetTableStore from "../../stores/budget-table-store";
import CategoryService from "../../services/category-service";
import {
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import useBudgetStore from "../../stores/budget-store";

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

const useCategory = (category: Category) => {
  return useQuery(
    "category/" + category.id,
    () => CategoryService.updateAssignedValues(category),

    { staleTime: 600000 }
  );
};

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
  const { setAssignedDollar, setAssignedCents } = useBudgetStore();

  const queryClient = useQueryClient();

  const {
    isLoading: isUpdating,
    mutate: updateCategoryAssignedValues,
    isSuccess: isSuccess,
  } = useMutation(
    async (category: Category) => {
      return CategoryService.updateAssignedValues(category);
    },
    {
      onError: (err) => {
        console.error(err);
      },
    }
  );

  const handleRowUpdate = ({ dollar, cents }: Currency) => {
    console.log("hanlding row update");
    const updatedCategory = {
      ...category,
      dollarAssigned: dollar,
      centsAssigned: cents,
    };
    onRowUpdate(updatedCategory);

    updateCategoryAssignedValues(updatedCategory);

    setTimeout(() => {
      queryClient.refetchQueries({ queryKey: ["categoryAmount"] });
    }, 500);

    // setAssignedDollar(0);
    // setAssignedCents(0);
    // updateCategory(updatedCategory, budgetTableId);
  };

  if (category.subOrder === 0) {
    return (
      <thead>
        <tr className="bg-base-200">
          <th className="w-0">
            <input type="checkbox" className="checkbox" />
          </th>
          <th className="text-base-content text-xl">{category.name}</th>
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
        <th>{category.name}</th>
        <th>{category.notes}</th>
        <th>
          <BudgetTableInput
            dollar={category.dollarAssigned}
            cents={category.centsAssigned}
            onAssignedChanged={handleRowUpdate}
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
