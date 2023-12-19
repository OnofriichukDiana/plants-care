"use client";
import { FaRegHeart } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import IconButton from "@/components/IconButton";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { commentLikesApi, postCommentsApi } from "@/api";
import { useAuthStore } from "@/api/authStore";
import { IComment } from "./page";
import { MdDeleteOutline } from "react-icons/md";
import { MdReply } from "react-icons/md";
import useNotification from "@/helpers/useNotification";
import Notification from "@/components/Notification";
import CommentInput from "./CommentInput";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { MdClose } from "react-icons/md";

interface IProps {
  comment: IComment;
  postId: number;
}

function CommentActions({ comment, postId }: IProps) {
  const router = useRouter();
  const { me } = useAuthStore();
  const [isLiked, setIsLiked] = useState(false);
  const [isShowCommentInput, setIsShowCommentInput] = useState(false);
  const [countLikes, setCountLikes] = useState(comment?.countLikes);
  const { notification, showNotification } = useNotification();
  const ref = useOutsideClick<HTMLDivElement>(() =>
    setIsShowCommentInput(false)
  );

  const isCommentLiked = async () => {
    if (!!comment?.id && !!me) {
      const _isLiked = await commentLikesApi.isLiked(comment.id);
      setIsLiked(_isLiked);
    }
  };

  useEffect(() => {
    isCommentLiked();
  }, [comment, me]);

  const onLike = async () => {
    if (!me) {
      router.push("/signin");
    } else {
      if (isLiked) {
        setIsLiked(false);
        await commentLikesApi.delete(comment.id);
        setCountLikes(comment?.countLikes - 1);
      } else {
        setIsLiked(true);
        setCountLikes(comment?.countLikes + 1);
        await commentLikesApi.create({ commentId: comment.id });
      }
    }
  };

  const onDelete = async () => {
    const res = await postCommentsApi.delete(comment.id);
    if (res?.error) {
      showNotification(res.error.message, "error");
    } else {
      router.refresh();
    }
  };

  return (
    <div ref={ref}>
      {notification && <Notification message={notification.message} />}
      <div className="flex justify-between items-center mt-2 bg-slate-50 p-2">
        <div className="flex">
          <IconButton
            onClick={onLike}
            icon={isLiked ? FcLike : FaRegHeart}
            signature={isLiked ? "Eliminate" : "Like"}
          />
          <p className="ml-1">{countLikes}</p>
        </div>

        {comment?.auth?.id === me?.id ? (
          <IconButton
            onClick={onDelete}
            icon={MdDeleteOutline}
            signature="Delete"
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
