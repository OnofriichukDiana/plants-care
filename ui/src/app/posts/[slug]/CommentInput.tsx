"use client";
import { FormEventHandler, useEffect, useRef, useState } from "react";
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
import { commentFilesApi, postCommentsApi } from "@/api";
import { useRouter } from "next/navigation";
import { VscSend } from "react-icons/vsc";
import { IComment } from "./page";
import { FaRegFileAlt } from "react-icons/fa";
import LoadingButton from "@/components/LoadingButton";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { LuSmilePlus } from "react-icons/lu";
import EmojiPicker from "emoji-picker-react";

interface IProps {
  postId?: number;
  parent?: IComment;
  afterSave?: () => void;
}

function CommentInput({ postId, parent, afterSave }: IProps) {
  const { me } = useAuthStore();
  const router = useRouter();

  const { notification, showNotification } = useNotification();

  const defaultComment = { postId, countLikes: 0 };
  if (!!parent?.id) {
    //@ts-ignore
    defaultComment.parentId = parent.id;
  }
  const [isMeLoading, setIsMeLoading] = useState(true);
  const [comment, setComment] = useState<IComment>(defaultComment);
  const [commentFiles, setCommentFiles] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const textareaRef: any = useRef();
  const ref = useOutsideClick<HTMLDivElement>(() => setShowEmojiPicker(false));

  const saveFiles = async (commentId: number) => {
    await Promise.all(
      commentFiles?.map((file: any) => {
        const formData = new FormData();
        formData.append("file", file);
        return commentFilesApi.upload(formData, commentId, {
          "Content-Length": file?.size,
        });
      })
    );
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!me) {
      router.push("/signin");
    } else {
      if (!!comment.message || !!commentFiles.length) {
        setIsLoading(true);
        const res = await postCommentsApi.create(comment);
        if (res?.error) {
          showNotification(res.error.message, "error");
        } else {
          if (!!commentFiles.length) {
            await saveFiles(res?.id);
          }
          setCommentFiles([]);
          setComment(defaultComment);
          !!afterSave && afterSave();
          router.refresh();
        }
        setIsLoading(false);
      }
    }
  };

  const handleEmojiClick = (emojiData: any) => {
    const cursorPosition =
      textareaRef.current?.getEditor()?.getSelection()?.index || 0;

    const updatedMessage =
      comment?.message?.replace(/\n$/i, `${emojiData.emoji}\n`) ||
      `${emojiData.emoji}\n`;

    setComment((prevComment) => ({ ...prevComment, message: updatedMessage }));
    setShowEmojiPicker(false);
    textareaRef.current
      ?.getEditor()
      ?.setSelection(cursorPosition + emojiData.emoji.length + 1);
  };

  useEffect(() => {
    if (me?.id) {
      setIsMeLoading(false);
    }
  }, [me]);

  return (
    <div className="mt-10">
      {notification && <Notification message={notification.message} />}
      <form onSubmit={onSubmit}>
        <div className="mb-4 flex">
          {!isMeLoading && <Avatar user={me} />}
          <div className="ml-4 w-full">
            <div className="relative">
              <textarea
                className="w-full subtitle1"
                placeholder={`${
                  !!parent?.id ? `Reply ${parent?.auth?.name}` : "Add comment"
                }`}
                onChange={(e) => {
                  setComment({ ...comment, message: e.target.value });
                }}
                rows={3}
                cols={12}
                value={comment?.message || ""}
              />
              <UploadFiles
                onChange={(newFiles) =>
                  setCommentFiles([...commentFiles, ...newFiles])
                }
                icon={<FaRegFileAlt className="icon-medium" />}
                styles="absolute bottom-5 right-20"
                accept="*/*"
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
                        top: "70px",
                        left: "0px",
                        zIndex: 40,
                        // @ts-ignore
                        "--epr-emoji-size": "20px",
                      }}
                    />
                  </div>
                )}
              </div>

              {commentFiles?.length > 0 && (
                <div className="absolute right-20 flex justify-end">
                  {commentFiles?.map((file: File, index: number) => {
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
                              setCommentFiles(
                                commentFiles.filter(
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
              <div className="absolute bottom-3 right-3">
                <LoadingButton
                  isLoading={isLoading}
                  button={
                    <button type="submit" className="icon-button">
                      <VscSend className="icon-medium" />
                    </button>
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CommentInput;
