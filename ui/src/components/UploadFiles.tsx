"use client";
import { ReactNode, useRef } from "react";

interface UploadFilesProps {
  icon: ReactNode;
  onChange: (files: File[]) => void;
  styles?: string;
  accept?: string;
}

const UploadFiles = ({
  onChange,
  icon,
  styles,
  accept = ".jpg, .jpeg, .png, .gif",
}: UploadFilesProps) => {
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
        accept={accept}
      />
      {icon}
    </div>
  );
};

export default UploadFiles;
