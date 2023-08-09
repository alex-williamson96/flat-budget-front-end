import PhilosophyStep from "../../components/LandingPage/PhilosophyStep";

const Philosophy = () => {
  return (
    <div>
      <div className="text-3xl mt-4">
        <p>Flatbudget uses a zero-based budgeting approach.</p>
      </div>
      <p>
        Zero-based budgeting means you only budget money that you currently have. <br />
        There are four steps to using Flatbudget to its fullest potential.
      </p>
      <div className="mb-4">
        <ul className="steps">
          <li className="step">Create a budget</li>
          <li className="step">Learn your spending habits</li>
          <li className="step">Set realistic goals</li>
          <li className="step">Grow your money</li>
        </ul>
      </div>
      <div className="mb-24 lg:mx-32 md:mx-16 sm:mx-4">
        <PhilosophyStep
          title="Create a budget"
          description="The first step is creating the budget. Flatbudet is flexible in how you want to create your categories, so you can be as granular or broad as you'd like."
          svgPath="M0 96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zm64 0v64h64V96H64zm384 0H192v64H448V96zM64 224v64h64V224H64zm384 0H192v64H448V224zM64 352v64h64V352H64zm384 0H192v64H448V352z" />
        <PhilosophyStep
          title="Learn your spending habits"
          description="Once you have a budget and have started tracking your spending, you can use Flatbudget's reports and charts to better undersstand where that money is going, and how that spending is affecting your finanical goals."
          svgPath="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
        <PhilosophyStep
          title="Set realistic goals"
          description="Setting goals is easy with Flatbudget, but make sure they are realstic. Cutting all your spending is a quick way to become frustated. Creating incremental goals that slowly change your spending habits is a great way to achieve your goals."
          svgPath="M448 256A192 192 0 1 0 64 256a192 192 0 1 0 384 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 80a80 80 0 1 0 0-160 80 80 0 1 0 0 160zm0-224a144 144 0 1 1 0 288 144 144 0 1 1 0-288zM224 256a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" />
        <PhilosophyStep
          title="Grow your money"
          description="Once your budget is created and your goals set, it's just a matter of keeping track of your spending and planning for the future with the peace of mind of knowing where your money is going. It's important to keep using your budget even once your goals are met, so that you are aware of how your money is being spent."
          svgPath="M64 64c0-17.7-14.3-32-32-32S0 46.3 0 64V400c0 44.2 35.8 80 80 80H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H80c-8.8 0-16-7.2-16-16V64zm406.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L320 210.7l-57.4-57.4c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L240 221.3l57.4 57.4c12.5 12.5 32.8 12.5 45.3 0l128-128z" />
      </div>
    </div>
  )
}

export default Philosophy;
