import type { ApiErrorLike } from "../types";

export const getApiErrorMessage = (
  error: unknown,
  fallback = "Ошибка запроса",
) => {
  if (typeof error === "string") return error;

  if (error instanceof Error && error.message) {
    return error.message;
  }

  const apiError = error as ApiErrorLike | null;

  return apiError?.response?.data?.message || apiError?.message || fallback;
};
