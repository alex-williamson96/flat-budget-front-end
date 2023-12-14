import { Account } from "../routes/accounts";
import { RequestHelper } from "./requests";

const baseURL = "http://localhost:8080/api/v1/account";

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

const AccountService = {
  findAll,
  findById,
  create,
  findAllBalances,
};

export default AccountService;
