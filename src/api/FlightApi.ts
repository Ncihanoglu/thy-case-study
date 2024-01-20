import { BRAND_CODES, STATUS } from "../utils/Constants";
import { instance } from "./CommonApi";

export interface FlightApiInterface {
  arrivalDateTimeDisplay: string;
  flightDuration: string;
  departureDateTimeDisplay: string;
  originAirport: {
    name: string;
    code: string;
    city: {
      code: string;
      name: string;
    };
  };

  destinationAirport: {
    name: string;
    code: string;
    city: {
      code: string;
      name: string;
    };
    country: {
      code: string;
      name: string;
    };
  };
  fareCategories: {
    BUSINESS: {
      subcategories: [
        {
          brandCode: BRAND_CODES;
          price: {
            amount: number;
            currency: string;
          };
          order: number;
          status: STATUS;
          rights: string[];
        },
        {
          brandCode: BRAND_CODES;
          price: {
            amount: number;
            currency: string;
          };
          order: number;
          status: STATUS;
          rights: string[];
        },
        {
          brandCode: BRAND_CODES;
          price: {
            amount: number;
            currency: string;
          };
          order: number;
          status: STATUS;
          rights: string[];
        }
      ];
    };
    ECONOMY: {
      subcategories: [
        {
          brandCode: BRAND_CODES;
          price: {
            amount: number;
            currency: string;
          };
          order: number;
          status: STATUS;
          rights: string[];
        },
        {
          brandCode: BRAND_CODES;
          price: {
            amount: number;
            currency: string;
          };
          order: number;
          status: STATUS;
          rights: string[];
        },
        {
          brandCode: BRAND_CODES;
          price: {
            amount: number;
            currency: string;
          };
          order: number;
          status: STATUS;
          rights: string[];
        }
      ];
    };
  };
}

export interface FlightApiInsideData {
  data: FlightApiInterface[];
}

export const getAllFlights = async (): Promise<FlightApiInsideData> => {
  const flights = await instance.get("/flights");
  const { data } = flights;
  return { data };
};
