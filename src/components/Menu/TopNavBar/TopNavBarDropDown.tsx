import { Link } from "wouter";
import AccountService from "../../../services/account-service";
import { Account } from "../../../routes/accounts";
import { UseQueryResult, useQuery } from "react-query";
import CurrencyDisplay from "../../UI/Helper/CurrencyDisplay";
import { useEffect, useState } from "react";
import { useAccountFiltering } from "../../../hooks/useAccountFiltering";

export type AccountOverview = Pick<Account, 'id' | 'name' | 'dollar' | 'cents' | 'orderPosition' | 'onBudget'>

const useAccounts = (): UseQueryResult<AccountOverview[]> => {
  return useQuery(
    "accounts",
    AccountService.findAll,
    { staleTime: 300000 }
  );
};

export default function TopNavBarDropDown() {

  const { status, data, error } = useAccounts();

  const [dollarTotal, setDollarTotal] = useState(0)
  const [centsTotal, setCentsTotal] = useState(0)

  const { budgetAccounts, trackingAccounts } = useAccountFiltering(data || [])

  useEffect(() => {
    if (data && Array.isArray(data)) {
      let totalDollars = 0;
      let totalCents = 0;

      data.forEach((account: AccountOverview) => {
        totalDollars += account.dollar;
        totalCents += account.cents;
      });

      setDollarTotal(totalDollars);
      setCentsTotal(totalCents);
    }
  }, [data]); // TODO: fix this infinte loop!!

  if (status === 'loading') {
    return <div>Loading</div>
  }
  if (error) {
    return <p>Error occurred while fetching data</p>;
  }

  return (
    <label className="dropdown dropdown-hover border-solid">
      <Link href="/accounts">
        <label tabIndex={0} className="btn m-1 btn-sm btn-neutral  lg:btn-lg">
          Accounts
        </label>
      </Link>
      <ul
        tabIndex={0}
        className="dropdown-content menu p-2 bg-base-300 lg:text-md rounded-box border-2 border-primary w-max text-left"
      >
        <li className="w-full bg-secondary-focus rounded-lg p-1">
          <Link className="block w-full" href={'/accounts'}>
            <span className="pr-4">Accounts Total</span>
            <span className="float-right">
              <CurrencyDisplay dollar={dollarTotal} cents={centsTotal} />
            </span>
          </Link>
        </li>
        <div className="divider">Budget Accounts</div>
        {budgetAccounts.map((account) => {
          return (
            <li key={account.id} className="w-full pl-2 pr-2 pb-2">
              <Link className="block w-full" href={'/accounts/' + account.id}>
                <span className="pr-4">
                  {account.name}
                </span>
                <span className="float-right">
                  <CurrencyDisplay dollar={account.dollar} cents={account.cents} />
                </span>
              </Link>
            </li>
          )
        })}
        <div className="divider">Tracking Accounts</div>
        {trackingAccounts.map((account) => {
          return (
            <li key={account.id} className="w-full pl-2 pr-2 pb-2">
              <Link className="block w-full" href={'/accounts/' + account.id}>
                <span className="pr-4">
                  {account.name}
                </span>
                <span className="float-right">
                  <CurrencyDisplay dollar={account.dollar} cents={account.cents} />
                </span>
              </Link>
            </li>
          )
        })}
        {/* <li className="w-full">
          <Link className="block w-full" href="/accounts/1">Amex Gold: <span className="float-right"> -$1,205.97</span></Link>
        </li>
        <li className="w-full">
          <Link className="block w-full" href="/accounts/2">Item 2: <span className="float-right">$1,230.34</span></Link>
        </li> */}
      </ul>
    </label>
  );
}
