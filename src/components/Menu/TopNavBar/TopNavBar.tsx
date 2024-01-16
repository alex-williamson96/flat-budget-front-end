import TopNavBarDropDown from "./TopNavBarDropDown";
import LeftArrow from "../../UI/Icons/LeftArrow";
import RightArrow from "../../UI/Icons/RightArrow";
import { Link } from "wouter";
import CurrencyDisplay from "../../UI/Helper/CurrencyDisplay";
import useBudgetStore from "../../../stores/budget-store";
import { UseQueryResult, useQuery } from "react-query";
import BudgetService from "../../../services/budget-service";
import { Currency } from "../../BudgetTable/budget-row/BudgetTableRow";

const useCategoryAmount = (
  budgetYear: string,
  budgetMonth: string
): UseQueryResult<Currency> => {
  return useQuery(
    "categoryAmount",
    () => BudgetService.getBudgetAmount(budgetYear, budgetMonth),
    {
      staleTime: 600000,
    }
  );
};

const useAccoutsAmount = (): UseQueryResult<Currency> => {
  return useQuery("accountsAmount", () => BudgetService.getAssignedAmount(), {
    staleTime: 600000,
  });
};

export default function TopNavBar() {
  const budgetYear = useBudgetStore((state) => state.year);
  const budgetMonth = useBudgetStore((state) => state.month);
  const budgetDate = budgetYear + "/" + budgetMonth;

  const {
    data: budgetAmount,
    status: budgetAmountStatus,
    error: budgetAmountError,
  } = useAccoutsAmount();

  const {
    data: assignedAmount,
    status: assignedAmountStatus,
    error: assignedAmountError,
  } = useCategoryAmount(budgetYear, budgetMonth);

  const loadingAssign = () => {
    return <p>Loading...</p>;
  };

  const errorLoadingAssign = () => {
    return <p>Error :(</p>;
  };

  const assingedAmountDisplay = () => {
    if (assignedAmount === undefined || budgetAmount === undefined) {
      return <p>Undefined</p>;
    }
    return (
      <>
        Assign{" "}
        <CurrencyDisplay
          dollar={budgetAmount.dollar - assignedAmount.dollar}
          cents={budgetAmount.cents - assignedAmount.cents}
        />
      </>
    );
  };

  return (
    <div className="w-full navbar z-50 bg-base-300 opacity-100 fixed top-0 left-0 lg:pr-16 lg:pl-16">
      <div className="flex-none lg:hidden">
        <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-6 h-6 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </label>
      </div>
      <div className="flex-1 px-2 m-1">
        <Link href={`/budget/${budgetDate}`}>
          <label tabIndex={0} className="btn btn-sm btn-primary lg:btn-lg">
            Flat Budget
          </label>
        </Link>
        <span className="pl-2">
          <button className="btn btn-sm lg:btn-lg btn-success">
            {assignedAmountStatus === "loading" ||
            budgetAmountStatus === "loading"
              ? loadingAssign()
              : assignedAmountError ||
                budgetAmountError ||
                budgetAmountStatus === "error" ||
                assignedAmountStatus === "error"
              ? errorLoadingAssign()
              : assingedAmountDisplay()}
          </button>
        </span>

        {/* <label tabIndex={0} className="card-compact">
          <span>
            <span>
              <LeftArrow /> Hello <RightArrow />
            </span>
          </span>
        </label> */}
      </div>
      <div className="flex-none hidden lg:block">
        <ul className="menu menu-horizontal">
          <TopNavBarDropDown />
          <Link href="/reports">
            <label
              tabIndex={0}
              className="btn m-1 btn-sm btn-neutral lg:btn-lg"
            >
              Reports
            </label>
          </Link>
          <Link href="/profile">
            <label
              tabIndex={0}
              className="btn m-1 btn-sm btn-neutral lg:btn-lg"
            >
              Profile
            </label>
          </Link>
        </ul>
      </div>
    </div>
  );
}
