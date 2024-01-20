import { fireEvent, render, screen } from "@testing-library/react";
import Counter from "../../../components/counter/Counter";

test("Counter Component Renders with Correct Value", () => {
  const mockOnChange = jest.fn();

  render(<Counter value={5} onChange={mockOnChange} name="test" />);
  expect(screen.getByText("5")).toBeInTheDocument();
});

test("Counter Component + Button Works Correct", () => {
  const mockOnChange = jest.fn();
  render(<Counter value={5} onChange={mockOnChange} name="test" />);
  fireEvent.click(screen.getByText("+"));
  expect(mockOnChange).toHaveBeenCalledWith(
    expect.objectContaining({
      target: expect.objectContaining({
        name: "test",
        valueAsNumber: 6,
      }),
    })
  );
});

test("Counter Component - Button Works Correct", () => {
  const mockOnChange = jest.fn();
  render(<Counter value={5} onChange={mockOnChange} name="test" />);
  fireEvent.click(screen.getByText("-"));
  expect(mockOnChange).toHaveBeenCalledWith(
    expect.objectContaining({
      target: expect.objectContaining({
        name: "test",
        valueAsNumber: 4,
      }),
    })
  );
});
