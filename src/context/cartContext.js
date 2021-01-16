import React, { createContext, useState } from "react";

const CartContext = createContext();
const obj = {
  product: {
    brand: "93//KIDULT",
    categories: ["clothes", "man", "pants"],
    gender: "man",
    img: {
      large: [
        "https://firebasestorage.googleapis.com/v0/b/monshop-e2760.appspot.com/o/images%2Fc-100%2Flarge%2Fc-100_large?alt=media&token=0a1ac1e4-62e4-45e7-9a81-cb60a64c496e",
      ],
      medium: [
        "https://firebasestorage.googleapis.com/v0/b/monshop-e2760.appspot.com/o/images%2Fc-100%2Fmedium%2Fc-100_medium?alt=media&token=ea92c547-2903-4e03-b0a5-be421a927637",
      ],
      small: [
        "https://firebasestorage.googleapis.com/v0/b/monshop-e2760.appspot.com/o/images%2Fc-100%2Fsmall%2Fc-100_small?alt=media&token=6931c671-8906-480f-a0e2-fc434f184e04",
      ],
    },
    isSpecial: false,
    name: "Өмд",
    price: "29999",
    product_code: "c-100",
    size: ["s", "m", "l", "xl"],
    size_quantity: {
      l: 4,
      m: 2,
      xl: "1",
    },
    total_price: "29999",
    type: "pants",
  },
  userInput: {
    size: {
      l: 4,
    },
    count: 4,
  },
};

export const CartStore = ({ children }) => {
  const [cartList, setCartList] = useState([]);
  const [allPrice, setAllPrice] = useState(0);

  React.useEffect(() => {
    console.log(cartList);
  }, [cartList]);

  const addToList = (data) => {
    setAllPrice(
      (prevPrice) =>
        prevPrice + parseInt(data.product.total_price) * data.userInput.count
    );
    setCartList([...cartList, data]);
  };

  const removeFromList = (product) => {
    let product_code = product.product_code;
    cartList.forEach((el, i) => {
      if (el.product.product_code == product_code) {
        setAllPrice(
          (prevPrice) =>
            prevPrice - parseInt(el.product.total_price) * el.userInput.count
        );

        let newList = [...cartList];
        newList.splice(i, 1);

        setCartList(newList);
      }
    });
  };

  const isExist = (product) => {
    let result = false;
    cartList.forEach((el) => {
      if (el.product.product_code == product.product_code) result = true;
    });
    return result;
  };

  const addSizeCount = (product_code, size) => {
    cartList.forEach((el, i) => {
      if (el.product.product_code == product_code) {
        let currSizeCount = el.userInput.size[size];

        el.userInput.size[size] = currSizeCount
          ? parseInt(currSizeCount) + 1
          : 1;
        el.userInput.count++;
        setAllPrice(
          (prevPrice) => prevPrice + parseInt(el.product.total_price)
        );

        let arr = [...cartList];
        arr[i] = el;

        setCartList(arr);
      }
    });
  };

  const subtractSizeCount = (product_code, size) => {
    cartList.forEach((el, i) => {
      if (el.product.product_code == product_code) {
        let currSizeCount = parseInt(el.userInput.size[size]);
        if (currSizeCount == 1) {
          delete el.userInput.size[size];
        } else {
          el.userInput.size[size] = currSizeCount - 1;
        }
        el.userInput.count--;
        setAllPrice(
          (prevPrice) => prevPrice - parseInt(el.product.total_price)
        );

        let arr = [...cartList];
        arr[i] = el;

        setCartList(arr);
      }
    });
  };
  return (
    <CartContext.Provider
      value={{
        cartList,
        allPrice,
        addToList,
        removeFromList,
        isExist,
        addSizeCount,
        subtractSizeCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
