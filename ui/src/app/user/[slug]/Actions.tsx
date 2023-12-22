"use client";
import { useEffect, useState } from "react";
import { IUser } from "./page";
import { useAuthStore } from "@/api/authStore";
import { userToUserApi } from "@/api";
import IconButton from "@/components/IconButton";
import { IoMdSettings } from "react-icons/io";
import { useRouter } from "next/router";
import useNotification from "@/helpers/useNotification";

interface IProps {
  userId: any;
  afterSave: () => void;
}

const Actions = async ({ userId, afterSave }: IProps) => {
  const { me } = useAuthStore();
  const router = useRouter();
  const { notification, showNotification } = useNotification();
  const [isAuth, setIsAuth] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    if (me?.id === userId) {
      setIsAuth(true);
    } else if (!!me) {
      isUserSubscribed();
    }
  }, [me, userId]);

  async function isUserSubscribed() {
    const _isSubscribed = await userToUserApi.isSubscribed(me?.id);
    setIsSubscribed(_isSubscribed);
  }

  async function onSubscribe() {
    if (!me) {
      router.push("/signin");
    } else {
      if (isSubscribed) {
        setIsSubscribed(false);
        await userToUserApi.delete(userId);
        // setCountLikes(post.countLikes - 1);
      } else {
        setIsSubscribed(true);
        // setCountLikes(post.countLikes + 1);
        await userToUserApi.create({ userId });
      }
    }
  }

  return (
    <>
      {isAuth && (
        <IconButton
          icon={IoMdSettings}
          onClick={() => {}}
          signature="settings"
        />
      )}
      {!isAuth && (
        <button type="button" onClick={onSubscribe}>
          Subscribe
        </button>
      )}
    </>
  );
};

export default Actions;
