import type { AuthSession, AuthState } from "@/shared/types";
import { AUTH_STORAGE_KEY } from "@/shared/utils/constants";
import { create } from "zustand";

export const useAuthStore = create<AuthState>((set) => {
  const stored = localStorage.getItem(AUTH_STORAGE_KEY);

  let user: AuthState["user"] = null;
  let accessToken: AuthState["accessToken"] = null;

  if (stored) {
    try {
      const parsed = JSON.parse(stored) as Partial<AuthSession>;
      user = parsed.user ?? null;
      accessToken = parsed.accessToken ?? null;
    } catch {
      // ignore
    }
  }

  return {
    user,
    accessToken,

    setAuth: (session) => {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
      set({ user: session.user, accessToken: session.accessToken });
    },

    logout: () => {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      set({ user: null, accessToken: null });
    },
  };
});
