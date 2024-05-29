import { createSelector } from "reselect";
import { AppRootState } from "../../../types/screen";

const selectHomePage = (state: AppRootState) => state.homePage;
export const retrieveTopSaleShop = createSelector(
  selectHomePage,
  (HomePage) => HomePage.topSaleShop
);
export const retrieveNewArrivel = createSelector(
  selectHomePage,
  (HomePage) => HomePage.newArrival
);
export const retrieveBestBoArticle = createSelector(
  selectHomePage,
  (HomePage) => HomePage.bestBoArticles
);
export const retrieveTrendBoArticle = createSelector(
  selectHomePage,
  (HomePage) => HomePage.trendBoArticles
);
