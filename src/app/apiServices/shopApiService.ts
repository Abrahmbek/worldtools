import { serverApi } from "../../lib/config";
import { Shop } from "../../types/user";
import { Definer } from "../../lib/Definer";
import axios from "axios";
import assert from "assert";
import { SearchObj } from "../../types/others";

class ShopApiService {
  private readonly path: string;
  constructor() {
    this.path = serverApi;
  }

  async getTopSaleShop(): Promise<Shop[]> {
    try {
      const url = `/stores?order=top&page=1&limit=7`,
        result = await axios.get(this.path + url, { withCredentials: true });

      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state !== "fail", result?.data?.message);
      console.log("state:", result.data.state);
      const top_saleShop: Shop[] = result.data.data;
      return top_saleShop;
    } catch (err: any) {
      console.log(`ERORR::: getTopSaleShop ${err.message}`);
      throw err;
    }
  }

  async getShops(data: SearchObj): Promise<Shop[]> {
    try {
      const url = `/stores?order=${data.order}&page=${data.page}&limit=${data.limit}`,
        result = await axios.get(this.path + url, { withCredentials: true });

      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state !== "fail", result?.data?.message);
      console.log("state:", result.data.state);
      const shops: Shop[] = result.data.data;
      return shops;
    } catch (err: any) {
      console.log(`ERORR::: getShops ${err.message}`);
      throw err;
    }
  }
  async getChosenShop(id: string): Promise<Shop[]> {
    try {
      const url = `/stores/${id}`,
        result = await axios.get(this.path + url, { withCredentials: true });
      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state !== "fail", result?.data?.message);
      console.log("state:", result.data.state);
      const shop: Shop[] = result.data.data;
      return shop;
    } catch (err: any) {
      console.log(`ERORR::: getChosenShop ${err.message}`);
      throw err;
    }
  }
}

export default ShopApiService;
