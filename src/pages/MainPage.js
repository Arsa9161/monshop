import React, { useContext, useEffect, useRef } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import Aside from "../components/Aside/Aside";
import Container from "../components/Container";
import ProductContext from "../context/productContext";
import Spinner from "../components/General/Spinner";
import Loader from "../components/General/Loader";

const MainPage = (props) => {
  const productCtx = useContext(ProductContext);
  const mainRef = useRef(null);

  const path = useLocation().pathname;
  let arr;
  if (path.length > 1) {
    arr = path.substr(1, path.length).split("/");
  }

  useEffect(() => {
    if (arr) {
      if (arr.length == 1) {
        const main_category = arr[0];

        productCtx.loadCategory(main_category);
      } else if (arr.length == 2) {
        productCtx.loadSubCategory(arr[0], arr[1]);
      } else if (arr.length == 3) {
        productCtx.loadSubCategory(arr[0], arr[1], arr[2]);
      }
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
            <Route path="/:main_category/:category/:sub_category">
              {productCtx.loading ? (
                <Loader />
              ) : productCtx.products.length > 0 ? (
                <Container
                  title={productCtx.products[0].type}
                  data={productCtx.products[0].products}
                />
              ) : (
                <p>Хоосон</p>
              )}
            </Route>
            <Route path="/:main_category/:category/">
              {productCtx.loading ? (
                <Loader />
              ) : productCtx.products.length > 0 &&
                productCtx.products.length == 1 ? (
                <Container
                  title={productCtx.products[0].type}
                  data={productCtx.products[0].products}
                />
              ) : (
                productCtx.products.map((product, i) => (
                  <Container
                    key={i}
                    title={product.type}
                    data={product.products}
                    shape="horizontal"
                  />
                ))
              )}
            </Route>
            <Route path="/:main_category">
              {productCtx.loading ? (
                <Loader />
              ) : productCtx.specialProducts[0] != "null" &&
                productCtx.newProducts[0] != "null" ? (
                <>
                  <Container
                    title="special"
                    shape={"horizontal"}
                    data={productCtx.specialProducts}
                  />
                  <Container
                    title="new"
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
                <Loader />
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
