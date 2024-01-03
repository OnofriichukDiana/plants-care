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
  const isOverflowing = !!post?.postFiles?.length && post?.message?.length > 50;

  return (
    <li className="flex mb-2">
      {!withoutAvatar && <Avatar user={post?.user} />}
      <div className="w-72 p-4 rounded-2xl mx-auto bg-white ml-2 card flex flex-col justify-between">
        <article className="flex flex-col justify-between h-full">
          <div>
            <time className="subtitle2 text-neutral-400 mb-1">
              {formatDate(post.createdAt)}
            </time>
            <Link
              href={`/posts/${post?.id}_${post?.tags
                ?.map((tag) => tag.slice(1))
                .join()}`}
            >
              <div
                className="subtitle1 max-h-80 overflow-hidden"
                dangerouslySetInnerHTML={{
                  __html:
                    (isOverflowing
                      ? `<div>${post.message.slice(0, 50)}...</div>`
                      : post.message) || "<p></p>",
                }}
              ></div>
            </Link>

            {!post?.isShowTags && (
              <ul>
                {post?.tags?.map((tag: string) => (
                  <li className="inline subtitle2 link" key={tag}>
                    <Link href={`/?filter=${tag.slice(1)}`}>{tag} </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {!!post?.postFiles?.length && (
            <Link
              href={`/posts/${post?.id}_${post?.tags
                ?.map((tag) => tag.slice(1))
                .join()}`}
            >
              <img
                className="w-72 h-72"
                src={post?.postFiles[0]?.media?.path}
                alt={post?.tags[0]}
                style={{ objectFit: "cover" }}
              />
            </Link>
          )}
        </article>
        <PostCardActions post={post} />
      </div>
    </li>
  );
}

export default PostCard;
