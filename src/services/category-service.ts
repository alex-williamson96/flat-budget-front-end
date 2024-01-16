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

const create = async (account: Account) => {
  return await requestHelper.post("", account);
};

const updateAssignedValues = async (category: Category) => {
  return await requestHelper.put(`/${category.id}/assigned`, category);
};

const CategoryService = {
  updateAssignedValues,
};

export default CategoryService;
