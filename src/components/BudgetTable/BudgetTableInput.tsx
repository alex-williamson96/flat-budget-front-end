import React, { createRef, useRef } from "react";
import { useState } from "react";
import CurrencyInput, { CurrencyInputOnChangeValues } from "react-currency-input-field";
import useBudgetStore from "../../stores/budget-store";
import { Currency } from "./BudgetTableRow";

interface BudgetTableInputProps {
  dollar: number;
  cents: number;
  onAssignedChanged: (currency: Currency) => void;
}

const BudgetTableInput = ({ dollar, cents, onAssignedChanged }: BudgetTableInputProps) => {
  const [value, setValue] = useState(`${dollar}.${cents > 9 ? cents : '0' + cents}`)
  const [prevValue, setPrevValue] = useState(value)
  const [isSubmitted, setIsSubmitted] = useState(true);

  const updateAssignedDollar = useBudgetStore(state => state.updateAssignedDollar)
  const updateAssignedCents = useBudgetStore(state => state.updateAssignedCents)

  const handleValueChange = (value: string | undefined, name?: string | undefined, values?: CurrencyInputOnChangeValues | undefined) => {
    setIsSubmitted(false);
    setValue(value || '0.00');
  }

  const handleSubmit = () => {
    const newValue = (parseFloat(value) - parseFloat(prevValue)).toFixed(2).toString()

    if (newValue === '0.00') {
      setIsSubmitted(true);
      return;
    }

    const negativeModifier = newValue[0] === '-' ? -1 : 1;

    const [dollar, cents] = newValue.split(".")

    setIsSubmitted(true);
    setPrevValue(value)

    updateAssignedDollar(parseInt(dollar))
    updateAssignedCents(negativeModifier * parseInt(cents))


    const [dollarValue, centsValue] = value.split(".")
    onAssignedChanged({ dollar: parseInt(dollarValue), cents: parseInt(centsValue) })
  }

  const handleCancel = () => {
    setIsSubmitted(true);
    setValue(prevValue)
  }

  const myRef = createRef<HTMLInputElement>();

  const isFocused = () => {
    return document.activeElement === myRef.current;
  }

  return (
    <>
      <CurrencyInput
        ref={myRef}
        className="bg-base-100 lg:w-1/5 w-full"
        id="assigned-input"
        name="assigned-input-value"
        defaultValue={0}
        decimalsLimit={0}
        value={value}
        prefix="$"
        onValueChange={handleValueChange}
        decimalScale={2} />
      {(isFocused() || !isSubmitted) && <>
        <span className="pl-4"></span>
        <button className="btn btn-sm btn-success"
          onClick={handleSubmit}>
          Submit
        </button>
        <span className="pl-2">
        </span>
        <button onClick={handleCancel} className="btn btn-sm btn-warning">
          Cancel
        </button>
      </>}
    </>
  )
}

export default BudgetTableInput;