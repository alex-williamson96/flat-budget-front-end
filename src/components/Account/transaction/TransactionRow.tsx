import { useEffect, useState } from "react";
import CurrencyDisplay from "../../UI/Helper/CurrencyDisplay";

export default function TransactionRow({ transactionData }: { transactionData: Transaction }) {
  const [incomeDollar, setIncomeDollar] = useState(0)
  const [incomeCents, setIncomeCents] = useState(0)

  const [expenseDollar, setExpenseDollar] = useState(0)
  const [expenseCents, setExpenseCents] = useState(0)

  useEffect(() => {
    if (!transactionData.isOutflow) {
      setIncomeDollar(transactionData.dollar);
      setIncomeCents(transactionData.cents);
      return;
    }

    setExpenseDollar(transactionData.dollar)
    setExpenseCents(transactionData.cents)

  }, [transactionData.dollar, transactionData.cents])



  return (
    <tr>
      <th>TODO: add checkbox</th>
      <td>{transactionData.transactionDate.toString()}</td>
      <td>{transactionData.name}</td>
      <td>{transactionData.note}</td>
      <td><CurrencyDisplay dollar={incomeDollar} cents={incomeCents} /></td>
      <td><CurrencyDisplay dollar={expenseDollar} cents={expenseCents} /></td>
    </tr>
  )
}

export interface Transaction {
  id: number;
  name: string;
  transactionDate: Date;
  note: string;
  dollar: number;
  cents: number;
  isOutflow: boolean;
  isPending: boolean;
}