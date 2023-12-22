import Avatar from "../Avatar";
import Link from "next/link";
import PostCardActions from "./PostCardActions";
import formatDate from "@/helpers/formatDate";

export interface IPost {
  id: number;
  message: string;
  isShowTags: boolean;
  countLikes: number;
  countComments: number;
  tags: string[];
  user: any;
  postFiles: any;
  createdAt: string;
}

interface IProps {
  post: IPost;
  withoutAvatar?: boolean;
}

function PostCard({ post, withoutAvatar }: IProps) {
  const isOverflowing =
    !!post?.postFiles?.length && post?.message?.length > 120;

  return (
    <li className="flex">
      {!withoutAvatar && <Avatar user={post?.user} />}
      <div className="w-60 md:w-96 p-4 rounded-2xl mx-auto bg-white ml-2 card hover:shadow-lg hover:border hover:border-gray-300 flex flex-col justify-between">
        <div className="flex flex-col justify-between h-full">
          <div>
            <time className="subtitle2 text-neutral-400 mb-1">
              {formatDate(post.createdAt)}
            </time>
            <Link
              href={`/posts/${post?.id}_${post?.tags
                ?.map((tag) => tag.slice(1))
                .join()}`}
            >
              <p className="subtitle1 text-slate-600">
                {isOverflowing
                  ? `${post.message.slice(0, 120)}...`
                  : post.message}
              </p>
            </Link>

            {!post?.isShowTags && (
              <p className="subtitle2">{post?.tags?.join(", ")}</p>
            )}
          </div>
          {!!post?.postFiles?.length && (
            <Link
              href={`/posts/${post?.id}_${post?.tags
                ?.map((tag) => tag.slice(1))
                .join()}`}
            >
              <img
                className="w-48 h-48 md:w-96 md:h-96"
                src={post?.postFiles[0]?.media?.path}
                alt={post?.tags[0]}
                style={{ objectFit: "cover" }}
              />
            </Link>
          )}
        </div>
        <PostCardActions post={post} />
      </div>
    </li>
  );
}

export default PostCard;
