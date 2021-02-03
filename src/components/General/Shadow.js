import React from "react";
import X from "./Icons/X";

const Shadow = ({ hide, children }) => {
  return (
    <div className="z-40 fixed top-0 right-0 left-0 bottom-0">
      <div className="absolute w-full h-full bg-black opacity-50"></div>
      <div
        className="absolute top-5 right-5 w-5 h-5 text-white hover:text-black "
        onClick={hide}
      >
        <X />
      </div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        {children}
      </div>
    </div>
  );
};

export default Shadow;
