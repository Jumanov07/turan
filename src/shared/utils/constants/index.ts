import type { Role } from "@/shared/types";
import { ROLE } from "./roles";

type SidebarLink = {
  label: string;
  to: string;
  roles: Role[];
};

export const SIDEBAR_LINKS: SidebarLink[] = [
  {
    label: "Компании",
    to: "/companies",
    roles: [ROLE.SUPER_ADMIN],
  },
  {
    label: "Пользователи",
    to: "/users",
    roles: [ROLE.SUPER_ADMIN, ROLE.ADMIN],
  },
  {
    label: "Устройства",
    to: "/devices",
    roles: [ROLE.ADMIN],
  },
  {
    label: "Группы",
    to: "/groups",
    roles: [ROLE.ADMIN, ROLE.USER, ROLE.CONTROLLER],
  },
  {
    label: "Счётчики",
    to: "/meters",
    roles: [ROLE.ADMIN, ROLE.USER, ROLE.CONTROLLER],
  },
  {
    label: "Показания",
    to: "/readings",
    roles: [ROLE.ADMIN, ROLE.USER, ROLE.CONTROLLER],
  },
  {
    label: "Вебхуки",
    to: "/webhooks",
    roles: [ROLE.ADMIN],
  },
];
