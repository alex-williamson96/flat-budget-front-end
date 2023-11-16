export default function TransactionRow({ transactionData }: { transactionData: any }) {

  console.log(transactionData)

  return (
    <tr>
      <th>1</th>
      <td>{transactionData.transactionDate}</td>
      <td>{transactionData.name}</td>
      <td>Blue</td>
      <td>Blue</td>
    </tr>
  )
}