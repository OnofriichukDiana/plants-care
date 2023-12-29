const FORMAT_PDF = ["pdf"];
const FORMAT_TEXT = ["txt"];
const FORMAT_PHOTOSHOP = ["psd"];
const FORMAT_WORD = ["doc", "docx"];
const FORMAT_EXCEL = ["xls", "xlsx"];
const FORMAT_ZIP = ["zip", "rar", "iso"];
const FORMAT_ILLUSTRATOR = ["ai", "esp"];
const FORMAT_POWERPOINT = ["ppt", "pptx"];
const FORMAT_AUDIO = ["wav", "aif", "mp3", "aac"];
const FORMAT_IMG = ["jpg", "jpeg", "gif", "bmp", "png", "svg"];
const FORMAT_VIDEO = ["m4v", "avi", "mpg", "mp4", "webm"];

export const ALL_FILE_FORMATS = [
  "txt",
  "zip",
  "audio",
  "image",
  "video",
  "word",
  "excel",
  "powerpoint",
  "pdf",
  "photoshop",
  "illustrator",
];

export function fileTypeByName(name = "") {
  return (name && name.split(".").pop()) || "";
}

export function fileFormat(name: string) {
  const type = fileTypeByName(name);
  let format;

  if (FORMAT_TEXT.includes(type)) format = "txt";
  else if (FORMAT_ZIP.includes(type)) format = "zip";
  else if (FORMAT_AUDIO.includes(type)) format = "audio";
  else if (FORMAT_IMG.includes(type)) format = "image";
  else if (FORMAT_VIDEO.includes(type)) format = "video";
  else if (FORMAT_WORD.includes(type)) format = "word";
  else if (FORMAT_EXCEL.includes(type)) format = "excel";
  else if (FORMAT_POWERPOINT.includes(type)) format = "powerpoint";
  else if (FORMAT_PDF.includes(type)) format = "pdf";
  else if (FORMAT_PHOTOSHOP.includes(type)) format = "photoshop";
  else if (FORMAT_ILLUSTRATOR.includes(type)) format = "illustrator";
  else format = type;

  return format;
}

const iconUrl = (icon: string) => `/assets/icons/files/${icon}.svg`;

export function fileThumb(format: string) {
  let thumb;

  switch (format) {
    case "folder":
      thumb = iconUrl("ic_folder");
      break;
    case "txt":
      thumb = iconUrl("ic_txt");
      break;
    case "zip":
      thumb = iconUrl("ic_zip");
      break;
    case "audio":
      thumb = iconUrl("ic_audio");
      break;
    case "video":
      thumb = iconUrl("ic_video");
      break;
    case "word":
      thumb = iconUrl("ic_word");
      break;
    case "excel":
      thumb = iconUrl("ic_excel");
      break;
    case "powerpoint":
      thumb = iconUrl("ic_power_point");
      break;
    case "pdf":
      thumb = iconUrl("ic_pdf");
      break;
    case "photoshop":
      thumb = iconUrl("ic_pts");
      break;
    case "illustrator":
      thumb = iconUrl("ic_ai");
      break;
    case "image":
      thumb = iconUrl("ic_img");
      break;
    default:
      thumb = iconUrl("ic_file");
  }
  return thumb;
}

export function fileData(file: any) {
  return {
    name: file.name,
    size: file.size,
    type: file.type,
    lastModified: file.lastModified,
    lastModifiedDate: file.lastModifiedDate,
    preview: file?.lastModified ? URL.createObjectURL(file) : file,

    format: fileFormat(file.name),
  };
}
