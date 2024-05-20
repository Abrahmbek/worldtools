import { Box, Container, Stack } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Marginer from "../../components/marginer/index.tsx";
import React from "react";
const chosen_list = Array.from(Array(3).keys());
export function ChosenProduct() {
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
              {chosen_list.map((ele) => {
                const image_path = "/product/set1.webp";

                return (
                  <SwiperSlide key={ele}>
                    <img
                      className="rotated-image"
                      style={{ width: "100%", height: "100%" }}
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
            slidesPerView={1}
            freeMode={true}
            watchSlidesProgress={true}
            spaceBetween={10}
            navigation={true}
            modules={[FreeMode, Navigation, Thumbs]}
          >
            {chosen_list.map((ele) => {
              const image_path = "/product/set1.webp";
              return (
                <SwiperSlide key={ele}>
                  <img
                    style={{ display: "flex", height: "100%" }}
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
              <span style={{ color: "#08090d" }}>Product name:</span>
              <span>Saws</span>
            </div>
            <div className={"product_txt"}>
              <span style={{ color: "#08090d" }}>Brand </span>
              <span>DeWalt</span>
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
                    icon={<FavoriteBorder />}
                    checkedIcon={<Favorite style={{ color: "red" }} />}
                  />

                  <span>12</span>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <RemoveRedEyeIcon sx={{ mr: "10px" }} />
                  <span> 5</span>
                </div>
              </div>
            </Box>
            <p className={"product_desc_info"}>very powerfull saws</p>
            <Marginer
              direction="horizontal"
              height="3"
              width="100%"
              bg="green"
            />
            <div className="product_price_box">
              <span>Price:</span>
              <span>$ 229</span>
            </div>
            <div style={{ marginTop: "20px" }}>
              <Button className={"button_box"} variant="contained">
                Add to Card
              </Button>
            </div>
          </Box>
        </Stack>
      </Container>
    </div>
  );
}
