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
          className="z-50 fixed flex flex-col justify-center inset-0 bg-zinc-400 bg-opacity-50"
          onClick={handleClick}
        >
          <div className="w-1/3 p-6 rounded-2xl mx-auto mt-20 bg-white card max-h-72 overflow-auto">
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
