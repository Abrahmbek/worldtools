import { Box, Container, Stack } from "@mui/material";

import React, { useEffect, useRef } from "react";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { Dispatch } from "@reduxjs/toolkit";
import { Product } from "../../../types/product";
import ProductApiService from "../../apiServices/productApiService";
import { retrieveNewArrivel } from "./selector";
import { serverApi } from "../../../lib/config";
import { setnewArrival } from "./slice";
import { useHistory } from "react-router-dom";

// REDUX SLICE
const actionDispatch = (dispatch: Dispatch) => ({
  setnewArrival: (data: Product[]) => dispatch(setnewArrival(data)),
});
// REDUX SELECTOR
const newArrivalRetriever = createSelector(
  retrieveNewArrivel,
  (newArrival) => ({
    newArrival,
  })
);

export function NewArrival() {
  /** INITIALIZATION */
  //const refs: any = useRef([]);
  const history = useHistory();
  const { setnewArrival } = actionDispatch(useDispatch());
  const { newArrival } = useSelector(newArrivalRetriever);
  useEffect(() => {
    const productService = new ProductApiService();
    productService
      .getTargetProducts({ order: "product_likes", page: 1, limit: 3 })
      .then((data) => {
        setnewArrival(data);
      })
      .catch((err) => console.log(err));
  }, []);
  /**HANDLERS */
  const chosenProductHandler = (id: string) => {
    history.push(`/shop/product/${id}`);
  };
  return (
    <div className="newarrival_frame">
      <Container>
        <Stack
          className="heading_content"
          sx={{
            mt: "0rem",
            mb: "1rem",
          }}
        >
          <h1>
            New <span> Arrival</span>
          </h1>
        </Stack>
        <Stack
          className="product_container"
          sx={{ mt: ".7rem" }}
          flexDirection={"row"}
          display={"flex"}
          justifyContent={"space-around"}
        >
          {newArrival.map((product: Product) => {
            const image_path = `${serverApi}/${product.product_images[0]}`;
            return (
              <Box className="product_box">
                <Stack className="product_img">
                  <img className="img" src={image_path} alt="" />
                  <div className="new_arrival">New Arrival</div>
                  <div
                    className="view_btn"
                    onClick={() => chosenProductHandler(product._id)}
                  >
                    {" "}
                    View More
                  </div>
                </Stack>
              </Box>
            );
          })}
        </Stack>
      </Container>
    </div>
  );
}
