import React from "react";
import Back from "../General/Back";
import SwitchButton from "../General/SwitchBtn";
import SideMenu from "./SideMenu";

const Aside = () => {
  return (
    <div className="w-full h-3/4 flex flex-col justify-between border-r-2 border-bg-body text-lg">
      <div className="h-5/6 overflow-y-auto overflow-x-hidden pl-4 pb-10">
        <SideMenu />
      </div>
      <div className="flex items-center justify-around px-4">
        <SwitchButton type="theme" />
        <Back />
      </div>
    </div>
  );
};

export default Aside;
