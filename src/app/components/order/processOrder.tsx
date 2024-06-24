import React from "react";
import { Box, Container, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import TabPanel from "@mui/lab/TabPanel";
import moment from "moment";

// REDUX
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveProcessOrders } from "../../screens/OrderPage/selector";
import { Order } from "../../../types/order";
import { Product } from "../../../types/product";
import { serverApi } from "../../../lib/config";
import {
  sweetErrorHandling,
  sweetFailureProvider,
} from "../../../lib/sweetAlert";
import OrderApiService from "../../apiServices/orderApiService";
import { verifiedMemberData } from "../../apiServices/verify";

/** REDUX SELECTOR */
const processOrdersRetriever = createSelector(
  retrieveProcessOrders,
  (processOrders) => ({
    processOrders,
  })
);

export default function ProcessOrders(props: any) {
  /**INITIALIZATIONS */
  const { processOrders } = useSelector(processOrdersRetriever);

  /**HANDLER */
  const finishOrderHandler = async (event: any) => {
    try {
      const order_id = event.target.value;
      const data = { order_id: order_id, order_status: "DELETED" };

      if (!verifiedMemberData) {
        sweetFailureProvider("Please Login first", true);
      }
      let confirmation = window.confirm("Confirm the order?");
      if (confirmation) {
        const orderService = new OrderApiService();
        await orderService.updateOrderStatus(data);
        props.setOrderRebuild(new Date());
      }
    } catch (err) {
      console.log("deleteorderhandler, ERROR", err);
      sweetErrorHandling(err).then();
    }
  };
  return (
    <div>
      <TabPanel value={"2"}>
        <Stack>
          {processOrders?.map((order: Order) => {
            return (
              <Box className={"order_main_box"}>
                <Box className={"order_box_scroll"}>
                  {order.order_items?.map((item) => {
                    const product: Product = order.product_data.filter(
                      (ele) => ele._id === item.product_id
                    )[0];
                    const image_path = `${serverApi}/${product.product_images[0]}`;
                    return (
                      <Box className={"ordersName_price"}>
                        <img
                          src={image_path}
                          className={"order_product_Img"}
                          alt=""
                        />
                        <p className={"title_product"}></p>
                        <Box className={"priceBox"}>
                          <p>$ {product.product_name} </p>
                          <img
                            style={{ margin: "0 10px" }}
                            src={"/icons/close.svg"}
                            alt=""
                          />
                          <p> {item.item_quantity} </p>
                          <img
                            style={{ margin: "0 10px" }}
                            src={"/icons/pause.svg"}
                            alt=""
                          />
                          <p style={{ marginLeft: "15px" }}>
                            {" "}
                            $ {item.item_price * item.item_quantity}
                          </p>
                        </Box>
                      </Box>
                    );
                  })}
                </Box>

                <Box className={"total_price_box paused"}>
                  <div>
                    <span>Product price </span>
                    <span>
                      $ {order.order_total_amount - order.order_delivery_cost}{" "}
                    </span>
                    <img
                      style={{ marginLeft: "35px" }}
                      src={"/icons/plus.svg"}
                      alt=""
                    />
                  </div>
                  <div>
                    <span>Delivery cost </span>
                    <span>$ {order.order_delivery_cost}</span>
                  </div>
                  <div>
                    <span>Total price </span>
                    <span>$ {order.order_total_amount}</span>
                  </div>
                  <span>
                    {moment(order.createdAt).format("YY-DD-MM HH:MM")}
                  </span>
                  <div>
                    <Button
                      className="order_cancel"
                      value={order._id}
                      onClick={finishOrderHandler}
                    >
                      Finished
                    </Button>

                    <Button className="order_pay">Order</Button>
                  </div>
                </Box>
              </Box>
            );
          })}
        </Stack>
      </TabPanel>
    </div>
  );
}
