import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import CreateAccount from "../components/Account/CreateAccount";
import { UseQueryResult, useQuery } from "react-query";
import UserService from "../services/user-service";
import AccountService from "../services/account-service";

export interface Account {
  id: number;
  name: string;
  dollar: number;
  cents: number;
  onBudget: boolean;
  orderPosition: number;
  createdDate?: Date;
  updatedDate?: Date;
}

const useAccounts = (): UseQueryResult<AxiosResponse<Account[]>> => {
  return useQuery(
    "account",
    AccountService.findAll,
    { staleTime: 300000 }
  );
};

export default function Accounts({
  params,
}: {
  params: { accountId: string };
}) {
  console.log(params.accountId);

  const { status, data, error } = useAccounts();

  if (status === 'loading') {
    return <div>Loading</div>
  }
  if (error) {
    return <p>Error occurred while fetching data</p>;
  }

  const createAccountButton = () => {
    return <><button
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
  }

  console.log('data: ', data);

  if (data.length === 0) {
    return (
      <div className="flex flex-col">
        No accounts found! Click here to create one
        {createAccountButton()}
      </div>
    );
  }

  return (
    <div>
      {createAccountButton()}
      Account {JSON.stringify(data)} works!
    </div>
  );
}
