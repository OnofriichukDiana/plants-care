"use client";
import Link from "next/link";
import { useAuthStore } from "../../api/authStore";
import Avatar from "../Avatar";
import { useRouter } from "next/navigation";
import { authApi } from "@/api/authApi";
import { useEffect } from "react";
import Cookies from "js-cookie";
import logOut from "../../../public/images/log-out.svg";
import logIn from "../../../public/images/log-in.svg";
import IconButton from "../IconButton";

const UserInfo = () => {
  let { me, clearUser } = useAuthStore();
  const router = useRouter();
  const hendleLogOut = () => {
    Cookies.remove(process.env.NEXT_PUBLIC_AUTH_COOKIE || "");
    clearUser();
  };

  const fetchMe = async () => {
    const res: any = await authApi.me();
    if (res?.id) {
      me = res;
    }
  };

  useEffect(() => {
    if (!me) fetchMe();
  }, []);

  return (
    <div>
      {!!me ? (
        <div className="flex items-center">
          <Link href="/profile" className="mr-5">
            <Avatar user={me} />
          </Link>
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
