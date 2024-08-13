import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Switch } from "react-router-dom";

import "./App.css";
import "./app/css/navbar.css";
import "./app/css/footer.css";
// import { themeSettings } from "../theme";
import { createTheme } from "@mui/material/styles";
import { Box, Container, Stack } from "@mui/material";
import { HomePage } from "./app/screens/HomePage/index"; //this
import { CssBaseline, ThemeProvider } from "@mui/material";
import { BlogPage } from "./app/screens/BlogPage/index";
import { OrderPage } from "./app/screens/OrderPage/index";
import { Contact_usPage } from "./app/screens/Contact-usPage/index";
import { ShopPage } from "./app/screens/ShopPage/index";
import { NavbarHome } from "./app/components/header/index";
import { NavbarProduct } from "./app/components/header/product";
import { NavbarOther } from "./app/components/header/others";
import { Footer } from "./app/components/footer/index";
import { MembersPage } from "./app/screens/MembersPage/index"; //this
import AuthanticationModal from "./app/components/auth/index";
import { Member } from "./types/user";
import { serverApi } from "./lib/config";
import { Definer } from "./lib/Definer";
import MemberApiService from "./app/apiServices/memberApiService";
import {
  sweetFailureProvider,
  sweetTopSmallSuccessAlert,
} from "./lib/sweetAlert";
import { CartItem } from "./types/others";
import { Product } from "./types/product";
import SocketChats from "./app/components/soketChat/chattingSoket";
import "./app/css/chatApp.css";
import theme from "./app/MaterialTheme";
function App() {
  /**INITIALIZATIONS */
  const [verifiedMemberData, setverifiedMemberData] = useState<Member | null>(
    null
  );
  const [path, SetPath] = useState();
  const main_path = window.location.pathname;
  const [signUpOpen, setSignUpOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [orderRebuild, setOrderRebuild] = useState<Date>(new Date());

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const cartJson: any = localStorage.getItem("cart_data");
  const current_cart: CartItem[] = JSON.parse(cartJson) ?? [];
  const [cartItems, setCartItems] = useState<CartItem[]>(current_cart);

  useEffect(() => {
    const memberDataJson: any = localStorage.getItem("member_data")
      ? localStorage.getItem("member_data")
      : null;
    const member_data = memberDataJson ? JSON.parse(memberDataJson) : null;
    if (member_data) {
      member_data.mb_image = member_data.mb_image
        ? `${serverApi}/${member_data.mb_image}`
        : "/icons/odamcha.svg";
      setverifiedMemberData(member_data);
    }
  }, [signUpOpen, loginOpen]);

  const [isFormVisible, setIsFormVisible] = useState(false);

  /**HANDLERS */

  const toggleHnadler = () => {
    setIsFormVisible(!isFormVisible);
  };

  /**HANDLERS */
  const handleSignUpOpen = () => setSignUpOpen(true);

  const handleSignUpClose = () => setSignUpOpen(false);

  const handleLoginOpen = () => setLoginOpen(true);

  const handleLoginClose = () => setLoginOpen(false);
  const handleLogOutClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseLogOut = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(null);
  };

  const handleLogoutRequest = async () => {
    try {
      const memberApiService = new MemberApiService();
      await memberApiService.logOutRequest();
      await sweetTopSmallSuccessAlert("success", 700, true);
      localStorage.removeItem("member_data");
    } catch (err: any) {
      console.log(err);
      sweetFailureProvider(Definer.general_err1);
    }
  };

  const onAdd = (product: Product) => {
    const exist: any = cartItems.find(
      (item: CartItem) => item._id === product._id
    );

    if (exist) {
      const cart_updated = cartItems.map((item: CartItem) =>
        item._id === product._id
          ? { ...exist, quantity: exist.quantity + 1 }
          : item
      );

      setCartItems(cart_updated);
      localStorage.setItem("cart_data", JSON.stringify(cart_updated));
    } else {
      const new_item: CartItem = {
        _id: product._id,
        quantity: 1,
        name: product.product_name,
        price: product.product_price,
        image: product.product_images[0],
      };
      const cart_updated = [...cartItems, { ...new_item }];
      setCartItems(cart_updated);
      localStorage.setItem("cart_data", JSON.stringify(cart_updated));
    }
  };
  const onRemove = (item: CartItem) => {
    const item_data: any = cartItems.find(
      (ele: CartItem) => ele._id === item._id
    );

    if (item_data.quantity === 1) {
      const cart_updated = cartItems.filter(
        (ele: CartItem) => ele._id !== item._id
      );

      setCartItems(cart_updated);
      localStorage.setItem("cart_data", JSON.stringify(cart_updated));
    } else {
      const cart_updated = cartItems.map((ele: CartItem) =>
        ele._id === item._id
          ? { ...item_data, quantity: item_data.quantity - 1 }
          : ele
      );
      setCartItems(cart_updated);
      localStorage.setItem("cart_data", JSON.stringify(cart_updated));
    }
  };
  const onDelete = (item: CartItem) => {
    const cart_updated = cartItems.filter(
      (ele: CartItem) => ele._id !== item._id
    );

    setCartItems(cart_updated);
    localStorage.setItem("cart_data", JSON.stringify(cart_updated));
  };
  const onDeleteAll = () => {
    setCartItems([]);
    localStorage.removeItem("cart_data");
  };

  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Router>
          {main_path === "/" ? (
            <NavbarHome
              SetPath={SetPath}
              handleLoginOpen={handleLoginOpen}
              handleSignUpOpen={handleSignUpOpen}
              verifiedMemberData={verifiedMemberData}
              anchorEl={anchorEl}
              open={open}
              handleLogOutClick={handleLogOutClick}
              handleCloseLogOut={handleCloseLogOut}
              handleLogoutRequest={handleLogoutRequest}
              cartItems={cartItems}
              onAdd={onAdd}
              onRemove={onRemove}
              onDelete={onDelete}
              onDeleteAll={onDeleteAll}
              setOrderRebuild={setOrderRebuild}
            />
          ) : main_path.includes("/shop") ? (
            <NavbarProduct
              SetPath={SetPath}
              handleLoginOpen={handleLoginOpen}
              handleSignUpOpen={handleSignUpOpen}
              verifiedMemberData={verifiedMemberData}
              anchorEl={anchorEl}
              open={open}
              handleLogOutClick={handleLogOutClick}
              handleCloseLogOut={handleCloseLogOut}
              handleLogoutRequest={handleLogoutRequest}
              cartItems={cartItems}
              onAdd={onAdd}
              onRemove={onRemove}
              onDelete={onDelete}
              onDeleteAll={onDeleteAll}
              setOrderRebuild={setOrderRebuild}
            />
          ) : (
            <NavbarOther
              SetPath={SetPath}
              handleLoginOpen={handleLoginOpen}
              handleSignUpOpen={handleSignUpOpen}
              verifiedMemberData={verifiedMemberData}
              anchorEl={anchorEl}
              open={open}
              handleLogOutClick={handleLogOutClick}
              handleCloseLogOut={handleCloseLogOut}
              handleLogoutRequest={handleLogoutRequest}
              cartItems={cartItems}
              onAdd={onAdd}
              onRemove={onRemove}
              onDelete={onDelete}
              onDeleteAll={onDeleteAll}
              setOrderRebuild={setOrderRebuild}
            />
          )}
          <div className="chatForm">
            {isFormVisible ? (
              <span className="message_icon">
                <SocketChats />
              </span>
            ) : null}

            <span className="chat_btn">
              {isFormVisible ? (
                <img
                  src="/chat/cancel_btn.png"
                  alt=""
                  onClick={toggleHnadler}
                  style={{ cursor: "pointer" }}
                />
              ) : (
                <img
                  src="/chat/chat.png"
                  alt=""
                  onClick={toggleHnadler}
                  style={{ cursor: "pointer" }}
                />
              )}
            </span>
          </div>
          <Switch>
            <Route path="/shop">
              <ShopPage onAdd={onAdd} />
            </Route>
            <Route path="/member-page">
              <MembersPage />
            </Route>
            <Route path="/blog">
              <BlogPage />
            </Route>
            <Route path="/contact_us">
              <Contact_usPage />
            </Route>
            <Route path="/order">
              <OrderPage
                orderRebuild={orderRebuild}
                setOrderRebuild={setOrderRebuild}
              />
            </Route>
            <Route path="/">
              <HomePage />
            </Route>
          </Switch>

          <Footer />
          <AuthanticationModal
            loginOpen={loginOpen}
            handleLoginOpen={handleLoginOpen}
            handleLoginClose={handleLoginClose}
            signUpOpen={signUpOpen}
            handleSignUpOpen={handleSignUpOpen}
            handleSignUpClose={handleSignUpClose}
          />
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
