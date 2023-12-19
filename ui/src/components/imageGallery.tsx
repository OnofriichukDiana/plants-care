"use client";
import React, { useEffect, useState } from "react";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  images: any;
}

const ImageGallery: React.FC<IProps> = ({ isOpen, onClose, images }) => {
  const [selected, setSelected] = useState(images[0]);
  const [isAnimate, setIsAnimate] = useState(false);

  const animate = () => {
    setIsAnimate(true);

    setTimeout(() => {
      setIsAnimate(false);
    }, 500);
  };

  useEffect(() => {
    if (isOpen) {
      animate();
    }
  }, [isOpen]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<Document>) => {
    if (event.key === "ArrowRight") {
      navigateImages(1);
    } else if (event.key === "ArrowLeft") {
      navigateImages(-1);
    }
  };

  const navigateImages = (direction: number) => {
    const currentIndex = images.findIndex(
      (item: any) => item.id === selected?.id
    );
    const nextIndex =
      (currentIndex + direction + images.length) % images.length;
    setSelected(images[nextIndex]);
    setIsAnimate(true);
  };

  useEffect(() => {
    const handleKeyPress = (event: any) => handleKeyDown(event);
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [selected, images]);

  const handleThumbnailClick = (item: any) => {
    setSelected(item);
    animate();
  };

  return (
    <>
      {isOpen && (
        <div
          className="z-50 fixed flex flex-col justify-center inset-0 bg-black bg-opacity-50"
          onClick={handleClick}
        >
          <img
            src={selected?.media?.path}
            alt="Original Size"
            className={`mx-auto ${isAnimate ? "animate-scale" : ""}`}
            style={{ maxHeight: "70%", maxWidth: "70%" }}
          />
          <ul className="flex items-center justify-center mt-3">
            {images?.map((i: any) => (
              <li key={i?.id}>
                <img
                  src={i?.media?.path}
                  alt={`Thumbnail`}
                  className={`w-20 h-20 object-cover cursor-pointer mx-2  ${
                    selected?.id === i?.id && "border scale-110"
                  } rounded transition-transform transform hover:scale-110`}
                  onClick={() => handleThumbnailClick(i)}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default ImageGallery;
