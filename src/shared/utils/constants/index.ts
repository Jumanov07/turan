import { ROLE } from "./roles";

export const SIDEBAR_LINKS = [
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
