import React, { createContext, useState } from "react";

const CartContext = createContext();

export const CartStore = ({ children }) => {
  const [cartList, setCartList] = useState([]);

  React.useEffect(() => {
    console.log(cartList);
  }, [cartList]);

  const addToList = (product) => {
    setCartList([...cartList, product]);
  };

  const removeFromList = (product) => {
    cartList.forEach((el, i) => {
      if (el.product_code == product.product_code)
        setCartList([...cartList.splice(i, 1)]);
    });
  };
  const isExist = (product) => {
    let result = false;
    cartList.forEach((el) => {
      if (el.product.product_code == product.product_code) result = true;
    });
    return result;
  };

  return (
    <CartContext.Provider
      value={{ cartList, addToList, removeFromList, isExist }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
