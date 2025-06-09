import { useRef, useState } from 'react';
import { z } from 'zod';
import { cn } from '../../lib/utils';
import { Minus, Plus } from 'lucide-react';

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
  const inputRef = useRef<HTMLInputElement>(null);
  const [unit, setUnit] = useState<'%' | 'px'>('%');
  const [value, setValue] = useState<number>(1);
  const [rawInput, setRawInput] = useState<string>('1');
  const [error, setError] = useState<string | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);

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
    <div className="space-y-4 text-sm font-medium">
      {/* Unit Row */}
      <div className="flex items-center space-x-4">
        <label className="w-12 text-neutral-400">Unit</label>
        <div className="flex-1 flex justify-center">
          <div className="grid grid-cols-2 gap-2 w-[160px]">
            {(['%', 'px'] as const).map((u) => (
              <button
                key={u}
                onClick={() => handleUnitChange(u)}
                className={cn(
                  'h-8 flex items-center justify-center rounded border text-sm w-full',
                  unit === u
                    ? 'bg-neutral-700 border-neutral-500 text-white'
                    : 'bg-neutral-800 border-neutral-700 text-neutral-400 hover:border-neutral-500'
                )}
              >
                {u}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Value Row */}
      <div className="flex items-center space-x-4 relative">
        <label className="w-12 text-neutral-400">Value</label>
        <div className="flex-1 flex justify-center">
          <div className="flex items-center w-[160px]">
            <button
              onClick={decrement}
              className="w-8 h-8 flex items-center justify-center rounded border border-neutral-600 hover:border-neutral-400"
            >
              <Minus className="w-4 h-4" />
            </button>

            <input
              ref={inputRef}
              value={rawInput}
              onChange={handleChange}
              onBlur={handleBlur}
              onFocus={() => setShowTooltip(true)}
              onBlurCapture={() => setShowTooltip(false)}
              className={cn(
                'mx-2 w-20 px-2 py-1 text-sm rounded border text-white bg-neutral-900 text-center',
                error ? 'border-red-500' : 'border-neutral-600',
                'focus:outline-none focus:ring-1 focus:ring-blue-500'
              )}
              type="text"
              inputMode="decimal"
            />

            <button
              onClick={increment}
              disabled={unit === '%' && value >= 100}
              className="w-8 h-8 flex items-center justify-center rounded border border-neutral-600 hover:border-neutral-400"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tooltip */}
        {showTooltip && error && (
          <div className="absolute -bottom-6 left-[60px] text-xs text-red-400 bg-neutral-800 px-2 py-1 rounded shadow">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
