"use client";
import React, { FormEventHandler, useEffect, useRef, useState } from "react";
import Notification from "@/components/Notification";
import useNotification from "@/hooks/useNotification";
import Avatar from "./Avatar";
import { useAuthStore } from "@/api/authStore";
import Checkbox from "./Checkbox";
import UploadFiles from "./UploadFiles";
import { fileData } from "@/helpers/fileUtils";
import FileCard from "./fileCard";
import { format } from "date-fns";
import numeral from "numeral";
import CloseIcon from "../../public/images/close.svg";
import { IoImagesOutline } from "react-icons/io5";
import createPostBodySchema from "@/helpers/validationSchemas/createPostBodySchema";
import { postFilesApi, postsApi } from "@/api";
import { useRouter } from "next/navigation";
import LoadingButton from "./LoadingButton";
import { LuSmilePlus } from "react-icons/lu";
import dynamic from "next/dynamic";
import EmojiPicker from "emoji-picker-react";
import { useOutsideClick } from "@/hooks/useOutsideClick";

const ReactQuill = dynamic(() => import("../components/Quill"), {
  ssr: false,
  loading: () => <div className="w-full h-28" />,
});

type DataType = {
  message?: string;
  isShowTags: boolean;
  tags: string;
};

type ErrorType = {
  tags?: string | null;
};
interface IProps {
  afterSave: () => void;
  withoutAvatar?: boolean;
}
function PostInput({ afterSave, withoutAvatar }: IProps) {
  const router = useRouter();
  const { notification, showNotification } = useNotification();

  const defaultPostData = { isShowTags: false, tags: "" };
  const [post, setPost] = useState<DataType>(defaultPostData);
  const [postFiles, setPostFiles] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<ErrorType>({});
  const [isShowAvatar, setIsShowAvatar] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const { me, isLoading: isMeLoading } = useAuthStore();

  const quillRef: any = useRef();
  const ref = useOutsideClick<HTMLDivElement>(() => setShowEmojiPicker(false));

  useEffect(() => {
    if (withoutAvatar || isMeLoading) {
      setIsShowAvatar(false);
    } else {
      setIsShowAvatar(true);
    }
  }, [withoutAvatar, isMeLoading]);

  const validateBeforeWrite = async () => {
    try {
      await createPostBodySchema.validate(post, { abortEarly: false });
      return false;
    } catch (error: any) {
      const newErrors: ErrorType = error.inner.reduce(
        (acc: ErrorType, item: any) => ({ ...acc, [item.path]: item.message }),
        {}
      );
      setErrors({
        ...errors,
        ...newErrors,
      });
      return true;
    }
  };

  const saveFiles = async (postId: number) => {
    await Promise.all(
      postFiles?.map((file: any) => {
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
    if (!me) {
      router.push("/signin");
    } else {
      const isValidationError = await validateBeforeWrite();
      if (!isValidationError && (!!post.message || !!postFiles.length)) {
        setIsLoading(true);
        const tags = post.tags.split(" ");
        const res = await postsApi.create({ ...post, tags });
        if (res?.error) {
          showNotification(res.error.message, "error");
        } else {
          if (!!postFiles.length) {
            await saveFiles(res?.id);
          }

          setPostFiles([]);
          setPost(defaultPostData);

          afterSave();
        }
        setIsLoading(false);
      }
    }
  };

  const handleEmojiClick = (emojiData: any) => {
    const quillEditor = quillRef?.current?.getEditor();
    if (!quillEditor) return;

    const cursorPosition = quillEditor.getSelection()?.index || 0;
    const defaultContent = "<p></p>";
    const currentMessage = post?.message || defaultContent;
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
        <div className="mb-4 flex">
          <div className={!withoutAvatar ? "medium" : ""}>
            {isShowAvatar && <Avatar user={me} size="medium" />}
          </div>
          <div className="ml-4 w-full">
            <div className="relative">
              <ReactQuill
                quillRef={quillRef}
                className="w-full text-quill h-28 body1"
                value={post?.message || ""}
                onChange={(e) => {
                  if (e !== "<p><br></p>") {
                    setPost({ ...post, message: e });
                  }
                }}
                theme="snow"
                modules={{
                  toolbar: false,
                }}
              />

              <UploadFiles
                onChange={(newFiles) =>
                  setPostFiles([...postFiles, ...newFiles])
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

              {postFiles?.length > 0 && (
                <div className="absolute right-20 flex flex-col md:flex-row justify-end">
                  {postFiles?.map((file: File, index: number) => {
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
                              setPostFiles(
                                postFiles.filter(
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
              <div className="flex items-center flex-wrap gap-2">
                <div className="relative">
                  <input
                    onChange={(e) => {
                      setPost({ ...post, tags: e.target.value });
                      setErrors({ ...errors, tags: null });
                    }}
                    placeholder="tags/what do this post about"
                    value={post?.tags || ""}
                    type="text"
                    className="mr-4 text-xs"
                  />
                  {errors.tags && (
                    <div className="absolute mt-0.5 text-xs text-red-600">
                      {errors.tags}
                    </div>
                  )}
                </div>
                <Checkbox
                  label="Hide tags"
                  checked={post.isShowTags}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setPost({ ...post, isShowTags: e.currentTarget.checked });
                  }}
                />
              </div>
              <LoadingButton
                button={
                  <button type="submit" className="md:w-16">
                    Post
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

export default PostInput;
