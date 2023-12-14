import { format, isValid } from "date-fns";
import numeral from "numeral";
import { useState } from "react";
import IconButton from "./IconButton";

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
      className="card relative p-1 pt-4 m-1 opacity-90 w-1/5"
      onMouseEnter={() => setIsCardHover(true)}
      onMouseLeave={() => setIsCardHover(false)}
    >
      {uiType == "image" && !!imageUrl ? (
        <img className="mx-auto" width="90%" src={imageUrl}></img>
      ) : (
        <div onClick={!!onClick ? onClick : () => {}}>
          {/* <FileThumbnail format={uiType} sx={{ width: 40, height: 40 }} /> */}
        </div>
      )}
      <div>
        <p
          className="subtitle2 truncate"
          onClick={!!onClick ? onClick : () => {}}
        >
          {name}
        </p>
        {description && <p className="subtitle2">{description}</p>}
      </div>
      <div className="flex justify-between subtitle2">
        <div>
          {(() => {
            return numeral(size || 0).format("0.0 b");
          })()}
        </div>

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
