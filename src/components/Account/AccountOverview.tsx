import { useParams } from "wouter";
import AccountService from "../../services/account-service";
import { UseQueryResult, useQuery } from "react-query";
import { Account } from "../../routes/accounts";
import AccountTable from "./AccountTable";

const useAccount = (): UseQueryResult<Account> => {
  const { accountId }: { accountId: string } = useParams();

  return useQuery(
    "account/" + accountId,
    () => AccountService.findById(accountId),

    { staleTime: 600000 }
  );
};

export default function AccountOverview() {
  const { status, data: account, error } = useAccount();

  if (status === "loading") {
    return <div>Loading</div>;
  }
  if (error || account === undefined) {
    return <p>Error occurred while fetching data</p>;
  }

  return (
    <AccountTable
      accountData={account}
      isOverview={false}
      isTracking={account.onBudget}
    />
  );
}
