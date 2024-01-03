"use client";
import { FaRegHeart } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { IPost } from ".";
import IconButton from "../IconButton";
import { FaRegCommentDots } from "react-icons/fa";
import { CiSquarePlus } from "react-icons/ci";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { postLikesApi } from "@/api";
import ImageGallery from "../imageGallery";
import { useAuthStore } from "@/api/authStore";

interface IProps {
  post: IPost;
}

function PostCardActions({ post }: IProps) {
  const router = useRouter();
  const { me } = useAuthStore();
  const [isLiked, setIsLiked] = useState(false);
  const [countLikes, setCountLikes] = useState(0);
  const [isImageGalleryOpen, setIsImageGalleryOpen] = useState(false);

  const isPostLiked = async () => {
    if (!!post?.id && !!me) {
      const _isLiked = await postLikesApi.isLiked(post.id);
      setIsLiked(_isLiked);
    }
  };

  useEffect(() => {
    if (!!post?.countLikes) {
      setCountLikes(post?.countLikes);
    }
  }, [post?.countLikes]);

  useEffect(() => {
    isPostLiked();
  }, [post, me]);

  const onLike = async () => {
    if (!me) {
      router.push("/signin");
    } else {
      if (isLiked) {
        setIsLiked(false);
        await postLikesApi.delete(post.id);
        setCountLikes(post.countLikes - 1);
      } else {
        setIsLiked(true);
        setCountLikes(post.countLikes + 1);
        await postLikesApi.create({ postId: post.id });
      }
    }
  };

  const galleryPreview = () => (
    <ul className="flex items-center relative">
      <li>
        <img
          className="z-30 relative w-6 h-6 md:w-12 md:h-12  border border-slate-400"
          src={post?.postFiles[1]?.media?.path}
          alt={post?.tags[0]}
          style={{ objectFit: "cover", transform: "rotate(-12deg)" }}
        />
      </li>
      <li>
        {post?.postFiles[2] ? (
          <img
            className="absolute z-20 top-0 left-8 w-6 h-6 md:w-12 md:h-12 border-1 border-slate-400"
            src={post?.postFiles[2]?.media?.path}
            alt={post?.tags[0]}
            style={{ objectFit: "cover" }}
          />
        ) : (
          <div className="absolute z-20 top-0 left-8 w-6 h-6 md:w-12 md:h-12  bg-slate-200 border border-slate-400"></div>
        )}
      </li>
      <li>
        {post?.postFiles[3] ? (
          <img
            className="relative w-6 h-6 md:w-14 md:h-14 border border-slate-400"
            src={post?.postFiles[3]?.media?.path}
            alt={post?.tags[0]}
            style={{ objectFit: "cover", transform: "rotate(12deg)" }}
          />
        ) : (
          <div className="relative w-6 h-6 md:w-12 md:h-12  bg-slate-200 rotate-12 border border-slate-400"></div>
        )}
      </li>
      {post?.postFiles[4] && <CiSquarePlus className="icon-medium" />}
    </ul>
  );

  return (
    <div className="h-10 md:h-16 flex justify-between items-center mt-2 bg-slate-50 p-3">
      <ImageGallery
        isOpen={isImageGalleryOpen}
        onClose={() => setIsImageGalleryOpen(false)}
        images={post?.postFiles}
      />
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
          onClick={() => setIsImageGalleryOpen(true)}
          icon={galleryPreview}
          signature="View"
        />
      )}

      <div className="flex">
        <IconButton
          onClick={() =>
            router.push(
              `/posts/${post?.id}_${post?.tags
                ?.map((tag) => tag.slice(1))
                .join()}`
            )
          }
          icon={FaRegCommentDots}
          signature="Comments"
        />
        <p className="ml-1">{post?.countComments}</p>
      </div>
    </div>
  );
}

export default PostCardActions;
