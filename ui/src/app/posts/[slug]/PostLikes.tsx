"use client";
import { postLikesApi } from "@/api";
import { useAuthStore } from "@/api/authStore";
import IconButton from "@/components/IconButton";
import { PostItemType } from "@/components/PostCard";
import { useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { FcLike } from "react-icons/fc";

interface IProps {
  post: PostItemType;
}

const Users = () => (
  <ul className="flex items-center relative">
    {/* <li></li>
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
    </li> */}
  </ul>
);

const PostLikes = ({ post }: IProps) => {
  const { me } = useAuthStore();
  const [isLiked, setIsLiked] = useState(false);
  const [countLikes, setCountLikes] = useState(post?.countLikes);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isPostLiked = async () => {
    if (!!post?.id && !!me) {
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

  return (
    <div className="flex items-center my-3.5">
      <IconButton
        onClick={onLike}
        icon={isLiked ? FcLike : FaRegHeart}
        signature={isLiked ? "Eliminate" : "Like"}
      />
      <p className="ml-1">{countLikes}</p>

      <IconButton
        onClick={() => setIsModalOpen(true)}
        icon={Users}
        signature="View all"
      />
    </div>
  );
};

export default PostLikes;
