"use client";
import { postLikesApi } from "@/api";
import { useAuthStore } from "@/api/authStore";
import { IUser } from "@/app/user/[slug]/page";
import Avatar from "@/components/Avatar";
import IconButton from "@/components/IconButton";
import Modal from "@/components/Modal";
import { IPost } from "@/components/postCard";
import Spiner from "@/components/Spinner";
import UsersPreview from "@/components/UsersPreview";
import formatDate from "@/helpers/formatDate";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { FcLike } from "react-icons/fc";

interface IProps {
  post: IPost;
}

interface ILike {
  id?: number;
  auth?: IUser;
  createdAt: string;
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
  const [isLoading, setIsLoading] = useState(false);

  const loadLikes = async (page = 1) => {
    setIsLoading(true);
    const res = await postLikesApi.getList({
      filters: { postId: post.id },
      page,
      limit: 5,
    });

    setPage(res?.currentPage === res?.totalPages ? null : page);
    setLikes(page === 1 ? [...res?.items] : [...likes, ...res?.items]);
    setIsFetching(false);
    setIsLoading(false);
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
    console.log(me);
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

export default PostLikes;
