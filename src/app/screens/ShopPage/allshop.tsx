import { Box, Button, Container, Stack } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "../../css/shop.css";
import { TargetArticles } from "../BlogPage/targetArticles";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Badge from "@mui/material/Badge";
import StarIcon from "@mui/icons-material/Star";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import {
  retrieveRandomShop,
  retrieveChosenShop,
  retrieveTargetProducts,
} from "./selector";
import { Shop } from "../../../types/user";
import { Dispatch } from "@reduxjs/toolkit";
import { setRandomShop, setTargetProducts, setChosenShop } from "./slice";
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
import TopArticles from "../HomePage/topArticles";

/** REDUX Slice */
const actionDispatch = (dispatch: Dispatch) => ({
  setRandomShop: (data: Shop[]) => dispatch(setRandomShop(data)),
  setChosenShop: (data: Shop[]) => dispatch(setChosenShop(data)),
  setTargetProducts: (data: Product[]) => dispatch(setTargetProducts(data)),
});

/** REDUX SELECTOR */
const randomShopRetriever = createSelector(
  retrieveRandomShop,
  (randomShop) => ({
    randomShop,
  })
);
const chosenShopRetriever = createSelector(
  retrieveChosenShop,
  (chosenShop) => ({
    chosenShop,
  })
);
const targetProductsRetriever = createSelector(
  retrieveTargetProducts,
  (targetProducts) => ({
    targetProducts,
  })
);

