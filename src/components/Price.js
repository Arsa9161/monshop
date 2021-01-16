import React from "react";
import Currency from "../components/General/Currency";

const Price = (props) => {
  const total_price = props.total_price;
  let price = props.price;

  let discount = null;
  if (price > total_price) {
    discount = Math.round(((price - total_price) * 100) / price);
  }

  return (
    <div className="w-4/5 flex justify-between items-center">
      <div>
        <p>Төлөх дүн</p>
        <div className="flex items-center">
          <p className="text-3xl font-semibold">
            <Currency code="MNT">{total_price}</Currency>
          </p>
          {discount && (
            <span className="font-normal text-base p-1 ml-2 border border-current rounded-md">
              -{discount}%
            </span>
          )}
        </div>
        {discount && (
          <p>
            Хэмнэлт <Currency code="MNT">{price - total_price}</Currency>{" "}
          </p>
        )}
      </div>
      <div className="opacity-80 mr-5">
        <p>Анхны үнэ</p>
        <p className="text-2xl">
          <Currency code="MNT">{price}</Currency>
        </p>
      </div>
    </div>
  );
};

export default Price;
