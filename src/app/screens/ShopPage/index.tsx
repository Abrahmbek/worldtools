import React from "react";
import "../../css/homepage.css";
import "../../css/shop.css";
import { AllShop } from "./allshop"; //this
import { ChosenProduct } from "./chosenproduct"; //this
import { ShopHeader } from "./shopheader"; //this
import { Route, Switch, useRouteMatch } from "react-router-dom";

export function ShopPage(props: any) {
  let shop = useRouteMatch();
  return (
    <div>
      <ShopHeader />
      <Route path={`${shop.path}/shop`}>
        <AllShop onAdd={props.onAdd} />
      </Route>
      <Switch>
        <Route path={`${shop.path}/product/:product_id`}>
          <ChosenProduct onAdd={props.onAdd} />
        </Route>
        <Route path={`${shop.path}/:shop_id`}>
          <AllShop onAdd={props.onAdd} />
        </Route>
      </Switch>
    </div>
  );
}
