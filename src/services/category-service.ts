import { AddCategoryRequestObject as createCategoryRequestObject } from "../components/BudgetTable/budget-row/NewCategoryModal";
import { Account } from "../routes/accounts";
import { Category } from "../routes/budget";
import { RequestHelper } from "./requests";

const baseURL = "http://localhost:8080/api/v1/category";

const requestHelper = new RequestHelper(baseURL);

const findAll = async () => {
  return await requestHelper.get("/all");
};

const findAllBalances = async () => {
  return await requestHelper.get("/all/balances");
};

const findById = async (id: string) => {
  return await requestHelper.get(`/${id}`);
};

const createAccount = async (
  categoryRequestObject: createCategoryRequestObject
) => {
  return await requestHelper.post("", categoryRequestObject);
};

const updateAssignedValues = async (category: Category) => {
  return await requestHelper.put(`/${category.id}/assigned`, category);
};

const updateCategoryName = async (name: string, id: number) => {
  return await requestHelper.put(`/${id}/name`, { name: name });
};

const CategoryService = {
  updateAssignedValues,
  updateCategoryName,
  createAccount,
};

export default CategoryService;
