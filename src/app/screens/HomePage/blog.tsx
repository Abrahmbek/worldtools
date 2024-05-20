import { Box, Button, Container, Stack } from "@mui/material";
import React from "react";
import { FaUserAlt } from "react-icons/fa";
import { BsCalendar2Date } from "react-icons/bs";
import { Swiper, SwiperSlide } from "swiper/react";
import Rating from "@mui/material/Rating";
const shop_list = Array.from(Array(10).keys());

export function Blog() {
  return (
    <div className="review">
      <Container>
        <Stack className="heading_content" sx={{ mt: "1rem" }}>
          <h1>
            Our <span> Blogs</span>
          </h1>
        </Stack>
        <Stack className="review_slider">
          <Swiper
            slidesPerView={3}
            centeredSlides={false}
            spaceBetween={20}
            navigation={{
              nextEl: ".shop_next",
              prevEl: ".shop_prev",
            }}
            pagination={{
              el: ".swiper-pagination",
              clickable: true,
            }}
            autoplay={{
              delay: 7000,
              disableOnInteraction: true,
            }}
          >
            {shop_list.map((ele, order) => {
              return (
                <SwiperSlide
                  className={"blog_box"}
                  style={{ cursor: "pointer" }}
                  key={order}
                >
                  <img src="/product/dewalt.shop.jpg" alt="Event 1" />
                  <Box className="blog_icons">
                    <FaUserAlt />
                    <p>By user</p>
                    <BsCalendar2Date /> <p> 2024.4.12</p>
                  </Box>{" "}
                  <Rating
                    name="half-rating"
                    defaultValue={3.5}
                    precision={0.5}
                  />
                  <Box className="blog_content">
                    <h3>very powerfull tool</h3>
                    <Box className="total">
                      <Button className="btn">read more</Button>
                    </Box>
                  </Box>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Stack>
      </Container>
    </div>
  );
}
