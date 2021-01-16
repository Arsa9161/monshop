import React from "react";
import { useHistory } from "react-router-dom";
import CartContext from "../context/cartContext";
import Button from "./General/Button";
import Item from "./Item/Item";

const WishItem = ({ product, removeFromWishList }) => {
  const history = useHistory();
  const cartCtx = React.useContext(CartContext);
  const isExist = cartCtx.isExist(product);

  const buy = () => {
    if (!isExist) {
      let size = {};
      let keys = Object.keys(product.size_quantity);
      size[keys[0]] = 1;
      const obj = {
        product,
        userInput: {
          size,
          count: 1,
        },
      };
      cartCtx.addToList(obj);
    }
  };

  return (
    <div className="h-60 flex items-center text-p py-10 border-b border-bg-color">
      <Item data={product} shape="horizontal" />

      <div className="flex flex-col w-36 space-y-5">
        <Button
          title={isExist ? "сагсанд байгаа" : "сагсанд хийх"}
          type="pink"
          onClick={buy}
          disabled={isExist}
        />
        <Button
          title="устгах"
          type="violet"
          onClick={(e) => removeFromWishList(product)}
        />
      </div>
    </div>
  );
};

export default WishItem;
