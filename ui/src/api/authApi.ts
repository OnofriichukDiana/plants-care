import { api } from "./api";
import { handleApiResponse, useAuthStore } from "./authStore";

export const authApi = {
  me: () =>
    api(
      `/auth/me`,
      {
        method: "GET",
        data: {},
      },
      (response: any) => useAuthStore.setState({ me: response?.me })
    ),

  singUp: (data: any) =>
    api(
      `/auth/signup`,
      {
        method: "POST",
        body: JSON.stringify(data),
      },
      (response: any) => handleApiResponse(response)
    ),

  singIn: (data: any) =>
    api(
      `/auth/signin`,
      {
        method: "POST",
        body: JSON.stringify(data),
      },
      (response: any) => handleApiResponse(response)
    ),
};
