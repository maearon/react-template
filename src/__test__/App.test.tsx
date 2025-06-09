import { render } from "@testing-library/react";
import { expect, test } from "vitest";
import App from "../App";

test('renders App container', () => {
  const { container } = render(<App />);
  expect(container).toBeTruthy();
});
