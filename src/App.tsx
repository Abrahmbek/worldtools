import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Switch } from "react-router-dom";

import "./App.css";
import "./app/css/navbar.css";
import "./app/css/footer.css";

import { Box, Container, Stack } from "@mui/material";
import { HomePage } from "./app/screens/HomePage/index"; //this

import { BlogPage } from "./app/screens/BlogPage/index";
import { OrderPage } from "./app/screens/OrderPage/index";
import { Contact_usPage } from "./app/screens/Contact-usPage/index";
import { ShopPage } from "./app/screens/ShopPage/index";
import { NavbarHome } from "./app/components/header/index";
import { NavbarProduct } from "./app/components/header/product";
import { NavbarOther } from "./app/components/header/others";
import { Footer } from "./app/components/footer/index";
import { MembersPage } from "./app/screens/MembersPage/index"; //this

function App() {
  const [path, SetPath] = useState();
  const main_path = window.location.pathname;
  return (
    <Router>
      {main_path === "/" ? (
        <NavbarHome SetPath={SetPath} />
      ) : main_path.includes("/shop") ? (
        <NavbarProduct SetPath={SetPath} />
      ) : (
        <NavbarOther SetPath={SetPath} />
      )}

      <Switch>
        <Route path="/shop">
          <ShopPage />
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
          <OrderPage />
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>

      <Footer />
    </Router>
  );
}

export default App;
