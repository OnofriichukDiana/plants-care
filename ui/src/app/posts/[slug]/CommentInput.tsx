"use client";
import { FormEventHandler, useState } from "react";
import Notification from "@/components/Notification";
import useNotification from "@/helpers/useNotification";
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

interface IProps {
  postId: number;
  parent?: IComment;
  afterSave?: () => void;
}

function CommentInput({ postId, parent, afterSave }: IProps) {
  const router = useRouter();
  const { notification, showNotification } = useNotification();

  const defaultComment = { postId, countLikes: 0 };
  if (!!parent?.id) {
    //@ts-ignore
    defaultComment.parentId = parent.id;
  }

  const [comment, setComment] = useState<IComment>(defaultComment);
  const [commentFiles, setCommentFiles] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { me } = useAuthStore();

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
      console.log(comment, commentFiles);
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

  return (
    <div className="mt-10">
      {notification && <Notification message={notification.message} />}
      <form onSubmit={onSubmit}>
        <div className="mb-4 flex">
          <Avatar user={me} />
          <div style={{ width: "90%" }} className="ml-4">
            <div className="relative">
              <textarea
                className="w-full"
                placeholder={`${
                  !!parent?.id ? `Reply ${parent?.auth?.name}` : "Add comment"
                }`}
                onChange={(e) => {
                  setComment({ ...comment, message: e.target.value });
                }}
                rows={2}
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
