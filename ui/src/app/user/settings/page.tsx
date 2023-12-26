"use client";
import { useLayoutEffect, useState } from "react";
import { useAuthStore } from "@/api/authStore";
import { useRouter } from "next/navigation";
import { IoIosEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import UploadFiles from "@/components/UploadFiles";
import Image from "next/image";
import { fileData } from "@/helpers/fileUtils";
import { usersApi } from "@/api";
import useNotification from "@/helpers/useNotification";
import Notification from "@/components/Notification";

const Settings = () => {
  const { me } = useAuthStore();
  const router = useRouter();
  const { notification, showNotification } = useNotification();
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [name, setName] = useState(me?.name);
  const [passwords, setPasswords] = useState<any>([]);
  const [avatar, setAvatar] = useState<any>();

  useLayoutEffect(() => {
    if (!me?.id) {
      setIsAuthenticated(false);
    }
    // if (!isAuthenticated) {
    //   router.push("/signin");
    // }
  }, [me]);

  // useEffect(() => {
  //   console.log(avatar);
  // }, [avatar]);

  const Avatar = () => {
    let data;
    if (!!avatar) {
      console.log(avatar[0]);
      data = fileData(avatar[0]);
    }
    return (
      <div
        className={`avatar w-40 h-40 ${!data?.preview && "p-4"}`}
        style={{ background: me?.avatarBackground }}
      >
        {!!data?.preview ? (
          <img
            src={data?.preview}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              overflow: "hidden",
              borderRadius: "50%",
            }}
          ></img>
        ) : (
          <Image
            src={`/images/${me?.icon}.svg`}
            alt="icon"
            width={5}
            height={5}
            layout="responsive"
          />
        )}
      </div>
    );
  };

  const onChangeName = async () => {
    const res = await usersApi.update(me?.id, { name });
    if (res?.error) {
      showNotification(res.error.message, "error");
    } else {
      showNotification("Name updated", "success");
    }
  };

  const onChangePassword = async () => {
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

  const onChangeAvatar = async () => {
    // const res = await usersApi.upload(me?.id, {
    //   oldPassword: passwords[0]?.value,
    //   newPassword: passwords[1]?.value,
    // });
    // if (res?.error) {
    //   showNotification(res.error.message, "error");
    // } else {
    //   showNotification("Name updated", "success");
    // }
  };
  return (
    <>
      {notification && (
        <Notification
          message={notification.message}
          type={notification?.type}
        />
      )}
      <div className="dc min-h-screen">
        <div className="main-card flex flex-col items-center">
          <div className="mb-4 md:w-1/2 flex flex-col items-end">
            <p className="h4 w-full">Avatar</p>

            <UploadFiles
              onChange={(newAvatar) => setAvatar(newAvatar)}
              icon={<Avatar />}
              styles=" pt-4 w-full mb-4 border-t border-gray-300 flex justify-center"
            />

            <button type="button" onClick={onChangeAvatar}>
              Update
            </button>
          </div>

          <div className="mb-4 md:w-1/2 flex flex-col items-end">
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
            <button type="button" onClick={onChangeName}>
              Update
            </button>
          </div>

          <div className="mb-4 md:w-1/2 flex flex-col items-end">
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
            <button type="button" onClick={onChangePassword}>
              Update
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
