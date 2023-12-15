import { postsApi } from "@/api";
import Avatar from "@/components/Avatar";
import getIdFromSlug from "@/helpers/getIdFromSlug";
import PostLikes from "./PostLikes";

interface IProps {
  params: { slug: string };
}
const Page = async ({ params: { slug } }: IProps) => {
  const id = getIdFromSlug(slug);
  const post = await postsApi.getOne(id);
  console.log(post);

  return (
    <div className="dc min-h-screen">
      <div className="main-card">
        <div className="flex">
          <Avatar user={post?.user} size={6} />
          <div className="ml-3">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
