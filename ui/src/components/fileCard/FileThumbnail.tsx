import React from "react";
import {
  FaFilePdf,
  FaFileImage,
  FaFileAlt,
  FaFileAudio,
  FaFileVideo,
  FaFileWord,
  FaFileExcel,
  FaFileArchive,
} from "react-icons/fa";
import { IoMdDocument } from "react-icons/io";

interface IProps {
  format?: string | null;
}

const FileThumbnail: React.FC<IProps> = ({ format = "" }) => {
  let icon;

  const lowercasedFormat: any = format?.toLowerCase();

  if (lowercasedFormat.includes("pdf")) {
    icon = <FaFilePdf size={70} color="gray" />;
  } else if (
    ["jpg", "jpeg", "png", "gif"].some((ext) => lowercasedFormat.includes(ext))
  ) {
    icon = <FaFileImage size={70} color="gray" />;
  } else if (["mp3", "wav"].some((ext) => lowercasedFormat.includes(ext))) {
    icon = <FaFileAudio size={70} color="gray" />;
  } else if (
    ["mp4", "avi", "mkv"].some((ext) => lowercasedFormat.includes(ext))
  ) {
    icon = <FaFileVideo size={70} color="gray" />;
  } else if (["doc", "docx"].some((ext) => lowercasedFormat.includes(ext))) {
    icon = <FaFileWord size={70} color="gray" />;
  } else if (["xls", "xlsx"].some((ext) => lowercasedFormat.includes(ext))) {
    icon = <FaFileExcel size={70} color="gray" />;
  } else if (lowercasedFormat.includes("txt")) {
    icon = <IoMdDocument size={70} color="gray" />;
  } else if (
    ["zip", "rar", "7z"].some((ext) => lowercasedFormat.includes(ext))
  ) {
    icon = <FaFileArchive size={70} color="gray" />;
  } else {
    icon = <FaFileAlt size={70} color="gray" />;
  }

  return <div>{icon}</div>;
};

export default FileThumbnail;
