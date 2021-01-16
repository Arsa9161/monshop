import React from "react";

import Item from "./Item";

const ItemsContainer = ({ data, shape }) => {
  return (
    <div
      className={`${
        shape == "horizontal"
          ? "flex flex-row space-x-10"
          : "grid grid-flow-row grid-cols-3 gap-y-16 gap-x-3 justify-items-center"
      }`}
    >
      {data.map((el, i) => (
        <Item key={i} data={el} shape="vertical" />
      ))}
    </div>
  );
};

export default ItemsContainer;
