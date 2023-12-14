"use client";

import { FormEventHandler, useState } from "react";
import { useRouter } from "next/navigation";
import useNotification from "@/helpers/useNotification";
import signInUserBodySchema from "@/helpers/validationSchemas/signInUserBodySchema";
import { authApi } from "@/api/authApi";
import Notification from "@/components/Notification";
import Image from "next/image";
import eyeOff from "../../../public/images/eye-off.svg";
import eye from "../../../public/images/eye.svg";

type DataType = {
  email?: string;
  password?: string;
};
type ErrorType = {
  email?: string | null;
  password?: string | null;
};

function Form() {
  const [showPass, setShowPass] = useState(false);
  const [data, setData] = useState<DataType>({});
  const [errors, setErrors] = useState<ErrorType>({});
  const router = useRouter();
  const { notification, showNotification } = useNotification();

  const updateShowPass = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowPass((p) => !p);
  };

  const validateBeforeWrite = async () => {
    try {
      await signInUserBodySchema.validate(data, { abortEarly: false });
      return false;
    } catch (error: any) {
      const newErrors: ErrorType = error.inner.reduce(
        (acc: ErrorType, item: any) => ({ ...acc, [item.path]: item.message }),
        {}
      );
      setErrors({
        ...errors,
        ...newErrors,
      });
      return true;
    }
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const isValidationError = await validateBeforeWrite();

    if (!isValidationError) {
      const res = await authApi.singIn(data);
      if (res?.error) {
        showNotification(res.error.message, "error");
      } else {
        router.push("/posts");
      }
    }
  };

  return (
    <div>
      {notification && <Notification message={notification.message} />}
      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <label htmlFor="signup-email" className="subtitle1">
            Email
          </label>
          <input
            className="full-width"
            onChange={(e) => {
              setData({ ...data, email: e.target.value });
              setErrors({ ...errors, email: null });
            }}
            id="signup-email"
            type="email"
            value={data?.email || ""}
          />

          {errors.email && (
            <div className="mt-0.5 text-xs text-red-600">{errors.email}</div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="signup-password" className="subtitle1">
            Password
          </label>
          <div className="relative">
            <input
              className="full-width"
              onChange={(e) => {
                setData({ ...data, password: e.target.value });
                setErrors({ ...errors, password: null });
              }}
              value={data?.password || ""}
              id="signup-password"
              type={showPass ? "text" : "password"}
            />
            <button
              onClick={updateShowPass}
              className="icon-button absolute top-2 right-2 "
              type="button"
            >
              {showPass ? (
                <Image src={eye} alt="see" width={30} height={30} />
              ) : (
                <Image src={eyeOff} alt="hide" width={30} height={30} />
              )}
            </button>
          </div>

          {errors.password && (
            <div className="mt-0.5 text-xs text-red-600">{errors.password}</div>
          )}
        </div>

        <button type="submit" className="mx-auto block">
          Sign in
        </button>
      </form>
    </div>
  );
}

export default Form;
