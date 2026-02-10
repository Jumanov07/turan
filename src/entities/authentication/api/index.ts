import { api } from "@/shared/api";
import { API_ROUTES } from "@/shared/constants";

export const signIn = async (email: string, password: string) => {
  const { data } = await api.post(API_ROUTES.AUTH_LOGIN, {
    email,
    password,
  });
  return data;
};

export const sendForgotRequest = async (email: string) => {
  const { data } = await api.post(API_ROUTES.USERS_PASSWORD_FORGOT, { email });
  return data;
};
