import { Box, Button, Container, Stack } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";

export function Home() {
  return (
    <div className="section">
      <Container className="home">
        <Stack>
          <Box className="content">
            <h3>World Power Tool </h3>
            <p>Free Shipping On World Wilde</p>
            <Box className="total">
              <NavLink to="/shop/:">
                <Button className="btn">Shop__Now</Button>
              </NavLink>
            </Box>
          </Box>
        </Stack>
      </Container>
    </div>
  );
}
