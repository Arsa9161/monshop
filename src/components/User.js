import React from "react";
import { NavLink } from "react-router-dom";
import Back from "../components/General/Back";
import SwitchButton from "./General/SwitchBtn";

const User = () => {
  return (
    <div className="w-full h-3/4 flex flex-col justify-between border-r-2 border-bg-body text-lg">
      <div className="h-5/6 overflow-y-auto overflow-x-hidden">
        <div className="w-24 h-24 rounded-full mx-auto mb-7 bg-red-300"></div>
        <div className="flex flex-col space-y-2 pl-7">
          <NavLink
            to="/user/history"
            className="link-item capitalize"
            activeClassName="text-p-pink"
          >
            Миний захиалгууд
          </NavLink>
          <NavLink
            to="/user/wishlist"
            className="link-item capitalize"
            activeClassName="text-p-pink"
          >
            Хүслийн жагсаалт
          </NavLink>
          <NavLink
            to="exit"
            className="link-item capitalize"
            activeClassName="text-p-pink"
          >
            Гарах
          </NavLink>
        </div>
      </div>
      <div className="flex items-center justify-around px-4">
        <SwitchButton type="theme" />
        <Back />
      </div>
    </div>
  );
};

export default User;
