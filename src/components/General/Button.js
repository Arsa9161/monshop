import React from "react";

const Button = ({ title, type, onClick, disabled }) => {
  const style =
    type == "checkbox"
      ? `relative transition duration-300 py-1 w-12 rounded-full shadow text-md text-center ${
          disabled
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-violet hover:text-white"
        }`
      : `relative transition duration-300 py-3 rounded-full cursor-pointer text-center uppercase border-2 border-p-${type} text-p-${type} ${
          disabled
            ? "opacity-50 cursor-not-allowed"
            : `hover:bg-p-${type} hover:text-white`
        }`;
  return (
    <div onClick={onClick} className={style}>
      {title}
      {/* {disabled && (
        <div className="absolute top-0 left-0 w-full h-full bg-white opacity-50 z-40"></div>
      )} */}
    </div>
  );
};

export default Button;
