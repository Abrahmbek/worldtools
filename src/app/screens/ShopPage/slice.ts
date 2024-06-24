import { createSlice } from "@reduxjs/toolkit";
import { ShopPageState } from "../../../types/screen";

const initialState: ShopPageState = {
  targetShop: [],
  randomShop: [],
  chosenShop: null,
  targetProducts: [],
  chosenProduct: null,
};

const ShopPageSlice = createSlice({
  name: "shopePage",
  initialState,
  reducers: {
    setTargetShop: (state, action) => {
      state.targetShop = action.payload;
    },
    setRandomShop: (state, action) => {
      state.randomShop = action.payload;
    },
    setChosenShop: (state, action) => {
      state.chosenShop = action.payload;
    },
    setTargetProducts: (state, action) => {
      state.targetProducts = action.payload;
    },
    setChosenProduct: (state, action) => {
      state.chosenProduct = action.payload;
    },
  },
});
export const {
  setTargetShop,
  setRandomShop,
  setChosenShop,
  setTargetProducts,
  setChosenProduct,
} = ShopPageSlice.actions;

const ShopPageReducer = ShopPageSlice.reducer;
export default ShopPageReducer;
