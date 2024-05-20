import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Switch } from "react-router-dom";

import "./App.css";
import "./app/css/navbar.css";
import "./app/css/footer.css";

import { Box, Container, Stack } from "@mui/material";
import { HomePage } from "./app/screens/HomePage/index.tsx";
import { ProductPage } from "./app/screens/ProductPage/index.tsx";
import { BlogPage } from "./app/screens/BlogPage/index.tsx";
import { OrderPage } from "./app/screens/OrderPage/index.tsx";
import { Contact_usPage } from "./app/screens/Contact-usPage/index.tsx";
import { ShopPage } from "./app/screens/ShopPage/index.tsx";
import { NavbarHome } from "./app/components/header/index.tsx";
import { NavbarProduct } from "./app/components/header/product.tsx";
import { NavbarOther } from "./app/components/header/others.tsx";
import { Footer } from "./app/components/footer/index.tsx";

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
        <Route path="/product">
          <ProductPage />
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
