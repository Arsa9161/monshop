import React from "react";

const Info = ({ title, desc }) => {
  return (
    <div className="flex">
      <h5 className="w-1/5 font-semibold">{title}</h5>
      <h6 className="w-4/5">{desc}</h6>
    </div>
  );
};

export default Info;
