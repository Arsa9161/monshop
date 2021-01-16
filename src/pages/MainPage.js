import React, { useContext, useEffect, useRef } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import Aside from "../components/Aside/Aside";
import Container from "../components/Container";
import ProductContext from "../context/productContext";
import Spinner from "../components/General/Spinner";

const MainPage = (props) => {
  const productCtx = useContext(ProductContext);
  const mainRef = useRef(null);

  const path = useLocation().pathname;
  let arr;
  if (path.length > 1) {
    arr = path.substr(1, path.length).split("/");
  }

  useEffect(() => {
    if (arr && arr.length == 1) {
      const category = arr[0];

      productCtx.loadCategory(category);
    }
  }, [path]);

  useEffect(() => {
    mainRef.current.addEventListener("scroll", (e) =>
      handleScroll(e.target.scrollTop)
    );
  }, []);

  let lastTop = 0;
  const handleScroll = (top) => {
    if (top > lastTop) props.setScrollDirection("down");
    else props.setScrollDirection("up");

    lastTop = top;
  };

  return (
    <div className="w-full h-full grid grid-flow-col grid-cols-11">
      <div className="col-span-2 h-full mt-28">
        <Aside />
      </div>
      <div
        className="col-span-9 h-full overflow-y-auto overflow-x-hidden px-20 py-28"
        ref={mainRef}
      >
        <div className="w-full">
          <Switch>
            <Route path="/:category">
              {productCtx.loading ? (
                <Spinner />
              ) : productCtx.specialProducts[0] != "null" &&
                productCtx.newProducts[0] != "null" ? (
                <>
                  <Container
                    title={"Онцлох"}
                    shape={"horizontal"}
                    data={productCtx.specialProducts}
                  />
                  <Container
                    title={"Шинэ"}
                    shape={"horizontal"}
                    data={productCtx.newProducts}
                  />
                </>
              ) : (
                productCtx.specialProducts[0] == "null" &&
                productCtx.newProducts[0] == "null" && (
                  <p>
                    Уучлаарай, таны сонгосон төрөл одоогоор хоосон байна.
                    Удахгүй дүүрэн бараатай болно гэж найдаж байна.
                  </p>
                )
              )}
            </Route>
            <Route exact path="/">
              {productCtx.loading ? (
                <Spinner />
              ) : (
                <Container title={"Төрлүүд"} data={productCtx.categories} />
              )}
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
