import { Link } from 'wouter';
import { Account } from '../../routes/accounts';
import CurrencyDisplay from '../UI/Helper/CurrencyDisplay';
import TransactionRow from './transaction/TransactionRow';

const AccountTable = ({ accountData, isOverview, isTracking }: { accountData: Account, isOverview: Boolean, isTracking: Boolean }) => {

  return (
    <div>
      <div className='pt-4 pb-4 pl-2 pr-2 rounded border border-base-300 bg-neutral'>
        <div className='flex p-2 items-center'>
          <Link to={`/accounts/${accountData.id.toString()}`}>
            <span className='text-xl p-2  text-secondary-content btn btn-secondary'>{accountData.name}</span>
          </Link>
          <span className='text-xl pl-4 pr-4'>Balance: {<CurrencyDisplay dollar={accountData.dollar} cents={accountData.cents} />}</span>
          {!isOverview && <button className='btn btn-primary'>Add transaction</button>}
        </div>
        <div className="overflow-x-scroll">
          <table className="table table-zebra">
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
      </div>
      <div className={isTracking ? "divider divider-secondary" : "divider divider-primary"}></div>
    </div>
  )

}

export default AccountTable