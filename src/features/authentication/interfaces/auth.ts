import type { User } from "@/entities/users";

export interface AuthSession {
  user: User;
  accessToken: string;
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  setAuth: (session: AuthSession) => void;
  logout: () => void;
}
