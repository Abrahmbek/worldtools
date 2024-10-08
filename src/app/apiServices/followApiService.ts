import axios from "axios";
import { serverApi } from "../../lib/config";

import assert from "assert";
import { Definer } from "../../lib/Definer";
import { FollowSearchObj, Follower, Following } from "../../types/follow";

class FollowApiService {
  private readonly path: string;

  constructor() {
    this.path = serverApi;
  }

  public async getMemberFollowers(data: FollowSearchObj): Promise<Follower[]> {
    try {
      let url = `/follow/followers?page=${data.page}&limit=${data.limit}&mb_id=${data.mb_id}`;

      const result = await axios.get(this.path + url, {
        withCredentials: true,
      });

      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state !== "fail", result?.data?.message);
      console.log("state:", result.data.state);

      const followers: Follower[] = result.data.data;
      return followers;
    } catch (err: any) {
      console.log(`  getMemberFollowers, ERORR:::  ${err.message}`);
      throw err;
    }
  }

  public async getMemberFollowings(
    data: FollowSearchObj
  ): Promise<Following[]> {
    try {
      let url = `/follow/followings?page=${data.page}&limit=${data.limit}&mb_id=${data.mb_id}`;

      const result = await axios.get(this.path + url, {
        withCredentials: true,
      });

      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state !== "fail", result?.data?.message);
      console.log("state:", result.data.state);

      const followings: Following[] = result.data.data;
      return followings;
    } catch (err: any) {
      console.log(` getMemberFollowings, ERORR:::  ${err.message}`);
      throw err;
    }
  }

  public async subscribe(mb_id: string): Promise<boolean> {
    try {
      const result = await axios.post(
        this.path + "/follow/subscribe",
        { mb_id: mb_id },
        { withCredentials: true }
      );
      console.log("subscribe:::", result);
      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state !== "fail", result?.data?.message);
      console.log("state:", result.data.state);

      return result.data.data === "subscribed";
    } catch (err: any) {
      console.log(` subscribe , ERORR:::  ${err.message}`);
      throw err;
    }
  }
  public async unsubscribe(mb_id: string): Promise<boolean> {
    try {
      const result = await axios.post(
        this.path + "/follow/unsubscribe",
        { mb_id: mb_id },
        { withCredentials: true }
      );
      console.log("unsubscribe:::", result);
      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state !== "fail", result?.data?.message);
      console.log("state:", result.data.state);

      return result.data.data === "unsubscribed";
    } catch (err: any) {
      console.log(`unsubscribe, ERORR:::  ${err.message}`);
      throw err;
    }
  }
}

export default FollowApiService;
