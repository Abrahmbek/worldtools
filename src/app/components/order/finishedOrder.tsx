import React from "react";
import { Box, Container, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import TabPanel from "@mui/lab/TabPanel";

export default function FinishedOrders() {
  /**INITIALIZATIONS */
  const pausedOrders = [
    [1, 2, 3],
    [1, 2, 3],
  ];
  return (
    <TabPanel value={"3"}>
      <Stack>
        {pausedOrders?.map((order) => {
          return (
            <Box className={"order_main_box"}>
              <Box className={"order_box_scroll"}>
                {order.map((item) => {
                  const image_path = "/product/set1.webp";
                  return (
                    <Box className={"ordersName_price"}>
                      <img
                        src={image_path}
                        className={"order_product_Img"}
                        alt=""
                      />
                      <p className={"title_product"}></p>
                      <Box className={"priceBox"}>
                        <p>$ 220 </p>
                        <img
                          style={{ margin: "0 10px" }}
                          src={"/icons/close.svg"}
                          alt=""
                        />
                        <p> 2 </p>
                        <img
                          style={{ margin: "0 10px" }}
                          src={"/icons/pause.svg"}
                          alt=""
                        />
                        <p style={{ marginLeft: "15px" }}> $ 221</p>
                      </Box>
                    </Box>
                  );
                })}
              </Box>

              <Box className={"total_price_box paused"}>
                <div>
                  <span>Product price </span>
                  <span>$ 220</span>
                  <img
                    style={{ marginLeft: "35px" }}
                    src={"/icons/plus.svg"}
                    alt=""
                  />
                </div>
                <div>
                  <span>Delivery cost </span>
                  <span>$ 10</span>
                </div>
                <div>
                  <span>Total price </span>
                  <span>$ 250</span>
                </div>

                <div>
                  <Button className="order_cancel">Cancel</Button>

                  <Button className="order_pay">Order</Button>
                </div>
              </Box>
            </Box>
          );
        })}
      </Stack>
    </TabPanel>
  );
}
