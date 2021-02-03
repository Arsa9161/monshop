import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

import ProductContext from "../../context/productContext";
import UserContext from "../../context/UserContext";
import Currency from "../General/Currency";
import Love from "../General/Icons/Love";

const Item = ({ data, shape }) => {
  const userCtx = useContext(UserContext);
  const productCtx = useContext(ProductContext);
  const [isFav, setIsFav] = useState(userCtx.isWish(data));

  const toggleFav = (e) => {
    e.preventDefault();
    isFav ? userCtx.removeFromWishList(data) : userCtx.addToWishList(data);
    setIsFav(!isFav);
  };

  return (
    <Link to={data.price ? "/product/" + data.product_code : data.name}>
      <div
        className={`group flex items-center transition duration-300 ${
          shape == "horizontal"
            ? "space-x-12 h-44 pr-12 rounded-30 hover:bg-gray-100"
            : "overflow-hidden rounded-30 flex-col w-64 h-64 transform hover:scale-105 shadow-md hover:shadow-xl"
        }`}
      >
        <div
          className={`relative overflow-hidden ${
            shape == "horizontal" ? "w-44 h-full rounded-30" : "w-full h-3/4"
          }`}
        >
          {shape == "vertical" && data.price && (
            <div
              className="w-8 h-8 p-2 rounded-full bg-white absolute top-4 right-4 z-30 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center align-middle"
              onClick={toggleFav}
            >
              <Love clicked={isFav} />
            </div>
          )}

          <div
            className="transform hover:scale-110 transition duration-400 w-full h-full bg-cover bg-no-repeat bg-center"
            style={{ backgroundImage: `url(${data.img.large})` }}
          ></div>
          {/* <img src={`${props.img.small} 240w, ${props.img.medium} 480w ${props.img.large} 640w`} alt="" className=" hover:scale-105"/> */}
        </div>
        {!data.price ? (
          <p className="main-text my-4 capitalize text-lg">
            {productCtx.CATEGORY_NAMES[data.name]}
          </p>
        ) : shape == "horizontal" ? (
          <div className="h-full py-5 flex flex-col justify-evenly">
            <p className="main-text text-md">{data.brand}</p>
            <p className="main-text text-xl">{data.name}</p>
            <p className="main-text text-xl">
              {<Currency code="MNT">{data.total_price}</Currency>}
            </p>
          </div>
        ) : (
          <div className="w-full flex justify-around items-center px-5 py-4">
            <div className="w-1/2 overflow-hidden">
              <p className="main-text text-xs opacity-70">{data.brand}</p>
              <p className="main-text text-lg">{data.name}</p>
            </div>
            <div className="flex flex-col items-end overflow-hidden">
              {data.price > data.total_price && (
                <p className="main-text line-through text-sm opacity-70">
                  {<Currency code="MNT">{data.price}</Currency>}
                </p>
              )}
              <p className="main-text text-p-violet text-xl">
                {<Currency code="MNT">{data.total_price}</Currency>}
              </p>
            </div>
          </div>
        )}
      </div>
    </Link>
  );
};

export default Item;
