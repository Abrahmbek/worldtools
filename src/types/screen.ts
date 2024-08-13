import { BoArticle } from "./boArticle";
import { Follower, Following } from "./follow";
import { Order } from "./order";
import { Product } from "./product";
import { Member, Shop } from "./user";

/**REACT APP STATE */
export interface AppRootState {
  homePage: HomePageState;
  shopPage: ShopPageState;
  ordersPage: OrdersPageState;
  communityPage: CommunityPageState;
  memberPage: MemberPageState;
}
/*HOME PAGE */
export interface HomePageState {
  topSaleShop: Shop[];
  newArrival: Product[];
  bestArticles: BoArticle[];
  trendBoArticles: BoArticle[];
}

/**ShOP PAGE */

export interface ShopPageState {
  targetShop: Shop[];
  randomShop: Shop[];
  chosenShop: Shop | null;
  targetProducts: Product[];
  chosenProduct: Product | null;
}
/**ORDER PAGE */

export interface OrdersPageState {
  pausedOrders: Order[];
  processOrders: Order[];
  finishedOrders: Order[];
}

/*COMMUNITY PAGE */

export interface CommunityPageState {
  targetBoArticles: BoArticle[];
}

/*MEMBER PAGE */

export interface MemberPageState {
  chosenMember: Member | null;
  chosenMemberBoArticles: BoArticle[];
  chosenSingleBoArticle: BoArticle | null;
  memberFollowers: Follower[];
  memeberFollowings: Following[];
}
