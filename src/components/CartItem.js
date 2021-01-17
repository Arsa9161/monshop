import React, { useContext, useState } from "react";
import Item from "../components/Item/Item";
import CartContext from "../context/cartContext";
import UserContext from "../context/UserContext";
import Button from "./General/Button";
import Currency from "./General/Currency";
import Love from "./General/Icons/Love";
import RecycleBin from "./General/Icons/RecycleBin";

const CartItem = ({ data }) => {
  const userCtx = useContext(UserContext);
  const cartCtx = useContext(CartContext);
  const [isFav, setIsFav] = useState(userCtx.isWish(data.product));

  let unCheckedSizes = [];
  let checkedSizes = Object.keys(data.userInput.size);

  Object.keys(data.product.size_quantity).forEach((el) => {
    if (!checkedSizes.includes(el)) unCheckedSizes.push(el);
  });

  let allCount = data.userInput.count;
  const allPrice = allCount * data.product.total_price;

  const toggleFav = () => {
    isFav
      ? userCtx.removeFromWishList(data.product)
      : userCtx.addToWishList(data.product);
    setIsFav(!isFav);
  };

  const add = (size) => {
    cartCtx.addSizeCount(data.product.product_code, size);
  };

  const subtract = (size) => {
    cartCtx.subtractSizeCount(data.product.product_code, size);
  };

  return (
    <div className="group flex items-center text-p py-10 border-b border-bg-color">
      <Item data={data.product} shape="horizontal" />
      <div className="flex flex-col space-y-4 mr-10 px-10 border-l border-r border-bg-body">
        {checkedSizes.length == 1 &&
        data.userInput.size[checkedSizes[0]] == 1 ? (
          <SizeCounter
            size={checkedSizes[0]}
            count={data.userInput.size[checkedSizes[0]]}
            add={add}
            subtract={() => alert("nonono")}
          />
        ) : (
          checkedSizes.map((size, i) => (
            <SizeCounter
              size={size}
              count={data.userInput.size[size]}
              add={add}
              subtract={subtract}
            />
          ))
        )}
        {unCheckedSizes.length > 0 && (
          <>
            <p>Размер нэмэх</p>
            <div className="flex space-x-3">
              {unCheckedSizes.map((size, i) => (
                <Button
                  key={i}
                  type="checkbox"
                  title={size}
                  onClick={() => add(size)}
                />
              ))}
            </div>
          </>
        )}
      </div>
      <div className="w-full h-full flex flex-col space-y-5 justify-center relative">
        <div className="flex space-x-3">
          <p>Дүн</p>
          <Currency code="mnt">{allPrice}</Currency>
        </div>
        <div className="flex space-x-3">
          <p>Тоо</p>
          <p>{allCount}</p>
        </div>
        <div className="flex space-x-5 absolute bottom-3 left-0 transition duration-300 opacity-0 group-hover:opacity-100">
          <div
            className="w-5 h-5"
            onClick={() => cartCtx.removeFromList(data.product)}
          >
            <RecycleBin />
          </div>
          <div className="w-5 h-5" onClick={toggleFav}>
            <Love clicked={isFav} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;

const SizeCounter = ({ size, count, add, subtract }) => (
  <div className="flex items-center space-x-5 ">
    <Button type="checkbox" title={size} />
    <p>x{count}</p>
    <Button type="checkbox" title="-" onClick={() => subtract(size)} />
    <Button type="checkbox" title="+" onClick={() => add(size)} />
  </div>
);
