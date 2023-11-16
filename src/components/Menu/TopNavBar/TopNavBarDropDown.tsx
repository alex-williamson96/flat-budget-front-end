import { Link } from "wouter";
import AccountService from "../../../services/account-service";
import { Account } from "../../../routes/accounts";
import { UseQueryResult, useQuery } from "react-query";
import CurrencyDisplay from "../../UI/Helper/CurrencyDisplay";
import { useEffect, useState } from "react";

const useAccounts = (): UseQueryResult<Account[]> => {
  return useQuery(
    "account",
    AccountService.findAll,
    { staleTime: 300000 }
  );
};

export default function TopNavBarDropDown() {

  // const accounts: Promise<Exclude<Account, "createdDate" | "updatedDate">[]> = 

  const { status, data, error } = useAccounts();

  const [dollarTotal, setDollarTotal] = useState(0)
  const [centsTotal, setCentsTotal] = useState(0)

  useEffect(() => {
    if (data && Array.isArray(data)) {
      let totalDollars = 0;
      let totalCents = 0;

      data.forEach((account: Account) => {
        totalDollars += account.dollar;
        totalCents += account.cents;
      });

      setDollarTotal(totalDollars);
      setCentsTotal(totalCents);
    }
  }, [data]);

  if (status === 'loading') {
    return <div>Loading</div>
  }
  if (error) {
    return <p>Error occurred while fetching data</p>;
  }

  if (data === undefined) {
    return <div>Error loading data</div>
  }

  const sortedAccounts = [...data].sort((a, b) => a.orderPosition - b.orderPosition);



  return (
    <label className="dropdown dropdown-hover border-solid">
      <Link href="/accounts">
        <label tabIndex={0} className="btn m-1 btn-sm btn-neutral">
          Accounts
        </label>
      </Link>
      <ul
        tabIndex={0}
        className="dropdown-content menu p-2 bg-primary-focus rounded-box border-2 border-primary w-max text-left"
      >
        <li className="w-full bg-secondary-focus rounded-lg">
          <Link className="block w-full" href={'/accounts'}>Accounts Total
            <span className="float-right">
              <CurrencyDisplay dollar={dollarTotal} cents={centsTotal} />
            </span>
          </Link>
        </li>
        {sortedAccounts.map((account) => {
          return (
            <li key={account.id} className="w-full">
              <Link className="block w-full" href={'/accounts/' + account.id}>{account.name}
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
