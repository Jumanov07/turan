import type { ReactNode } from "react";
import type { ROLE } from "../utils/constants/roles";

export type Column<T> = {
  id: string;
  header: ReactNode;
  cell: (row: T) => ReactNode;
  align?: "left" | "right" | "center";
};

export type Role = (typeof ROLE)[keyof typeof ROLE];
