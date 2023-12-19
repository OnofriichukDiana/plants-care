import { postCommentsApi, postsApi } from "@/api";
import Avatar from "@/components/Avatar";
import getIdFromSlug from "@/helpers/getIdFromSlug";
import PostLikes from "./PostLikes";
import DeletePost from "./DeletePost";
import CommentInput from "./CommentInput";
import CommentActions from "./CommentActions";
import formatDate from "@/helpers/formatDate";
import Link from "next/link";
import FilesList from "./FilesList";

interface IProps {
  params: { slug: string };
}
export interface IComment {
  id?: number;
  message?: string;
  countLikes: number;
  postId?: number;
  parentId?: number;
  parent?: IComment;
  authId?: number;
  auth?: any;
  commentFiles?: any;
  children?: IComment[];
  createdAt?: string;
}

interface ReturnType extends IComment {
  padding: number;
  children: Array<ReturnType>;
}

const arrayToTree = (
  arr: IComment[],
  parentId: number | null = null,
  padding: number = 1
): Array<ReturnType> => {
  return arr
    .filter((item: IComment) => item?.parentId === parentId)
    .map((child: IComment) => ({
      ...child,
      padding,
      children: arrayToTree(arr, child.id, padding + 70),
    }));
};

const Page = async ({ params: { slug } }: IProps) => {
  const id = getIdFromSlug(slug);
  const post = await postsApi.getOne(id);
  const postComments = await postCommentsApi.getList({
    filters: { postId: post.id },
  });
  const tree = arrayToTree(postComments);

  const renderTree = (nodes: ReturnType) => {
    return (
      <li
        key={nodes.id}
        className="w-full mb-2 mt-2"
        style={{ paddingLeft: nodes.padding }}
      >
        <div className="flex">
          <Avatar user={nodes?.auth} />
          <div className="ml-2 w-full">
            <div className="flex justify-between">
              <div style={{ maxWidth: "85%" }}>
                <p className="subtitle1 text-slate-600">
                  {nodes.parentId && (
                    <Link href={`/`} style={{ color: "#2f6a48" }}>
                      @
                      {
                        postComments.find(
                          (com: IComment) => com.id === nodes.parentId
                        ).auth.name
                      }
                    </Link>
                  )}{" "}
                  {nodes?.message}
                </p>
                {!!nodes?.commentFiles.length && (
                  <FilesList files={nodes?.commentFiles} />
                )}
              </div>
              {!!nodes?.createdAt && (
                <p className="subtitle2 text-neutral-400 mb-1">
                  {formatDate(nodes?.createdAt)}
                </p>
              )}
            </div>
            <CommentActions comment={nodes} postId={post.id} />
          </div>
        </div>
        <ul>
          {Array.isArray(nodes.children)
            ? nodes.children.map((node) => renderTree(node))
            : null}
        </ul>
      </li>
    );
  };

  return (
    <div className="dc min-h-screen">
      <div className="main-card">
        <div className="flex">
          <Avatar user={post?.user} size={6} />
          <div className="ml-3 flex justify-between w-full">
            <div className="w-full">
              <p className="body1 text-slate-600 mb-2">{post?.message}</p>
              {!post?.isShowTags && (
                <p className="subtitle1 mb-2">{post?.tags?.join(", ")}</p>
              )}
              {!!post?.postFiles?.length && (
                <ul className="flex flex-wrap gap-4">
                  {post?.postFiles?.map((file: any) => (
                    <li key={file?.id}>
                      <img
                        className="w-48 h-48 md:w-96 md:h-96 "
                        src={file?.media?.path}
                        alt={post?.tags[0]}
                        style={{ objectFit: "cover" }}
                      />
                    </li>
                  ))}
                </ul>
              )}
              <PostLikes post={post} />
              <CommentInput postId={post.id} />
              <ul className="w-full mt-8">
                {tree?.length > 0 &&
                  tree.map((comment: ReturnType) => renderTree(comment))}
              </ul>
            </div>
            <DeletePost post={post} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
