import { Box, Container, Stack } from "@mui/material";
import "../../css/shop.css";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Swiper, SwiperSlide } from "swiper/react";
//import  BestStore from "../HomePage/"; //this
import SwiperCore, { Navigation, Autoplay, Pagination } from "swiper";
import React from "react";
import { Height } from "@mui/icons-material";

const shop_list = Array.from(Array(12).keys());

export function BestStore() {
  return (
    <div className="beststore_frame">
      <Container>
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
            {shop_list.map((ele, order) => {
              return (
                <SwiperSlide
                  className="shop_avatars"
                  style={{ cursor: "pointer" }}
                  key={order}
                >
                  <img src="/product/dewalt.shop.jpg" alt="Event 1" />
                  <span className="shop_name">DeWalt</span>
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
    </div>
  );
}
