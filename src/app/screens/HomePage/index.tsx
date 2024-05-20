import { Container } from "@mui/material";
import React from "react";

import { BestStore } from "./beststore.tsx";
import { TopSale } from "./topsale.tsx";
import { Advertisement } from "./advertisement.tsx";
import { Blog } from "./blog.tsx";
import { NewArrival } from "./newarrival.tsx";
import "../../css/homepage.css";
import "../../css/navbar.css";
import { Home } from "./home.tsx";
import { Features } from "./features.tsx";

export function HomePage() {
  return (
    <div>
      <Home />
      <Features />
      <TopSale />
      <NewArrival />
      <Advertisement />
      {/* <BestStore /> */}
      <Blog />
    </div>
  );
}
