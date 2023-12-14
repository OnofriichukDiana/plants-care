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
  props.next = { revalidate: 36 };

  try {
    const response = await fetch(host + url, props);

    if (!response.ok) {
      throw {
        error: {
          status: response.status,
          message: response.statusText,
        },
      };
    }

    const data = await response.json();
    return func(data);
  } catch (err: any) {
    console.error(err);
    return func({
      error: err.error,
    });
  }
};
