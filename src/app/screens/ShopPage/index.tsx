import React from "react";
import "../../css/homepage.css";
import "../../css/shop.css";
import { AllShop } from "./allshop.tsx";
import { ChosenProduct } from "./chosenproduct.tsx";
import { ShopHeader } from "./shopheader.tsx";
import { Route, Switch, useRouteMatch } from "react-router-dom";

export function ShopPage() {
  let shop = useRouteMatch();
  return (
    <div>
      <ShopHeader />
      <Switch>
        <Route path={`${shop.path}/shop/:product_id`}>ChosenProduct</Route>
        <Route path={`${shop.path}/:shop_id`}>
          <ChosenProduct />
        </Route>
        <Route path={`${shop.path}`}>
          {" "}
          <AllShop />
        </Route>
      </Switch>
    </div>
  );
}
