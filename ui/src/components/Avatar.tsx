"use client";

import React from "react";
import Image from "next/image";
import getRandomAvatarIcon from "@/helpers/avatarIcons";

interface IProps {
  user: any;
  size?: number;
}

const Avatar: React.FC<IProps> = ({ user, size = 3 }) => {
  let background = user?.avatarBackground || "#2f6a48";
  let icon = user?.icon || getRandomAvatarIcon();

  const avatarStyle = {
    background,
    width: `${size}rem`,
    height: `${size}rem`,
  };
  return (
    <div className="avatar" style={avatarStyle}>
      <Image
        src={`/images/${icon}.svg`}
        alt="icon"
        width={size * 9}
        height={size * 9}
      />
    </div>
  );
};

export default Avatar;
