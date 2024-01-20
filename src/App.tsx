import React from "react";
import Navbar from "./components/navbar/Navbar";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import FlightInquiry from "./pages/flightInquiry/FlightInquiry";
import { getAllFlights } from "./api/FlightApi";
import ErrorPage from "./pages/errorPage/ErrorPage";
import FlightListing from "./pages/flightListing/FlightListing";
import { ROUTE_PATHS } from "./utils/Constants";
import Completed from "./pages/completed/Completed";

function App() {
  const router = createBrowserRouter([
    {
      element: <Navbar />,
      children: [
        {
          path: ROUTE_PATHS.HOME,
          element: <FlightInquiry />,
          loader: getAllFlights,
          errorElement: <ErrorPage />,
        },
        {
          path: ROUTE_PATHS.FLIGHTLISTING,
          element: <FlightListing />,
        },
        {
          path: ROUTE_PATHS.COMPLETED,
          element: <Completed />,
        },
      ],
    },
  ]);

  return (
    <div className="container">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
