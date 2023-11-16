import { Account } from '../../routes/accounts';
import CurrencyDisplay from '../UI/Helper/CurrencyDisplay';
import TransactionRow from './TransactionRow';

const AccountTable = ({ accountData }: { accountData: Account }) => {



  return (
    <div className="pb-2">
      <div className='flex p-2'>
        <span className='text-lg pr-4'>{accountData.name}</span>
        <span className='text-lg pr-4'>Balance: {<CurrencyDisplay dollar={accountData.dollar} cents={accountData.cents} />}</span>
      </div>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Date</th>
              <th>Payee</th>
              <th>Income</th>
              <th>Expense</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {accountData.transactionList.map(
              (transaction: any) => <TransactionRow key={transaction.id} transactionData={transaction} />
            )}
            {/* row 2 */}
            <tr>
              <th>2</th>
              <td>Hart Hagerty</td>
              <td>Desktop Support Technician</td>
              <td>Purple</td>
              <td>Purple</td>
            </tr>
            {/* row 3 */}
            <tr>
              <th>3</th>
              <td>Brice Swyre</td>
              <td>Tax Accountant</td>
              <td>Red</td>
              <td>Red</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="divider"></div>
    </div>)

}

export default AccountTable