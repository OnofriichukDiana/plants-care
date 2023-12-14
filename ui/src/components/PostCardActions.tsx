"use client";
import { FaRegHeart } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { PostItemType } from "./PostCard";
import IconButton from "./IconButton";
import { FaRegCommentDots } from "react-icons/fa";
import { CiSquarePlus } from "react-icons/ci";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { postLikesApi } from "@/api";

interface IProps {
  post: PostItemType;
}

function PostCardActions({ post }: IProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [countLikes, setCountLikes] = useState(post?.countLikes);
  const router = useRouter();

  const isPostLiked = async () => {
    if (!!post?.id) {
      const _isLiked = await postLikesApi.isLiked(post.id);
      setIsLiked(_isLiked);
    }
  };

  useEffect(() => {
    isPostLiked();
  }, [post]);

  const onLike = async () => {
    if (isLiked) {
      setIsLiked(false);
      await postLikesApi.delete(post.id);
      setCountLikes(post.countLikes - 1);
    } else {
      setIsLiked(true);
      setCountLikes(post.countLikes + 1);
      await postLikesApi.create({ postId: post.id });
    }
  };

  const galleryPreview = () => (
    <ul className="flex items-center relative">
      <li>
        <img
          className="z-30 relative w-4 h-4 md:w-14 md:h-14  border border-slate-400"
          src={post?.postFiles[1]?.media?.path}
          alt={post?.tags[0]}
          style={{ objectFit: "cover", transform: "rotate(-12deg)" }}
        />
      </li>
      <li>
        {post?.postFiles[2] ? (
          <img
            className="absolute z-20 top-0 left-8 w-4 h-4 md:w-14 md:h-14 border-1 border-slate-400"
            src={post?.postFiles[2]?.media?.path}
            alt={post?.tags[0]}
            style={{ objectFit: "cover" }}
          />
        ) : (
          <div className="absolute z-20 top-0 left-8 w-4 h-4 md:w-14 md:h-14  bg-slate-200 border border-slate-400"></div>
        )}
      </li>
      <li>
        {post?.postFiles[3] ? (
          <img
            className="relative w-4 h-4 md:w-14 md:h-14 border border-slate-400"
            src={post?.postFiles[3]?.media?.path}
            alt={post?.tags[0]}
            style={{ objectFit: "cover", transform: "rotate(12deg)" }}
          />
        ) : (
          <div className="relative w-4 h-4 md:w-14 md:h-14  bg-slate-200 rotate-12 border border-slate-400"></div>
        )}
      </li>
      {post?.postFiles[4] && (
        <CiSquarePlus size={30} style={{ color: "grey" }} />
      )}
    </ul>
  );

  return (
    <div className="flex justify-between mt-2 bg-slate-50 p-3">
      <div className="flex">
        <IconButton
          onClick={onLike}
          icon={isLiked ? FcLike : FaRegHeart}
          signature={isLiked ? "Eliminate" : "Like"}
        />
        <p className="ml-1">{countLikes}</p>
      </div>

      {post?.postFiles?.length > 1 && (
        <IconButton
          onClick={() => router.push(`/`)}
          icon={galleryPreview}
          signature="View"
        />
      )}

      <div className="flex">
        <IconButton
          onClick={() => router.push(`/`)}
          icon={FaRegCommentDots}
          signature="Comments"
        />
        <p className="ml-1">{post?.countComments}</p>
      </div>
    </div>
  );
}

export default PostCardActions;
