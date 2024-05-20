import { Box, Container, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import "../../css/order.css";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PausedOrders from "../../components/order/pausedOrder.tsx";
import ProcessOrders from "../../components/order/processOrder.tsx";
import FinishedOrders from "../../components/order/finishedOrder.tsx";

export function OrderPage() {
  /**INITIALIZATIONS */
  const [value, setValue] = useState("1");

  /**  HANDLERS */
  const handleChange = (event: any, newValue: string) => {
    // alert(newValue);
    setValue(newValue);
  };
  return (
    <div className="order_page">
      <Container
        maxWidth="lg"
        style={{ display: "flex", flexDirection: "row" }}
        sx={{ mt: "50px", mb: "50px" }}
      >
        {/* 1/2 Stack: ORDER LEFT */}
        <Stack className={"order_left"}>
          <TabContext value={value}>
            <Box className={"order_nav_frame"}>
              <Box
                className="tablist"
                sx={{ borderBottom: 1, borderColor: "divider" }}
              >
                <TabList
                  onChange={handleChange}
                  // value={value}
                  aria-label="basic tabs example"
                  style={{
                    width: "70%",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Tab label="My Orders" value={"1"} />
                  <Tab label="Porcess" value={"2"} />
                  <Tab label="Finished" value={"3"} />
                </TabList>
              </Box>
            </Box>
            <Stack className={"order_main_content"}>
              <PausedOrders />
              <ProcessOrders />
              <FinishedOrders />
            </Stack>
          </TabContext>
        </Stack>

        {/* 2/2 Stack: ORDER RIGHT */}
        <Stack className={"order_right"}>
          <Box className={"order_info_box"}>
            <Box
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
            >
              <div className={"order_user_img"}>
                <img src={"/background/cute_girl.jpg"} alt="" />
              </div>
              <span className={"order_user_name"}>Zarina</span>
              <span className={"order_user_prof"}>User</span>
            </Box>
            <Box className={"line"}></Box>
            <Box
              style={{ border: "1px solid #A1A1A1" }}
              width={"100%"}
              height={"2px"}
              sx={{ mt: "40px", mb: "8px" }}
            ></Box>
            <Box className={"order_user_address"}>
              <div style={{ display: "flex" }}>
                <LocationOnIcon />
              </div>
              <div>Address</div>
            </Box>
          </Box>
          <Box className={"payment_box"}>
            <form className={"payment_form"}>
              <input type="text" placeholder="1111 2222 3333 4444" />
              <Box className={"form_divider"}>
                <input type="text" placeholder="01/36" />
                <input type="text" placeholder="CVV: 474" />
              </Box>
              <input type="text" placeholder="Zarina" />
            </form>
            <Box className={"card_types"}>
              <img className={"card"} src="/icons/western_union.svg" alt="" />
              <img className={"card"} src="/icons/master_card.svg" alt="" />
              <img className={"card"} src="/icons/paypal.svg" alt="" />
              <img className={"card"} src="/icons/visa.svg" alt="" />
            </Box>
          </Box>
        </Stack>
      </Container>
    </div>
  );
}
