import { fireEvent, render, screen } from "@testing-library/react";
import Dialog from "../../../components/dialog/Dialog";

test("See Dialog Component", () => {
  const mockOnClose = jest.fn();

  render(
    <Dialog isOpen={true} onClose={mockOnClose} content={"test-content"} />
  );
  expect(screen.getByText("test-content")).toBeInTheDocument();
  const closeButton = screen.getByTestId("close-button");
  expect(closeButton).toBeInTheDocument();
});

test("See Dialog Close Button Clickable", () => {
  const mockOnClose = jest.fn();

  render(
    <Dialog isOpen={true} onClose={mockOnClose} content={"test-content"} />
  );
  const closeButton = screen.getByTestId("close-button");
  expect(closeButton).toBeInTheDocument();

  fireEvent.click(closeButton);

  expect(mockOnClose).toHaveBeenCalled();
});
