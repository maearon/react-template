import { render, screen, fireEvent } from '@testing-library/react';
import ValueStepper from '../components/ValueStepper/ValueStepper';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';

describe('ValueStepper', () => {
  it('shows error when input < 0', () => {
    render(<ValueStepper />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '-5' } });
    fireEvent.blur(input);
    expect(screen.getByText((content) => content.includes('≥ 0'))).toBeInTheDocument();
  });

  it('shows error when input > 100 and unit is %', () => {
    render(<ValueStepper />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '150' } });
    fireEvent.blur(input);
    expect(screen.getByText((text) => text.includes('≤ 100'))).toBeInTheDocument();
  });

  it('does not show error when input is valid', () => {
    render(<ValueStepper />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '50' } });
    fireEvent.blur(input);
    expect(screen.queryByText(/Value must/)).not.toBeInTheDocument();
  });

  it('updates unit and still validates correctly', () => {
    render(<ValueStepper />);
    const input = screen.getByRole('textbox');
    const pxButton = screen.getByText('px');
    fireEvent.click(pxButton);
    fireEvent.change(input, { target: { value: '200' } });
    fireEvent.blur(input);
    expect(screen.queryByText(/Value must/)).not.toBeInTheDocument();
  });

  it('shows error when input is not a number', () => {
    render(<ValueStepper />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'abc' } });
    fireEvent.blur(input);
    expect(screen.getByText('Invalid number')).toBeInTheDocument();
  });

  it('increment and decrement work as expected', () => {
    render(<ValueStepper />);
    const input = screen.getByRole('textbox');
    const incrementButton = screen.getByText('+');
    const decrementButton = screen.getByText('−');

    fireEvent.click(incrementButton);
    expect(input).toHaveValue('2');

    fireEvent.click(decrementButton);
    expect(input).toHaveValue('1');

    fireEvent.click(decrementButton);
    fireEvent.click(decrementButton); // Should clamp at 0
    expect(input).toHaveValue('0');
  });
});
