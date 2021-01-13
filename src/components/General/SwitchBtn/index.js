import React from "react";
import css from "./style.module.css";

const SwitchButton = ({ onClick, type }) => {
  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
  };
  let callBack = !type ? onClick : type == "theme" ? toggleTheme : "";
  return (
    <div className={css.SwitchBtn + " -mb-2 "}>
      <input type="checkbox" id="switch" onClick={callBack} />
      <label htmlFor="switch"></label>
    </div>
  );
};

export default SwitchButton;
