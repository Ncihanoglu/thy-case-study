import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BRAND_CODES,
  FARE_CATEGORIES,
  ROUTE_PATHS,
} from "../../utils/Constants";
import { FlightApiInterface, getAllFlights } from "../../api/FlightApi";
import { FlightInquiryState } from "../flightInquiry/FlightInquiry";
import styles from "./flightListing.module.css";
import Toggle from "../../components/toggle/Toggle";
import FlightSelection from "../../components/flightSelection/FlightSelection";
import { useAppDispatch } from "../../store/Store";
import { updatePromotion } from "./FlightSlice";
import { convertTimeToDate } from "../../utils/CommonUtils";
const FlightListing = () => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const flightInformation: FlightInquiryState = JSON.parse(
    localStorage.getItem("flightInformation") as string
  );
  const navigate = useNavigate();
  const [allVisibleFlightData, setAllVisibleFlightData] = useState<
    FlightApiInterface[]
  >([]);
  useEffect(() => {
    if (!flightInformation) {
      navigate(ROUTE_PATHS.HOME);
      return;
    }
    let flightData = localStorage.getItem("flightData");
    if (!flightData) {
      getAllFlights().then((res) => {
        setVisibleFlights(res.data);
      });
    } else {
      setVisibleFlights(JSON.parse(flightData));
    }
  }, []);

  const setVisibleFlights = (flights: FlightApiInterface[]) => {
    const visibleFilghts = flights.filter(
      (flight) =>
        flight.originAirport.code === flightInformation.from?.key &&
        flight.destinationAirport.code === flightInformation.to?.key
    );
    orderVisibleFlights(visibleFilghts, flightInformation.type);
  };

  const orderVisibleFlights = (
    visibleFlights: FlightApiInterface[],
    orderBy: FARE_CATEGORIES
  ) => {
    visibleFlights.sort((a, b) => {
      return (
        Number(
          a.fareCategories[orderBy].subcategories.find(
            (subcategory) => subcategory.brandCode === BRAND_CODES.ecoFly
          )?.price.amount
        ) -
        Number(
          b.fareCategories[orderBy].subcategories.find(
            (subcategory) => subcategory.brandCode === BRAND_CODES.ecoFly
          )?.price.amount
        )
      );
    });
    setAllVisibleFlightData(visibleFlights);
  };

  const sortByTime = (visibleFlights: FlightApiInterface[]) => {
    visibleFlights.sort((a, b) => {
      const aTime: any = convertTimeToDate(a.departureDateTimeDisplay);
      const bTime: any = convertTimeToDate(b.departureDateTimeDisplay);
      return aTime - bTime;
    });
    setAllVisibleFlightData(visibleFlights);
  };

  const sortingButtons = () => {
    return (
      <>
        <button
          className={styles.sortingButton}
          onClick={() => {
            orderVisibleFlights(
              structuredClone(allVisibleFlightData),
              FARE_CATEGORIES.economy
            );
          }}
        >
          Ekonomi Ücreti
        </button>
        <button
          className={styles.sortingButton}
          onClick={() => {
            sortByTime(structuredClone(allVisibleFlightData));
          }}
        >
          Kalkış Saati
        </button>
      </>
    );
  };

  return (
    <section className={styles.container}>
      <div className="row">
        <div className="col-3"></div>
        <div className="col-7">
          <p className={styles.redHeader}>Uçuş</p>
          <p className={styles.header}>
            {flightInformation?.from?.value} - {flightInformation?.to?.value},
            {flightInformation?.passengerCount} Yolcu
          </p>
          <Toggle
            onChange={(event) => {
              dispatch(updatePromotion(event));
              setIsChecked(event);
            }}
            label="Promosyon Kodu"
            isChecked={isChecked}
          />
          <FlightSelection
            flights={allVisibleFlightData}
            sortingButton={sortingButtons}
          />
        </div>
      </div>
    </section>
  );
};

export default FlightListing;
