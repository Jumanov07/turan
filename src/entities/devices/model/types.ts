import type { User } from "@/entities/users";

export interface Device {
  id: number;
  deviceId: string;
  verified: boolean;
  createdAt: string;
  isArchived: boolean;
  user?: Omit<User, "company" | "devices"> | null;
}
