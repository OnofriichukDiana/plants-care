"use client";
import React from "react";

interface IProps {
  entitiesArray: any;
}

const UsersPreview: React.FC<IProps> = ({ entitiesArray }) => {
  const initStyles = "absolute avatar w-8 h-8";

  const style: any = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    overflow: "hidden",
    borderRadius: "50%",
  };

  return (
    <ul className="ml-5 w-6 h-6 flex relative">
      <li
        className={`${initStyles} z-30 top-0 left-0 `}
        style={{ background: entitiesArray[0]?.auth?.avatarBackground }}
      >
        {
          <img
            src={
              entitiesArray[0]?.auth?.avatarUrl
                ? entitiesArray[0]?.auth?.avatarUrl
                : `/images/${entitiesArray[0]?.auth?.icon}.svg`
            }
            alt="icon"
            style={style}
          />
        }
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
          <img
            src={
              entitiesArray[1]?.auth?.avatarUrl
                ? entitiesArray[1]?.auth?.avatarUrl
                : `/images/${entitiesArray[1]?.auth?.icon}.svg`
            }
            alt="icon"
            style={style}
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
          <img
            src={
              entitiesArray[2]?.auth?.avatarUrl
                ? entitiesArray[2]?.auth?.avatarUrl
                : `/images/${entitiesArray[2]?.auth?.icon}.svg`
            }
            alt="icon"
            style={style}
          />
        )}
      </li>
    </ul>
  );
};

export default UsersPreview;
