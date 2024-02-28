"use client";
import React, {
  FormEventHandler,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import Notification from "@/components/Notification";
import useNotification from "@/hooks/useNotification";
import Avatar from "@/components/Avatar";
import { useAuthStore } from "@/api/authStore";
import UploadFiles from "@/components/UploadFiles";
import { fileData } from "@/helpers/fileUtils";
import FileCard from "@/components/fileCard";
import { format } from "date-fns";
import numeral from "numeral";
import CloseIcon from "../../../../public/images/close.svg";
import { IoImagesOutline } from "react-icons/io5";
import { chatsApi, postFilesApi } from "@/api";
import { useRouter } from "next/navigation";
import LoadingButton from "@/components/LoadingButton";
import { LuSmilePlus } from "react-icons/lu";
import dynamic from "next/dynamic";
import EmojiPicker from "emoji-picker-react";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { IChat } from "../page";

const ReactQuill = dynamic(() => import("../../../components/Quill"), {
  ssr: false,
  loading: () => <div className="w-full h-28" />,
});

interface IProps {
  afterSave: any;
  toUserId: number;
}
function ChatInput({ afterSave, toUserId }: IProps) {
  const router = useRouter();
  const { notification, showNotification } = useNotification();

  const [chatMessage, setChatMessage] = useState<IChat>({ toUserId });
  const [chatMessageFiles, setChatMessageFiles] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const { me, isLoading: isMeLoading } = useAuthStore();

  const quillRef: any = useRef();
  const ref = useOutsideClick<HTMLDivElement>(() => setShowEmojiPicker(false));

  useLayoutEffect(() => {
    if (!me?.id && !isMeLoading) {
      router.push("/signin");
    }
  }, [me, isMeLoading]);

  const saveFiles = async (postId: number) => {
    await Promise.all(
      chatMessageFiles?.map((file: any) => {
        const formData = new FormData();
        formData.append("file", file);
        return postFilesApi.upload(formData, postId, {
          "Content-Length": file?.size,
        });
      })
    );
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (!!chatMessage.message || !!chatMessageFiles.length) {
      setIsLoading(true);

      const res = await chatsApi.create(chatMessage);
      if (res?.error) {
        showNotification(res.error.message, "error");
      } else {
        if (!!chatMessageFiles.length) {
          await saveFiles(res?.id);
        }

        setChatMessageFiles([]);
        setChatMessage({ toUserId });

        afterSave();
      }
      setIsLoading(false);
    }
  };

  const handleEmojiClick = (emojiData: any) => {
    const quillEditor = quillRef?.current?.getEditor();
    if (!quillEditor) return;

    const cursorPosition = quillEditor.getSelection()?.index || 0;
    const defaultContent = "<p></p>";
    const currentMessage = chatMessage?.message || defaultContent;
    const updatedMessage = currentMessage.replace(
      /<\/p>$/i,
      `<span>${emojiData.emoji}</span></p>`
    );

    quillEditor?.clipboard?.dangerouslyPasteHTML(updatedMessage);
    quillEditor.setSelection(cursorPosition + emojiData.emoji.length);

    setShowEmojiPicker(false);
  };

  return (
    <section>
      {notification && <Notification message={notification.message} />}
      <form onSubmit={onSubmit}>
        <div className="flex">
          <Avatar user={me} size="medium" />
          <div className="ml-4 w-full">
            <div className="relative">
              <ReactQuill
                quillRef={quillRef}
                className="w-full text-quill h-28 body1"
                value={chatMessage?.message || ""}
                onChange={(e) => {
                  if (e !== "<p><br></p>") {
                    setChatMessage({ ...chatMessage, message: e });
                  }
                }}
                theme="snow"
                modules={{
                  toolbar: false,
                }}
              />

              <UploadFiles
                onChange={(newFiles) =>
                  setChatMessageFiles([...chatMessageFiles, ...newFiles])
                }
                icon={<IoImagesOutline className="icon-large" />}
                styles="absolute bottom-1 right-1 md:bottom-3 md:right-3"
              />
              <div>
                <button
                  type="button"
                  className="icon-button absolute bottom-3 left-3"
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                >
                  <LuSmilePlus className="icon" />
                </button>

                {showEmojiPicker && (
                  <div ref={ref}>
                    <EmojiPicker
                      lazyLoadEmojis
                      searchDisabled
                      width={280}
                      height={280}
                      previewConfig={{ showPreview: false }}
                      onEmojiClick={handleEmojiClick}
                      style={{
                        position: "absolute",
                        top: "110px",
                        left: "0px",
                        zIndex: 40,
                        // @ts-ignore
                        "--epr-emoji-size": "20px",
                      }}
                    />
                  </div>
                )}
              </div>

              {chatMessageFiles?.length > 0 && (
                <div className="absolute right-20 flex flex-col md:flex-row justify-end">
                  {chatMessageFiles?.map((file: File, index: number) => {
                    const {
                      name,
                      size,
                      format: uiType,
                      preview,
                    } = fileData(file);
                    return (
                      <FileCard
                        key={index}
                        name={name}
                        uiType={uiType}
                        imageUrl={preview}
                        size={numeral(size || 0).format("0.0 b")}
                        updatedAt={format(new Date(), "dd MMM yyyy")}
                        actions={[
                          {
                            text: "Delete",
                            icon: CloseIcon,
                            onClick: () => {
                              setChatMessageFiles(
                                chatMessageFiles.filter(
                                  (_: any, i: number) => i !== index
                                )
                              );
                            },
                          },
                        ]}
                      />
                    );
                  })}
                </div>
              )}
            </div>

            <div className="flex justify-between flex-wrap mt-2 mb-4 md:mb-10">
              <LoadingButton
                button={
                  <button type="submit" className="md:w-16">
                    Send
                  </button>
                }
                isLoading={isLoading}
              />
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}

export default ChatInput;
