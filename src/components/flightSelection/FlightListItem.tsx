import React, { useState } from "react";
import { FlightApiInterface } from "../../api/FlightApi";
import styles from "./flightSelection.module.css";
import FlightTime from "./FlightTime";
import FlightPrice from "./FlightPrice";
import { FARE_CATEGORIES } from "../../utils/Constants";
import { useAppSelector } from "../../store/Store";
import FareSubCategory from "./FareSubCategory";
interface FlightListItemProps {
  flightData: FlightApiInterface;
  id: number;
}

const FlightListItem = ({ flightData, id }: FlightListItemProps) => {
  const flightId = useAppSelector((state) => state.flight.flightId);
  const [shouldOpenCategories, setShouldOpenCategories] =
    useState<boolean>(false);
  return (
    <>
      <div className={styles.listItemWrapper}>
        <FlightTime
          flightDuration={flightData.flightDuration}
          originalCity={flightData.originAirport.city.name}
          originalCode={flightData.originAirport.city.code}
          originalTime={flightData.departureDateTimeDisplay}
          destinationCity={flightData.destinationAirport.city.name}
          destinationCode={flightData.destinationAirport.city.code}
          destinationTime={flightData.arrivalDateTimeDisplay}
        />
        <FlightPrice
          id={id}
          type={FARE_CATEGORIES.economy}
          price={
            flightData.fareCategories[FARE_CATEGORIES.economy].subcategories[0]
              .price.amount
          }
          currency={
            flightData.fareCategories[FARE_CATEGORIES.economy].subcategories[0]
              .price.currency
          }
          onClick={(shouldOpen) => setShouldOpenCategories(shouldOpen)}
          isMenuOpen={
            shouldOpenCategories &&
            flightId?.type === FARE_CATEGORIES.economy &&
            flightId?.id === id
          }
        />
        <FlightPrice
          id={id}
          type={FARE_CATEGORIES.business}
          price={
            flightData.fareCategories[FARE_CATEGORIES.business].subcategories[0]
              .price.amount
          }
          currency={
            flightData.fareCategories[FARE_CATEGORIES.business].subcategories[0]
              .price.currency
          }
          onClick={(shouldOpen) => setShouldOpenCategories(shouldOpen)}
          isMenuOpen={
            shouldOpenCategories &&
            flightId?.type === FARE_CATEGORIES.business &&
            flightId?.type &&
            flightId?.id === id
          }
        />
      </div>
      {flightId?.type && flightId?.id === id && shouldOpenCategories && (
        <div className={styles.fareDetails}>
          {flightData.fareCategories[flightId?.type].subcategories.map(
            (subcategory) => (
              <FareSubCategory
                key={flightId?.id + flightId.type + subcategory.order}
                subCategories={subcategory}
                type={flightId?.type}
              />
            )
          )}
        </div>
      )}
    </>
  );
};

export default FlightListItem;
