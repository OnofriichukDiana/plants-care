"use client";
import { useEffect, useState } from "react";
import Avatar from "./Avatar";
import { postsApi, usersApi } from "@/api";
import PostCard, { IPost } from "./postCard";
import { IoIosSearch } from "react-icons/io";
import Spiner from "./Spinner";
import { IUser } from "@/app/user/[slug]/page";
import { useSearchParams } from "next/navigation";
import { useOutsideClick } from "@/hooks/useOutsideClick";

type FiltersType = {
  nameOrTags?: string | null;
};

let timer: any;

function Search() {
  const searchParams = useSearchParams();
  const nameOrTags = searchParams.get("filter");
  const [result, setResult] = useState<IUser[] | IPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState<FiltersType>({ nameOrTags });
  const [isShowMenu, setIsShowMenu] = useState(false);

  const ref = useOutsideClick<HTMLDivElement>(() => setIsShowMenu(false));

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
      setIsShowMenu(true);
    }
  }, [filters]);

  return (
    <section ref={ref} className="relative w-full">
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

      {isShowMenu && (
        <div
          className="absolute w-full md:w-4/6 z-40 origin-center rounded-xl p-5 md:p-10 flex flex-col items-center bg-white"
          style={{
            boxShadow:
              "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
            left: "50%",
            transform: "translate(-50%, 0)",
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
                <div key={item?.id} className="flex items-center mt-4">
                  <Avatar user={item} />
                  <p className="body1 ml-2">{item.name}</p>
                </div>
              )
            )}
          {!result.length && !isLoading && <p className="body1">Not found</p>}
        </div>
      )}
    </section>
  );
}

export default Search;
