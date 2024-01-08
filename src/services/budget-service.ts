import { Budget } from '../routes/budget';
import { RequestHelper } from './requests';

const baseURL = "http://localhost:8080/api/v1/budget/";


const requestHelper = new RequestHelper(baseURL);

const getActiveBudget = async () => {
  return await requestHelper.get("active");
};


// const create = async (budget: Budget) => {
//   return await requestHelper.post("", budget);
// };

const BudgetService = {
  getActiveBudget
};

export default BudgetService;