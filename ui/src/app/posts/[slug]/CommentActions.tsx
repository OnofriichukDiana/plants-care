"use client";
import IconButton from "@/components/IconButton";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { postCommentsApi } from "@/api";
import { useAuthStore } from "@/api/authStore";
import { IComment } from "./page";
import { MdDeleteOutline } from "react-icons/md";
import { MdReply } from "react-icons/md";
import useNotification from "@/helpers/useNotification";
import Notification from "@/components/Notification";
import CommentInput from "./CommentInput";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { MdClose } from "react-icons/md";
import LoadingButton from "@/components/LoadingButton";
import CommentLikes from "./CommentLikes";

interface IProps {
  comment: IComment;
  postId: number;
}

function CommentActions({ comment, postId }: IProps) {
  const router = useRouter();
  const { me } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isShowCommentInput, setIsShowCommentInput] = useState(false);
  const { notification, showNotification } = useNotification();
  const ref = useOutsideClick<HTMLDivElement>(() =>
    setIsShowCommentInput(false)
  );

  const onDelete = async () => {
    setIsLoading(true);
    const res = await postCommentsApi.delete(comment.id);
    if (res?.error) {
      showNotification(res.error.message, "error");
    } else {
      router.refresh();
    }
    setIsLoading(false);
  };

  return (
    <div ref={ref}>
      {notification && <Notification message={notification.message} />}
      <div className="flex justify-between items-center mt-2 bg-slate-50 px-2 ">
        <CommentLikes comment={comment} />

        {comment?.auth?.id === me?.id ? (
          <LoadingButton
            button={
              <button type="button" className="icon-button" onClick={onDelete}>
                <MdDeleteOutline size={20} style={{ color: "grey" }} />
              </button>
            }
            isLoading={isLoading}
            size={6}
          />
        ) : (
          <IconButton
            onClick={() => setIsShowCommentInput(!isShowCommentInput)}
            icon={isShowCommentInput ? MdClose : MdReply}
            signature={isShowCommentInput ? "Close" : "Reply"}
          />
        )}
      </div>
      {isShowCommentInput && (
        <CommentInput
          postId={postId}
          parent={comment}
          afterSave={() => setIsShowCommentInput(false)}
        />
      )}
    </div>
  );
}

export default CommentActions;
