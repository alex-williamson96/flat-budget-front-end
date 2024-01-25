import { useParams } from "wouter";
import AccountService from "../../services/account-service";
import { useQuery } from "react-query";
import AccountTable from "./AccountTable";

export default function AccountOverview() {
  const { accountId }: { accountId: string } = useParams();

  const {
    isLoading,
    data: account,
    error,
  } = useQuery({
    queryKey: `account/${accountId}`,
    queryFn: () => AccountService.findById(accountId),
    staleTime: 60000,
  });

  if (isLoading) {
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
