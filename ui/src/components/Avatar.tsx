"use client";

import React, { useState } from "react";
import Image from "next/image";
import getRandomAvatarIcon from "@/helpers/avatarIcons";
import Link from "next/link";
import { getRandomColor } from "@/helpers/getRandomColor";
import { IUser } from "@/app/user/[slug]/page";

interface IProps {
  user: IUser | undefined;
  size?: string;
  withoutSignature?: boolean;
}

const Avatar: React.FC<IProps> = ({
  user,
  size = "small",
  withoutSignature = false,
}) => {
  let background = user?.avatarBackground || getRandomColor();
  let icon = user?.icon || getRandomAvatarIcon();
  const [isHovered, setIsHovered] = useState(false);

  const avatarStyle = {
    background,
  };

  return (
    <div className="relative">
      <Link
        href={`/user/${user?.id}_${user?.name}`}
        className={`avatar ${size}`}
        style={avatarStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Image
          src={`/images/${icon}.svg`}
          alt="icon"
          width={5}
          height={5}
          layout="responsive"
        />
      </Link>
      {isHovered && !withoutSignature && !!user?.name && (
        <p
          className="subtitle2  w-max absolute p-2 bg-white rounded-md border-2"
          style={{
            boxShadow:
              "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
            transform: "translateX(-50%)",
            left: "50%",
          }}
        >
          {user.name}
        </p>
      )}
    </div>
  );
};

export default Avatar;
