import { fireEvent, render, screen } from "@testing-library/react";
import Dropdown from "../../../components/dropdown/Dropdown";

test("See Dropdown Component", () => {
  const mockOnChange = jest.fn();

  render(
    <Dropdown
      options={[
        { key: "1", value: "Option 1" },
        { key: "2", value: "Option 2" },
      ]}
      placeholder="test"
      onChange={mockOnChange}
      name="test"
    />
  );
  expect(screen.getByText("test")).toBeInTheDocument();
});

test("Select Option", () => {
  const mockOnChange = jest.fn();

  render(
    <Dropdown
      options={[
        { key: "1", value: "Option 1" },
        { key: "2", value: "Option 2" },
      ]}
      placeholder="test"
      onChange={mockOnChange}
      name="test"
    />
  );
  fireEvent.click(screen.getByText("test"));

  fireEvent.click(screen.getByText("Option 1"));

  expect(mockOnChange).toHaveBeenCalledWith({
    name: "test",
    value: { key: "1", value: "Option 1" },
  });
});
