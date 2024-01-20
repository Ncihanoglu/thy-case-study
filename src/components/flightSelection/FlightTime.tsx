import React from "react";
import style from "./flightSelection.module.css";
import Card from "../card/Card";
interface FlightTimeProps {
  flightDuration: string;
  originalCity: string;
  originalCode: string;
  originalTime: string;
  destinationCity: string;
  destinationCode: string;
  destinationTime: string;
}

const FlightTime = ({
  flightDuration,
  originalCity,
  originalCode,
  originalTime,
  destinationCity,
  destinationCode,
  destinationTime,
}: FlightTimeProps) => {
  return (
    <Card>
      <div className={style.flightTimeContainer}>
        <div className={style.flightTimeCity}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <b>{originalTime}</b>
            <span>{originalCode}</span>
            <i>{originalCity}</i>
          </div>
          <div style={{ flex: 1 }}>
            <hr></hr>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <b>{destinationTime}</b>
            <span style={{ textAlign: "center" }}>{destinationCode}</span>
            <i>{destinationCity}</i>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            width: "30%",
          }}
        >
          <i>uçuş süresi</i>
          <b>{flightDuration}</b>
        </div>
      </div>
    </Card>
  );
};

export default FlightTime;
