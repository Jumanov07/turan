import { useAuthStore } from "@/shared/stores";
import {
  canDeleteUsers,
  canEditMeters,
  canManageMetersToGroups,
  hasRoleAdmin,
  hasRoleSuperAdmin,
} from "@/shared/helpers";

export const useRoleAccess = () => {
  const { user, accessToken, logout } = useAuthStore((state) => ({
    user: state.user,
    accessToken: state.accessToken,
    logout: state.logout,
  }));
  const role = user?.role;

  return {
    user,
    role,
    accessToken,
    logout,
    isAdmin: hasRoleAdmin(role),
    isSuperAdmin: hasRoleSuperAdmin(role),
    canEditMeters: canEditMeters(role),
    canManageMetersToGroups: canManageMetersToGroups(role),
    canDeleteUsers: canDeleteUsers(role),
  };
};
