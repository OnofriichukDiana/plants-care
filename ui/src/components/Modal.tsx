"use client";
import React from "react";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  children: any;
}

const Modal: React.FC<IProps> = ({ isOpen, onClose, children }) => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      {isOpen && (
        <div
          className="z-50 fixed flex items-center justify-center inset-0 bg-zinc-400 bg-opacity-50"
          onClick={handleClick}
        >
          <div className="w-3/5 md:w-1/3 p-6 rounded-2xl bg-white card max-h-72 overflow-auto">
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
