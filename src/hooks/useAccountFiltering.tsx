import { useEffect, useState } from "react";
import { AccountOverview } from "../components/Menu/TopNavBar/TopNavBarDropDown";
import { Account } from "../routes/accounts";

export const useAccountFiltering = (accounts: (Account | AccountOverview)[]): {
  budgetAccounts: Account[] | AccountOverview[],
  trackingAccounts: AccountOverview[] | AccountOverview[]
} => {
  const [budgetAccounts, setBudgetAccounts] = useState(accounts)
  const [trackingAccounts, setTrackingAccounts] = useState(accounts)

  useEffect(() => {
    const sortedAccounts = [...accounts].sort((a, b) => a.orderPosition - b.orderPosition);

    setBudgetAccounts(sortedAccounts.filter(account => account.onBudget))
    setTrackingAccounts(sortedAccounts.filter(account => !account.onBudget))

  }, [accounts.length])

  return { budgetAccounts: budgetAccounts, trackingAccounts: trackingAccounts }
}