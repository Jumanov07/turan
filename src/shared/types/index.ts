import type { ReactNode } from "react";

export type Role = "super_admin" | "admin" | "user" | "controller";

export type Column<T> = {
  id: string;
  header: ReactNode;
  cell: (row: T) => ReactNode;
  align?: "left" | "right" | "center";
};
