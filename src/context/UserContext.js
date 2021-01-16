import React, { useState, useEffect } from "react";

const UserContext = React.createContext();

export const UserStore = ({ children }) => {
  const [wishList, setWishList] = useState([]);
  const [purchaseHistory, setPurchaseHistory] = useState([]);

  const addToPurchaseHistory = (data) => {
    setPurchaseHistory([purchaseHistory, data]);
  };

  const isWish = (product) => {
    let result = false;
    wishList.forEach((el) =>
      el.product_code == product.product_code ? (result = true) : ""
    );
    return result;
  };

  const addToWishList = (product) => {
    setWishList([...wishList, product]);
  };

  const removeFromWishList = (product) => {
    let product_code = product.product_code;

    wishList.forEach((el, i) => {
      if (el.product_code == product_code) {
        let newList = [...wishList];
        newList.splice(i, 1);

        setWishList(newList);
      }
    });
  };

  return (
    <UserContext.Provider
      value={{
        wishList,
        purchaseHistory,
        addToWishList,
        removeFromWishList,
        addToPurchaseHistory,
        isWish,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
