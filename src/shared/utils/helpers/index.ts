import DashboardIcon from "@mui/icons-material/Dashboard";
import SpeedIcon from "@mui/icons-material/Speed";
import BarChartIcon from "@mui/icons-material/BarChart";
import SensorsIcon from "@mui/icons-material/Sensors";
import GroupsIcon from "@mui/icons-material/Groups";
import BusinessIcon from "@mui/icons-material/Business";
import DevicesOtherIcon from "@mui/icons-material/DevicesOther";
import PeopleIcon from "@mui/icons-material/People";
import WebhookIcon from "@mui/icons-material/Webhook";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import ShieldIcon from "@mui/icons-material/Shield";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import PersonIcon from "@mui/icons-material/Person";
import toast from "react-hot-toast";
import type { Role } from "@/shared/types";
import { SIDEBAR_LINKS } from "../constants";

export const getAllowedPathsByRole = (role: Role): string[] => {
  return SIDEBAR_LINKS.filter((l) => l.roles.includes(role)).map((l) => l.to);
};

export const copyToClipboard = (value: string | undefined) => {
  if (!value) return;
  navigator.clipboard.writeText(value);
  toast.success("Скопировано в буфер обмена");
};

export const getSidebarIcon = (to: string) => {
  switch (true) {
    case to.startsWith("/dashboard"):
      return DashboardIcon;
    case to.startsWith("/meters"):
      return SpeedIcon;
    case to.startsWith("/readings"):
      return BarChartIcon;
    case to.startsWith("/devices"):
      return DevicesOtherIcon;
    case to.startsWith("/groups"):
      return GroupsIcon;
    case to.startsWith("/companies"):
      return BusinessIcon;
    case to.startsWith("/users"):
      return PeopleIcon;
    case to.startsWith("/webhooks"):
      return WebhookIcon;
    case to.startsWith("/sensors"):
      return SensorsIcon;
    default:
      return HelpOutlineIcon;
  }
};

export const getRoleIcon = (role: Role) => {
  switch (role) {
    case ROLE.SUPER_ADMIN:
      return ShieldIcon;
    case ROLE.ADMIN:
      return AdminPanelSettingsIcon;
    case ROLE.CONTROLLER:
      return ManageAccountsIcon;
    default:
      return PersonIcon;
  }
};
