"use client";
import { useAuthStore } from "../../api/authStore";
import Avatar from "../Avatar";
import { useRouter } from "next/navigation";
import { authApi } from "@/api/authApi";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import logOut from "../../../public/images/log-out.svg";
import logIn from "../../../public/images/log-in.svg";
import IconButton from "../IconButton";
import { BsChatText } from "react-icons/bs";
import { chatsApi } from "@/api";
import { useSocketStore } from "@/api/socketStore";

const UserInfo = () => {
  let { me, clearUser, isLoading, setIsLoading } = useAuthStore();
  const { initializeSocket, disconnectSocket, socket } = useSocketStore();

  const [unreadCount, setUnreadCount] = useState(0);

  const router = useRouter();

  const hendleLogOut = () => {
    Cookies.remove(process.env.NEXT_PUBLIC_AUTH_COOKIE || "");
    clearUser();
    router.push("/signin");
  };

  const fetchMe = async () => {
    setIsLoading(true);
    const res: any = await authApi.me();
    if (res?.id) {
      me = res;
    }
    setIsLoading(false);
  };

  async function loadCountUnreadedChats() {
    const res = await chatsApi.countUnreadedMessages();
    setUnreadCount(res);
  }

  useEffect(() => {
    const token = Cookies.get(process.env.NEXT_PUBLIC_AUTH_COOKIE || "");
    if (!me && !!token) fetchMe();
  }, []);

  useEffect(() => {
    if (me?.id) {
      loadCountUnreadedChats();

      initializeSocket(me.id);

      return () => {
        disconnectSocket();
      };
    }
  }, [me?.id]);

  useEffect(() => {
    if (!!socket) {
      socket.on("chat-message-added", (message) => {
        setUnreadCount((prevCount) => prevCount + 1);
      });
    }
  }, [socket]);

  const chatIcon = () => (
    <>
      {unreadCount > 0 ? (
        <div className="relative">
          <BsChatText className="icon-medium" />
          <div className="absolute top-3 left-4 p-1 bg-red-600 text-white text-xs rounded">
            +{unreadCount}
          </div>
        </div>
      ) : (
        <BsChatText className="icon-medium" />
      )}
    </>
  );

  return (
    <div>
      {!!me && !isLoading ? (
        <div className="flex items-center">
          <div className="mr-5 flex items-center">
            <Avatar user={me} />
            <div className="ml-3">
              <IconButton
                onClick={() => router.push("/chats")}
                icon={chatIcon}
                signature="Chats"
              />
            </div>
          </div>
          <IconButton
            onClick={hendleLogOut}
            iconName={logOut}
            signature="Log out"
          />
        </div>
      ) : (
        <IconButton
          onClick={() => router.push("/signin")}
          iconName={logIn}
          signature="Log in"
        />
      )}
    </div>
  );
};
export default UserInfo;
