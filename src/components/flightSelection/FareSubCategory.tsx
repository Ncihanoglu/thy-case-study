import React from "react";
import styles from "./flightSelection.module.css";
import Card from "../card/Card";
import {
  BRAND_CODES,
  FARE_CATEGORIES,
  ROUTE_PATHS,
  STATUS,
} from "../../utils/Constants";
import { useAppDispatch, useAppSelector } from "../../store/Store";
import { addSelectedFlight } from "../../pages/flightListing/FlightSlice";
import { useNavigate } from "react-router-dom";

interface FareSubCategoryInterface {
  type: FARE_CATEGORIES;
  subCategories: {
    brandCode: BRAND_CODES;
    price: {
      amount: number;
      currency: string;
    };
    order: number;
    status: STATUS;
    rights: string[];
  };
}

const FareSubCategory = ({ type, subCategories }: FareSubCategoryInterface) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isPromotionActive = useAppSelector(
    (state) => state.flight.isPromotionActive
  );
  return (
    <Card
      style={{
        padding: 0,
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div className={styles.subCategoryHeader}>
        <b style={{ textTransform: "capitalize" }}>{subCategories.brandCode}</b>
        <div>
          <sup>{subCategories.price.currency}</sup>
          <b>
            {isPromotionActive && subCategories.brandCode === BRAND_CODES.ecoFly
              ? subCategories.price.amount / 2
              : subCategories.price.amount}
          </b>
        </div>
      </div>
      <div className={styles.subCategoryContent}>
        <div>
          {subCategories.rights.map((right) => (
            <div key={right} style={{ borderBottom: "1px solid #edefee" }}>
              {right}
            </div>
          ))}
        </div>

        <button
          className={styles.selectionButton}
          disabled={
            isPromotionActive && subCategories.brandCode !== BRAND_CODES.ecoFly
          }
          onClick={() => {
            dispatch(
              addSelectedFlight({
                price: {
                  amount:
                    isPromotionActive &&
                    subCategories.brandCode === BRAND_CODES.ecoFly
                      ? subCategories.price.amount / 2
                      : subCategories.price.amount,
                  currency: subCategories.price.currency,
                },

                type: type,
                status: subCategories.status,
                brandCode: subCategories.brandCode,
              })
            );
            navigate(ROUTE_PATHS.COMPLETED);
          }}
        >
          Uçuşu Seç
        </button>
      </div>
    </Card>
  );
};

export default FareSubCategory;
