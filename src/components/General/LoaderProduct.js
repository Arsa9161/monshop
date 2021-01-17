import React from "react";

const LoaderProduct = () => {
  return (
    <>
      <div className="w-1/2 h-full flex flex-col items-center animate-pulse">
        <div className="w-120 h-120 rounded-30 overflow-hidden bg-gray-200"></div>
      </div>
      <div className="w-1/2 h-120 flex flex-col justify-evenly animate-pulse">
        <div className="w-1/5 h-5 rounded-full bg-gray-200"></div>
        <div className="w-2/5 h-5 rounded-full bg-gray-200"></div>
        <div className="w-2/6 h-5 rounded-full bg-gray-200"></div>
        <div className="w-1/6 h-5 rounded-full bg-gray-200"></div>
        <div className="w-2/6 h-5 rounded-full bg-gray-200"></div>
        <div className="w-1/5 h-5 rounded-full bg-gray-200"></div>
      </div>
    </>
  );
};

export default LoaderProduct;
