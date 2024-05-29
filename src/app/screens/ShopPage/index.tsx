import React from "react";
import "../../css/homepage.css";
import "../../css/shop.css";
import { AllShop } from "./allshop"; //this
import { ChosenProduct } from "./chosenproduct"; //this
import { ShopHeader } from "./shopheader"; //this
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
