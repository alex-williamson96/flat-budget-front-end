import { Account } from '../../routes/accounts';
import CurrencyDisplay from '../UI/Helper/CurrencyDisplay';
import TransactionRow from './transaction/TransactionRow';

const AccountTable = ({ accountData, isOverview }: { accountData: Account, isOverview: Boolean }) => {

  return (
    <div className="pb-2">
      <div className='flex p-2 items-center'>
        <span className='text-2xl pr-4'>{accountData.name}</span>
        <span className='text-xl pr-4'>Balance: {<CurrencyDisplay dollar={accountData.dollar} cents={accountData.cents} />}</span>
        {!isOverview && <button className='btn btn-primary'>Add transaction</button>}
      </div>
      <div className="overflow-x-scroll">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>Select</th>
              <th>Date</th>
              <th>Payee</th>
              <th>Note</th>
              <th>Income</th>
              <th>Expense</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {accountData.transactionList.map(
              (transaction: any) => <TransactionRow key={transaction.id} transactionData={transaction} />
            )}
          </tbody>
        </table>
      </div>
      <div className="divider divider-primary"></div>
    </div>)

}

export default AccountTable