"use client";
import { ReactNode, useRef } from "react";

interface UploadFilesProps {
  icon: ReactNode;
  styles?: string;
  onChange: (files: File[]) => void;
}

const UploadFiles = ({ onChange, icon, styles }: UploadFilesProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (fileInputRef.current?.click) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className={`absolute cursor-pointer ${styles}`} onClick={handleClick}>
      <input
        className="opacity-0 h-0 w-0"
        type="file"
        ref={fileInputRef}
        onChange={(e) => {
          const selectedFiles = e.target.files;

          if (selectedFiles) {
            onChange(Array.from(selectedFiles));
          }
        }}
        accept=".jpg, .jpeg, .png, .gif"
      />
      {icon}
    </div>
  );
};

export default UploadFiles;
