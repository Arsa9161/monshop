import React from "react";

const Loader = () => {
  const divs = [];
  for (let i = 1; i < 6; i++) {
    divs.push(
      <div className="flex flex-col space-y-5  w-64 h-64 animate-pulse">
        <div className="w-full h-3/4 rounded-30 bg-gray-200"></div>
        <div className="flex items-center px-5">
          <div className="flex w-1/2 flex-col space-y-2">
            <div className="w-4/5 h-3 rounded-full bg-gray-200"></div>
            <div className="w-1/2 h-3 rounded-full bg-gray-200"></div>
          </div>
          <div className="w-1/2 pl-5">
            <div className="w-full h-3 rounded-full bg-gray-200"></div>
          </div>
        </div>
      </div>
    );
  }

  return <div className="mt-10 ml-5 grid grid-cols-3 gap-y-10">{divs}</div>;
};

export default Loader;
