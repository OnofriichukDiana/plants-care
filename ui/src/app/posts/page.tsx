"use client";
import { useEffect, useRef, useState } from "react";
import Spiner from "@/components/Spinner";
import PostCard, { IPost } from "@/components/postCard";
import { postsApi } from "@/api";
import PostInput from "@/components/PostInput";

const Page = () => {
  const scrollChecker = useRef<HTMLUListElement | null>(null);

  const [posts, setPosts] = useState<IPost[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [page, setPage] = useState<any>(1);
  const [isLoading, setIsLoading] = useState(false);

  async function loadPosts(page = 1) {
    setIsLoading(true);
    const res = await postsApi.getList({ page, limit: 8 });
    setPosts([...posts, ...res?.items]);
    setPage(res?.currentPage === res?.totalPages ? null : page);
    setIsFetching(false);
    setIsLoading(false);
  }

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
    loadPosts();
    document.addEventListener("scroll", scrollHandler, true);

    return () => document.removeEventListener("scroll", scrollHandler, true);
  }, []);

  useEffect(() => {
    if (isFetching && !!page) loadPosts(page + 1);
  }, [isFetching]);

  return (
    <div className="dc min-h-screen">
      <div className="main-card">
        <PostInput afterSave={loadPosts} />
        <section>
          <ul ref={scrollChecker} className="flex flex-wrap gap-6">
            {posts.map((post: IPost) => (
              <PostCard key={post.id} post={post} />
            ))}
          </ul>
        </section>
        {isLoading && (
          <div className="flex justify-center">
            <Spiner />
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
