import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import Logo from "../components/Logo";
import Toolbar from "../components/Toolbar/Toolbar";
import { ProductStore } from "../context/productContext";
import InsertPage from "./InserPage/InsertPage";
import MainPage from "./MainPage";

function App() {
  const [scrollDirection, setScrollDirection] = useState("up");

  return (
    // <InsertPage />
    <div className="w-screen h-screen bg-lightBody px-20 py-5 dark:bg-darkBody select-none">
      <Logo />
      <Toolbar scrollDirection={scrollDirection} />

      <div className="bg-white w-full h-full rounded-30 overflow-hidden dark:bg-dark">
        <div className="w-full h-full">
          <ProductStore>
            <Switch>
              {/* <Route path="/:category" component={MainPage}/> */}
              <Route path="/">
                <MainPage setScrollDirection={setScrollDirection} />
              </Route>
            </Switch>
          </ProductStore>
        </div>
      </div>
    </div>
  );
}

export default App;
