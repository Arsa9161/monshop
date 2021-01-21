import React, { useState, useEffect } from "react";
import firebase from "../firebase";

const UserContext = React.createContext();

export const UserStore = ({ children }) => {
  const [user, setUser] = useState({});
  const [wishList, setWishList] = useState([]);
  const [purchaseHistory, setPurchaseHistory] = useState([]);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
      } else {
        console.log("user is null");
      }
    });
  }, []);

  const signInAnonymously = () => {
    firebase
      .auth()
      .signInAnonymously()
      .then(() => {
        console.log("Sign in Anonymously SUCCESS");
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("error sign/anonym " + errorMessage);
      });
  };

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
        signInAnonymously,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
