import { Box, Container, Stack } from "@mui/material";
import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneVolume } from "react-icons/fa6";
import { MdMarkEmailUnread } from "react-icons/md";
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaSquareInstagram } from "react-icons/fa6";
import { IoLogoYoutube } from "react-icons/io";
import "../../css/contact.css";
import { Height } from "@mui/icons-material";

export function Contact_usPage() {
  return (
    <div className="contact_us">
      <Container className="contact">
        <Stack className="content">
          <h2>Contact Us</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Temporibus
            alias provident officiis officia corporis autem laborum sint vitae
            facere?{" "}
          </p>
        </Stack>
        <Stack className="container">
          <Box className="container_info">
            <Box className="box">
              <div className="icon">
                <b></b>
                <i>
                  <FaLocationDot />
                </i>
              </div>
              <div className="text">
                <h3>Address</h3>
                <p>
                  South Korea, <br /> Seoul,
                  <br /> Gangnam 231 <br />
                </p>
              </div>
            </Box>
            <Box className="box">
              <div className="icon">
                <b></b>
                <i>
                  {" "}
                  <FaPhoneVolume />
                </i>
              </div>
              <div className="text">
                <h3>Phone</h3>
                <p>010-1234-5678</p>
              </div>
            </Box>
            <Box className="box">
              <div className="icon">
                <b></b>
                <i>
                  <MdMarkEmailUnread />
                </i>
              </div>
              <div className="text">
                <h3>Email</h3>
                <p>toolscart@gmail.com</p>
              </div>
            </Box>
            <Box>
              <h2 className="txt"> Contact with us</h2>
              <ul className="sci">
                <li>
                  <a href="">
                    <FaFacebook />
                  </a>
                </li>
                <li>
                  <a href="">
                    <FaXTwitter />
                  </a>
                </li>
                <li>
                  <a href="">
                    <FaSquareInstagram />
                  </a>
                </li>
                <li>
                  <a href="">
                    <IoLogoYoutube />
                  </a>
                </li>
              </ul>
            </Box>
          </Box>
          <Box
            className="container_form"
            style={{ marginLeft: "-120px", width: "35rem", height: "30rem" }}
          >
            <form className="form" style={{ marginLeft: "-20px" }}>
              <h2>Send Message</h2>
              <Box className="input_box">
                <input type="text" name="" />
                <span>Full Name</span>
              </Box>
              <Box className="input_box">
                <input type="text" name="" />
                <span>Email</span>
              </Box>
              <Box className="input_box">
                <textarea name="" id=""></textarea>
                <span>Type Your Message</span>
              </Box>
              <Box className="input_box">
                <input className="submit" type="submit" value="Send" />
              </Box>
            </form>
          </Box>
        </Stack>
      </Container>
    </div>
  );
}
