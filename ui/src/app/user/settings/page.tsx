"use client";
import { FormEventHandler, useLayoutEffect, useState } from "react";
import { useAuthStore } from "@/api/authStore";
import { useRouter } from "next/navigation";
import { IoIosEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import UploadFiles from "@/components/UploadFiles";
import { fileData } from "@/helpers/fileUtils";
import { usersApi } from "@/api";
import useNotification from "@/hooks/useNotification";
import Notification from "@/components/Notification";
import LoadingButton from "@/components/LoadingButton";

const Settings = () => {
  const { me, isLoading: isMeLoading } = useAuthStore();
  const router = useRouter();
  const { notification, showNotification } = useNotification();
  const [name, setName] = useState("");
  const [passwords, setPasswords] = useState<any>([]);
  const [avatar, setAvatar] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);

  useLayoutEffect(() => {
    if (!me?.id && !isMeLoading) {
      router.push("/signin");
    }
    if (!!me?.avatarUrl) {
      setAvatar([me?.avatarUrl]);
    }
    if (!!me?.name) {
      setName(me?.name);
    }
  }, [me, isMeLoading]);

  const Avatar = () => {
    let data;
    if (!!avatar?.length) {
      data = fileData(avatar[0]);
    }
    return (
      <div
        className={`avatar w-40 h-40 ${!data?.preview && "p-4"}`}
        style={{ background: me?.avatarBackground }}
      >
        <img
          src={!!data?.preview ? data?.preview : `/images/${me?.icon}.svg`}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            overflow: "hidden",
            borderRadius: "50%",
          }}
        ></img>
      </div>
    );
  };

  const onChangeName: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const res = await usersApi.update(me?.id, { name });
    if (res?.error) {
      showNotification(res.error.message, "error");
    } else {
      useAuthStore.setState({ me: res });
      showNotification("Name updated", "success");
    }
  };

  const onChangePassword: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const res = await usersApi.updatePassword(me?.id, {
      oldPassword: passwords[0]?.value,
      newPassword: passwords[1]?.value,
    });

    if (res?.error) {
      showNotification(res.error.message, "error");
    } else {
      showNotification("Password updated", "success");
      setPasswords([]);
    }
  };

  const onChangeAvatar: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append("file", avatar[0]);
    const res = await usersApi.upload(formData, me?.id, {
      "Content-Length": avatar[0]?.size,
    });

    if (res?.error) {
      showNotification(res.error.message, "error");
    } else {
      useAuthStore.setState({ me: res });
      showNotification("Avatar updated", "success");
    }
    setIsLoading(false);
  };

  return (
    <div>
      {notification && (
        <Notification
          message={notification.message}
          type={notification?.type}
        />
      )}
      <div className="main-card flex flex-col items-center">
        <form
          onSubmit={onChangeAvatar}
          className="w-full mb-4 md:w-1/2 flex flex-col items-end"
        >
          <p className="h4 w-full">Avatar</p>
          <div className="w-full pt-4 border-t border-gray-300 flex justify-center mb-3">
            <UploadFiles
              onChange={(newAvatar) => setAvatar(newAvatar)}
              icon={<Avatar />}
            />
          </div>

          <LoadingButton
            button={
              <button
                disabled={!avatar?.length || typeof avatar[0] === "string"}
                type="submit"
              >
                Update
              </button>
            }
            isLoading={isLoading}
          />
        </form>

        <form
          onSubmit={onChangeName}
          className="w-full mb-4 md:w-1/2 flex flex-col items-end"
        >
          <p className="h4 w-full text-left">Name</p>
          <div className="w-full pt-4 border-t border-gray-300">
            <input
              className="w-full mb-4 p-4"
              onChange={(e) => {
                setName(e.target.value);
              }}
              type="text"
              value={name || ""}
              placeholder="Name"
            />
          </div>
          <button disabled={!!name && me?.name === name} type="submit">
            Update
          </button>
        </form>

        <form
          onSubmit={onChangePassword}
          className="w-full mb-4 md:w-1/2 flex flex-col items-end"
        >
          <p className="h4 w-full text-left">Password</p>
          <div className="w-full pt-4 border-t border-gray-300">
            <div className="relative mb-4">
              <input
                className="w-full p-4"
                onChange={(e) => {
                  setPasswords([
                    { ...passwords[0], value: e.target.value },
                    passwords[1],
                  ]);
                }}
                value={passwords?.[0]?.value || ""}
                placeholder="Old password"
                type={passwords?.[0]?.isShowPassword ? "text" : "password"}
                autoComplete="old-password"
              />
              <button
                onClick={() =>
                  setPasswords([
                    {
                      ...passwords[0],
                      isShowPassword: !passwords?.[0]?.isShowPassword,
                    },
                    passwords[1],
                  ])
                }
                className="icon-button absolute top-4 right-2"
                type="button"
              >
                {passwords?.[0]?.isShowPassword ? (
                  <IoIosEye className="icon-medium" />
                ) : (
                  <IoIosEyeOff className="icon-medium" />
                )}
              </button>
            </div>

            <div className="relative mb-4">
              <input
                className="w-full p-4"
                onChange={(e) => {
                  setPasswords([
                    passwords[0],
                    { ...passwords[1], value: e.target.value },
                  ]);
                }}
                value={passwords?.[1]?.value || ""}
                placeholder="New password"
                type={passwords?.[1]?.isShowPassword ? "text" : "password"}
                autoComplete="new-password"
              />
              <button
                onClick={() =>
                  setPasswords([
                    passwords[0],
                    {
                      ...passwords[1],
                      isShowPassword: !passwords?.[1]?.isShowPassword,
                    },
                  ])
                }
                className="icon-button absolute top-4 right-2"
                type="button"
              >
                {passwords?.[1]?.isShowPassword ? (
                  <IoIosEye className="icon-medium" />
                ) : (
                  <IoIosEyeOff className="icon-medium" />
                )}
              </button>
            </div>
          </div>
          <button
            disabled={!passwords?.[0]?.value || !passwords?.[1]?.value}
            type="submit"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default Settings;
