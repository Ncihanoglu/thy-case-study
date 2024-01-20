import React from "react";
import style from "./flightSelection.module.css";
import { FlightApiInterface } from "../../api/FlightApi";
import FlightListItem from "./FlightListItem";

interface FlightSelectionProps {
  flights: FlightApiInterface[];
  sortingButton: () => JSX.Element;
}

const FlightSelection = ({ flights, sortingButton }: FlightSelectionProps) => {
  return (
    <div>
      <div className={style.header}>
        <p>Sıralama Kriterleri</p>
        {sortingButton()}
      </div>
      <div className={style.tableContainer}>
        {flights.map((flight, index) => {
          return (
            <FlightListItem
              id={index}
              key={flight.arrivalDateTimeDisplay}
              flightData={flight}
            />
          );
        })}
      </div>
    </div>
  );
};
export default FlightSelection;
