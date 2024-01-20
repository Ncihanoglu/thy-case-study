import { render, screen } from "@testing-library/react";
import Calendar from "../../../components/calendar/Calendar";

test("See Calendar Component", () => {
  render(<Calendar />);
  let text = screen.getByText(/Tarih/i);
  expect(text).toBeInTheDocument();
});

test("Calendar Have Correct Icon", () => {
  render(<Calendar />);
  const calendarIcon = screen.getByTestId("calendar");
  expect(calendarIcon).toBeInTheDocument();
  expect(calendarIcon).toHaveClass("fa-calendar");
});
