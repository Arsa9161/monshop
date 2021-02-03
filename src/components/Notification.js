import React from "react";
import { Transition } from "@tailwindui/react";
import { useUserCtx } from "../context/UserContext";

const Notification = () => {
  const { notification } = useUserCtx();

  return (
    <div className="absolute top-0 right-0 h-screen pt-28 pr-5">
      {notification.map((el, i) => (
        <NotificationEl key={i} text={el} />
      ))}
    </div>
  );
};

const NotificationEl = ({ text }) => {
  const [show, setShow] = React.useState(false);
  const ref = React.useRef(null);

  React.useEffect(() => {
    setShow(true);
    setTimeout(() => {
      ref.current.classList.add("scale-x-0");
    }, 500);
    setTimeout(() => {
      setShow(false);
    }, 3000);
  }, []);

  return (
    <Transition
      show={show}
      enter="transition duration-500"
      enterFrom="opacity-0 transform translate-x-full"
      enterTo="opacity-100 transform translate-x-0"
      leave="transition duration-300"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      className="rounded-md mb-5 bg-gray-200 main-text"
    >
      <div className="flex flex-col">
        <div className="py-4 px-10">{text}</div>
        <div
          ref={ref}
          className="h-1 bg-p-pink transform origin-left transition duration-2500 ease-linear"
        ></div>
      </div>
    </Transition>
  );
};
export default Notification;
