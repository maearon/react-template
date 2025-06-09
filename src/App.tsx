import ValueStepper from "./components/ValueStepper/ValueStepper";

const App = () => {
  return (
    <div className="w-screen h-screen bg-neutral-900 text-neutral-100 flex items-center justify-center">
      <div className="space-y-2">
        <label className="text-sm font-semibold text-neutral-300">Unit value</label>
        <div className="w-96 bg-neutral-950 p-4 rounded-lg space-y-4">
            <ValueStepper />
          </div>
        </div>
      </div>
  )
}

export default App
