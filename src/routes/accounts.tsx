
import CreateAccount from "../components/Account/CreateAccount";
import { UseQueryResult, useQuery } from "react-query";

import AccountService from "../services/account-service";
import AccountTable from "../components/Account/AccountTable";
import { useParams } from "wouter";
import { useAccountFiltering } from "../hooks/useAccountFiltering";

export interface Account {
  id: number;
  name: string;
  dollar: number;
  cents: number;
  onBudget: boolean;
  orderPosition: number;
  transactionList: any;
}

const useAccounts = (): UseQueryResult<Account[]> => {
  return useQuery(
    "accounts",
    AccountService.findAll,
    { staleTime: 300000 }
  );
};

export default function Accounts() {

  const { status, data, error } = useAccounts();

  const { budgetAccounts, trackingAccounts } = useAccountFiltering(data || [])

  if (status === 'loading') {
    return <div>Loading</div>
  }
  if (error || !data) {
    return <p>Error occurred while fetching data</p>;
  }

  const createAccountButton = () => {
    return (
      <>
        <button
          className="btn flex m-auto"
          onClick={() => {
            const modal = document.getElementById(
              "createAccountModal"
            ) as HTMLFormElement;
            if (modal) {
              modal.showModal();
            }
          }}
        >
          Create Account
        </button><dialog id="createAccountModal" className={`modal bg-transparent`}>
          <form method="dialog" className={`modal-box modal-bottom sm:modal-middle`}>
            <CreateAccount />
            <div className="modal-action">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">
                Close
              </button>
            </div>
          </form>
        </dialog>
      </>
    )
  }

  if (data.length === 0) {
    return (
      <div className="flex flex-col">
        No accounts found! Click here to create one
        {createAccountButton()}
      </div>
    );
  }

  return (
    <div className="sm:p-4">
      {createAccountButton()}
      <div className="divider sm:text-2xl">Budget Accounts</div>
      {budgetAccounts.map((data) => (
        <AccountTable key={data.id} accountData={data as Account} isOverview={true} isTracking={false} />
      ))}
      <div className="divider sm:text-2xl">Tracking Accounts</div>
      {trackingAccounts.map((data) => (
        <AccountTable key={data.id} accountData={data as Account} isOverview={true} isTracking={true} />
      ))}
    </div>

  );
}
