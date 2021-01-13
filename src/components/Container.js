import React from "react";
import Arrow from "./General/Icons/Arrow";
import ItemsContainer from "./Item/ItemsContainer";

const Container = ({ title, data, shape }) => {
  let [point, setPoint] = React.useState(0);

  // React.useEffect(() => {
  //     console.log(point);
  // }, [])

  const shiftRight = (e) => {
    setPoint((prev) => prev - 300);
  };

  const shiftLeft = (e) => {
    setPoint((prev) => prev + 300);
  };

  return (
    <div>
      <p className="mb-5 ml-6 link-item capitalize hover:text-p-gray dark:hover:text-p-light font-medium opacity-60 text-lg">
        {title}
      </p>
      {shape != "horizontal" ? (
        <ItemsContainer data={data} />
      ) : (
        <div className="relative mr-7 -mt-10">
          <div className="py-10 overflow-hidden">
            {/* <div className={`transform ${point < 0 ? `-translate-x${point}` : `translate-x-${point}`}`}> */}
            <div
              style={{ transform: `translateX(${point}px)` }}
              className="transition duration-300 ease-in-out"
            >
              <ItemsContainer data={data} shape={shape} />
            </div>
          </div>
          <div className="w-2 opacity-70 h-full absolute bg-gradient-to-r from-transparent to-white top-0 right-0"></div>
          <div className="w-2 opacity-70 h-full absolute bg-gradient-to-l from-transparent to-white top-0 left-0"></div>
          <div
            onClick={shiftRight}
            className="w-5 h-5 opacity-50 absolute top-1/2 -translate-y-4 -right-12"
          >
            <Arrow />
          </div>
          <div
            onClick={shiftLeft}
            className="w-5 h-5 opacity-50 absolute top-1/2 -translate-y-4 -left-12 transform rotate-180"
          >
            <Arrow />
          </div>
          <p className="inline-block link-item cursor-pointer absolute right-0 -bottom-2 opacity-70">
            Цааш үзэх...
          </p>
        </div>
      )}
    </div>
  );
};

export default Container;
