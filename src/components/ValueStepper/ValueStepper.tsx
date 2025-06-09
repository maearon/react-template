import { useState } from 'react';
import { z } from 'zod';
import { cn } from '../../lib/utils';

const schema = z.object({
  value: z.number().min(0, "Value must be ≥ 0"),
  unit: z.enum(['%', 'px']),
}).superRefine(({ value, unit }, ctx) => {
  if (unit === '%' && value > 100) {
    ctx.addIssue({
      path: ['value'],
      code: z.ZodIssueCode.custom,
      message: "Value must be ≤ 100 for %",
    });
  }
});

export default function ValueStepper() {
  const [unit, setUnit] = useState<'%' | 'px'>('%');
  const [value, setValue] = useState<number>(1);
  const [rawInput, setRawInput] = useState<string>('1');
  const [error, setError] = useState<string | null>(null);

  const validate = (val: number, unit: '%' | 'px') => {
    const result = schema.safeParse({ value: val, unit });
    if (!result.success) {
      const msg = result.error.formErrors.fieldErrors.value?.[0] ?? "Invalid input";
      setError(msg);
      return false;
    }
    setError(null);
    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRawInput(e.target.value);
  };

  const handleBlur = () => {
    const input = rawInput.trim().match(/[\d.,]+/g)?.pop() ?? '';
    const parsed = parseFloat(input.replace(',', '.'));

    if (isNaN(parsed)) {
      setValue(0);
      setRawInput('0');
      setError("Invalid number");
      return;
    }

    const isValid = validate(parsed, unit);
    const finalValue = unit === '%' && parsed > 100 ? 100 : parsed < 0 ? 0 : parsed;

    setValue(finalValue);
    setRawInput(finalValue.toString());
    if (isValid) setError(null);
  };

  const increment = () => {
    const newVal = parseFloat((value + 1).toFixed(2));
    if (validate(newVal, unit)) {
      setValue(newVal);
      setRawInput(newVal.toString());
    }
  };

  const decrement = () => {
    const newVal = parseFloat((value - 1).toFixed(2));
    if (newVal < 0) return;
    if (validate(newVal, unit)) {
      setValue(newVal);
      setRawInput(newVal.toString());
    }
  };

  const handleUnitChange = (newUnit: '%' | 'px') => {
    setUnit(newUnit);
    validate(value, newUnit);
  };

  return (
    <div className="p-4 flex flex-col items-start gap-2">
      <div className="flex gap-2">
        <button
          className={cn('px-3 py-1 border rounded', unit === '%' ? 'bg-blue-500 text-white' : 'bg-white text-black')}
          onClick={() => handleUnitChange('%')}
        >
          %
        </button>
        <button
          className={cn('px-3 py-1 border rounded', unit === 'px' ? 'bg-blue-500 text-white' : 'bg-white text-black')}
          onClick={() => handleUnitChange('px')}
        >
          px
        </button>
      </div>
      <div className="flex gap-2 items-center">
        <button onClick={decrement} disabled={value <= 0}>−</button>
        <input
          className="border p-1 w-24 text-center"
          value={rawInput}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <button onClick={increment} disabled={unit === '%' && value >= 100}>+</button>
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
