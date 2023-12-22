"use client";
import { useEffect, useState } from "react";
import Avatar from "./Avatar";
import { postsApi, usersApi } from "@/api";
import PostCard, { IPost } from "./postCard";
import { IoIosSearch } from "react-icons/io";
import Spiner from "./Spinner";
import { IUser } from "@/app/user/[slug]/page";

type FiltersType = {
  nameOrTags?: string | null;
};

let timer: any;

function Search() {
  const [result, setResult] = useState<IUser[] | IPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState<FiltersType>({});

  async function loadData() {
    setIsLoading(true);
    const [postsResponse, usersResponse] = await Promise.all([
      postsApi.getList({ filters }),
      usersApi.getList({ filters }),
    ]);

    const posts = postsResponse?.items || [];
    const users = usersResponse?.items || [];

    setResult([...posts, ...users]);
    setIsLoading(false);
  }

  const debouncedLoadFiltered = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      loadData();
    }, 500);
  };

  useEffect(() => {
    if (!!filters?.nameOrTags?.trim()) {
      debouncedLoadFiltered();
    }
  }, [filters]);

  return (
    <div className="w-full">
      <div className="relative w-4/6 mx-auto mb-5 md:mb-10">
        <input
          onChange={(e) => {
            setFilters({ nameOrTags: e.target.value });
          }}
          placeholder="search post or user"
          value={filters?.nameOrTags || ""}
          type="text"
          className="w-full h-11 md:h-14 p-3"
        />
        <IoIosSearch className="icon-medium absolute top-3 right-1.5" />
      </div>

      {!!filters?.nameOrTags && (
        <div
          className="w-4/6 rounded-xl mx-auto p-5 md:p-10 z-5 flex flex-col items-center"
          style={{
            boxShadow:
              "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
          }}
        >
          {isLoading && (
            <div className="flex justify-center">
              <Spiner />
            </div>
          )}
          {!!result.length &&
            result.map((item: any) =>
              item?.tags ? (
                <PostCard key={item?.id} post={item} />
              ) : (
                <div key={item?.id} className="flex items-center">
                  <Avatar user={item} />
                  <p className="body1 ml-2">{item.name}</p>
                </div>
              )
            )}
          {!result.length && <p className="body1">Not found</p>}
        </div>
      )}
    </div>
  );
}

export default Search;
