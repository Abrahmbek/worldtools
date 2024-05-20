import { Box, Container, Stack } from "@mui/material";
import React from "react";
import { ImFacebook2 } from "react-icons/im";
import { GrInstagram } from "react-icons/gr";
import { FaTwitter } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io5";

export function Footer() {
  return (
    <div className="footer_config">
      <Container>
        <Stack flexDirection={"column"} className="main_footer_container">
          <Stack flexDirection={"row"} style={{ height: "242px" }}>
            <Stack className="info" flexDirection={"column"}>
              <Box>
                <img className="logo" src="/background/logo12.png" alt="" />
              </Box>
              <Box className="main_text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor Sed ut perspiciatis
              </Box>
              <Stack>
                <Box className="contact_links">
                  <ImFacebook2 />
                  <GrInstagram />
                  <FaTwitter />
                  <IoLogoYoutube />
                </Box>
              </Stack>
            </Stack>

            <Stack className="parts">
              <Box className="part_subject">Category</Box>
              <Box className="divider"></Box>
              <Box className="target">
                Best Sale <br /> Equipment <br /> Home Page <br /> New Arrivel
              </Box>
            </Stack>
            <Stack className="parts">
              <Box className="part_subject">Navigation</Box>
              <Box className="divider"></Box>
              <Box className="target">
                About Us <br /> Contact Us <br /> Search <br /> Blog
              </Box>
            </Stack>
            <Stack className="parts">
              <Box className="part_subject">Link</Box>
              <Box className="divider"></Box>
              <Box className="target">
                Home <br />
                Shipping Info <br /> Catalog <br />
                Privacy Policy
              </Box>
            </Stack>
            <Stack className="find_us">
              <Box className="find">Store Info</Box>
              <Box className="divider"></Box>
              <Stack className="details" sx={{ mt: "19px" }}>
                <Box>
                  <img
                    className="detail_first"
                    src="/icons/placeholder.png"
                    alt=""
                  />
                </Box>
                <Box className="detail_second">Store South Korea</Box>
              </Stack>
              <Stack className="details" sx={{ mt: "42px" }}>
                <Box>
                  <img className="detail_first" src="/icons/phone.png" alt="" />
                </Box>
                <Box className="detail_second"> Call Us: +123-456-789</Box>
              </Stack>
              <Stack className="details" sx={{ mt: "9px" }}>
                <Box className="detail_first">
                  <img
                    className="detail_first"
                    src="/icons/email (1).png"
                    alt=""
                  />
                </Box>
                <Box className="detail_second">Toolscart@gmail.com</Box>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
