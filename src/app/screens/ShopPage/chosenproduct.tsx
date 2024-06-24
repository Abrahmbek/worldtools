import { Box, Container, Stack } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Marginer from "../../components/marginer/index"; //this
import React, { useEffect, useState } from "react";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveChosenShop, retrieveChosenProduct } from "./selector";
import { Shop } from "../../../types/user";
import { Dispatch } from "@reduxjs/toolkit";
import { setChosenProduct, setChosenShop } from "./slice";
import { Product } from "../../../types/product";
import { useHistory, useParams } from "react-router-dom";
import { ProductSearchObj } from "../../../types/others";
import ProductApiService from "../../apiServices/productApiService";
import { serverApi } from "../../../lib/config";
import ShopApiService from "../../apiServices/shopApiService";
import { Definer } from "../../../lib/Definer";
import assert from "assert";
import MemberApiService from "../../apiServices/memberApiService";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../../lib/sweetAlert";
import { verifiedMemberData } from "../../apiServices/verify";
import { ShopHeader } from "./shopheader";

/** REDUX Slice */
const actionDispatch = (dispatch: Dispatch) => ({
  setChosenShop: (data: Shop[]) => dispatch(setChosenShop(data)),
  setChosenProduct: (data: Product) => dispatch(setChosenProduct(data)),
});
/** REDUX SELECTOR */
const chosenProductRetriever = createSelector(
  retrieveChosenProduct,
  (chosenProduct) => ({
    chosenProduct,
  })
);
const chosenShopRetriever = createSelector(
  retrieveChosenShop,
  (chosenShop) => ({
    chosenShop,
  })
);
//const chosen_list = Array.from(Array(3).keys());

export function ChosenProduct(props: any) {
  /**INITIALIZATIONS */

  const [productRebuild, setProductRebuild] = useState<Date>(new Date());
  let { product_id } = useParams<{ product_id: string }>();
  const { setChosenProduct, setChosenShop } = actionDispatch(useDispatch());
  const { chosenProduct } = useSelector(chosenProductRetriever);
  const { chosenShop } = useSelector(chosenShopRetriever);
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  const productRelatedProcess = async () => {
    try {
      const productService = new ProductApiService();
      const product: Product = await productService.getChosenProduct(
        product_id
      );
      setChosenProduct(product);

      const shopService = new ShopApiService();
      const shop = await shopService.getChosenShop(product.store_mb_id);
      setChosenShop(shop);
    } catch (err) {
      console.log(`productRelatedProcess: ERROR`, err);
    }
  };

  useEffect(() => {
    productRelatedProcess().then();
  }, [productRebuild]);

  /**HANDLERS */

  const targetLikeProduct = async (e: any) => {
    try {
      assert.ok(verifiedMemberData, Definer.auth_err1);

      const memberService = new MemberApiService(),
        like_result: any = await memberService.memberLikeTarget({
          like_ref_id: e.target.id,
          group_type: "product",
        });
      assert.ok(like_result, Definer.general_err1);

      await sweetTopSmallSuccessAlert("success", 700, false);
      setProductRebuild(new Date());
    } catch (err: any) {
      console.log("targetLike, EROOR:", err);
      sweetErrorHandling(err).then();
    }
  };
  return (
    <div className="chosen_product_page">
      <Container className="product_container" style={{ display: "flex" }}>
        <Stack className="chosen_product_slider">
          <Stack className="first_swiper">
            {" "}
            <Swiper
              className="product_swiper_two"
              loop={true}
              spaceBetween={10}
              navigation={{
                nextEl: null,
              }}
              slidesPerView={3}
              modules={[FreeMode, Navigation, Thumbs]}
              style={{
                transform: "rotate(-90deg)",
              }}
            >
              {chosenProduct?.product_images.map((ele: string) => {
                const image_path = `${serverApi}/${ele}`;

                return (
                  <SwiperSlide key={ele}>
                    <img
                      className="rotated-image"
                      style={{
                        width: "100%",
                        height: "100%",
                        backgroundImage: "cover",
                      }}
                      src={image_path}
                      alt=""
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </Stack>

          <Swiper
            className="product_swiper"
            loop={true}
            slidesPerView={chosenProduct?.product_images.length}
            freeMode={true}
            watchSlidesProgress={true}
            spaceBetween={10}
            navigation={true}
            modules={[FreeMode, Navigation, Thumbs]}
          >
            {chosenProduct?.product_images.map((ele: string) => {
              const image_path = `${serverApi}/${ele}`;
              return (
                <SwiperSlide key={ele}>
                  <img
                    style={{
                      display: "flex",
                      height: "100%",
                      width: "100%",
                      backgroundImage: "cover",
                    }}
                    src={image_path}
                    alt=""
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Stack>

        <Stack className={"chosen_product_info_container"}>
          <Box className={"chosen_product_info_box"}>
            <div className={"product_txt"}>
              <h3 style={{ color: "#08090d" }}>Product name:</h3>
              <span> {chosenProduct?.product_name}</span>
            </div>
            <div className={"product_txt"}>
              <span style={{ color: "#08090d" }}>Brand </span>
              <span>{chosenShop?.mb_nick}</span>
            </div>

            <Box className={"rating_box"}>
              <Rating name="half-rating" defaultValue={3.5} precision={0.5} />
              <div className={"evaluation_box"}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginRight: "20px",
                  }}
                >
                  <Checkbox
                    {...label}
                    icon={<FavoriteBorder />}
                    checkedIcon={<Favorite style={{ color: "red" }} />}
                    id={chosenProduct?._id}
                    onClick={targetLikeProduct}
                    checked={
                      chosenProduct?.me_liked &&
                      !!chosenProduct?.me_liked[0]?.my_favorite
                    }
                  />

                  <span>{chosenProduct?.product_likes}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <RemoveRedEyeIcon sx={{ mr: "10px" }} />
                  <span> {chosenProduct?.product_views}</span>
                </div>
              </div>
            </Box>
            <p className={"product_desc_info"}>
              {" "}
              {chosenProduct?.product_description
                ? chosenProduct?.product_description
                : "no description"}
            </p>
            <Marginer
              direction="horizontal"
              height="3"
              width="100%"
              bg="green"
            />
            <div className="product_price_box">
              <span>Price:</span>
              <span>$ {chosenProduct?.product_price}</span>
            </div>
            <div style={{ marginTop: "20px" }}>
              <Button
                className={"button_box"}
                variant="contained"
                onClick={() => {
                  props.onAdd(chosenProduct);
                }}
              >
                Add to Card
              </Button>
            </div>
          </Box>
        </Stack>
      </Container>
    </div>
  );
}
