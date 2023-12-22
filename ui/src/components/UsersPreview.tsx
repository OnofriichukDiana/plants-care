"use client";
import React from "react";
import Image from "next/image";

interface IProps {
  entitiesArray: any;
}

const UsersPreview: React.FC<IProps> = ({ entitiesArray }) => {
  const initStyles = "absolute avatar w-8 h-8";
  return (
    <ul className="ml-5 w-6 h-6 flex relative">
      <li
        className={`${initStyles} z-30 top-0 left-0`}
        style={{ background: entitiesArray[0]?.auth?.avatarBackground }}
      >
        <Image
          src={`/images/${entitiesArray[0]?.auth?.icon}.svg`}
          alt="icon"
          width={18}
          height={18}
        />
      </li>
      <li
        className={`${initStyles} z-20 top-0 left-4`}
        style={{
          background: !!entitiesArray[1]
            ? entitiesArray[1]?.auth?.avatarBackground
            : "rgb(226 232 240)",
        }}
      >
        {!!entitiesArray[1] && (
          <Image
            src={`/images/${entitiesArray[1]?.auth?.icon}.svg`}
            alt="icon"
            width={18}
            height={18}
          />
        )}
      </li>
      <li
        className={`${initStyles} top-0 left-8`}
        style={{
          background: !!entitiesArray[2]
            ? entitiesArray[2]?.auth?.avatarBackground
            : "rgb(226 232 240)",
        }}
      >
        {!!entitiesArray[2] && (
          <Image
            src={`/images/${entitiesArray[1]?.auth?.icon}.svg`}
            alt="icon"
            width={18}
            height={18}
          />
        )}
      </li>
    </ul>
  );
};

export default UsersPreview;
