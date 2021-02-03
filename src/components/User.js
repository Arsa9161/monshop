import React from "react";
import { NavLink } from "react-router-dom";
import Back from "../components/General/Back";
import Avatar from "./General/Icons/Avatar";
import SwitchButton from "./General/SwitchBtn";
import { useUserCtx } from "../context/UserContext";
import firebase from "../firebase";

const User = () => {
  const { setShow } = useUserCtx();

  return (
    <div className="w-full h-3/4 flex flex-col justify-between border-r-2 border-bg-body text-lg">
      <div className="h-5/6 overflow-y-auto overflow-x-hidden">
        <div className="w-24 h-24 rounded-full mx-auto mb-7">
          <Avatar />
        </div>
        <div className="flex flex-col space-y-2 pl-7">
          <div
            onClick={() => setShow(true)}
            className="link-item capitalize cursor-pointer"
          >
            Нэвтрэх
          </div>
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
          <div
            onClick={() => firebase.auth().signOut()}
            className="link-item capitalize cursor-pointer"
          >
            Гарах
          </div>
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
