import React, { useEffect, useMemo } from "react";
import Card from "../card/Card";
import Radio from "../radio/Radio";
import { FARE_CATEGORIES } from "../../utils/Constants";
import style from "./flightSelection.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "../../store/Store";
import { updateFlightId } from "../../pages/flightListing/FlightSlice";
import { areEqual } from "../../utils/CommonUtils";

interface FlightPriceProps {
  type: FARE_CATEGORIES;
  price: number;
  currency: string;
  id: number;
  onClick: (args1: boolean) => void;
  isMenuOpen: boolean;
}

const FlightPrice = ({
  type,
  price,
  currency,
  id,
  onClick,
  isMenuOpen,
}: FlightPriceProps) => {
  const dispatch = useAppDispatch();
  const isPromotionActive = useAppSelector(
    (state) => state.flight.isPromotionActive
  );
  const flightId = useAppSelector((state) => state.flight.flightId);

  const backgroundColor = useMemo(() => {
    return areEqual(flightId, { type, id }) && "#efefef";
  }, [flightId, id, type]);

  return (
    <Card style={{ backgroundColor: backgroundColor }}>
      <div className={style.flightPriceContainer}>
        <div style={{ display: "flex" }}>
          <Radio
            id={type + id}
            value={type}
            label={type}
            onChange={() => {
              onClick(true);
              dispatch(updateFlightId({ type, id }));
            }}
            checked={areEqual(flightId, { type, id })}
          />
        </div>
        <div className={style.currency}>
          <i>Yolcu Başına</i>
          <b>
            {currency} {isPromotionActive ? price / 2 : price}
          </b>
        </div>
        {!isMenuOpen && (
          <FontAwesomeIcon
            style={{ color: "#9e9e9e", width: "50px", cursor: "pointer" }}
            size="xs"
            icon={faChevronDown}
            onClick={() => {
              dispatch(updateFlightId({ type, id }));
              onClick(true);
            }}
          />
        )}
        {isMenuOpen && (
          <FontAwesomeIcon
            style={{ color: "#9e9e9e", width: "50px", cursor: "pointer" }}
            size="xs"
            icon={faChevronUp}
            onClick={() => {
              dispatch(updateFlightId({ type, id }));
              onClick(false);
            }}
          />
        )}
      </div>
    </Card>
  );
};

export default FlightPrice;
