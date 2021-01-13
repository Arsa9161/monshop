import React from "react";

const Button = ({ title, type, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`transition duration-300 py-3 rounded-full cursor-pointer text-center uppercase border-2 border-p-${type} text-p-${type} 
      hover:bg-p-${type} hover:text-white`}
    >
      {title}
    </div>
  );
};

export default Button;
