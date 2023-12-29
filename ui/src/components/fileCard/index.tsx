"use client";
import { format, isValid } from "date-fns";
import numeral from "numeral";
import { useState } from "react";
import IconButton from "../IconButton";
import FileThumbnail from "./FileThumbnail";

interface IProps {
  name?: string;
  description?: string;
  uiType?: string;
  imageUrl?: string;
  size?: string;
  updatedAt?: string;
  onClick?: () => void;
  actions?: any[];
}

const FileCard: React.FC<IProps> = ({
  name = "",
  description = "",
  uiType = null,
  imageUrl = null,
  size = null,
  updatedAt = null,
  onClick = null,
  actions = [],
}) => {
  const [isCardHover, setIsCardHover] = useState(false);

  return (
    <div
      className="card flex flex-col justify-between relative p-1 pt-4 m-1 h-fit z-40"
      onMouseEnter={() => setIsCardHover(true)}
      onMouseLeave={() => setIsCardHover(false)}
      style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
    >
      {uiType?.includes("image") && !!imageUrl ? (
        <img
          className={`mx-auto w-36 h-36 md:w-48 md:h-48 ${
            !!onClick && "cursor-pointer"
          }`}
          src={imageUrl}
          style={{ objectFit: "cover" }}
          onClick={!!onClick ? onClick : () => {}}
        ></img>
      ) : (
        <div
          className={`mx-auto ${!!onClick && "cursor-pointer"}`}
          onClick={!!onClick ? onClick : () => {}}
        >
          <FileThumbnail format={uiType} />
        </div>
      )}
      <div>
        <p
          style={{ maxWidth: "100px" }}
          className="subtitle2 truncate"
          onClick={!!onClick ? onClick : () => {}}
        >
          {name}
        </p>
        {description && <p className="subtitle2">{description}</p>}
      </div>
      <div className="flex justify-between subtitle2">
        {!!size && (
          <div>
            {(() => {
              return numeral(size || 0).format("0.0 b");
            })()}
          </div>
        )}

        <div />

        {!!updatedAt && (
          <div className="subtitle2">
            {isValid(new Date(updatedAt))
              ? format(new Date(updatedAt), "dd MMM yyyy")
              : ""}
          </div>
        )}
      </div>

      {actions?.length > 0 && (
        <ul className="flex absolute top-0 right-1">
          {actions?.map(({ onClick, icon, text }, index) => (
            <IconButton
              key={index}
              iconName={icon}
              signature={text}
              onClick={onClick}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default FileCard;
