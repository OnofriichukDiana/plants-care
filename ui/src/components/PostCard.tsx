import Image from "next/image";
import Avatar from "./Avatar";

export type PostItemType = {
  id: number;
  message?: string;
  isShowTags: boolean;
  tags: string[];
  user: any;
  postFiles: any;
};
interface IProps {
  post: PostItemType;
}

function PostCard({ post }: IProps) {
  console.log(post?.postFiles[0]?.media?.path);
  return (
    <li className="flex mt-10">
      <Avatar user={post?.user} />
      <div className="w-96 p-2 rounded-2xl mx-auto bg-white ml-2 card">
        <p className="body1 text-slate-600">{post.message}</p>
        {!post?.isShowTags && (
          <p className="subtitle2">{post?.tags?.join(", ")}</p>
        )}
        {!!post?.postFiles?.length && (
          <Image
            src={post?.postFiles[0]?.media?.path}
            alt={post?.tags[0]}
            width={100}
            height={100}
          />
        )}
      </div>
    </li>
  );
}

export default PostCard;
