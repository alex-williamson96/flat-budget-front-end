import GettingStartedStep from "../../components/LandingPage/GettingStartedStep";

const GetStarted = () => {
  return (
    <>
      <h1 className="text-5xl mb-4">Getting started is easy!</h1>
      <div className="mt-4 flex justify-center items-center">
        <div className="flex flex-col items-start">
          <GettingStartedStep number="1" stepDescription="Build your budget based off of what you think spend" />
          <GettingStartedStep number="2" stepDescription="Track your spending over time" />
          <GettingStartedStep number="3" stepDescription="Use reports to analyze where your money goes" />
          <GettingStartedStep number="4" stepDescription="Create goals to change your spending habits" />
          <GettingStartedStep number="5" stepDescription="Repeat steps 3 and 4 until you're happy with your spending" />
          <GettingStartedStep number="6" stepDescription="Continue budgeting to stay on track and reach larger goals" />
        </div>
      </div>
    </>
  )
}

export default GetStarted;