import { Container } from "@mui/material";
import React, { useEffect } from "react";

//import { BestStore } from "./beststore"; // from
import { TopSale } from "./topsale";
import { Advertisement } from "./advertisement";
//import { Blog } from "./blog";
import { NewArrival } from "./newarrival";
import "../../css/homepage.css";
import "../../css/navbar.css";
import { Home } from "./home";
import { Features } from "./features"; //to
// import { TopArticles } from "./topArticles";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { setTopSaleShop } from "../../screens/HomePage/slice";
import { setBestArticles } from "../../screens/HomePage/slice";
import {
  retrieveBestArticles,
  retrieveTopSaleShop,
} from "../../screens/HomePage/selector";
import { Shop } from "../../../types/user";
import ShopApiService from "../../apiServices/shopApiService";
import { BoArticle } from "../../../types/boArticle";
import CommunityApiService from "../../apiServices/blogApiService";
import TopArticles from "./topArticles";

// REDUX SLICE
const actionDispatch = (dispatch: Dispatch) => ({
  setTopSaleShop: (data: Shop[]) => dispatch(setTopSaleShop(data)),
  setBestArticles: (data: BoArticle[]) => dispatch(setBestArticles(data)),
});

// REDUX SELECTOR
const topSaleShopRetriever = createSelector(
  retrieveTopSaleShop,
  (topSaleShop) => ({
    topSaleShop,
  })
);
const bestArticlesRetriever = createSelector(
  retrieveBestArticles,
  (bestArticles) => ({
    bestArticles,
  })
);
export function HomePage() {
  /** INITIALIZATION */
  const { setTopSaleShop, setBestArticles } = actionDispatch(useDispatch());

  useEffect(() => {
    const shopService = new ShopApiService();
    shopService
      .getTopSaleShop()
      .then((data) => {
        setTopSaleShop(data);
      })
      .catch((err) => console.log(err));
    //fetch articles
    const communityService = new CommunityApiService();
    communityService
      .getTargetArticles({
        bo_id: "all",
        page: 1,
        limit: 5,
        order: "art_views",
      })
      .then((data) => setBestArticles(data))
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
      <TopArticles />
      {/* <Blog /> */}
    </div>
  );
}
