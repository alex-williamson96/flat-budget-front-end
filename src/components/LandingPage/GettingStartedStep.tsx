const GettingStartedStep = ({ number, stepDescription }: { number: string, stepDescription: string }) => {
  return (
    <div className="flex justify-center items-center m-4">
      <div className="text-4xl border rounded-full p-3 w-16 h-16 flex-shrink-0 flex items-center justify-center mr-4">
        {number}
      </div>
      <div className="text-2xl">
        <p>{stepDescription}</p>
      </div>
    </div>
  )
}

export default GettingStartedStep;