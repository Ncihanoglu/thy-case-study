import { render, screen } from "@testing-library/react";
import Navbar from "../../../components/navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

test("See Navbar Component", () => {
  render(
    <Router>
      <Routes>
        <Route path="/*" element={<Navbar />} />
      </Routes>
    </Router>
  );
  const thyLink = screen.getByText("turkishairlines.com");
  expect(thyLink).toBeInTheDocument();
});
