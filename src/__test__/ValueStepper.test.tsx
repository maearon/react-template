import { render, screen, fireEvent } from '@testing-library/react';
import ValueStepper from '../components/ValueStepper/ValueStepper';
import { describe, it, expect } from 'vitest';

describe('ValueStepper', () => {
  it('increments value on + button click', () => {
    render(<ValueStepper />);
    const input = screen.getByRole('textbox');
    const buttons = screen.getAllByRole('button');
    const plusBtn = buttons[3];

    fireEvent.click(plusBtn);
    expect(input).toHaveValue('1');
  });

  it('decrements value on - button click', () => {
    render(<ValueStepper />);
    const input = screen.getByRole('textbox');
    const buttons = screen.getAllByRole('button');
    const minusBtn = buttons[2];

    fireEvent.click(minusBtn);
    expect(input).toHaveValue('0');
  });
});
