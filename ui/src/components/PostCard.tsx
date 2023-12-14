import Image from "next/image";
import Avatar from "./Avatar";
import { formatDistanceToNow, isValid, parseISO } from "date-fns";
import Link from "next/link";
import { IoHeartOutline } from "react-icons/io5";
import PostCardActions from "./PostCardActions";

export type PostItemType = {
  id: number;
  message: string;
  isShowTags: boolean;
  countLikes: number;
  countComments: number;
  tags: string[];
  user: any;
  postFiles: any;
  createdAt: string;
};

// export type UserType = {
//   id: number;
//   name?: string;
//   isShowTags: boolean;
//   tags: string[];
//   user: any;
//   postFiles: any;
//   updatedAt: string;
// };

interface IProps {
  post: PostItemType;
}

function PostCard({ post }: IProps) {
  console.log(post);

  const formattedDate = (createdAt: string) => {
    const parsedDate = parseISO(createdAt);
    if (!isValid(parsedDate)) {
      return createdAt;
    }
    return formatDistanceToNow(parsedDate, { addSuffix: true });
  };
  const isOverflowing =
    !!post?.postFiles?.length && post?.message?.length > 120;

  return (
    <li className="flex mt-10">
      <Avatar user={post?.user} />
      <div className="w-48 md:w-96 p-4 rounded-2xl mx-auto bg-white ml-2 card hover:shadow-lg hover:border hover:border-gray-300 flex flex-col justify-between">
        <div>
          <p className="subtitle2 text-neutral-400 mb-1">
            {formattedDate(post.createdAt)}
          </p>
          <Link href="/your-target-page">
            <p className={`body1 text-slate-600`}>
              {isOverflowing
                ? `${post.message.slice(0, 120)}...`
                : post.message}
            </p>
          </Link>
          {!post?.isShowTags && (
            <p className="subtitle2">{post?.tags?.join(", ")}</p>
          )}
          {!!post?.postFiles?.length && (
            <img
              className="w-48 h-48 md:w-96 md:h-96 "
              src={post?.postFiles[0]?.media?.path}
              alt={post?.tags[0]}
              style={{ objectFit: "cover" }}
            />
          )}
        </div>
        <PostCardActions post={post} />
      </div>
    </li>
  );
}

export default PostCard;
