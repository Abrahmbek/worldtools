import { Box, Container, Stack } from "@mui/material";
import React from "react";

export function NewArrival() {
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
          <Box className="product_box">
            <Stack className="product_img">
              <img className="img" src="/product/set1.webp" alt="" />
              <div className="new_arrival">New Arrival</div>
              <div className="view_btn"> View More</div>
            </Stack>
          </Box>
          <Box className="product_box">
            <Stack className="product_img">
              <img className="img" src="/product/set1.webp" alt="" />
              <div className="new_arrival">New Arrival</div>
              <div className="view_btn"> View More</div>
            </Stack>
          </Box>
          <Box className="product_box">
            <Stack className="product_img">
              <img className="img" src="/product/set1.webp" alt="" />
              <div className="new_arrival">New Arrival</div>
              <div className="view_btn"> View More</div>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </div>
  );
}
