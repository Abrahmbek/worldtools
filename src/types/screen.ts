import { BoArticle } from "./boArticle";
import { Product } from "./product";
import { Shop } from "./user";

export interface AppRootState {
  homePage: HomePageState;
}

export interface HomePageState {
  topSaleShop: Shop[];
  newArrival: Product[];
  bestBoArticles: BoArticle[];
  trendBoArticles: BoArticle[];
}