//const product_list = Array.from(Array(6).keys());
//const shop_list = Array.from(Array(12).keys());
export function AllShop(props: any) {
  /**INITIALIZATIONS */
  const refs: any = useRef([]);
  const history = useHistory();
  let { shop_id } = useParams<{ shop_id: string }>();
  const { setRandomShop, setChosenShop, setTargetProducts } = actionDispatch(
    useDispatch()
  );
  const { randomShop } = useSelector(randomShopRetriever);
  const { chosenShop } = useSelector(chosenShopRetriever);
  const { targetProducts } = useSelector(targetProductsRetriever);
  const [chosenShopId, setChosenShopId] = useState<string>(shop_id);
  const [targetProductSearchObj, setTargetProductSearchObj] =
    useState<ProductSearchObj>({
      page: 1,
      limit: 6,
      order: "createdAt",
      store_mb_id: shop_id,
      product_collection: "power-saws", //this
    });
  const [productRebuild, setProductRebuild] = useState<Date>(new Date());
  useEffect(() => {
    const shopService = new ShopApiService();
    shopService
      .getShops({ page: 1, limit: 15, order: "random" })
      .then((data) => setRandomShop(data))
      .catch((err) => console.log(err));

    shopService
      .getChosenShop(chosenShopId)
      .then((data) => setChosenShop(data))
      .catch((err) => console.log(err));

    const productService = new ProductApiService();
    productService
      .getTargetProducts(targetProductSearchObj)
      .then((data) => setTargetProducts(data))
      .catch((err) => console.log(err));
  }, [chosenShopId, targetProductSearchObj, productRebuild]);

  /**HANDLERS */

  const chosenShopHandler = (id: string) => {
    setChosenShopId(id);
    targetProductSearchObj.store_mb_id = id;
    setTargetProductSearchObj({ ...targetProductSearchObj });
    history.push(`/shop/${id}`);
  };

  const searchCollectionHandler = (collection: string) => {
    targetProductSearchObj.page = 1;
    targetProductSearchObj.product_collection = collection;
    setTargetProductSearchObj({ ...targetProductSearchObj });
  };
  const searchOrderHandler = (order: string) => {
    targetProductSearchObj.page = 1;
    targetProductSearchObj.order = order;
    setTargetProductSearchObj({ ...targetProductSearchObj });
  };

  const chosenProductHandler = (id: string) => {
    history.push(`/shop/product/${id}`);
  };

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
    <div className="all-shop-container">
      <Container className="beststore_frame">
        <Stack className="heading_content" sx={{ mt: "-1rem" }}>
          <h1>
            <span>__ Choose your Favorite Brand __ </span>
          </h1>
        </Stack>
        <Stack
          style={{ width: "100%", display: "flex", flexWrap: "wrap" }}
          flexDirection={"row"}
          sx={{ mt: "0px" }}
        >
          <Box className={"prev_btn shop_prev"}>
            <ArrowBackIosNewIcon
              sx={{ fontsize: 40 }}
              style={{ color: "black", cursor: "pointer" }}
            />
          </Box>
          <Swiper
            className={"shop_avatars_wrapper"}
            slidesPerView={6}
            centeredSlides={false}
            spaceBetween={10}
            navigation={{
              nextEl: ".shop_next",
              prevEl: ".shop_prev",
            }}
            pagination={{
              el: ".swiper-pagination",
              clickable: true,
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: true,
            }}
          >
            {randomShop.map((ele: Shop) => {
              const image_path = `${serverApi}/${ele.mb_image}`;
              return (
                <SwiperSlide
                  onClick={() => chosenShopHandler(ele._id)}
                  className="shop_avatars"
                  style={{ cursor: "pointer" }}
                  key={ele._id}
                >
                  <img src={image_path} alt="Event 1" />
                  <span className="shop_name">{ele.mb_nick}</span>
                </SwiperSlide>
              );
            })}
          </Swiper>
          <Box
            className={"next_btn shop_next"}
            style={{
              color: "black",
              cursor: "pointer",
            }}
          >
            <ArrowForwardIosIcon sx={{ fontsize: 40 }} />
          </Box>
        </Stack>
      </Container>
      <Container className="shop_box">
        <Stack
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"flex-end"}
          width={"90%"}
          sx={{ mt: "65px" }}
        >
          <Box className={"shop_filter_box"}>
            <Button
              className="filter_box"
              variant={"contained"}
              onClick={() => searchOrderHandler("createdAt")}
            >
              new
            </Button>
            <Button
              className="filter_box"
              variant={"contained"}
              onClick={() => searchOrderHandler("product_price")}
            >
              price
            </Button>
            <Button
              className="filter_box"
              variant={"contained"}
              onClick={() => searchOrderHandler("product_likes")}
            >
              likes
            </Button>
            <Button
              className="filter_box"
              variant={"contained"}
              onClick={() => searchOrderHandler("product_views")}
            >
              views
            </Button>
          </Box>
        </Stack>
        <Stack
          style={{ width: "100%", display: "flex", minHeight: "600px" }}
          flexDirection={"row"}
        >
          <Box>
            <div className={"shop_category"}>
              <h2>Category</h2>
              <Button
                className="category_box"
                variant={"contained"}
                onClick={() => searchCollectionHandler("power-saws")}
              >
                power-saws
              </Button>
              <Button
                className="category_box"
                variant={"contained"}
                onClick={() => searchCollectionHandler("drills")}
              >
                drills
              </Button>
              <Button
                className="category_box"
                variant={"contained"}
                onClick={() => searchCollectionHandler("grinders")}
              >
                grinders
              </Button>
              <Button
                className="category_box"
                variant={"contained"}
                onClick={() => searchCollectionHandler("machine-tools")}
              >
                machine-tools
              </Button>
              <Button
                className="category_box"
                variant={"contained"}
                onClick={() => searchCollectionHandler("air-tools")}
              >
                air-tools
              </Button>
              <Button
                className="category_box"
                variant={"contained"}
                onClick={() => searchCollectionHandler("etc")}
              >
                ect
              </Button>
            </div>
          </Box>
          <Stack className="right_side">
            {targetProducts.map((product: Product) => {
              const image_path = `${serverApi}/${product.product_images[0]}`;
              return (
                <Box className={"product_box"} key={product._id}>
                  <Box
                    className={"product_img"}
                    sx={{
                      backgroundImage: `url(${image_path})`,
                    }}
                  >
                    <Button
                      className={"like_view_btn"}
                      style={{ left: "36px" }}
                    >
                      <Badge
                        badgeContent={product.product_likes}
                        color="primary"
                      >
                        <Checkbox
                          icon={<FavoriteBorder style={{ color: "red" }} />}
                          id={product._id}
                          checkedIcon={<Favorite style={{ color: "red" }} />}
                          onClick={targetLikeProduct}
                          checked={
                            product?.me_liked &&
                            product?.me_liked[0]?.my_favorite
                              ? true
                              : false
                          }
                        />
                      </Badge>
                    </Button>

                    <Button onClick={() => chosenProductHandler(product._id)}>
                      <h2 className="view_btn">view more</h2>
                    </Button>

                    <Button
                      className={"like_view_btn"}
                      style={{ right: "50px" }}
                    >
                      <Badge
                        badgeContent={product.product_views}
                        color="primary"
                      >
                        <Checkbox
                          icon={<RemoveRedEyeIcon style={{ color: "white" }} />}
                        />
                      </Badge>
                    </Button>
                  </Box>
                  <Button
                    className={"shopping_cart"}
                    onClick={(e) => {
                      props.onAdd(product);
                      e.stopPropagation();
                    }}
                  >
                    <p>Add to card</p>
                  </Button>
                  <Box className={"product_desc"}>
                    <span className={"product_title_text"}>
                      {" "}
                      {product.product_name}
                    </span>
                    <div className={"product_desc_text"}>
                      <MonetizationOnIcon />
                      {product.product_price}
                    </div>
                  </Box>
                </Box>
              );
            })}
          </Stack>
        </Stack>
      </Container>
      <Container className={"review_for_us"}>
        <Stack
          sx={{ mt: "100px" }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Stack className="heading_content" sx={{ mt: "-1rem" }}>
            <h1>
              <span>__Testimonials__ </span>
            </h1>
          </Stack>
          <TopArticles />
          {/* <Stack
            flexDirection={"row"}
            display={"flex"}
            justifyContent={"space-between"}
            width={"100%"}
          >
            {Array.from(Array(4).keys()).map((ele, index) => {
              return (
                <Box className={"review_box"} key={index}>
                  <Box display={"flex"} justifyContent={"center"}>
                    <img
                      src={"/background/cute_girl.jpg"}
                      alt=""
                      className={"review_img"}
                    />
                  </Box>
                  <span className={"review_name"}>{chosenShop?.mb_nick}</span>
                  <span className={"review_prof"}>{chosenShop?.mb_nick}</span>
                  <p className={"review_desc"}>{chosenShop?.mb_description}</p>
                  <div className={"review_stars"}>
                    <StarIcon style={{ color: "#F2BD57" }} />
                    <StarIcon style={{ color: "#F2BD57" }} />
                    <StarIcon style={{ color: "#F2BD57" }} />
                    <StarIcon style={{ color: "whitesmoke" }} />
                    <StarIcon style={{ color: "whitesmoke" }} />
                  </div>
                </Box>
              );
            })}
          </Stack> */}
        </Stack>
      </Container>
      <Container>
        <Stack
          sx={{ mt: "-400px" }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box className="heading_content" sx={{ mt: "-1rem" }}>
            <h1>
              <span>__Find us__ </span>
            </h1>
          </Box>
          <iframe
            style={{
              marginTop: "15px",
              width: "1500px",
              height: "500px",
              marginBottom: "35px",
            }}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3846.8162804798862!2d127.11749407481565!3d35.83001977351638!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x35703ca8628865a7%3A0x6f839c441f3600f9!2sBurger%20King!5e0!3m2!1sru!2skr!4v1700493460281!5m2!1sru!2skr"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </Stack>
      </Container>
    </div>
  );
}
