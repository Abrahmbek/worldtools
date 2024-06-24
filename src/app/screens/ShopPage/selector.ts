import { createSelector } from "reselect";
import { AppRootState } from "../../../types/screen";

const selectShopPage = (state: AppRootState) => state.shopPage;
export const retrieveTargetShop = createSelector(
  selectShopPage,
  (ShopPage) => ShopPage.targetShop
);
export const retrieveRandomShop = createSelector(
  selectShopPage,
  (ShopPage) => ShopPage.randomShop
);
export const retrieveChosenShop = createSelector(
  selectShopPage,
  (ShopPage) => ShopPage.chosenShop
);
export const retrieveTargetProducts = createSelector(
  selectShopPage,
  (ShopPage) => ShopPage.targetProducts
);
export const retrieveChosenProduct = createSelector(
  selectShopPage,
  (ShopPage) => ShopPage.chosenProduct
);
