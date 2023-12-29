"use client";

import React from "react";
import { FaCheck } from "react-icons/fa6";

interface IProps {
  checked: boolean;
  onChange?: any;
  label?: string;
}

const Checkbox: React.FC<IProps> = ({ checked, onChange, label }) => {
  return (
    <div className="flex items-center">
      {!!label && <p className="sutitle1 mr-1">{label}</p>}
      <div className="border-green-900 border-2 rounded-sm shadow-md w-5 h-5 relative ">
        <input
          type="checkbox"
          onChange={onChange}
          className="absolute opacity-0 cursor-pointer"
        />
        {checked && <FaCheck className="icon" />}
      </div>
    </div>
  );
};

export default Checkbox;
