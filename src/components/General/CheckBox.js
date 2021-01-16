import React from "react";

const CheckBox = ({ title, checked, doUnChecked, doOnChecked }) => {
  const [isChecked, setIsChecked] = React.useState(checked);

  React.useEffect(() => {
    if (checked && isChecked) doOnChecked();
  });

  const toggleCheck = () => {
    isChecked ? doUnChecked() : doOnChecked();
    setIsChecked(!isChecked);
  };

  return (
    <div
      className={`cursor-pointer transition duration-300 py-1 px-5 rounded-full shadow text-md hover:bg-gray-100  ${
        isChecked && "bg-violet hover:bg-violet text-white"
      }`}
      onClick={toggleCheck}
    >
      {title}
    </div>
  );
};

export default CheckBox;
