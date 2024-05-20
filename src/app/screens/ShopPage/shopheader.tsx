import { Container, Stack } from "@mui/material";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Autoplay, Pagination } from "swiper";
SwiperCore.use([Navigation, Autoplay, Pagination]);

export function ShopHeader() {
  return (
    <div className="shop_header">
      {/* <Container>
        <Stack className={"shop_swiper"}>
          <Swiper
            className={""}
            slidesPerView={"auto"}
            centeredSlides={true}
            spaceBetween={30}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            pagination={{
              el: ".swiper-pagination",
              clickable: true,
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: true,
            }}
          >
            <SwiperSlide className={"swiper_img"}>
              <div className={""}>
                <img src="/background/bg4.jpg" alt="Event 1" />
              </div>
            </SwiperSlide>
            <SwiperSlide className={"swiper_img"}>
              <div className={""}>
                <img src="/background/boom.webp" alt="Event 1" />
              </div>
            </SwiperSlide>
            <SwiperSlide className={"swiper_img"}>
              <div className={""}>
                <img src="/background/Cover-1.jpg" alt="Event 1" />
              </div>
            </SwiperSlide>
          </Swiper>
        </Stack>
      </Container> */}
      <Container className="shop_home">
        <Stack></Stack>
      </Container>
    </div>
  );
}
