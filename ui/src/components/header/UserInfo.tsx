"use client";
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
  let { me, clearUser, isLoading, setIsLoading } = useAuthStore();
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

  useEffect(() => {
    const token = Cookies.get(process.env.NEXT_PUBLIC_AUTH_COOKIE || "");
    if (!me && !!token) fetchMe();
  }, []);

  return (
    <div>
      {!!me && !isLoading ? (
        <div className="flex items-center">
          <div className="mr-5">
            <Avatar user={me} />
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
