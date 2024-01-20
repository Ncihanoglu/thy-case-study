import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/Store";
import { ROUTE_PATHS, STATUS } from "../../utils/Constants";
import style from "./completed.module.css";
import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FlightInquiryState } from "../flightInquiry/FlightInquiry";
import { useNavigate } from "react-router-dom";
import { reset } from "../flightListing/FlightSlice";
const Completed = () => {
  const flight = useAppSelector((state) => state.flight);
  const flightInformation: FlightInquiryState = JSON.parse(
    localStorage.getItem("flightInformation") as string
  );
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!flightInformation) {
      navigate(ROUTE_PATHS.HOME);
      return;
    }
  }, []);

  const Success = () => {
    return (
      <section className={style.container}>
        <div className={style.successInfo}>
          <FontAwesomeIcon style={{ color: "#63b379" }} icon={faCircleCheck} />
          <b>
            <span>Kabin seçiminiz tamamlandı.</span>
          </b>
        </div>
        <div className={style.successPrice}>
          <h3>Toplam Tutar</h3>
          <div className={style.successAmount}>
            <b>{flight.price.currency}</b>{" "}
            <b>{flight.price.amount * flightInformation.passengerCount}</b>
          </div>
        </div>
      </section>
    );
  };

  const Fail = () => {
    return (
      <section className={style.container}>
        <div className={style.successInfo}>
          <FontAwesomeIcon
            icon={faCircleXmark}
            style={{ color: "#df0414" }}
            size="xl"
          />
          <b>
            <span>Kabin seçiminiz tamamlanmadı.</span>
          </b>
        </div>
        <div className={style.failButton}>
          <button
            className={style.redButton}
            onClick={() => {
              navigate(ROUTE_PATHS.HOME);
              dispatch(reset());
            }}
          >
            Başa Dön
          </button>
        </div>
      </section>
    );
  };

  return <>{flight.status === STATUS.AVAILABLE ? <Success /> : <Fail />}</>;
};

export default Completed;
