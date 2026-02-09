import type { Company } from "@/entities/companies";
import type { Device } from "@/entities/devices";
import type { Role } from "@/shared/types";

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
  company: Omit<Company, "users" | "key"> | null;
  devices: Device[] | [];
  passwordChange: boolean;
  createdAt: string;
  updatedAt: string;
  isArchived: boolean;
}

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
