import { UseQueryResult, useQuery } from "react-query";
import BudgetTable from "../components/BudgetTable/BudgetTable";
import BudgetService from "../services/budget-service";

export interface Budget {
    name: string
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


    return <BudgetTable budget={data}/>
}

export default Budget;