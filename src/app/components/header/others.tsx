import { Events } from "../event.tsx";
import { Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";
import "swiper/swiper-bundle.css";
import { FaTools } from "react-icons/fa";
import { FaBarsStaggered } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { RiShoppingCartFill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";

export function NavbarOther(props: any) {
  const [isSearchActive, setSearchActive] = useState(false);
  const [isShoppingCartActive, setShoppingCartActive] = useState(false);
  const [isUserCartActive, setUserCartActive] = useState(false);
  const [isNavbarActive, setNavbarActive] = useState(false);

  const toggleSearch = () => {
    setSearchActive(!isSearchActive);
    setShoppingCartActive(false);
    setUserCartActive(false);
    setNavbarActive(false);
  };

  const toggleShoppingCart = () => {
    setShoppingCartActive(!isShoppingCartActive);
    setSearchActive(false);
    setUserCartActive(false);
    setNavbarActive(false);
  };

  const toggleUserCart = () => {
    setUserCartActive(!isUserCartActive);
    setSearchActive(false);
    setShoppingCartActive(false);
    setNavbarActive(false);
  };

  const toggleNavbar = () => {
    setNavbarActive(!isNavbarActive);
    setSearchActive(false);
    setShoppingCartActive(false);
    setUserCartActive(false);
  };

  const handleWindowScroll = () => {
    setSearchActive(false);
    setShoppingCartActive(false);
    setUserCartActive(false);
    setNavbarActive(false);
  };

  window.onscroll = handleWindowScroll;
  return (
    <div className="product_header">
      <div className="header">
        <Box className="logo" onClick={props.Setpath}>
          <NavLink to="/">
            <FaTools />
            <i>Toolscart</i>
          </NavLink>
        </Box>
        <Stack className={`navbar ${isNavbarActive ? "active" : ""}`}>
          <Stack className="navbar media">
            <Box className="hover_line" onClick={props.SetPath}>
              <NavLink to="/">HOME</NavLink>
            </Box>
            <Box className="hover_line" onClick={props.SetPath}>
              <NavLink to="/shop" activeClassName="underline">
                SHOP
              </NavLink>
            </Box>
            <Box className="hover_line" onClick={props.SetPath}>
              <NavLink to="/product" activeClassName="underline">
                PRODUCT
              </NavLink>
            </Box>
            <Box className="hover_line" onClick={props.SetPath}>
              <NavLink to="/blog" activeClassName="underline">
                BLOG
              </NavLink>
            </Box>
            <Box className="hover_line" onClick={props.SetPath}>
              <NavLink to="/contact_us" activeClassName="underline">
                CONTACT-US
              </NavLink>
            </Box>
            <Box className="hover_line" onClick={props.SetPath}>
              <NavLink to="/order" activeClassName="underline">
                ORDER
              </NavLink>
            </Box>
          </Stack>

          <Stack className="icons ">
            <Box className="menu-btn" onClick={toggleNavbar}>
              <FaBarsStaggered />
            </Box>
            <Box className="icon search-btn" onClick={toggleSearch}>
              <NavLink to="">
                <FaSearch />
              </NavLink>
            </Box>
            <Box className="icon shopping-btn" onClick={toggleShoppingCart}>
              <NavLink to="">
                <RiShoppingCartFill />
              </NavLink>
            </Box>
            <Box className="icon user-btn" onClick={toggleUserCart}>
              <NavLink to="">
                <FaUser />
              </NavLink>
            </Box>
          </Stack>
          <Box>
            <form
              action=""
              className={`search_form ${isSearchActive ? "active" : ""}`}
            >
              <input
                type="search"
                className="search_box"
                placeholder="search here..."
              ></input>

              <label htmlFor="search_box"> </label>
              <FaSearch />
            </form>
          </Box>
          <Stack
            className={`shopping_cart ${isShoppingCartActive ? "active" : ""}`}
          >
            <Box className="cart_box">
              <img src="/product/saws2.jpg" alt="" />
              <Box className="trash_box">
                <FaRegTrashCan />
              </Box>
              <Box className="cart_content">
                <h3>saws</h3>
                <span className="price">$ 220 / -</span>
                <span className="quantity"> qty: 1</span>
              </Box>
            </Box>
            <Box className="cart_box">
              <img src="/product/saws2.jpg" alt="" />
              <Box className="trash_box">
                <FaRegTrashCan />
              </Box>
              <Box className="cart_content">
                <h3>saws</h3>
                <span className="price">$ 220 / -</span>
                <span className="quantity"> qty: 1</span>
              </Box>
            </Box>
            <Box className="total">
              <span> Total : $440 / -</span>
              <Button className="btn">checkout</Button>
            </Box>
          </Stack>
          <Stack className={`login_form ${isUserCartActive ? "active" : ""}`}>
            <form action="login_form">
              <h3>Login Now</h3>
              <input
                type="email"
                placeholder="your e-mail"
                className="box"
                name=""
                id=""
              />
              <input
                type="password"
                placeholder="your password"
                className="box"
                name=""
                id=""
              />
              <p>
                forget your password <a href=""> click here</a>
              </p>
              <p>
                don't have an account <a href=""> create now</a>
              </p>
              <input
                type="submit"
                value={"Login"}
                className="login_btn"
                name=""
                id=""
              />
            </form>
          </Stack>
        </Stack>
      </div>
      <Stack
        className="main_image"
        style={{
          width: "100%",
        }}
      ></Stack>
    </div>
  );
}
