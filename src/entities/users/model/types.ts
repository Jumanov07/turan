import type { Role, User } from "@/shared/types";

export type UserRow = Omit<User, "devices">;

export interface GetUsersResponse {
  data: Omit<User, "company" | "devices">[];
  total: number;
  page: number;
  limit: number;
}

export interface CreateUserPayload {
  email?: string;
  firstName: string;
  lastName: string;
  role: Role;
  companyId?: number;
}
