import { Box, Button, Container, Stack } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";

export function Features() {
  return (
    <div className="features">
      <Container className="features">
        <Stack className="heading_content">
          <h1>
            Our <span> Features</span>
          </h1>
        </Stack>
        <Stack className="features_container">
          <Box className="features_box">
            <img src="/background/money-b.jpg" alt="" />
            <h4>money back guarantee</h4>
            <p>Our Company has been based on money back guarantee</p>
            <Box className="total">
              <Button className="btn">read more</Button>
            </Box>
          </Box>
          <Box className="features_box">
            <img src="/background/Free-d.png" alt="" />
            <h4>Free Delivery</h4>
            <p>Our Company has been based on money back guarantee</p>
            <Box className="total">
              <Button className="btn">read more</Button>
            </Box>
          </Box>
          <Box className="features_box">
            <img src="/background/easy-p.jpg" alt="" />
            <h4>Easy payment</h4>
            <p>Our Company has been based on money back guarantee</p>
            <Box className="total">
              <Button className="btn">read more</Button>
            </Box>
          </Box>
        </Stack>
      </Container>
    </div>
  );
}
