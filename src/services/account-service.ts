import { Account } from "../routes/accounts";
import { RequestHelper } from "./requests";

const baseURL = "http://localhost:8080/api/v1/account";

const requestHelper = new RequestHelper(baseURL);

const findAll = async () => {
    return await requestHelper.get('/all')

}

const findById = async (id: string) => {
    return await requestHelper.get(`/${id}`)
}

const create = async (account: Account) => {
    return await requestHelper.post('/create', account);
}

const AccountService = {
    findAll,
    findById,
    create
}

export default AccountService;