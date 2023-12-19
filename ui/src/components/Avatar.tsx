"use client";

import React, { useState } from "react";
import Image from "next/image";
import getRandomAvatarIcon from "@/helpers/avatarIcons";
import Link from "next/link";

interface IProps {
  user: any;
  size?: number;
  withoutSignature?: boolean;
}

const Avatar: React.FC<IProps> = ({
  user,
  size = 3,
  withoutSignature = false,
}) => {
  let background = user?.avatarBackground || "#2f6a48";
  let icon = user?.icon || getRandomAvatarIcon();
  const [isHovered, setIsHovered] = useState(false);

  const avatarStyle = {
    background,
    width: `${size}rem`,
    height: `${size}rem`,
  };
  return (
    <div className="relative">
      <Link
        href={`/${user?.id}`}
        className="avatar"
        style={avatarStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Image
          src={`/images/${icon}.svg`}
          alt="icon"
          width={size * 9}
          height={size * 9}
        />
      </Link>
      {isHovered && !withoutSignature && !!user?.name && (
        <p
          className="subtitle1 absolute right-7 w-100 p-2 bg-white rounded-md border-2"
          style={{ width: "7vw" }}
        >
          {user.name}
        </p>
      )}
    </div>
  );
};

export default Avatar;
