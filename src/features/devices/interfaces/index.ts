import type { User } from "@/features/authentication/interfaces/auth";

export interface Device {
  id: number;
  deviceId: string;
  verified: boolean;
  createdAt: string;
  isArchived: boolean;
  user?: Omit<User, "company" | "devices"> | null;
}
