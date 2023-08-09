const PhilosophyStep = ({ title, description, svgPath }: { title: string, description: string, svgPath: string }) => {
  return (
    <div className="hero border rounded mb-4 border-neutral">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <svg xmlns="http://www.w3.org/2000/svg" height="5em" className="fill-accent" viewBox="0 0 512 512"><path d={svgPath} /></svg>
        <div>
          <h1 className="text-5xl font-bold">{title}</h1>
          <div className="text-lg">
            <p className="py-6">
              {description}
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}

export default PhilosophyStep;