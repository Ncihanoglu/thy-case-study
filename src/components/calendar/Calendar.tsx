import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import style from "./calendar.module.css";
//Just View no functionality
const Calendar = () => {
  return (
    <div className={style.container}>
      <p>Tarih</p>
      <FontAwesomeIcon icon={faCalendar} data-testid="calendar" />
    </div>
  );
};

export default Calendar;
