import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import Back from "../components/General/Back";
import Button from "../components/General/Button";
import CheckBox from "../components/General/CheckBox";

import Spinner from "../components/General/Spinner";
import SwitchButton from "../components/General/SwitchBtn";
import Price from "../components/Price";
import Info from "../components/Info";
import Arrow from "../components/General/Icons/Arrow";
import CartContext from "../context/cartContext";
import ProductContext from "../context/productContext";

const ProductPage = ({ match, location, history }) => {
  const productCtx = useContext(ProductContext);
  const cartCtx = useContext(CartContext);
  const [currImageIndex, setCurrImageIndex] = useState(0);
  let [checkedSizes, setCheckedSizes] = useState([]);

  useEffect(() => {
    setCurrImageIndex(0);
    productCtx.loadProductDetail(match.params.product_code, "clothes");
  }, [location.pathname]);

  const mainProduct = productCtx.productDetail.mainProduct;
  const sameProducts = productCtx.productDetail.sameProducts;
  let mainImage = mainProduct.img && mainProduct.img.large[currImageIndex];
  let length = mainProduct.img && mainProduct.img.large.length;
  const isExist = cartCtx.isExist(mainProduct);

  const addToChecked = (size) => {
    let index = checkedSizes.indexOf(size);

    if (index == -1) {
      setCheckedSizes([...checkedSizes, size]);
    }
  };

  const removeFromChecked = (size) => {
    let index = checkedSizes.indexOf(size);

    if (index != -1) {
      let arr = [...checkedSizes];
      arr.splice(index, 1);
      setCheckedSizes(arr);
    }
  };

  const changeImage = (index) => {
    mainImage = mainProduct.img.large[index];
    setCurrImageIndex(index);
  };

  const shiftImage = (direction) => {
    let index = currImageIndex;

    switch (direction) {
      case "right":
        index + 1 == length ? (index = 0) : index++;
        break;
      case "left":
        index == 0 ? (index = length - 1) : index--;
        break;
    }
    changeImage(index);
  };

  const buyProduct = (e) => {
    if (!isExist) addToList();

    checkedSizes.length != 0 && history.push("/cart");
  };

  const addToList = () => {
    if (checkedSizes.length == 0) {
      alert("zaaval negiig songo");
    } else {
      let size = {};
      checkedSizes.forEach((sizeName) => (size[sizeName] = 1));
      const obj = {
        product: mainProduct,
        userInput: {
          size,
          count: Object.keys(size).length,
        },
      };
      cartCtx.addToList(obj);
    }
  };

  const removeFromList = () => {
    cartCtx.removeFromList(mainProduct);
  };

  return (
    <div className="pt-28 px-10 h-full flex main-text">
      {productCtx.loading ? (
        <Spinner />
      ) : (
        mainProduct.product_code && (
          <>
            <div className="w-1/2 h-full flex flex-col items-center">
              <div className="w-120 h-120 rounded-30 overflow-hidden">
                <img src={mainImage} alt="" className="w-full h-full" />
              </div>

              <div className="w-full flex justify-evenly items-center mt-5 ">
                <SwitchButton type="theme" />
                {length > 1 && (
                  <div className="flex space-x-5 items-center">
                    <div
                      className="h-4 w-4 transform rotate-180"
                      onClick={(e) => shiftImage("left")}
                    >
                      <Arrow />
                    </div>
                    {mainProduct.img.large.map((el, i) => (
                      <span
                        key={i}
                        className={`w-2 h-2 rounded-full cursor-pointer ${
                          currImageIndex == i ? "bg-p-violet" : "bg-p-gray"
                        } hover:bg-p-violet`}
                        onClick={(e) => changeImage(i)}
                      ></span>
                    ))}
                    <div
                      className="h-4 w-4"
                      onClick={(e) => shiftImage("right")}
                    >
                      <Arrow />
                    </div>
                  </div>
                )}
                <Back />
              </div>
            </div>
            <div
              className={`w-1/2 h-120 flex flex-col justify-between ${
                sameProducts.length > 0 ? "justify-between" : "justify-evenly"
              }`}
            >
              <Info
                title="Нэр / Төрөл :"
                desc={
                  mainProduct.name +
                  " / " +
                  productCtx.CATEGORY_NAMES[mainProduct.type]
                }
              />
              <Info title="Барааны код :" desc={mainProduct.product_code} />
              <Info title="Бренд :" desc={mainProduct.brand} />
              <div className="flex flex-col">
                <h5 className="w-1/6 mb-3 opacity-80">Хэмжээ :</h5>
                <div className="group flex space-x-5 relative w-1/2">
                  {mainProduct.size.map((el, i) => (
                    <CheckBox
                      key={i}
                      title={el}
                      doOnChecked={() => addToChecked(el)}
                      doUnChecked={() => removeFromChecked(el)}
                      checked={i == 0}
                    />
                  ))}
                  {isExist && (
                    <>
                      <div className="absolute -left-5 top-0 w-full h-full bg-white opacity-20 z-40"></div>
                      <div className="absolute right-0 top-1/2 p-2 pl-4 text-left rounded-lg transform translate-x-full -translate-y-1/2 text-sm bg-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Энэ бараа сагсанд байна. Та сагс руу орж хэмжээгээ
                        солино уу.
                      </div>
                    </>
                  )}
                </div>
              </div>
              {sameProducts.length != 0 && (
                <div className="flex flex-col">
                  <h5 className="opacity-80">Ижил бараанууд :</h5>
                  <div className="flex space-x-5 mt-3">
                    {sameProducts.map((el, i) => (
                      <Link
                        to={"/product/" + el.product_code}
                        className="w-20 h-20 rounded-xl overflow-hidden"
                        key={i}
                      >
                        <img src={el.img.small[0]} alt="" className="w-full" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
              <Price
                price={mainProduct.price}
                total_price={mainProduct.total_price}
              />
              <div className="w-4/5 flex justify-between">
                <div className="w-2/5">
                  <Button title="Авах" type="pink" onClick={buyProduct} />
                </div>
                <div className="w-2/5">
                  <Button
                    title={!isExist ? "Сагсанд нэм" : "Сагснаас хас"}
                    type="violet"
                    onClick={!isExist ? addToList : removeFromList}
                  />
                </div>
              </div>
            </div>
          </>
        )
      )}
    </div>
  );
};

export default ProductPage;
