const CurrencyDisplay = ({ dollar, cents }: { dollar: number, cents: number }) => {
  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(parseFloat(dollar + '.' + cents));

  return <span>{formattedAmount}</span>;
};

export default CurrencyDisplay;