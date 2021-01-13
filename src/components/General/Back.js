import React from "react";
import { useHistory } from "react-router-dom";
import Arrow from "./Icons/Arrow";
const Back = () => {
  const history = useHistory();
  return (
    <button
      onClick={() => history.goBack()}
      className="flex items-center text-base text-p-gray hover:text-p-violet"
    >
      <span className="mt-0.5 w-3 h-3 mr-2  transform rotate-180">
        <Arrow />
      </span>
      Буцах
    </button>
  );
};

export default Back;
