import React, { useState, useEffect, useContext } from "react";
import firebase from "../firebase";

const UserContext = React.createContext();

export const useUserCtx = () => {
  return useContext(UserContext);
};

export const UserStore = ({ children }) => {
  const [user, setUser] = useState({});
  const [show, setShow] = useState(false);
  const [wishList, setWishList] = useState([]);
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [notification, setNotification] = useState([]);

  useEffect(() => {
    if (user) {
      console.log("EFF", user.uid);
    }
    console.log("notif");
    console.log(notification);
  });

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

  const addNotification = (data) => {
    setNotification([...notification, data]);
  };
  // TODO: notification-g ustgah
  // const removeNotification = () => {
  //   setNotification([...notification, text]);
  // };

  return (
    <UserContext.Provider
      value={{
        user,
        show,
        wishList,
        purchaseHistory,
        notification,
        addNotification,
        setUser,
        setShow,
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
