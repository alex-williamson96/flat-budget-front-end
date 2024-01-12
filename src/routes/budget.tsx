import { UseQueryResult, useQuery } from "react-query";
import BudgetService from "../services/budget-service";
import BudgetTable from "../components/BudgetTable/BudgetTable";
import { useParams } from "wouter";

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
  id?: number;
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
  return useQuery(
    "budget",
    BudgetService.getActiveBudget,
    { staleTime: 300000 }
  );
};



const Budget = () => {
  const { status, data, error } = useBudget();

  const { year, month }: { year: string, month: string } = useParams();

  if (status === 'loading') {
    return 'Loading...'
  }

  if (error || data === undefined) {
    return 'Error loading budget :('
  }

  const budget = data;

  const budgetTableList = budget.budgetTableList;

  

  if (month) {
    return (
      budgetTableList.map(
        budgetTable => (
          (budgetTable.month === month && budgetTable.year === year) &&
          <div className="p-2" key={budgetTable.id}>
            <BudgetTable budget={budgetTable} />
          </div>
        )
      )
    )
  }


  return <div>Error Loading Budget</div>
}

export default Budget;