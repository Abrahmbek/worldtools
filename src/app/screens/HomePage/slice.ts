import { createSlice } from "@reduxjs/toolkit";
import { HomePageState } from "../../../types/screen";

const initialState: HomePageState = {
  topSaleShop: [],
  newArrival: [],
  bestBoArticles: [],
  trendBoArticles: [],
};
const HomePageSlice = createSlice({
  name: "homepage",
  initialState,
  reducers: {
    setTopSaleShop: (state, action) => {
      state.topSaleShop = action.payload;
    },
    setnewArrival: (state, action) => {
      state.newArrival = action.payload;
    },
    setbestBoArticles: (state, action) => {
      state.bestBoArticles = action.payload;
    },
    settrendBoArticles: (state, action) => {
      state.trendBoArticles = action.payload;
    },
  },
});
export const {
      setTopSaleShop,
      setnewArrival,
      setbestBoArticles,
      settrendBoArticles,
} = HomePageSlice.actions;

const HomePageReducer = HomePageSlice.reducer;
export default HomePageReducer;