import assert from "assert";
import { serverApi } from "../../lib/config";
import { Definer } from "../../lib/Definer";
import { CartItem } from "../../types/others";
import axios from "axios";
import { Order } from "../../types/order";

class OrderApiService {
  private readonly path: string;

  constructor() {
    this.path = serverApi;
  }
  public async createOrder(data: CartItem[]): Promise<Order> {
    try {
      const url = "/orders/create",
        result = await axios.post(this.path + url, data, {
          withCredentials: true,
        });

      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state !== "fail", result?.data?.message);
      console.log("state:", result.data.state);

      const order: Order = result.data.data;
      console.log("order::", order);
      return order;
    } catch (err: any) {
      console.log(` CreateOrder, ERORR:::  ${err.message}`);
      throw err;
    }
  }

  async getMyOrders(order_status: string) {
    try {
      const url = `/orders?status=${order_status}`,
        result = await axios.get(this.path + url, { withCredentials: true });

      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state !== "fail", result?.data?.message);
      console.log("state:", result.data.state);

      const orders: any = result.data.data;
      console.log("order::", orders);
      return orders;
    } catch (err: any) {
      console.log(` getMyOrders, ERORR:::  ${err.message}`);
      throw err;
    }
  }

  async updateOrderStatus(data: any) {
    try {
      const url = "/orders/edit",
        result = await axios.post(this.path + url, data, {
          withCredentials: true,
        });

      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state !== "fail", result?.data?.message);
      console.log("state:", result.data.state);

      const order: any = result.data.data;
      return order;
    } catch (err: any) {
      console.log(` updateOrderStatus, ERORR:::  ${err.message}`);
      throw err;
    }
  }
}

export default OrderApiService;
