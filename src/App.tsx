import ValueStepper from "./components/ValueStepper/ValueStepper";

const App = () => {
  return (
    <div className="w-screen h-screen bg-neutral-900 text-neutral-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-4">
        <label className="text-sm font-semibold text-neutral-300">Unit value</label>
        <div className="w-full bg-neutral-950 p-4 rounded-lg space-y-4">
          <ValueStepper />
        </div>
      </div>
    </div>
  );
};

export default App;