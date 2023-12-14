import { create } from "zustand";
import Cookies from "js-cookie";

interface AuthState {
  me: any;
  setUser: (me: any) => void;
  clearUser: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  me: null,
  setUser: (me: any) => set({ me }),
  clearUser: () => set({ me: null }),
}));

export const handleApiResponse = (response: any) => {
  if (response.token) {
    Cookies.set(process.env.NEXT_PUBLIC_AUTH_COOKIE || "", response.token, {
      expires: 2,
    });
  }

  useAuthStore.setState({ me: response.me });

  return response;
};
