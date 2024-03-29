import { Link } from "wouter";
import AccountService from "../../../services/account-service";
import { Account } from "../../../routes/accounts";
import { useQuery } from "react-query";
import CurrencyDisplay from "../../UI/Helper/CurrencyDisplay";
import { useEffect } from "react";
import { useAccountFiltering } from "../../../hooks/useAccountFiltering";
import useBudgetStore from "../../../stores/budget-store";

export type AccountOverview = Pick<
  Account,
  "id" | "name" | "dollar" | "cents" | "orderPosition" | "onBudget"
>;

export default function TopNavBarDropDown() {
  const { status, data, error } = useQuery({
    queryKey: "accounts",
    queryFn: AccountService.findAll,
    staleTime: 300000,
  });

  const { budgetAccounts, trackingAccounts } = useAccountFiltering(data || []);

  const budgetAccountsDollarTotal = budgetAccounts.reduce(
    (accumulator, currentValue) => {
      return accumulator + currentValue.dollar;
    },
    0
  );

  const budgetAccountsCentsTotal = budgetAccounts.reduce(
    (accumulator, currentValue) => {
      return accumulator + currentValue.cents;
    },
    0
  );

  const trackingAccountsDollarTotal = budgetAccounts.reduce(
    (accumulator, currentValue) => {
      return accumulator + currentValue.dollar;
    },
    0
  );

  const trackingAccountsCentsTotal = budgetAccounts.reduce(
    (accumulator, currentValue) => {
      return accumulator + currentValue.cents;
    },
    0
  );

  const updateBudgetDollar = useBudgetStore((state) => state.setBudgetDollar);
  const updateBudgetCents = useBudgetStore((state) => state.setBudgetCents);

  useEffect(() => {
    updateBudgetDollar(budgetAccountsDollarTotal);
    updateBudgetCents(budgetAccountsCentsTotal);
  }, [budgetAccountsDollarTotal, budgetAccountsCentsTotal]);

  if (status === "loading") {
    return <div>Loading</div>;
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
          <Link className="block w-full" href={"/accounts"}>
            <span className="pr-4">Accounts Total</span>
            <span className="float-right">
              <CurrencyDisplay
                dollar={budgetAccountsDollarTotal + trackingAccountsDollarTotal}
                cents={budgetAccountsCentsTotal + trackingAccountsCentsTotal}
              />
            </span>
          </Link>
        </li>
        <div className="divider">Budget Accounts</div>
        {budgetAccounts.map((account) => {
          return (
            <li key={account.id} className="w-full pl-2 pr-2 pb-2">
              <Link className="block w-full" href={"/accounts/" + account.id}>
                <span className="pr-4">{account.name}</span>
                <span className="float-right">
                  <CurrencyDisplay
                    dollar={account.dollar}
                    cents={account.cents}
                  />
                </span>
              </Link>
            </li>
          );
        })}
        <div className="divider">Tracking Accounts</div>
        {trackingAccounts.map((account) => {
          return (
            <li key={account.id} className="w-full pl-2 pr-2 pb-2">
              <Link className="block w-full" href={"/accounts/" + account.id}>
                <span className="pr-4">{account.name}</span>
                <span className="float-right">
                  <CurrencyDisplay
                    dollar={account.dollar}
                    cents={account.cents}
                  />
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </label>
  );
}

// useEffect(() => {
//   if (data && Array.isArray(data)) {
//     let totalDollars = 0;
//     let totalCents = 0;

//     data.forEach((account: AccountOverview) => {
//       totalDollars += account.dollar;
//       totalCents += account.cents;
//     });

//     setDollarTotal(totalDollars);
//     setCentsTotal(totalCents);
//   }
// }, [data]); // TODO: fix this infinte loop!!
