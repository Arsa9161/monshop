import React, { useState, useContext, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import Logo from "../components/Logo";
import Toolbar from "../components/Toolbar/Toolbar";
import { CartStore } from "../context/cartContext";
import { ProductStore } from "../context/productContext";
import UserContext from "../context/UserContext";
import CartPage from "./CartPage";
import InsertPage from "./InserPage/InsertPage";
import MainPage from "./MainPage";
import ProductPage from "./ProductPage";
import UserPage from "./UserPage";

function App() {
  const [scrollDirection, setScrollDirection] = useState("up");
  const userCtx = useContext(UserContext);

  useEffect(() => {
    userCtx.signInAnonymously();
  }, []);

  return (
    // <InsertPage />
    <div className="w-screen h-screen bg-lightBody px-20 py-5 dark:bg-darkBody select-none">
      <Logo />
      <Toolbar scrollDirection={scrollDirection} />

      <div className="bg-white w-full h-full rounded-30 overflow-hidden dark:bg-dark">
        <ProductStore>
          <CartStore>
            <Switch>
              <Route path="/insert" component={InsertPage} />
              <Route path="/product/:product_code" component={ProductPage} />
              <Route path="/cart">
                <CartPage setScrollDirection={setScrollDirection} />
              </Route>
              <Route
                path="/user/:tab"
                render={({ match }) => (
                  <UserPage
                    match={match}
                    setScrollDirection={setScrollDirection}
                  />
                )}
              />
              <Route path="/">
                <MainPage setScrollDirection={setScrollDirection} />
              </Route>
            </Switch>
          </CartStore>
        </ProductStore>
      </div>
    </div>
  );
}

export default App;
