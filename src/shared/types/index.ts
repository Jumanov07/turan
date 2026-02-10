import type { ReactNode } from "react";
import type { ROLE } from "../constants";

export type Role = (typeof ROLE)[keyof typeof ROLE];

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
  company: { id: number; name: string } | null;
  passwordChange: boolean;
}

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

export interface Company {
  id: number;
  name: string;
  address: string;
  key: {
    key: string;
    createdAt: string;
  } | null;
  createdAt: string;
  isArchived: boolean;
}

export interface DeviceUser {
  firstName: string | null;
  lastName: string | null;
  email: string | null;
}

export interface Device {
  id: number;
  deviceId: string;
  verified: boolean;
  createdAt: string;
  user?: DeviceUser | null;
}

export interface Meter {
  id: number;
  name: string;
  password: string;
  customerID: string | null;
  client: string | null;
  address: string | null;
  descriptions: string | null;
  valveStatus: "open" | "closed";
  valveStatusChange: string | null;
  batteryStatus: string | null;
  lastReading: number | null;
  pendingCommand: string | null;
  status: "normal" | "warning" | "error";
  errorMessage: string | null;
  createdAt: string;
  updatedAt: string;
  isArchived: boolean;
}

export interface SidebarLink {
  label: string;
  to: string;
  roles: Role[];
}

export interface Column<T> {
  id: string;
  header: ReactNode;
  cell: (row: T) => ReactNode;
  align?: "left" | "right" | "center";
}
