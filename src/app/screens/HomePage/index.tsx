import { Container } from "@mui/material";
import React, { useEffect } from "react";

//import { BestStore } from "./beststore"; // from
import { TopSale } from "./topsale";
import { Advertisement } from "./advertisement";
import { Blog } from "./blog";
import { NewArrival } from "./newarrival";
import "../../css/homepage.css";
import "../../css/navbar.css";
import { Home } from "./home";
import { Features } from "./features"; //to

export function HomePage() {
  useEffect(() => {});
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
