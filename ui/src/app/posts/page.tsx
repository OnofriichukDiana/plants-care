"use client";
import { useEffect, useRef, useState } from "react";
import Spiner from "@/components/Spinner";
import PostCard, { IPost } from "@/components/postCard";
import { postsApi } from "@/api";
import PostInput from "@/components/PostInput";
import { useAuthStore } from "@/api/authStore";

const Page = () => {
  const scrollChecker = useRef<HTMLUListElement | null>(null);

  const { me, isLoading: isMeLoading } = useAuthStore();

  const [posts, setPosts] = useState<IPost[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [page, setPage] = useState<any>(1);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState<any>(
    me?.countSubscriptions > 0 ? { subscriberId: me?.id } : null
  );
  const [currentTab, setCurrentTab] = useState("Subscriptions");

  async function loadPosts(page = 1) {
    setIsLoading(true);
    const res = await postsApi.getList({ page, limit: 10, filters });
    setPosts(
      res?.currentPage === 1 ? [...res?.items] : [...posts, ...res?.items]
    );
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
    document.addEventListener("scroll", scrollHandler, true);

    return () => document.removeEventListener("scroll", scrollHandler, true);
  }, []);

  useEffect(() => {
    if (!isMeLoading) {
      loadPosts();
    }
  }, [filters, isMeLoading]);

  useEffect(() => {
    if (me?.countSubscriptions > 0) {
      setFilters({ subscriberId: me?.id });
    }
  }, [me]);

  useEffect(() => {
    if (isFetching && !!page && !!posts?.length) loadPosts(page + 1);
  }, [isFetching]);

  return (
    <div className="dc min-h-screen">
      <div className="main-card">
        <PostInput afterSave={loadPosts} />
        <section>
          {me?.countSubscriptions > 0 && (
            <nav className="flex flex-col items-center mb-7 border-b border-gray-300">
              <ul className="flex">
                <li
                  className={`link h4 mr-3 cursor-pointer ${
                    currentTab === "Subscriptions" ? "active-tab" : ""
                  }`}
                  onClick={() => {
                    setFilters({ subscriberId: me?.id });
                    setCurrentTab("Subscriptions");
                  }}
                >
                  Subscriptions
                </li>
                <li
                  className={`link h4 mr-3 cursor-pointer ${
                    currentTab === "Newest" ? "active-tab" : ""
                  }`}
                  onClick={() => {
                    setFilters(null);
                    setCurrentTab("Newest");
                  }}
                >
                  Newest
                </li>
              </ul>
            </nav>
          )}
          {!posts?.length && isLoading && !isMeLoading && (
            <p className="text-center">Nothing not found</p>
          )}
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
