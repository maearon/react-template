import ValueStepper from "./components/ValueStepper/ValueStepper";

const App = () => {
  return (
    <div className="w-screen h-screen bg-neutral-950 flex items-center justify-center text-neutral-100">
      <div className="w-96 bg-neutral-800 p-4 rounded-lg">
        <ValueStepper />
      </div>
    </div>
  )
}

export default App
