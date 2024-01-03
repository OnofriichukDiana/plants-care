import ReactQuill, { ReactQuillProps } from "react-quill";
import "react-quill/dist/quill.snow.css";

interface QuillProps extends ReactQuillProps {
  quillRef: React.MutableRefObject<any>;
}

const Quill: React.FC<QuillProps> = ({ quillRef, ...props }) => {
  return <ReactQuill {...props} ref={quillRef} />;
};

export default Quill;
