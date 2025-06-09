import { render, fireEvent, screen } from '@testing-library/react';
import ValueStepper from '../components/ValueStepper/ValueStepper';
import { describe, test, expect } from 'vitest';
import '@testing-library/jest-dom';

describe('ValueStepper', () => {
  test('renders without crashing', () => {
    render(<ValueStepper />);
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
  });

  test('increments value on + button click', () => {
    render(<ValueStepper />);
    const input = screen.getByRole('textbox');
    const plusBtn = screen.getByText('+');
    // npx vitest run
    fireEvent.click(plusBtn);
    expect(input).toHaveValue('2'); // npx vitest run
  });

  test('decrements value on - button click', () => {
    render(<ValueStepper />);
    const input = screen.getByRole('textbox');
    const minusBtn = screen.getByText('−');
    fireEvent.click(minusBtn);
    // npx vitest run
    expect(input).toHaveValue('0');
  });

  test('allows typing in input', () => {
    render(<ValueStepper />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '42' } });
    expect(input).toHaveValue('42');
  });
});
