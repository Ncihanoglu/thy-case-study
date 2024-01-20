import { render, screen } from "@testing-library/react";
import Card from "../../../components/card/Card";

test("See Card Component", () => {
  const mockOnClick = jest.fn();
  render(
    <Card onClick={mockOnClick}>
      <div>Test Content</div>
    </Card>
  );
  expect(screen.getByText("Test Content")).toBeInTheDocument();
});

test("Card Component works without onClick props", () => {
  render(
    <Card>
      <div>Test Content</div>
    </Card>
  );
  expect(screen.getByText("Test Content")).toBeInTheDocument();
});
