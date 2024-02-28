"use client";
import { useEffect, useRef, useState } from "react";
import Spiner from "@/components/Spinner";
import PostCard, { IPost } from "@/components/postCard";
import { chatsApi } from "@/api";
import PostInput from "@/components/PostInput";
import { useAuthStore } from "@/api/authStore";
import { IUser } from "../user/[slug]/page";
import Avatar from "@/components/Avatar";
import Link from "next/link";
import formatDateString from "@/helpers/formatDateString";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { IoCheckmarkOutline } from "react-icons/io5";
import { useSocketStore } from "@/api/socketStore";

export interface IChat {
  id?: number;
  message?: string;
  isViewed?: boolean;
  toUserId?: number;
  fromUserId?: number;
  fromUser?: IUser;
  toUser?: IUser;
  createdAt?: string;
}

const Page = () => {
  const scrollChecker = useRef<HTMLUListElement | null>(null);

  const { me, isLoading: isMeLoading } = useAuthStore();

  const [chats, setChats] = useState<IChat[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [page, setPage] = useState<any>(1);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState<any>([]);
  const { socket } = useSocketStore();

  async function loadChats(page = 1) {
    setIsLoading(true);
    const res = await chatsApi.getList({ page, limit: 10, filters });
    setChats(
      res?.currentPage === 1 ? [...res?.items] : [...chats, ...res?.items]
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
      loadChats();
    }
  }, [filters, isMeLoading]);

  useEffect(() => {
    if (isFetching && !!page && !!chats?.length) loadChats(page + 1);
  }, [isFetching]);

  useEffect(() => {
    socket?.on("chat-message-added", (message) => {
      console.log(message);
      setChats((prevChat) => [
        ...prevChat.map((c: IChat) =>
          c?.fromUserId === message?.fromUserId ? message : c
        ),
      ]);
    });
  }, [socket]);

  useEffect(() => {
    console.log(chats);
  }, [chats]);

  return (
    <div className="min-h-screen">
      <div className="main-card">
        {/* <PostInput afterSave={loadPosts} /> */}
        <section>
          {!chats?.length && !isLoading && !isMeLoading && (
            <p className="text-center">Nothing not found</p>
          )}
          <ul ref={scrollChecker} className="gap-6">
            {chats.map((chat: IChat) => (
              <li
                key={chat.id}
                className={`${
                  chat?.toUserId === me?.id && !chat?.isViewed
                    ? "bg-red-200"
                    : "bg-slate-200"
                } p-2 my-1 `}
              >
                <Link
                  href={`/chats/${
                    chat?.fromUser?.id === me?.id
                      ? chat?.toUser?.id
                      : chat?.fromUser?.id
                  }`}
                  className="flex items-center"
                >
                  <Avatar
                    user={
                      chat?.fromUser?.id === me?.id
                        ? chat?.toUser
                        : chat?.fromUser
                    }
                  />
                  <div className="ml-3 w-full">
                    <div
                      className="subtitle1 max-h-12 overflow-hidden"
                      dangerouslySetInnerHTML={{
                        __html: `${
                          chat?.fromUser?.id === me?.id
                            ? "you"
                            : chat?.fromUser?.name
                        }<div>${chat.message}</div>`,
                      }}
                    ></div>
                    <div className="flex flex-row-reverse items-center">
                      <p className="subtitle2 text-neutral-400 ml-2">
                        {formatDateString(chat.createdAt)}
                      </p>
                      {chat?.fromUser?.id === +me.id ? (
                        chat?.isViewed ? (
                          <IoCheckmarkDoneOutline />
                        ) : (
                          <IoCheckmarkOutline className="icon-small" />
                        )
                      ) : null}
                    </div>
                  </div>
                </Link>
              </li>
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
