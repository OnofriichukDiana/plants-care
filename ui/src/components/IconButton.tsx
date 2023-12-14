"use client";
import Image from "next/image";
import { useState } from "react";

interface IProps {
  signature: string;
  icon?: any;
  iconName?: string;
  onClick?: () => void;
}
const IconButton: React.FC<IProps> = ({
  onClick,
  iconName,
  icon: Icon,
  signature,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        className="icon-button"
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {iconName && (
          <Image src={iconName} alt={signature} width={30} height={30} />
        )}
        {Icon && <Icon style={{ color: "grey" }} size={23} />}
      </button>
      {isHovered && (
        <p
          className="subtitle1 absolute right-7 w-100 p-2 bg-white rounded-md border-2"
          style={{ width: "7vw" }}
        >
          {signature}
        </p>
      )}
    </div>
  );
};

export default IconButton;
