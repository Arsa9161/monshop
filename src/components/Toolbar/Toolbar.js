import React, { useState, useEffect, useRef } from "react";
import { Transition } from "@tailwindui/react";
//
import MenuItems from "./MenuItems";
import Search from "./Search";
import Close from "./Close";

const Toolbar = ({ scrollDirection }) => {
  const [show, setShow] = useState(true);
  const [width, setWidth] = useState(null);
  const ref = useRef(null);

  useEffect(() => {
    scrollDirection == "up" ? setShow(true) : setShow(false);
  }, [scrollDirection]);

  useEffect(() => {
    setWidth(ref.current.clientWidth);
  }, []);

  const toggleToolbar = () => {
    setShow((prevShow) => !prevShow);
  };

  return (
    <div className="bg h-14 flex items-center py-4 px-4 fixed top-10 right-32 rounded-full shadow z-50">
      <div
        className={`h-5 flex items-center ${
          show && "space-x-5"
        } text-p overflow-y-hidden`}
      >
        <div
          ref={ref}
          style={
            width && {
              width: show ? width + "px" : 0 + "px",
            }
          }
          className="transition-width duration-500 ease-in-out"
        >
          <Transition
            show={show}
            enter="transition duration-700"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            className="flex items-center space-x-5"
          >
            <Search />
            <MenuItems />
          </Transition>
        </div>

        <Close show={show} onClick={toggleToolbar} />
      </div>
    </div>
  );
};

export default Toolbar;
