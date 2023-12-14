"use client";

import React from "react";
import { MdErrorOutline } from "react-icons/md";
import { CiWarning } from "react-icons/ci";
import { IoCheckmarkCircleOutline } from "react-icons/io5";

export enum NotificationTypeEnum {
  ERROR = "error",
  WARNING = "warning",
  SUCCESS = "success",
}

interface IProps {
  message: string;
  type?: string;
}

const Notification: React.FC<IProps> = ({
  message,
  type = NotificationTypeEnum.ERROR,
}) => {
  const getColor = () => {
    switch (type) {
      case NotificationTypeEnum.ERROR:
        return "bg-rose-600";
      case NotificationTypeEnum.WARNING:
        return "bg-yellow-400";
      case NotificationTypeEnum.SUCCESS:
        return "bg-green-500";
    }
  };

  return (
    <div className={`absolute ${getColor()} p-2 right-8 flex rounded z-50`}>
      {type === NotificationTypeEnum.ERROR && <MdErrorOutline size={1} />}
      {type === NotificationTypeEnum.WARNING && <CiWarning size={1} />}
      {type === NotificationTypeEnum.SUCCESS && (
        <IoCheckmarkCircleOutline size={1} />
      )}

      <p className="text-white ml-1">{message}</p>
    </div>
  );
};

export default Notification;
