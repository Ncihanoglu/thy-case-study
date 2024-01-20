import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { BRAND_CODES, FARE_CATEGORIES, STATUS } from "../../utils/Constants";

interface InitialState {
  isPromotionActive: boolean;
  flightId: { type: FARE_CATEGORIES; id: number } | null;
  price: {
    amount: number;
    currency: string | null;
  };
  type: FARE_CATEGORIES | null;
  status: STATUS | null;
  brandCode: BRAND_CODES | null;
}

const initialState: InitialState = {
  isPromotionActive: false,
  flightId: null,
  price: {
    amount: 0,
    currency: null,
  },
  type: null,
  status: null,
  brandCode: null,
};

const updatePromotionAction = (
  state: InitialState,
  action: PayloadAction<boolean>
) => {
  state.isPromotionActive = action.payload;
};

const updateFlightIdAction = (
  state: InitialState,
  action: PayloadAction<{ type: FARE_CATEGORIES; id: number } | null>
) => {
  state.flightId = action.payload;
};

const addSelectedFlightAction = (
  state: InitialState,
  action: PayloadAction<{
    price: {
      amount: number;
      currency: string | null;
    };
    type: FARE_CATEGORIES;
    status: STATUS;
    brandCode: BRAND_CODES;
  }>
) => {
  const { price, type, status, brandCode } = action.payload;
  state.price = { ...price };
  state.type = type;
  state.status = status;
  state.brandCode = brandCode;
};

const resetAction = (state: InitialState) => {
  state.brandCode = initialState.brandCode;
  state.flightId = initialState.flightId;
  state.isPromotionActive = initialState.isPromotionActive;
  state.price = initialState.price;
  state.status = initialState.status;
  state.type = initialState.type;
};

const flightSlice = createSlice({
  name: "flisght",
  initialState,
  reducers: {
    updatePromotion: updatePromotionAction,
    updateFlightId: updateFlightIdAction,
    addSelectedFlight: addSelectedFlightAction,
    reset: resetAction,
  },
});

export const { updatePromotion, updateFlightId, addSelectedFlight, reset } =
  flightSlice.actions;

export default flightSlice.reducer;
