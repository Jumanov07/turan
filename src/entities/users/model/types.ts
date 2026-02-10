import type { Role } from "@/shared/types";

interface UserCompany {
  id: number;
  name: string;
}

export interface UserRow {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
  company: UserCompany | null;
  createdAt: string;
  isArchived: boolean;
}

export interface CreateUserPayload {
  email?: string;
  firstName: string;
  lastName: string;
  role: Role;
  companyId?: number;
}
