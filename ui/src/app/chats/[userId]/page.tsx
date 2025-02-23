"use client";
import Avatar from "@/components/Avatar";
import { IUser } from "@/app/user/[slug]/page";
import { useEffect, useRef, useState } from "react";
import { IChat } from "../page";
import { chatsApi, usersApi } from "@/api";
import Spiner from "@/components/Spinner";
import ChatInput from "./ChatInput";
import formatDateString from "@/helpers/formatDateString";
import { useSocketStore } from "@/api/socketStore";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { IoCheckmarkOutline } from "react-icons/io5";

interface IProps {
  params: { userId: string };
}
export interface IComment {
  id?: number;
  message?: string;
  countLikes: number;
  postId?: number;
  parentId?: number;
  parent?: IComment;
  authId?: number;
  auth?: IUser;
  commentFiles?: any;
  children?: IComment[];
  createdAt?: string;
}

const Page = ({ params: { userId } }: IProps) => {
  const scrollChecker = useRef<HTMLUListElement | null>(null);
  const [messages, setMessages] = useState<IChat[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [page, setPage] = useState<any>(1);
  const [isLoading, setIsLoading] = useState(false);
  const [participant, setParticipant] = useState<IUser>();
  const { socket } = useSocketStore();

  async function loadParticipant() {
    const res = await usersApi.getOne(userId);
    setParticipant(res);
  }

  async function loadMessages(page = 1) {
    setIsLoading(true);
    const res = await chatsApi.getList({
      page,
      limit: 5,
      filters: { participantId: userId },
    });
    setMessages(
      res?.currentPage === 1 ? [...res?.items] : [...messages, ...res?.items]
    );
    setPage(res?.currentPage === res?.totalPages ? null : page);
    setIsFetching(false);
    setIsLoading(false);
  }

  async function markViewed() {
    await chatsApi.setViewed({
      participantId: userId,
    });
  }

  useEffect(() => {
    loadParticipant();
    loadMessages();
    markViewed();
  }, []);

  useEffect(() => {
    markViewed();
  }, [messages.length]);

  useEffect(() => {
    socket?.on("chat-message-added", (message) => {
      setMessages((prevMessages) => [message, ...prevMessages]);
    });

    socket?.on("chat-message-viewed", (toUserId) => {
      setMessages((prevMessages) => [
        ...prevMessages.map((m: IChat) =>
          m.toUserId === toUserId ? { ...m, isViewed: true } : m
        ),
      ]);
    });
  }, [socket]);

  const scrollHandler = () => {
    const checker = scrollChecker?.current;
    if (
      checker &&
      checker.scrollHeight + checker.scrollTop - checker.clientHeight < 200
    ) {
      setIsFetching(true);
    }
  };

  useEffect(() => {
    document.addEventListener("scroll", scrollHandler, true);

    return () => document.removeEventListener("scroll", scrollHandler, true);
  }, []);

  useEffect(() => {
    document.addEventListener("scroll", scrollHandler, true);

    return () => document.removeEventListener("scroll", scrollHandler, true);
  }, []);

  useEffect(() => {
    if (isFetching && !!page && !!messages?.length) {
      loadMessages(page + 1);
    }
  }, [isFetching]);

  return (
    <div className="min-h-screen">
      <div className="main-card flex flex-col">
        <section className="grow">
          <div className="bg-slate-200 p-1">
            {participant?.id && (
              <div className="flex items-center">
                <Avatar user={participant} />
                <p className="ml-2">{participant?.name}</p>
              </div>
            )}
          </div>
          <div className="flex justify-center h-10 mt-1">
            {isLoading && <Spiner />}
          </div>

          {!messages?.length && !isLoading && (
            <p className="text-center">Start chating </p>
          )}

          <ul
            ref={scrollChecker}
            className="gap-6 flex flex-col-reverse overflow-y-scroll mb-4"
            style={{ maxHeight: "500px" }}
          >
            {!!messages.length &&
              messages.map((chat: IChat) => (
                <li
                  className={`flex items-center p-1 w-10/12 ${
                    chat?.fromUser?.id !== +userId ? "ml-20" : ""
                  }`}
                  key={chat?.id}
                >
                  <Avatar user={chat?.fromUser} />
                  <div className="ml-3 w-full ">
                    <div
                      className="subtitle1"
                      dangerouslySetInnerHTML={{
                        __html: `<div>${chat.message}</div>`,
                      }}
                    ></div>
                    <div className="flex flex-row-reverse items-center">
                      <p className="subtitle2 text-neutral-400 ml-2">
                        {formatDateString(chat.createdAt)}
                      </p>
                      {chat?.fromUser?.id !== +userId ? (
                        chat?.isViewed ? (
                          <IoCheckmarkDoneOutline />
                        ) : (
                          <IoCheckmarkOutline className="icon-small" />
                        )
                      ) : null}
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        </section>
        <ChatInput afterSave={loadMessages} toUserId={+userId} />
      </div>
    </div>
  );
};

export default Page;
