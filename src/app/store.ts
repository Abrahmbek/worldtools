import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import HomePageReducer from "./screens/HomePage/slice"; //this

//import logger from "redux-logger";
import reduxLogger from "redux-logger";
import ShopPageReducer from "./screens/ShopPage/slice";
import OrderPageReducer from "./screens/OrderPage/slice";
import CommunityPageReducer from "./screens/BlogPage/slice";
import MemberPageReducer from "./screens/MembersPage/slice";

export const store = configureStore({
  // @ts-ignore
  middleware: (getDefaultMiddleware) =>
    // @ts-ignores
    getDefaultMiddleware().concat(reduxLogger),
  reducer: {
    homePage: HomePageReducer,
    shopPage: ShopPageReducer,
    ordersPage: OrderPageReducer,
    communityPage: CommunityPageReducer,
    memberPage: MemberPageReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
