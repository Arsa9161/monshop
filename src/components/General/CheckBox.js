import React from "react";

const CheckBox = ({ title, checked, doUnChecked, doOnChecked }) => {
  const [isChecked, setIsChecked] = React.useState(checked);

  React.useEffect(() => {
    if (checked) doOnChecked();
  }, []);

  const toggleCheck = () => {
    isChecked ? doUnChecked() : doOnChecked();
    setIsChecked(!isChecked);
  };

  return (
    <div
      className={`transition duration-300 py-1 px-5 rounded-full shadow text-md hover:bg-violet hover:text-white ${
        isChecked && "bg-violet text-white"
      }`}
      onClick={toggleCheck}
    >
      {title}
    </div>
  );
};

export default CheckBox;
