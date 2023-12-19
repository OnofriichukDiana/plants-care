"use client";
import { postLikesApi } from "@/api";
import { useAuthStore } from "@/api/authStore";
import Avatar from "@/components/Avatar";
import IconButton from "@/components/IconButton";
import Modal from "@/components/Modal";
import { PostItemType } from "@/components/PostCard";
import formatDate from "@/helpers/formatDate";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { FcLike } from "react-icons/fc";

interface IProps {
  post: PostItemType;
}

interface ILike {
  id?: number;
  auth?: any;
  createdAt: string;
}
interface ILikes {
  items: ILike[];
}

const PostLikes = ({ post }: IProps) => {
  const router = useRouter();
  const { me } = useAuthStore();
  const scrollChecker = useRef<HTMLUListElement | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState<ILike[]>([]);
  const [countLikes, setCountLikes] = useState(post?.countLikes);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [page, setPage] = useState<any>(1);

  const loadLikes = async (page = 1) => {
    const res = await postLikesApi.getList({
      filters: { postId: post.id },
      page,
      limit: 5,
    });

    setPage(res?.currentPage === res?.totalPages ? null : page);
    setLikes(page === 1 ? [...res?.items] : [...likes, ...res?.items]);
    setIsFetching(false);
  };

  const isPostLiked = async () => {
    if (!!post?.id && !!me) {
      const _isLiked = await postLikesApi.isLiked(post.id);
      setIsLiked(_isLiked);
    }
  };

  useEffect(() => {
    if (!!post?.id) {
      isPostLiked();
      document.removeEventListener("scroll", () => scrollHandler(), true);
      document.addEventListener("scroll", () => scrollHandler(), true);
      loadLikes();
      return document.removeEventListener(
        "scroll",
        () => scrollHandler(),
        true
      );
    }
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
      loadLikes();
    }
  };

  const scrollHandler = () => {
    const checker = scrollChecker?.current;
    if (
      checker &&
      checker.getBoundingClientRect().bottom <= window.innerHeight
    ) {
      setIsFetching(true);
    }
  };

  useEffect(() => {
    if (isFetching && !!page) loadLikes(page + 1);
  }, [isFetching]);

  const Users = () => {
    const initStyles = "absolute avatar w-8 h-8";
    return (
      <ul className="ml-5 w-6 h-6 flex relative">
        <li
          className={`${initStyles} z-30 top-0 left-0`}
          style={{ background: likes[0]?.auth?.avatarBackground }}
        >
          <Image
            src={`/images/${likes[0]?.auth?.icon}.svg`}
            alt="icon"
            width={18}
            height={18}
          />
        </li>
        <li
          className={`${initStyles} z-20 top-0 left-4`}
          style={{
            background: !!likes[1]
              ? likes[1]?.auth?.avatarBackground
              : "rgb(226 232 240)",
          }}
        >
          {!!likes[1] && (
            <Image
              src={`/images/${likes[1]?.auth?.icon}.svg`}
              alt="icon"
              width={18}
              height={18}
            />
          )}
        </li>
        <li
          className={`${initStyles} top-0 left-8`}
          style={{
            background: !!likes[2]
              ? likes[2]?.auth?.avatarBackground
              : "rgb(226 232 240)",
          }}
        >
          {!!likes[2] && (
            <Image
              src={`/images/${likes[1]?.auth?.icon}.svg`}
              alt="icon"
              width={18}
              height={18}
            />
          )}
        </li>
      </ul>
    );
  };

  return (
    <>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ul ref={scrollChecker}>
          {likes?.map((like) => (
            <li key={like?.id} className="flex items-center mb-2">
              <Avatar user={like?.auth} withoutSignature />
              <p className="ml-2 body1 text-slate-600">{like?.auth?.name}</p>
              <p className="subtitle2 text-neutral-400 ml-3">
                {formatDate(like?.createdAt)}
              </p>
            </li>
          ))}
        </ul>
      </Modal>
      <div className="flex items-center my-3.5">
        <IconButton
          onClick={onLike}
          icon={isLiked ? FcLike : FaRegHeart}
          signature={isLiked ? "Eliminate" : "Like"}
        />
        <p className="ml-1">{countLikes}</p>

        {!!likes?.length && (
          <IconButton
            onClick={() => setIsModalOpen(true)}
            icon={Users}
            signature="View all"
          />
        )}
      </div>
    </>
  );
};

export default PostLikes;
