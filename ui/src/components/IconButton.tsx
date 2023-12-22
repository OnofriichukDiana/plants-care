"use client";
import Image from "next/image";
import { useState } from "react";

interface IProps {
  signature: string;
  icon?: any;
  iconName?: string;
  onClick?: () => void;
  type?: any;
}
const IconButton: React.FC<IProps> = ({
  onClick,
  iconName,
  icon: Icon,
  signature,
  type = "button",
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative">
      <button
        type={type}
        className="icon-button"
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {iconName && (
          <Image src={iconName} alt={signature} width={30} height={30} />
        )}
        {Icon && <Icon className="icon" size={23} />}
      </button>
      {isHovered && (
        <p
          className="subtitle2 w-max absolute p-2 bg-white rounded-md border-2"
          style={{
            boxShadow:
              "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
            transform: "translateX(-50%)",
            left: "50%",
          }}
        >
          {signature}
        </p>
      )}
    </div>
  );
};

export default IconButton;
