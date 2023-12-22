"use client";
import { commentLikesApi } from "@/api";
import { useAuthStore } from "@/api/authStore";
import Avatar from "@/components/Avatar";
import IconButton from "@/components/IconButton";
import Modal from "@/components/Modal";
import UsersPreview from "@/components/UsersPreview";
import formatDate from "@/helpers/formatDate";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { IComment } from "./page";
import Spiner from "@/components/Spinner";
import { IUser } from "@/app/user/[slug]/page";

interface IProps {
  comment: IComment;
}

interface ILike {
  id?: number;
  auth?: IUser;
  createdAt: string;
}

const CommentLikes = ({ comment }: IProps) => {
  const router = useRouter();
  const { me } = useAuthStore();
  const scrollChecker = useRef<HTMLUListElement | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState<ILike[]>([]);
  const [countLikes, setCountLikes] = useState(comment?.countLikes);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [page, setPage] = useState<any>(1);
  const [isLoading, setIsLoading] = useState(false);

  const loadLikes = async (page = 1) => {
    setIsLoading(true);
    const res = await commentLikesApi.getList({
      filters: { commentId: comment.id },
      page,
      limit: 5,
    });

    setPage(res?.currentPage === res?.totalPages ? null : page);
    setLikes(page === 1 ? [...res?.items] : [...likes, ...res?.items]);
    setIsFetching(false);
    setIsLoading(false);
  };

  const isCommentLiked = async () => {
    if (!!comment?.id && !!me) {
      const _isLiked = await commentLikesApi.isLiked(comment.id);
      setIsLiked(_isLiked);
    }
  };

  useEffect(() => {
    if (!!comment?.id) {
      isCommentLiked();
      document.removeEventListener("scroll", () => scrollHandler(), true);
      document.addEventListener("scroll", () => scrollHandler(), true);
      loadLikes();
      return document.removeEventListener(
        "scroll",
        () => scrollHandler(),
        true
      );
    }
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

  const UsersIcon = () => <UsersPreview entitiesArray={likes} />;

  return (
    <>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ul ref={scrollChecker}>
          {likes?.map((like) => (
            <li key={like?.id} className="flex items-center mb-2">
              <Avatar user={like?.auth} withoutSignature />
              <p className="ml-2 body1 text-slate-600">{like?.auth?.name}</p>
              <time className="subtitle2 text-neutral-400 ml-3">
                {formatDate(like?.createdAt)}
              </time>
            </li>
          ))}
        </ul>
        {isLoading && (
          <div className="flex justify-center">
            <Spiner />
          </div>
        )}
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
            icon={UsersIcon}
            signature="View all"
          />
        )}
      </div>
    </>
  );
};

export default CommentLikes;
