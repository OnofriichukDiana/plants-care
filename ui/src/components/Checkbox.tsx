"use client";

import React from "react";
import Image from "next/image";
import checkedIcon from "../../public/images/checked.svg";

interface IProps {
  checked: boolean;
  onChange?: any;
  label?: string;
}

const Checkbox: React.FC<IProps> = ({ checked, onChange, label }) => {
  return (
    <div className="flex items-center">
      {!!label && <p className="sutitle1 mr-1">{label}</p>}
      <div className="border-green-900 border-2 rounded-sm shadow-md w-5 h-5 relative cursor-pointer">
        <input
          type="checkbox"
          onChange={onChange}
          className="absolute opacity-0"
        />
        {checked && (
          <Image src={checkedIcon} alt="checked" width={90} height={90} />
        )}
      </div>
    </div>
  );
};

export default Checkbox;
