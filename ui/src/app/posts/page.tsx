import { postsApi } from "@/api";
import PostCard, { PostItemType } from "@/components/PostCard";
import PostInput from "@/components/PostInput";

const Page = async () => {
  const res = await postsApi.getList({});
  return (
    <div className="dc min-h-screen">
      <div className="main-card">
        <PostInput />
        <ul className="flex flex-wrap gap-4">
          {res?.items?.length > 0 &&
            res.items.map((post: PostItemType) => (
              <PostCard key={post.id} post={post} />
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Page;
