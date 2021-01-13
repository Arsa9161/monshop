import React from "react";

const Currency = ({ code, children }) => {
  const converCurrency = (money) => {
    return addSymbol(convert(money));
  };

  const convert = (money) => {
    money += "";

    let arr = money.split("").reverse();

    let res = [];
    arr.forEach((el, i) => {
      res.push(el);

      if (i % 3 == 2 && arr[i + 1]) res.push(",");
    });
    return res.reverse().join("");
  };

  const addSymbol = (money) => {
    let result;
    switch (code.toLowerCase()) {
      case "mnt":
        result = money + "₮";
        break;
      case "usd":
        result = "$" + money;
        break;
    }
    return result;
  };

  return <span>{converCurrency(children)}</span>;
};

export default Currency;
