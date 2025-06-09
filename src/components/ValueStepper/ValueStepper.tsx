import { useState } from 'react';

export default function ValueStepper() {
  const [unit, setUnit] = useState<'%' | 'px'>('%');
  const [value, setValue] = useState<number>(1);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value;
    let parsed = parseFloat(input);
    setValue(parsed);
  };

  const increment = () => {
  };

  const decrement = () => {
  };

  const handleUnitChange = (newUnit: '%' | 'px') => {
    if (newUnit === '%' && value > 100) {
      setValue(100);
    }
    setUnit(newUnit);
  };

  return (
    <div className="p-4 flex flex-col items-start gap-2">
      <div className="flex gap-2">
        <button
          className={`px-3 py-1 ${unit === '%' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => handleUnitChange('%')}
        >
          %
        </button>
        <button
          className={`px-3 py-1 ${unit === 'px' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => handleUnitChange('px')}
        >
          px
        </button>
      </div>
      <div className="flex gap-2 items-center">
        <button onClick={decrement} disabled={value <= 0 || (unit === '%' && value <= 0)}>
          −
        </button>
        <input
          className="border p-1 w-24 text-center"
          value={value}
          onChange={handleChange}
          onBlur={() => {
            if (unit === '%' && value > 100) setValue(100);
            if (value < 0) setValue(0);
          }}
        />
        <button onClick={increment} disabled={unit === '%' && value >= 100}>
          +
        </button>
      </div>
    </div>
  );
}
