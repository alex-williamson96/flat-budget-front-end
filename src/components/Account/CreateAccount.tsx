import { useState } from "react";
import { useMutation } from "react-query";
import AccountService from "../../services/account-service";
import { Account } from "../../routes/accounts";

interface AccountMutationParams {
  newAccountData: Account,
}

const CreateAccount = () => {
  const [accountName, setAccountName] = useState('');
  const [startingBalance, setStartingBalance] = useState('');
  const [onBudget, setAccountType] = useState(true);

  const createAccountMutation = useMutation({
    mutationFn: (params: AccountMutationParams) => {
      return AccountService.create(params.newAccountData)
    },
  })

  const createAccount = () => {
    console.log('Account Name:', accountName);
    console.log('Starting Balance:', startingBalance);
    console.log('Account Type:', onBudget);

    const [dollarString, centsString] = startingBalance.toString().split('.');

    const newAccount: Account = {
      name: accountName,
      dollar: parseInt(dollarString, 10),
      cents: parseInt(centsString || '0', 10),
      onBudget: onBudget,
      id: 0,
      orderPosition: 0,
    }

    createAccountMutation.mutate({newAccountData: newAccount})
  }

  return (
    <div className="form-control w-full max-w-xs">
      <label className="label">
        <span className="label-text">Account Name</span>
      </label>
      <input
        type="text"
        placeholder="Type here"
        className="input input-bordered w-full max-w-xs"
        value={accountName}
        onChange={(e) => setAccountName(e.target.value)}
      />
      <label className="label"></label>
      <label className="label">
        <span className="label-text">Starting Balance</span>
      </label>
      <input
        type="number"
        placeholder="1,000.00"
        className="input input-bordered w-full max-w-xs"
        value={startingBalance}
        onChange={(e) => setStartingBalance(e.target.value)}
      />
      <label className="label"></label>
      <div className="input-bordered">
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">Budget account</span>
            <input
              type="radio"
              name="tracking"
              className="radio radio-primary"
              checked={onBudget}
              onChange={() => setAccountType(true)}
            />
          </label>
        </div>
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">Tracking</span>
            <input
              type="radio"
              name="tracking"
              className="radio radio-primary"
              checked={!onBudget}
              onChange={() => setAccountType(false)}
            />
          </label>
          <button className="btn" type="button" onClick={createAccount}>Create</button>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;

{
  /* <div className="form-control w-full max-w-xs">
  <label className="label">
    <span className="label-text">What is your name?</span>
    <span className="label-text-alt">Top Right label</span>
  </label>
  <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
  <label className="label">
    <span className="label-text-alt">Bottom Left label</span>
    <span className="label-text-alt">Bottom Right label</span>
  </label>
</div> */
}
