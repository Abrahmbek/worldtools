import { Container } from "@mui/material";
import React, { useEffect } from "react";

//import { BestStore } from "./beststore"; // from
import { TopSale } from "./topsale";
import { Advertisement } from "./advertisement";
import { Blog } from "./blog";
import { NewArrival } from "./newarrival";
import "../../css/homepage.css";
import "../../css/navbar.css";
import { Home } from "./home";
import { Features } from "./features"; //to

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { setTopSaleShop } from "../../screens/HomePage/slice";
import { retrieveTopSaleShop } from "../../screens/HomePage/selector";
import { Shop } from "../../../types/user";
import ShopApiService from "../../apiServices/shopApiService";

// REDUX SLICE
const actionDispatch = (dispatch: Dispatch) => ({
  setTopSaleShop: (data: Shop[]) => dispatch(setTopSaleShop(data)),
});

// REDUX SELECTOR
const topSaleShopRetriever = createSelector(
  retrieveTopSaleShop,
  (topSaleShop) => ({
    topSaleShop,
  })
);
export function HomePage() {
  /** INITIALIZATION */
  const { setTopSaleShop } = actionDispatch(useDispatch());

  useEffect(() => {
    const shopService = new ShopApiService();
    shopService
      .getTopSaleShop()
      .then((data) => {
        setTopSaleShop(data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <Home />
      <Features />
      <TopSale />
      <NewArrival />
      <Advertisement />
      {/* <BestStore /> */}
      <Blog />
    </div>
  );
}
