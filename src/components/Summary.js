import React, { useContext } from "react";
import CartContext from "../context/cartContext";
import Button from "./General/Button";
import Currency from "./General/Currency";

const Summary = () => {
  const cartCtx = useContext(CartContext);
  return (
    <div className="flex flex-col space-y-5">
      <div className="border border-bg-color rounded-30 overflow-hidden">
        {cartCtx.cartList.map((el, i) => (
          <div
            key={i}
            className="flex justify-between border-b border-bg-color py-4 px-8"
          >
            <p>{el.product.name}</p>
            <p>x{el.userInput.count}</p>
            <p>
              <Currency code="mnt">
                {el.product.total_price * el.userInput.count}
              </Currency>
            </p>
          </div>
        ))}
        <div className="flex justify-between py-4 px-8">
          <p>Төлөх дүн</p>
          <p>
            <Currency code="mnt">{cartCtx.allPrice}</Currency>{" "}
          </p>
        </div>
      </div>
      <Button title="авах" type="pink" />
      <Button title="цуцлах" type="violet" />
    </div>
  );
};

export default Summary;
