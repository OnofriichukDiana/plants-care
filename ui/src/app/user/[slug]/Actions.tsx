"use client";
import { useEffect, useRef, useState } from "react";
import { IUser } from "./page";
import { useAuthStore } from "@/api/authStore";
import { userToUserApi } from "@/api";
import { IoMdSettings } from "react-icons/io";
import { useRouter } from "next/navigation";
import useNotification from "@/hooks/useNotification";
import Notification from "@/components/Notification";
import Modal from "@/components/Modal";
import Spiner from "@/components/Spinner";
import Avatar from "@/components/Avatar";
import formatDate from "@/helpers/formatDate";
import Link from "next/link";
import IconButton from "@/components/IconButton";
import { BsChatText } from "react-icons/bs";

interface IProps {
  user: IUser;
}

interface IUserToUsers {
  id: number;
  subscriberId?: number;
  subscriptionId?: number;
  subscriber?: IUser;
  subscription?: IUser;
  createdAt: string;
}

const Actions = ({ user }: IProps) => {
  const { me } = useAuthStore();
  const router = useRouter();
  const scrollChecker = useRef<HTMLUListElement | null>(null);
  const { notification, showNotification } = useNotification();

  const [isAuth, setIsAuth] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [countSubscribers, setCountSubscribers] = useState(
    user?.countSubscribers || 0
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [page, setPage] = useState<any>(1);
  const [isLoading, setIsLoading] = useState(false);
  const [userToUsers, setUserToUsers] = useState<IUserToUsers[]>([]);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    document.removeEventListener("scroll", () => scrollHandler(), true);
    document.addEventListener("scroll", () => scrollHandler(), true);

    if (me?.id === user.id) {
      setIsAuth(true);
    } else if (!!me) {
      isUserSubscribed();
    }
    return document.removeEventListener("scroll", () => scrollHandler(), true);
  }, [me, user.id]);

  useEffect(() => {
    if (isModalOpen) {
      loadUserToUsers();
    }
  }, [isModalOpen]);

  async function isUserSubscribed() {
    const _isSubscribed = await userToUserApi.isSubscribed(user?.id);
    setIsSubscribed(_isSubscribed);
  }

  async function loadUserToUsers(page = 1) {
    setIsLoading(true);
    const res = await userToUserApi.getList({
      filters,
      page,
      limit: 5,
    });

    setPage(res?.currentPage === res?.totalPages ? null : page);
    setUserToUsers(
      page === 1 ? [...res?.items] : [...userToUsers, ...res?.items]
    );
    setIsFetching(false);
    setIsLoading(false);
  }

  async function onSubscribe() {
    if (!me) {
      router.push("/signin");
    } else {
      if (isSubscribed) {
        setIsSubscribed(false);
        setCountSubscribers(countSubscribers - 1);
        const res = await userToUserApi.delete(user?.id);
        if (res?.error) {
          showNotification(res.error.message, "error");
        } else {
          showNotification("Unsubscribed", "success");
        }
      } else {
        setIsSubscribed(true);
        setCountSubscribers(countSubscribers + 1);
        const res = await userToUserApi.create({ subscriptionId: user?.id });
        if (res?.error) {
          showNotification(res.error.message, "error");
        } else {
          showNotification("Subscribed", "success");
        }
      }
    }
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
    if (isFetching && !!page) loadUserToUsers(page + 1);
  }, [isFetching]);

  return (
    <>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ul ref={scrollChecker}>
          {userToUsers?.map((utu: IUserToUsers) => {
            const user = utu?.subscriber || utu?.subscription;
            return (
              <li key={utu?.id} className="flex items-center mb-2">
                <Avatar user={user} withoutSignature />
                <p className="ml-2 body1 text-slate-600">{user?.name}</p>
                <time className="subtitle2 text-neutral-400 ml-3">
                  {formatDate(utu?.createdAt)}
                </time>
              </li>
            );
          })}
        </ul>
        {isLoading && (
          <div className="flex justify-center">
            <Spiner />
          </div>
        )}
      </Modal>
      {notification && (
        <Notification
          message={notification.message}
          type={notification?.type}
        />
      )}
      <div className="ml-2 flex items-center justify-center flex-wrap gap-2">
        <div className="flex items-center">
          <div className="mr-2 md:mr-10">
            <p className="h1 text-center">{countSubscribers}</p>
            <button
              disabled={countSubscribers === 0}
              type="button"
              onClick={() => {
                setIsModalOpen(true);
                setFilters({ subscriptionId: user?.id });
              }}
              className="icon-button"
            >
              Subscribers
            </button>
          </div>

          <div className="mr-5">
            <p className="h1 text-center">{user?.countSubscriptions}</p>
            <button
              disabled={user?.countSubscriptions === 0}
              type="button"
              onClick={() => {
                setIsModalOpen(true);
                setFilters({ subscriberId: user?.id });
              }}
              className="icon-button"
            >
              Subscriptions
            </button>
          </div>
        </div>

        {isAuth && (
          <Link href={`/user/settings`}>
            <IoMdSettings className="icon-medium" />
          </Link>
        )}
        {!isAuth && (
          <div className="mr-5 flex items-center">
            <button className="mr-3 h-fit" type="button" onClick={onSubscribe}>
              {isSubscribed ? "Unsubscribe" : "Subscribe"}
            </button>
            <IconButton
              onClick={() => router.push(`/chats/${user.id}`)}
              icon={BsChatText}
              signature="Chats"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Actions;
