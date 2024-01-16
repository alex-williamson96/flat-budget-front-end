import { UseQueryResult, useQuery } from "react-query";
import BudgetService from "../services/budget-service";
import BudgetTable from "../components/BudgetTable/BudgetTable";
import { useParams } from "wouter";
import useBudgetTableStore from "../stores/budget-table-store";
import { useEffect } from "react";

export interface Budget {
  id: number;
  name: string;
  budgetTableList: BudgetTableDto[];
}

export interface BudgetTableDto {
  id: number;
  categoryList: Category[];
  month: string;
  year: string;
  notes: string;
}

export interface Category {
  id: number;
  name: string;
  dollarAssigned: number;
  centsAssigned: number;
  dollarActivity: number;
  centsActivity: number;
  dollarAvailable: number;
  centsAvailable: number;
  mainOrder: number;
  subOrder: number;
  isCreditCard: boolean;
  notes: string;
  transactionList: Transaction[];
}

export interface Transaction {
  id: number;
  name: string;
  transactionDate: string;
  note: string;
  dollar: number;
  cents: number;
  isOutflow: boolean;
  isPending: boolean;
  payee: Payee;
}

export interface Payee {
  id: number;
  name: string;
}

const useBudget = (): UseQueryResult<Budget> => {
  return useQuery("budget", BudgetService.getActiveBudget, {
    staleTime: 300000,
  });
};

const Budget = () => {
  const { status, data: budget, error } = useBudget();

  // const { setBudgetTables, budgetTables } = useBudgetTableStore()

  const { year, month }: { year: string; month: string } = useParams();

  // useEffect(() => {
  //   if (data === undefined || data.budgetTableList === null) return
  //   return setBudgetTables(data.budgetTableList);
  // }, [data])

  if (status === "loading") {
    return "Loading...";
  }

  if (error || budget === undefined) {
    return "Error loading budget :(";
  }

  if (month) {
    return budget.budgetTableList.map(
      (budgetTable) =>
        budgetTable.month === month &&
        budgetTable.year === year && (
          <div className="p-2" key={budgetTable.id}>
            <BudgetTable
              budgetTable={budgetTable}
            />
          </div>
        )
    );
  }

  return <div>Error Loading Budget</div>;
};

export default Budget;
