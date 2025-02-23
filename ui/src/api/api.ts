import Cookies from "js-cookie";

export const api = async (url: string, props: any, func: any) => {
  if (!props["headers"]) {
    props["headers"] = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
  }

  const host = process.env.NEXT_PUBLIC_API_URL || "";
  const authHeader = Cookies.get(process.env.NEXT_PUBLIC_AUTH_COOKIE || "");

  if (authHeader) {
    props["headers"]["Authorization"] = "Bearer " + authHeader;
  }
  props.cache = "no-store";

  try {
    const response = await fetch(host + url, props);
    const data = await response.json();

    if (!response.ok) {
      throw {
        error: {
          status: data.statusCode || response.status,
          message: data.message || response.statusText,
        },
      };
    }

    return func(data);
  } catch (err: any) {
    console.error(err);
    return func({
      error: err.error,
    });
  }
};
