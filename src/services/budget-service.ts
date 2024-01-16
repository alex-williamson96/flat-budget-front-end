import { Currency } from "../components/BudgetTable/BudgetTableRow";
import { RequestHelper } from "./requests";

const baseURL = "http://localhost:8080/api/v1/budget/";

const requestHelper = new RequestHelper(baseURL);

const getActiveBudget = async () => {
  return await requestHelper.get("active");
};

const getBudgetAmount = async (budgetYear: string, budgetMonth: string) => {
  return await requestHelper.get(`amount/${budgetYear}/${budgetMonth}`);
};

const getAssignedAmount = async () => {
  return await requestHelper.get("amount/accounts");
};

// const create = async (budget: Budget) => {
//   return await requestHelper.post("", budget);
// };

const BudgetService = {
  getActiveBudget,
  getBudgetAmount,
  getAssignedAmount,
};

export default BudgetService;
