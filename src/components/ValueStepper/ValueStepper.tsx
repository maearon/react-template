import { useState } from 'react';
import { cn } from '../../lib/utils';

export default function ValueStepper() {
  const [unit, setUnit] = useState<'%' | 'px'>('%');
  const [value, setValue] = useState<number>(1);
  const [rawInput, setRawInput] = useState<string>('1');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Allows the user to type numbers, . and ,
    setRawInput(e.target.value);
  };

  const handleBlur = () => {
    let input = rawInput.trim();

    // Move , -> .
    input = input.replace(',', '.');

    // Remove all invalid characters except numbers and the first period
    const validInput = input.match(/^(\d+)?(\.\d*)?/)?.[0] ?? '';

    let parsed = parseFloat(validInput);
    if (isNaN(parsed)) parsed = 0;

    if (parsed < 0) parsed = 0;
    if (unit === '%' && parsed > 100) parsed = 100;

    setValue(parsed);
    setRawInput(parsed.toString());
  };

  const increment = () => {
    if (unit === '%' && value >= 100) return;
    const newVal = parseFloat((value + 1).toFixed(2));
    setValue(newVal);
    setRawInput(newVal.toString());
  };

  const decrement = () => {
    if (value <= 0) return;
    const newVal = parseFloat((value - 1).toFixed(2));
    setValue(newVal);
    setRawInput(newVal.toString());
  };

  const handleUnitChange = (newUnit: '%' | 'px') => {
    if (newUnit === '%' && value > 100) {
      setValue(100);
      setRawInput('100');
    }
    setUnit(newUnit);
  };

  return (
    <div className="p-4 flex flex-col items-start gap-2">
      <div className="flex gap-2">
        <button
          className={cn(
            'px-3 py-1 border rounded',
            unit === '%' ? 'bg-blue-500 text-white' : 'bg-white text-black'
          )}
          onClick={() => handleUnitChange('%')}
        >
          %
        </button>
        <button
          className={cn(
            'px-3 py-1 border rounded',
            unit === 'px' ? 'bg-blue-500 text-white' : 'bg-white text-black'
          )}
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
          value={rawInput}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <button onClick={increment} disabled={unit === '%' && value >= 100}>
          +
        </button>
      </div>
    </div>
  );
}
