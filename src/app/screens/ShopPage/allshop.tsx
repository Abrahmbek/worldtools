import { Box, Button, Container, Stack } from "@mui/material";
import React from "react";
import { BestStore } from "../HomePage/beststore.tsx";
import "../../css/shop.css";

import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Badge from "@mui/material/Badge";
import StarIcon from "@mui/icons-material/Star";

const product_list = Array.from(Array(6).keys());

export function AllShop() {
  return (
    <div className="all-shop-container">
      <BestStore />
      <Container className="shop_box">
        <Stack
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"flex-end"}
          width={"90%"}
          sx={{ mt: "65px" }}
        >
          <Box className={"shop_filter_box"}>
            <Button className="filter_box" variant={"contained"}>
              new
            </Button>
            <Button className="filter_box" variant={"contained"}>
              price
            </Button>
            <Button className="filter_box" variant={"contained"}>
              likes
            </Button>
            <Button className="filter_box" variant={"contained"}>
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
              <Button className="category_box" variant={"contained"}>
                boshqa
              </Button>
              <Button className="category_box" variant={"contained"}>
                desert
              </Button>
              <Button className="category_box" variant={"contained"}>
                ichimlik
              </Button>
              <Button className="category_box" variant={"contained"}>
                salad
              </Button>
              <Button className="category_box" variant={"contained"}>
                ovqatlar
              </Button>
            </div>
          </Box>
          <Stack className="right_side">
            {product_list.map((ele, index) => {
              return (
                <Box className={"product_box"} key={index}>
                  <Box
                    className={"product_img"}
                    sx={{
                      backgroundImage: `url(${"/product/saws2.jpg"})`,
                    }}
                  >
                    <Button
                      className={"like_view_btn"}
                      style={{ left: "36px" }}
                    >
                      <Badge badgeContent={8} color="primary">
                        <Checkbox
                          icon={<FavoriteBorder style={{ color: "white" }} />}
                          checkedIcon={<Favorite style={{ color: "red" }} />}
                        />
                      </Badge>
                    </Button>

                    <Button>
                      <h2 className="view_btn">view more</h2>
                    </Button>

                    <Button
                      className={"like_view_btn"}
                      style={{ right: "50px" }}
                    >
                      <Badge badgeContent={index} color="primary">
                        <Checkbox
                          icon={<RemoveRedEyeIcon style={{ color: "white" }} />}
                        />
                      </Badge>
                    </Button>
                  </Box>
                  <Button className={"shopping_cart"}>
                    <p>Add to card</p>
                  </Button>
                  <Box className={"product_desc"}>
                    <span className={"product_title_text"}> saws</span>
                    <div className={"product_desc_text"}>
                      <MonetizationOnIcon />
                      $220
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
          <Stack
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
                  <span className={"review_name"}>Mika</span>
                  <span className={"review_prof"}>Customer</span>
                  <p className={"review_desc"}>I am always using this brand</p>
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
          </Stack>
        </Stack>
      </Container>
      <Container>
        <Stack
          sx={{ mt: "60px" }}
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
