"use client";

import { useState } from "react";
import FileCard from "@/components/fileCard";
import ImageGallery from "@/components/imageGallery";

interface IProps {
  files: any;
}

function FilesList({ files }: IProps) {
  const [isImageGalleryOpen, setIsImageGalleryOpen] = useState(false);

  const onView = (file: any) => {
    if (file.media?.mime.includes("image")) {
      setIsImageGalleryOpen(true);
    } else {
      const a = document.createElement("a");
      a.download = file.media?.name;
      a.href = file.media?.path;
      a.click();
    }
  };

  return (
    <>
      <ImageGallery
        isOpen={isImageGalleryOpen}
        onClose={() => setIsImageGalleryOpen(false)}
        images={files.filter((f: any) => f.media?.mime.includes("image"))}
      />
      <ul className="flex flex-wrap">
        {files.map((file: any) => (
          <FileCard
            key={file.id}
            name={file?.media?.name}
            uiType={file?.media?.mime}
            imageUrl={file?.media?.path}
            onClick={() => onView(file)}
          />
        ))}
      </ul>
    </>
  );
}

export default FilesList;
