interface CurrencyDisplayProps {
  dollar: number;
  cents: number;
}

const CurrencyDisplay = ({ dollar, cents }: CurrencyDisplayProps) => {
  while (cents < 0) {
    dollar--;
    cents = 100 + cents;
  }

  while (cents >= 100) {
    dollar++;
    cents -= 100;
  }

  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(dollar + cents / 100);

  return <span>{formattedAmount}</span>;
};

export default CurrencyDisplay;
